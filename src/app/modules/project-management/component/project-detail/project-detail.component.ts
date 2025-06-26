import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { ProjectService } from '../../service/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent {
  project: any = {};
  projectId: string = '';

  constructor(
    private sharedService: SharedService,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute
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
      limit: 10,
      page: 1,
    }
    this.projectService.getProjects(data).subscribe((res: any) => {
      const projects = res?.data;
      const id = +this.projectId
      this.project = projects.find((el: any) => el.id == id);
    })
  }

}
