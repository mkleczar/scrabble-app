import { Injectable } from '@angular/core';
import {Observable, of, take, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private getWordsUrl = "http://localhost:8080/dict";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) { }

  test():Observable<any> {
    const url = `${this.getWordsUrl}/test`;
    return this.http.get(url);
  }

  getWords(letters:String):Observable<any[]> {
    const url = `${this.getWordsUrl}/letters/${letters}`;
    return this.http.get<any[]>(url);
  }
}
