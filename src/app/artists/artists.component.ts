import { Component, OnInit } from '@angular/core';
import { Artist } from '../models/artist';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  
  artistName : string = "";
  artist ?: Artist;
  jsonData : string | null = null;

  constructor(public spotify : SpotifyService) { }

  ngOnInit(): void {
    this.spotify.connect();
    this.spotify.getFavorites();
  }
  async getArtist() : Promise<void>{
    this.artist = await this.spotify.searchArtist(this.artistName);
    this.spotify.addFavArtist(this.artist);
  }
}
