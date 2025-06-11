import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {StatisticsResponse} from '../model/statisticsResponse.model';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private URL = `${environment.apiUrl}/admin/statistics`;

  constructor(private _http: HttpClient) { }

  getStatistics():Observable<StatisticsResponse> {
    this._http.get(this.URL);
    return this._http.get<StatisticsResponse>(this.URL);
  }
}
