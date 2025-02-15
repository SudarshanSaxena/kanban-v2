import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BoardsService } from './services/boards.service';

@Component({
  selector: 'app-create-update-board',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-update-board.component.html',
  styleUrl: './create-update-board.component.scss'
})
export class CreateUpdateBoardComponent {
  boardName: string = '';

  constructor(private router: Router, private boardsService: BoardsService) {}

  createBoard() {
    if (this.boardName.trim()) {
      // Logic to save board can go here (e.g., API call)
      this.boardsService.createNewBoard(this.boardName)
      this.router.navigate(['/boards']);
    }
  }

  cancel() {
    this.router.navigate(['/boards']);
  }
}
