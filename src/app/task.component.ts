import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  taskId!: number;
  boardId!: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.boardId = params['boardId'];
      this.taskId = params['taskId'];
    });
  }
}
