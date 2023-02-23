import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-youtubeplayer',
  templateUrl: './youtubeplayer.component.html',
  styleUrls: ['./youtubeplayer.component.css']
})
export class YoutubeplayerComponent implements OnInit {

  private apiLoaded = false;

  @Input() videoId ?: string;

  constructor() { }

  ngOnInit(): void {
    if(!this.apiLoaded){
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

}
