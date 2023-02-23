import { Artist } from './../models/artist';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../models/song';
import { Album } from '../models/album';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const API_KEY = "AIzaSyDA6hLYo_JBHRbGNdz2smq7X4jtllJ5h4A";

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  songs : Song[] = [];
  albumId : string | null = null;
  artistName : string | null = null;
  album? : Album;
  albumName? : string;
  videoId ?: string;

  constructor(public spotify : SpotifyService, public route : ActivatedRoute, public http : HttpClient) { }

  async ngOnInit() {
    await this.spotify.connect();
    this.albumId = this.route.snapshot.paramMap.get("albumId");
    this.artistName = this.route.snapshot.paramMap.get("artistName");
    console.log(this.albumId);
    this.album = await this.spotify.searchAlbum(this.albumId!);
    this.albumName = this.album.name;
    await this.getSongs();
    this.videoId = this.songs[0].videoId;
  }

  async getSongs() : Promise<void>{
    this.songs = await this.spotify.getSongs(this.album!, this.artistName!);
  }

  async setCurrentSong(songId : string) : Promise<void>{
    for(const song of this.songs){
      if(song.id == songId){
        this.videoId = song.videoId;
      }
    }
  }
}
