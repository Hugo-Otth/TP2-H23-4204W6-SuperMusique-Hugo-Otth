import { BandInTownService } from './../services/BandInTown.service';
import { Show } from './../models/show';
import { Component, OnInit } from '@angular/core';
import { Artist } from './../models/artist';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../models/album';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {
  
  artistName : string | null = null;
  center : google.maps.LatLngLiteral = {lat:42, lng:-4}
  zoom : number = 5;
  markerPositions : google.maps.LatLngAltitude[] = [];
  shows : Show[] = [];

  constructor(public spotify : SpotifyService, public route : ActivatedRoute, public bandintown : BandInTownService) { }

  ngOnInit(): void {
    this.artistName = this.route.snapshot.paramMap.get("artistName");
    this.getShows();
    this.addMarkers();
  }

  async getShows() : Promise<void>{
    this.shows = await this.bandintown.getEvents(this.artistName!);
  }

  addMarkers(){
    this.shows.forEach(show => {
      this.markerPositions.push({lat: show.lat, lng: show.lng})
    });
  }

}
