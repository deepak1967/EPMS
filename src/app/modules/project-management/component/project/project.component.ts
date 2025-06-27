import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ProjectService } from '../../service/project.service';
import { Router } from '@angular/router';
import { AddProjectComponent } from '../add-project/add-project.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  projects: any = [];
  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate', 'status', 'actions', 'detail'];
  filteredProjects: any[] = [];
  pagedProjects: any[] = [];
  page: any = 1;
  limit: any = 20;
  totalItems: any


  constructor(
    private projectService: ProjectService,
    private sharedService: SharedService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.sharedService.setTitle('Project Management')

    this.getProjects();
  }

  getProjects() {
    const data = {
      limit: this.limit || 20,
      page: this.page || 1,
    }
    this.projectService.getProjects(data).subscribe((res: any) => {
      this.projects = res?.data ?? [];
      this.totalItems = res?.data?.length;
      this.filteredProjects = [...this.projects];
      this.page = 0;
      this.paginate()
    })
  }

  addProject(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '600px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed();
    this.getProjects();

  }

  editProject(user: any) {
    const ref = this.dialog.open(AddProjectComponent, {
      width: '600px',
      data: { mode: 'edit', user }
    });
    ref.afterClosed();
    this.getProjects();
  }


  detailProject(project: any) {
    this.router.navigate([`project/detail/${project?.id}`])
  }

  deleteProject(project: any) {
    this.projectService.deleteProject(project?.id).subscribe((res: any) => {
      console.log("project deleted successfully");
      this.getProjects();
    })
  }

  onFilterChanged(filtered: any[]): void {
    this.filteredProjects = filtered;
    this.totalItems = filtered.length;
    this.page = 0;
    this.paginate();
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.paginate();
  }

  paginate() {
    const start = this.page * this.limit;
    const end = start + this.limit;
    this.pagedProjects = this.filteredProjects.slice(start, end);
  }

}
