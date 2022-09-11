import {Component, OnInit} from '@angular/core';
import {Word} from "./interfaces/word";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'popular-games-katas';
  clue: string = '';
  solution: string[] = [];
  word:Word = {
    name: "perro",
    clue: "El mejor amigo del hombre"
  }

  ngOnInit() {
    console.log(this.clue);
    }
}
