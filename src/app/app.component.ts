import { Component } from '@angular/core';
import { DictionaryService} from "./service/dictionary.service";
import {take, tap} from "rxjs";
import {SseService} from "./service/sse.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'scrabble-app';

  words: String = "";
  info: String = "init";
  array: String[] = [];

  constructor(private dictionaryService: DictionaryService,
              private sseService: SseService) {
  }

  ngOnInit(): void {
    this.array.push("i psa");
    this.test();
    this.getWords("kamien");
  }

  getWords(letters: String):void {
    this.words = "";
    this.sseService.getServerSentEvent()
      .subscribe(w => {
        this.words = this.words + " " + w.data;
        this.array.push(w.data);
        this.array = this.array.slice();
        console.log("Element: ", w.data);
        console.log("All:", this.array);
      }
    );
  }

  test():void {
    this.dictionaryService.test().subscribe(w => {
      this.info = w.value;
      console.log("Element: ", w);
    });
  }
}
