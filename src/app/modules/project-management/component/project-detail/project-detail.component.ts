import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { ProjectService } from '../../service/project.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { TaskService } from '../../service/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent {
  project: any = {};
  projectId: string = '';

  tasks: any = [];
  displayedColumns: string[] = ['id', 'title', 'priority', 'status', 'dueDate', 'actions'];
  filteredTasks: any[] = [];
  pagedTasks: any[] = [];
  page: any = 1;
  limit: any = 20;
  totalItems: any

  constructor(
    private sharedService: SharedService,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.sharedService.setTitle('Project Detail');
    this.activatedRoute.params.subscribe((params: any) => {
      this.projectId = params.id
    });
    this.getProjects();
  }

  getProjects() {
    const data = {
      limit: this.limit || 20,
      page: this.page || 1,
    }
    this.projectService.getProjects(data).subscribe((res: any) => {
      const projects = res?.data;
      const id = +this.projectId
      this.project = projects.find((el: any) => el.id == id);
      this.tasks = this.project?.tasks ?? [];
      this.totalItems = this.tasks?.length;
      this.filteredTasks = [...this.tasks];
      this.page = 0;
      this.paginate()
    })
  }

  addTask(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '600px',
      data: { mode: 'add', projectId: this.projectId }
    });

    dialogRef.afterClosed();
    this.getProjects();

  }

  editTask(task: any) {
    const ref = this.dialog.open(AddTaskComponent, {
      width: '600px',
      data: { mode: 'edit', projectId: this.projectId, task }
    });
    ref.afterClosed();
    this.getProjects();
  }

  deleteTask(task: any) {
    this.taskService.deleteTask(this.projectId, task?.id).subscribe((res: any) => {
      console.log("task deleted successfully");
      this.getProjects();
    })
  }

  onFilterChanged(filtered: any[]): void {
    this.filteredTasks = filtered;
    this.totalItems = filtered.length;
    this.page = 0;
    this.paginate();
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.paginate();
  }

  applySort(sortedData: any) {
    this.filteredTasks = sortedData;
  }

  paginate() {
    const start = this.page * this.limit;
    const end = start + this.limit;
    this.pagedTasks = this.filteredTasks.slice(start, end);
  }



}
