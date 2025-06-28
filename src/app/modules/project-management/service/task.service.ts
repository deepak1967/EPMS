import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project, Task } from 'src/app/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = environment.jsonUrl;


  constructor(private http: HttpClient) { }

  getProject(projectId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}projects/${projectId}`);
  }

  updateProject(projectId: string, project: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}projects/${projectId}`,
      project
    );
  }

  createTask(projectId: any, task: any) {
    return this.http.post(this.baseUrl + `projects/${projectId}/tasks`, task);
  }

  updateTask(projectId: string, task: Task):Observable<Project> {
    return this.http.put<Project>(this.baseUrl + `projects/${projectId}/tasks/${task.id}`, task);   // or PATCH
  }

  deleteTask(projectId: any, taskId: any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `projects/${projectId}/tasks/${taskId}`);
  }
}
