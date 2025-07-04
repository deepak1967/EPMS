import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../service/task.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  taskForm: FormGroup;
  mode: string = '';
  title: string = 'Add New Task'

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddTaskComponent>,
    private taskService: TaskService,
    private toastService: ToastService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      dueDate: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.data.mode === 'edit') {
      this.title = 'Edit Task'
      this.taskForm.patchValue(this.data?.task);
    }

  }

  save(): void {
    if (!this.taskForm.valid) return;

    const taskData = this.taskForm.value;

    if (this.data.mode === 'add') {
      this.taskService.getProject(this.data.projectId).subscribe((project: any) => {
        if (!project.tasks) {
          project.tasks = [];
        }
        taskData.id = project.tasks.length + 1;
        project.tasks.push(taskData);

        this.taskService.updateProject(this.data.projectId, project).subscribe(() => {
          this.toastService.add('Task successfully added.', 2000, "success");
          this.dialogRef.close();
        }, (error) => {
          this.toastService.add('Something went wrong!', 2000, "error");
        });
      }, (error) => {
        this.toastService.add('Failed to fetch project!', 2000, "error");
      });
    } else {
      console.log(this.data.id);

      this.taskService.getProject(this.data.projectId).subscribe((project: any) => {
        const taskIndex = project.tasks.findIndex((t: any) => t.id === this.data.id);
        if (taskIndex !== -1) {
          project.tasks[taskIndex] = { ...project.tasks[taskIndex], ...taskData };

          this.taskService.updateProject(this.data.projectId, project).subscribe(() => {
            this.toastService.add('Task successfully updated.', 2000, "success");
            this.dialogRef.close();
          }, (error) => {
            this.toastService.add('Something went wrong!', 2000, "error");
          });
        } else {
          this.toastService.add('Task not found!', 2000, "error");
        }
      }, (error) => {
        this.toastService.add('Failed to fetch project!', 2000, "error");
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
