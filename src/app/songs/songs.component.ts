import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../models/song';
import { Album } from '../models/album';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  songs? : Song[];
  albumId : string | null = null;
  album? : Album;
  albumName? : string;

  constructor(public spotify : SpotifyService, public route : ActivatedRoute) { }

  async ngOnInit() {
    await this.spotify.connect();
    this.albumId = this.route.snapshot.paramMap.get("albumId");
    console.log(this.albumId);
    this.album = await this.spotify.searchAlbum(this.albumId!);
    this.albumName = this.album.name;
    this.getSongs();
  }

  async getSongs() : Promise<void>{
    this.songs = await this.spotify.getSongs(this.album!);
  }

}
