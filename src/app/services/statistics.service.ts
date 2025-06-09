import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {StatisticsResponse} from '../model/statisticsResponse.model';
import {HttpClient} from '@angular/common/http';

@Injectable(
  {
    providedIn: 'root'
  })
export class StatisticsService {
  URL = 'http://localhost:8081/api/admin/statistics';

  constructor(private _http: HttpClient) { }

  getStatistics():Observable<StatisticsResponse> {
    this._http.get(this.URL);
    return this._http.get<StatisticsResponse>(this.URL);
  }
}
