import { Component, OnInit} from '@angular/core';
import {Word} from './interfaces/word';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'popular-games-katas';
  clue: string = '';
  solution: string[] = [];
  correctLetters: string[] = [];
  wrongLetters: string[] = [];
  counterCorrectLetters: number = 0;
  counterWrongLetters: number = 0;
  arrayWords: Word[] = [
    {
      "id": 1,
      "name": "perro",
      "clue": "El mejor amigo del hombre"
    },
    {
      "id": 2,
      "name": "gato",
      "clue": "Algún día se harán con el mundo"
    },
    {
      "id": 3,
      "name": "caballo",
      "clue": "El animal más rápido del mundo"
    },
    {
      "id": 4,
      "name": "elefante",
      "clue": "El animal más grande del mundo"
    },
    {
      "id": 5,
      "name": "jirafa",
      "clue": "El animal más alto del mundo"
    },
    {
      "id": 6,
      "name": "tigre",
      "clue": "El animal más peligroso del mundo"
    },
    {
      "id": 7,
      "name": "león",
      "clue": "El animal más valiente del mundo"
    },
    {
      "id": 8,
      "name": "oso",
      "clue": "El animal más fuerte del mundo"
    },
    {
      "id": 9,
      "name": "mono",
      "clue": "El animal más inteligente del mundo"
    },
    {
      "id": 10,
      "name": "ballena",
      "clue": "El animal más grande del mundo"
    }
  ]
  randomNumber: number = Math.floor(Math.random() * 10) + 1;
  word: Word = this.arrayWords[this.randomNumber];

  takeClue() {
    this.clue = this.word.clue;
  }
  resetInputValue() {
    let inputLetter = document.getElementById('input-letter') as HTMLInputElement;
    inputLetter.value = '';
  }

  takeSolution() {
    let name = this.word.name.toUpperCase();
    this.solution = name.split('');
    console.log(this.solution);
  }

  takeCorrectLettersLength() {
    this.correctLetters.length = this.solution.length;
  }

  checkLetter = (letter: string) => {
    if (letter === '' || letter === undefined) {
      return alert('Introduce una letra');
    }
    let letterIsCorrect = this.solution.includes(letter);
    if (!letterIsCorrect) {
      this.wrongLetters.push(letter);
      this.counterWrongLetters++;
    }
    else {
      let lettersCorrectInSolution = this.solution.filter((solutionLetter) => solutionLetter === letter).length;
      for (let i = 0; i < lettersCorrectInSolution; i++) {
        let index = this.solution.indexOf(letter);
        this.correctLetters[index] = letter;
        this.solution[index] = '';
        this.counterCorrectLetters++;
      }
    }
    this.checkIfGameIsOver();
    this.resetInputValue();
  }

  newGame() {
    this.counterCorrectLetters = 0;
    this.counterWrongLetters = 0;
    this.correctLetters = [];
    this.wrongLetters = [];
    this.randomNumber = Math.floor(Math.random() * 10) + 1;
    this.word = this.arrayWords[this.randomNumber];
    this.takeClue();
    this.takeSolution();
    this.takeCorrectLettersLength();
  }

  checkIfGameIsOver() {
    if (this.counterCorrectLetters === this.solution.length) {
      alert('Has ganado');
      this.newGame();
    }
    if (this.counterWrongLetters === 9) {
      alert('Has perdido');
      this.newGame();
    }
  }


  ngOnInit(): void {
    this.takeClue();
    this.takeSolution();
    this.takeCorrectLettersLength();
  }
}
