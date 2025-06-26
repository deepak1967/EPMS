import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
 private baseUrl = environment.jsonUrl;

  constructor(private http: HttpClient) { }

  getProjects(data:any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `projects?page=${data.page}&limit=${data.limit}`);
  }

  createProjects(project: any) {
    return this.http.post(this.baseUrl + `projects`, project);
  }

  updateProjects(project: any) {
    console.log(project);
    
    return this.http.put(this.baseUrl +`projects/${project.id}`, project);   // or PATCH
  }


  deleteProject(id: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `projects/${id}`);
  }
}
