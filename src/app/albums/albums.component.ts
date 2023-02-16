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
  albums : Album[] = [];

  async ngOnInit() {
    this.spotify.connect();
    this.artistName = this.route.snapshot.paramMap.get("artistName");
    this.albums = await this.spotify.getAlbums(await this.spotify.searchArtist(this.artistName!));
  }

}
