import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardsService } from './services/boards.service';
import { ColumnsService } from './services/columns.service';
import { Column } from '../models/column.model';
import { CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-board',
  imports: [CommonModule,DragDropModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit{
  boardId!: number;
  columns: any[] = []
  @ViewChildren(CdkDropList) dropListRefs!: QueryList<CdkDropList>;
  dropLists: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private columnsService: ColumnsService,private tasksService: TasksService) {
    this.route.params.subscribe(params => {
      this.boardId = params['boardId'];
    });
  }
  
  
  ngOnInit() {
    this.loadColumns();
  }
  
  async loadColumns() {
    this.columns = await this.columnsService.getColumns(this.boardId);
    this.dropLists = this.columns.map((column) => `${column.id}`);
  }
  

  // ngAfterViewInit() {
  //   // Collect all drop lists after view initialization
  //   this.dropLists = this.dropListRefs.toArray();
  // }

  openTask(taskId: number) {
    this.router.navigate(['/boards', this.boardId, 'task', taskId]);
  }

  async drop(event: CdkDragDrop<Task[]>) {
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      await this.tasksService.moveTaskToColumn(event.item.data.id,+event.container.id)
    }
  }
}
