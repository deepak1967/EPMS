import { Component, TrackByFunction } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ProjectService } from '../../service/project.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { TaskService } from '../../service/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Project, Task } from 'src/app/interface';

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
  filteredTasks: Task[] = [];
  pagedTasks: Task[] = [];
  page: number = 1;
  limit: number = 20;
  totalItems: any

  trackBy: TrackByFunction<any> = (index: number, item: any) => item.id ?? index;


  constructor(
    private sharedService: SharedService,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private dialog: MatDialog,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.sharedService.setTitle('Project Detail');
    this.activatedRoute.params.subscribe((params: any) => {
      this.projectId = params.id
    });
    this.getProject();
  }

  getProject() {
    const data = {
      limit: this.limit || 20,
      page: this.page || 1,
    }
    this.projectService.getProjects(data).subscribe((res: any) => {
      const projects = res;
      const id = this.projectId
      this.project = projects.find((el: Project) => el.id == id);
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
    dialogRef.afterClosed().subscribe(() => this.getProject());
  }

  editTask(task: Task) {
    const ref = this.dialog.open(AddTaskComponent, {
      width: '600px',
      data: { mode: 'edit', projectId: this.projectId, task }
    });
    ref.afterClosed().subscribe(() => this.getProject());

  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(this.projectId, task?.id).subscribe((res: Task) => {
      if (res) {
        this.toastService.add('Task successfully deleted.', 2000, "success");
        this.getProject()
      }
    }, (error) => {
      this.toastService.add('Something went wrong!', 2000, "error");
    });
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
