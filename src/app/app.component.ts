import { Component } from '@angular/core';
import { DictionaryService} from "./service/dictionary.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'scrabble-app';

  applicationMode = "";
  isWorking: boolean = false;
  letters: string = "";
  map: Map<number, string[]> = AppComponent.initMap();

  constructor(private dictionaryService: DictionaryService) {
  }

  ngOnInit(): void {
  }

  searchingWordsFromLetters():boolean {
    return this.applicationMode == "WORDS_FROM_LETTERS";
  }

  startSearch():void {
    // this.test();
    //this.letters = "peruka";
    console.log("Start serarch for: " + this.letters);
    this.applicationMode = "WORDS_FROM_LETTERS";
    this.getWords(this.letters);
  }

  getWords(letters: string):void {
    this.map = AppComponent.initMap();
    this.isWorking = true;
    this.dictionaryService.getWords(letters)
      .subscribe({
          next: w => {
            console.log("Element: ", w);
            this.addToMap(w.data);
            /*
            for (let entry of this.map.entries()) {
              console.log(entry[0], entry[1]);
            }
            */
          },
          complete: () => {
            console.log("complete");
            this.isWorking = false;
          },
          error: err => console.log("error")
        }
      );
  }

  test():void {
    this.dictionaryService.test().subscribe(w => {
      console.log("Element: ", w);
    });
  }

  private addToMap(w:string):void {
    let arr = this.map.get(w.length);
    // @ts-ignore
    this.map.set(w.length, arr.concat(w));
  }

  private static initMap():Map<number,string[]> {
    return new Map([
      [0, []],
      [1, []],
      [2, []],
      [3, []],
      [4, []],
      [5, []],
      [6, []],
      [7, []]
    ]);
  }
}
