import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardsService } from './services/boards.service';
import { Board } from '../models/board.model';

@Component({
  selector: 'app-boards-view',
  imports: [],
  templateUrl: './boards-view.component.html',
  styleUrl: './boards-view.component.scss'
})
export class BoardsViewComponent implements OnInit {
  boards: Board[] = []

  constructor(private router: Router,private boardsService: BoardsService) {}

  async ngOnInit() {
    const boards = await this.boardsService.getBoards()
    // this.boards = boards
    this.boards = boards
  }

  openBoard(boardId: number,boardName:string) {
    this.router.navigate(['/boards', boardId],{state:{boardName: boardName}});
  }

  navigateToCreateBoard() {
    this.router.navigate(['/boards/create']);
  }
}
