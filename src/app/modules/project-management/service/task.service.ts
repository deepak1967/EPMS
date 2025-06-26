import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = environment.jsonUrl;


  constructor(private http: HttpClient) { }

  createTask(projectId: any, task: any) {
    return this.http.post(this.baseUrl + `projects/${projectId}/tasks`, task);
  }

  updateTask(projectId: any, task: any) {
    return this.http.put(this.baseUrl + `projects/${projectId}/tasks/${task.id}`, task);   // or PATCH
  }

  deleteTask(projectId: any, taskId: any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `projects/${projectId}/tasks/${taskId}`);
  }
}
