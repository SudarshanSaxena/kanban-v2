import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardsService } from './services/boards.service';
import { Board } from '../models/board.model';

@Component({
  selector: 'app-boards-view',
  templateUrl: './boards-view.component.html',
  styleUrls: ['./boards-view.component.scss'], // Fixed 'styleUrl' to 'styleUrls'
})
export class BoardsViewComponent implements OnInit {
  boards: Board[] = [];

  constructor(private router: Router, private boardsService: BoardsService) {}

  async ngOnInit() {
    try {
      this.boards = await this.boardsService.getBoards();
    } catch (error) {
      console.error('Error fetching boards:', error);
      // Handle error (e.g., show a message to the user)
    }
  }

  openBoard(boardId: number, boardName: string) {
    this.router.navigate(['/boards', boardId], { state: { boardName } });
  }

  navigateToCreateBoard() {
    this.router.navigate(['/boards/create']);
  }
}
