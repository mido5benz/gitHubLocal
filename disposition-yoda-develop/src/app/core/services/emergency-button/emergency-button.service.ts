import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@environment*';

@Injectable({
  providedIn: 'root',
})
export class EmergencyButtonService {
  constructor(private http: HttpClient) {
  }

  releaseAllTours(tourList: any) {
    const tours = tourList.map(tour => tour.tour.tour_id);
    const url = `${environment.apiHost}/anfrage_stoppreihenfolge/notfallfreigaben`;
    return this.http.post(url, tours).subscribe((result) => {
    });
  }

  releaseSelectedTours(tourList: any) {
    const url = `${environment.apiHost}/anfrage_stoppreihenfolge/notfallfreigaben`;
    return this.http.post(url, tourList).subscribe((result) => {
    });
  }
}
