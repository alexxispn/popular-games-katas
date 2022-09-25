import { Component, OnInit} from '@angular/core';
import hangmanWords from './hangman-words.json';
import {Word} from './interfaces/word';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'popular-games-katas';
  hint: string = '';
  solution: string[] = [];
  correctLetters: string[] = [];
  wrongLetters: string[] = [];
  counterCorrectLetters: number = 0;
  counterWrongLetters: number = 0;
  arrayWords: Word[] = hangmanWords;
  randomNumber: number = Math.floor(Math.random() * 10) + 1;
  generateRandomNumber = (maxNumber: number) => {
    return Math.floor(Math.random() * maxNumber) + 1;
  }

  word: Word = this.arrayWords[this.generateRandomNumber(this.arrayWords.length)];

  getHint() {
    this.hint = this.word.hint;
  }

  resetInputValue() {
    let inputLetter = document.getElementById('input-letter') as HTMLInputElement;
    inputLetter.value = '';
  }

  getSolution() {
    let name = this.word.name.toUpperCase();
    this.solution = name.split('');
  }

  getCorrectLettersLength() {
    this.correctLetters.length = this.solution.length;
  }

  checkLetter = (letter: string) => {
    if (letter === '' || letter === undefined) {
      return alert('Introduce una letra');
    }
    letter = letter.toUpperCase();
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
    this.isGameOver();
    this.resetInputValue();
  }

  setNewGame() {
    this.counterCorrectLetters = 0;
    this.counterWrongLetters = 0;
    this.correctLetters = [];
    this.wrongLetters = [];
    this.randomNumber = Math.floor(Math.random() * 10) + 1;
    this.word = this.arrayWords[this.randomNumber];
    this.getHint();
    this.getSolution();
    this.getCorrectLettersLength();
  }

  isGameOver() {
    if (this.counterCorrectLetters === this.solution.length) {
      alert('Has ganado');
      this.setNewGame();
    }
    if (this.counterWrongLetters === 9) {
      alert('Has perdido');
      this.setNewGame();
    }
  }

  ngOnInit(): void {
    this.getHint();
    this.getSolution();
    this.getCorrectLettersLength();
  }
}
