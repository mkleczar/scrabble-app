import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})

export class SseService {

  constructor(private _zone: NgZone) {
  }

  private getWordsUrl = "http://localhost:8080/dict";


  getServerSentEvent(): Observable<any> {

    console.log("CALL FOR OBSERVER")
    const letters = "kamien";
    const url = `${this.getWordsUrl}/letters/${letters}`;
    return new Observable(observer => {
      const eventSource = SseService.getEventSource(url);
      eventSource.onmessage = event => {
        this._zone.run(() => {
          observer.next(event);
        });
      };
      eventSource.onerror = error => {
        this._zone.run(() => {
          observer.error(error);
        });
      };
      return () => eventSource.close();
    });
  }
  private static getEventSource(url: string): EventSource {
    return new EventSource(url);
  }
}
