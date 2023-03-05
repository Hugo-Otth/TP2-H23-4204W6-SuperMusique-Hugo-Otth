import { Injectable } from '@angular/core';
import { Show } from '../models/show';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

const API_KEY : string = "2b32475766802ac01eefda45e9e42ea0";

@Injectable({
  providedIn: 'root'
})
export class BandInTownService {


constructor(public http : HttpClient) { }

async getEvents(artistName : string) : Promise<Show[]>{
  let x = await lastValueFrom(this.http.get<any>('https://rest.bandsintown.com/artists/' + artistName + '/events?app_id=' + API_KEY));
  console.log(x);
  let shows = [];

  for(let i = 0; i < x.length; i++){
    //console.log(x[i].title, x[i].venue.location)
    shows.push(new Show(x[i].title, parseFloat(x[i].venue.latitude), parseFloat(x[i].venue.longitude), x[i].datetime, x[i].venue.country, x[i].venue.city));
  }
  return shows;
}
}
