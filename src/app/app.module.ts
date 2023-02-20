import { BandInTownService } from './services/BandInTown.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { ArtistsComponent } from './artists/artists.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SongsComponent } from './songs/songs.component';
import { PipesComponent } from './pipes/pipes.component';
import { ShowsComponent } from './shows/shows.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    ArtistsComponent,
    SongsComponent,
    PipesComponent,
    ShowsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    GoogleMapsModule,
    RouterModule.forRoot([
      {path:"", redirectTo: "/artists", pathMatch:"full"},
      {path:"artists", component:ArtistsComponent},
      {path:"albums/:artistName", component:AlbumsComponent},
      {path:"songs", component:SongsComponent},
      {path:"songs/:albumId", component:SongsComponent},
      {path:"shows", component:ShowsComponent},
      {path:"shows/:artistName", component:ShowsComponent}
    ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http : HttpClient){
  return new TranslateHttpLoader(http);
}
