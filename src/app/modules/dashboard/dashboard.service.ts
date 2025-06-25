import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  private baseUrl = environment.jsonUrl;

  constructor(private http: HttpClient) {}

  getKpiData(): Observable<any> {
    return this.http.get<any>(this.baseUrl + `dashboardData`);
  }
}
