import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnsService } from './services/columns.service';
import { CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';
import { TasksService } from './services/tasks.service';
import { Column } from '../models/column.model';

@Component({
  selector: 'app-board',
  standalone: true, // Added for modularity
  imports: [CommonModule, DragDropModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'], // Fixed 'styleUrl' to 'styleUrls'
})
export class BoardComponent implements OnInit {
  boardId!: number;
  columns: Column[] = [];
  boardName: string = ''; // Initialized to avoid undefined
  @ViewChildren(CdkDropList) dropListRefs!: QueryList<CdkDropList>;
  dropLists: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private columnsService: ColumnsService,
    private tasksService: TasksService
  ) {
    this.route.params.subscribe(params => {
      this.boardId = +params['boardId']; // Ensure number conversion
    });

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['boardName']) {
      this.boardName = navigation.extras.state['boardName'];
    }
  }

  async ngOnInit() {
    await this.loadColumns();
  }

  async loadColumns() {
    try {
      this.columns = await this.columnsService.getColumns(this.boardId);
      this.columns.forEach((column: Column)=>
        column.tasks.sort((a:Task,b:Task)=>a.currentIndex-b.currentIndex)
      )
      if (!this.columns.length) {
        console.warn(`No columns found for board ID: ${this.boardId}`);
      }
      this.dropLists = this.columns.map(column => `${column.id}`);
    } catch (error) {
      console.error('Error loading columns:', error);
    }
  }

  openTask(taskId: number) {
    this.router.navigate(['/boards', this.boardId, 'task', taskId]);
  }

  async drop(event: CdkDragDrop<Task[]>) {
    try {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        await this.tasksService.moveTaskToColumn(event.item.data.id, +event.container.id,event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        await this.tasksService.moveTaskToColumn(event.item.data.id, +event.container.id,event.currentIndex);
      }
    } catch (error) {
      console.error('Error moving task:', error);
    }
  }

  addTaskToColumn(columnId: number) {
    this.router.navigate(['/boards', this.boardId, columnId, 'create']);
  }

  navigateToCreateNewColumn() {
    this.router.navigate(['/boards', this.boardId, 'column', 'create']);
  }
}
