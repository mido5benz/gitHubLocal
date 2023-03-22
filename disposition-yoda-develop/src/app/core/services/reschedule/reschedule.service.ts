import {Injectable, NgZone} from '@angular/core';
import {SseService} from '@app/core/services/sse/sse.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RescheduleService {

  public emptyTour = new BehaviorSubject(null);


  constructor(private zone: NgZone, private sseService: SseService) {
  }

  public tourIsEmpty(toggle: boolean) {
    this.emptyTour.next(toggle);
  }

  getRescheduleChangedEvents(url: string) {
    return Observable.create(observer => {
      const eventSource = this.sseService.getEventSource(url);

      eventSource.onmessage = event => {
        this.zone.run(() => {
          observer.next(event);
        });
      };

      eventSource.onerror = error => {
        this.zone.run(() => {
          observer.error(error);
        });
      };
    });
  }
}
