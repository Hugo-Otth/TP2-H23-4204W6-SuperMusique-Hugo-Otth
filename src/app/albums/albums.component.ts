import { Artist } from './../models/artist';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../models/album';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  constructor(public spotify : SpotifyService, public route : ActivatedRoute) { }
  
  artistName : string | null = null;
  artist ?: Artist;
  albums : Album[] = [];

  async ngOnInit() {
    await this.spotify.connect();
    this.artistName = this.route.snapshot.paramMap.get("artistName");
    this.getAlbums();
  }

  async getAlbums() : Promise<void>{
    this.artist = await this.spotify.searchArtist(this.artistName!);
    this.albums = await this.spotify.getAlbums(this.artist);
  }

}
