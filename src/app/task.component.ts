import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-task',
  imports: [CommonModule,FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  taskId!: number;
  boardId!: number;
  taskName!: string;
  isCreateMode: boolean = false;
  columnId!: number;
  taskDescription!: string;

  constructor(private router: Router,private route: ActivatedRoute,private tasksService: TasksService) {
    const url = this.router.url
    if(url.includes('create')){
      this.isCreateMode = true
      this.route.params.subscribe(params => {
        this.columnId = params['columnId'];
        this.boardId = params['boardId'];
      });
      
    }else{
      this.route.params.subscribe(params => {
        this.boardId = params['boardId'];
        this.taskId = params['taskId'];
      });
    }
  }
  ngOnInit() {
      this.loadTask()
  }

  async loadTask(){
    if(!this.isCreateMode){
      const task = await this.tasksService.getTaskById(this.taskId)
      this.taskName = task.name
      this.taskDescription = task.description
    }
  }

  async updateTask(){
    const payload = {
      'name':this.taskName,
      'description': this.taskDescription
    }
    this.tasksService.updateTask(this.taskId,payload)
    this.router.navigate(['/boards', this.boardId]);
  }

  cancel() {
    this.router.navigate(['/boards', this.boardId]);
  }
  
  async deleteTask(){
    await this.tasksService.deleteTask(this.taskId)
    this.router.navigate(['/boards', this.boardId]);
  }
  
  async addTaskToColumn(){
    const payload = {
      'name':this.taskName,
      'description': this.taskDescription,
      'column_id':this.columnId
    }
    await this.tasksService.addTaskToColumn(payload)
    this.router.navigate(['/boards', this.boardId]);
  }
  
}
