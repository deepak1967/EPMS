import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = environment.jsonUrl;

  constructor(private http: HttpClient) { }

  getProjects(data: any): Observable<Project> {
    return this.http.get<Project>(this.baseUrl + `projects?page=${data.page}&limit=${data.limit}`);
  }

  createProjects(project: Project) {
    return this.http.post(this.baseUrl + `projects`, project);
  }

  updateProjects(project: Project) {
    console.log(project);

    return this.http.put(this.baseUrl + `projects/${project.id}`, project);   // or PATCH
  }


  deleteProject(id: string): Observable<Project> {
    return this.http.delete<Project>(this.baseUrl + `projects/${id}`);
  }
}
