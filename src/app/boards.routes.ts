import { Routes } from '@angular/router';
import { BoardsViewComponent } from './boards-view.component';
import { BoardComponent } from './board.component';
import { TaskComponent } from './task.component';
import { CreateUpdateBoardComponent } from './create-update-board.component';

export const BOARD_ROUTES: Routes = [
  { path: '', component: BoardsViewComponent },
  { path: 'create', component: CreateUpdateBoardComponent },
  { path: ':boardId', component: BoardComponent },
  { path: ':boardId/task/:taskId', component: TaskComponent }
];
