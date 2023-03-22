import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipient} from '@models/address/address.model';
import {environment} from '@environment*';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipientService {

  constructor(private http: HttpClient) {
  }

  mergeRecipients(recipientsToMerge: Recipient[]): Observable<boolean> {
    const listId = [];

    const firstId = recipientsToMerge[0].ziel_name_id;
    for (let i = 1; i < recipientsToMerge.length; i++) {
      listId.push(recipientsToMerge[i].ziel_name_id);
    }

    const requestBody = {
      ziel_name_id: firstId,
      liste_von_ziel_name_id: listId
    };

    return this.http.post<boolean>(`${environment.apiHost}/ziele/mehrere_vereinigen`, requestBody);
  }

  deleteRecipient(recipientId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiHost}/ziele/${recipientId}`);
  }
}
