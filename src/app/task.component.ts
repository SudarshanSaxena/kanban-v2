import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-task',
  standalone: true, // Added standalone as `imports` is used
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'], // Fixed 'styleUrl' to 'styleUrls'
})
export class TaskComponent implements OnInit {
  taskId!: number;
  boardId!: number;
  taskName: string = '';
  isCreateMode: boolean = false;
  columnId!: number;
  taskDescription: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tasksService: TasksService
  ) {
    const url = this.router.url;
    this.route.params.subscribe(params => {
      this.boardId = +params['boardId']; // Ensure number conversion

      if (url.includes('create')) {
        this.isCreateMode = true;
        this.columnId = +params['columnId'];
      } else {
        this.taskId = +params['taskId'];
      }
    });
  }

  async ngOnInit() {
    if (!this.isCreateMode) {
      await this.loadTask();
    }
  }

  async loadTask() {
    try {
      const task = await this.tasksService.getTaskById(this.taskId);
      if (task) {
        this.taskName = task.name;
        this.taskDescription = task.description;
      } else {
        console.warn(`Task with ID ${this.taskId} not found.`);
      }
    } catch (error) {
      console.error('Error loading task:', error);
    }
  }

  async updateTask() {
    try {
      const payload = {
        name: this.taskName,
        description: this.taskDescription,
      };
      await this.tasksService.updateTask(this.taskId, payload);
      this.router.navigate(['/boards', this.boardId]);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  cancel() {
    this.router.navigate(['/boards', this.boardId]);
  }

  async deleteTask() {
    try {
      await this.tasksService.deleteTask(this.taskId);
      this.router.navigate(['/boards', this.boardId]);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  async addTaskToColumn() {
    try {
      const payload = {
        name: this.taskName,
        description: this.taskDescription,
        column_id: this.columnId,
      };
      await this.tasksService.addTaskToColumn(payload);
      this.router.navigate(['/boards', this.boardId]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }
}
