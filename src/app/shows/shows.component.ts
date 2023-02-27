import { BandInTownService } from './../services/BandInTown.service';
import { Show } from './../models/show';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {
  
  artistName : string | null = null;
  center : google.maps.LatLngLiteral = {lat:42, lng:-45}
  zoom : number = 10;
  markerPositions : google.maps.LatLngLiteral[] = [];
  shows : Show[] = [];

  constructor(public spotify : SpotifyService, public route : ActivatedRoute, public bandintown : BandInTownService) { }

  async ngOnInit(){
    this.artistName = this.route.snapshot.paramMap.get("artistName");
    await this.getShows();
    this.addMarkers();
  }

  async getShows() : Promise<void>{
    this.shows = await this.bandintown.getEvents(this.artistName!);
  }

  addMarkers() : void{
    let arrLat : number[] = [];
    let arrLng : number[] = [];
    this.shows.forEach(show => {
      this.markerPositions.push({lat: show.lat, lng: show.lng});
      arrLat.push(show.lat);
      arrLng.push(show.lng);
    });
    let arrMidLat : number[] = [];
    let arrMidLng : number[] = [];
    arrMidLat.push(Math.max(...arrLat));
    arrMidLat.push(Math.min(...arrLat));
    arrMidLng.push(Math.max(...arrLng));
    arrMidLng.push(Math.min(...arrLng));
    let midLat = arrMidLat.reduce((a, b) => a + b, 0) / arrMidLat.length;
    let midLng = arrMidLng.reduce((a, b) => a + b, 0) / arrMidLng.length;
    this.center = {lat:midLat, lng:midLng}
    console.log(Math.max(...arrLng)- Math.min(...arrLng));
    if(arrLng.length < 2){
      this.zoom = 10;
    }else{
      this.zoom = Math.abs(-0.010309278350515464 * (Math.max(...arrLng)- Math.min(...arrLng)) +4.257731958762887);
    }
    console.log(this.zoom);
  }
}
