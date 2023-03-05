import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

const API_KEY : string = "AIzaSyDA6hLYo_JBHRbGNdz2smq7X4jtllJ5h4A";

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(public http : HttpClient) { }

  async youtubeRequest(songName : string, artistName : string) : Promise<string>{
    let x = await lastValueFrom(this.http.get<any>('https://www.googleapis.com/youtube/v3/search?type=video&part=id&maxResults=1&key=' + API_KEY + '&q=' + artistName + ' - ' + songName));
    console.log(x);
    return x.items[0].id.videoId;
  }
}
