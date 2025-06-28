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
import { ConfirmDialogService } from 'src/app/shared/services/confirm-dialog.service';

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
    private toastService: ToastService,
    private confirmService: ConfirmDialogService
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

deleteTask(task: Task) {
  this.confirmService
    .confirm('Confirm Deletion', `Are you sure you want to delete task?`)
    .subscribe((confirmed) => {
      if (confirmed) {
         this.taskService.getProject(this.projectId).subscribe(
      (project: any) => {
        if (project && project.tasks) {
          // Remove the task from the tasks array
          const updatedTasks = project.tasks.filter(
            (t: any) => t.id !== task.id
          );
          project.tasks = updatedTasks;

          // Update the project with the modified tasks array
          this.taskService.updateProject(this.projectId, project).subscribe(
            () => {
              this.toastService.add(
                'Task successfully deleted.',
                2000,
                'success'
              );
              this.getProject(); // Refresh the project data
            },
            (error) => {
              this.toastService.add(
                'Failed to update project after task deletion.',
                2000,
                'error'
              );
            }
          );
        } else {
          this.toastService.add('Project or tasks not found!', 2000, 'error');
        }
      },
      (error) => {
        this.toastService.add(
          'Failed to fetch project for deletion!',
          2000,
          'error'
        );
      }
    );
      }
    });
   
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
      data: { mode: 'edit', projectId: this.projectId,id:task.id, task }
    });
    ref.afterClosed().subscribe(() => this.getProject());

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
