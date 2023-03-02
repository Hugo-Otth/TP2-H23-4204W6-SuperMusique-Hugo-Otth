import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TP2-H23-4204W6-SuperMusique-Hugo-Otth';
  language : string = "fr";

  constructor(public translator : TranslateService) {
    translator.setDefaultLang(this.language);
  }

  changeLanguage():void{
    this.translator.use(this.language);
  }
}
