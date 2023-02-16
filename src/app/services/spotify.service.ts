import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Artist } from '../models/artist';

const CLIENT_ID : string = "1e546b84d9ee4604acb1b731e16eaa57";
const CLIENT_SECRET : string = "3cfb4207aa4546dda876c3cc0c234f57";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyToken : string | null = null;
  jsonData : string | null = null;
  favoriteArtists : Artist[] = [];

  constructor(public http : HttpClient) { }

  async connect(): Promise<void> {
    let body = new HttpParams().set('grant_type', 'client_credentials');
    let httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
      })
    };
    let x = await lastValueFrom(this.http.post<any>('https://accounts.spotify.com/api/token', body.toString(), httpOptions));
    console.log(x);
    this.spotifyToken = x.access_token;
  }

  async searchArtist(artist : string): Promise<Artist> {
    const httpOptions = { headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + this.spotifyToken
    })};
    
    let x = await lastValueFrom(this.http.get<any>('https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' + artist, httpOptions));
    console.log(x);
    return new Artist(x.artists.items[0].id, x.artists.items[0].name, x.artists.items[0].images[0].url);
  }

  async addFavArtist(a : Artist) : Promise<void>{
    let extists = false;
    for(let i = 0 ; i < this.favoriteArtists.length; i++){
      if(this.favoriteArtists[i].id == a.id){
        extists = true;
      }
    }
    if(!extists){
      this.favoriteArtists.push(a);
    console.log(this.favoriteArtists.length);
    localStorage.setItem("favoriteArtists", JSON.stringify(this.favoriteArtists));
    }else{
      console.log("Artist " + a.name + " is already in favorites")
    }
  }

  async getFavorites(): Promise<void>{
    this.jsonData = localStorage.getItem("favoriteArtists")
    if(this.jsonData != null){
      this.favoriteArtists = JSON.parse(this.jsonData);
    }
  }

  async clearFavorites() : Promise<void>{
    this.favoriteArtists = [];
    localStorage.setItem("favoriteArtists", JSON.stringify(this.favoriteArtists));
  }
}
