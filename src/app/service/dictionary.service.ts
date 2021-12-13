import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {SseService} from "./sse.service";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private getWordsUrl = "http://localhost:8080/dict";

  constructor(private sseService:SseService) { }

  test():Observable<any> {
    const url = `${this.getWordsUrl}/test`;
    return this.sseService.getServerSentEvent(url);
  }

  getWords(letters:String):Observable<any> {
    const url = `${this.getWordsUrl}/letters/${letters}`;
    return this.sseService.getServerSentEvent(url);
  }
}
