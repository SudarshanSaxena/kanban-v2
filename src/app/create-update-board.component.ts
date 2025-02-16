import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardsService } from './services/boards.service';
import { ColumnsService } from './services/columns.service';

@Component({
  selector: 'app-create-update-board',
  standalone: true, // Improves modularity
  imports: [CommonModule, FormsModule],
  templateUrl: './create-update-board.component.html',
  styleUrls: ['./create-update-board.component.scss'], // Fixed 'styleUrl' to 'styleUrls'
})
export class CreateUpdateBoardComponent {
  boardName: string = '';
  columnName: string = '';
  isCreateBoard: boolean = false;
  isCreateColumn: boolean = false;
  boardId!: number;

  constructor(
    private router: Router,
    private boardsService: BoardsService,
    private route: ActivatedRoute,
    private columnsService: ColumnsService
  ) {
    this.route.params.subscribe(params => {
      if (this.router.url.includes('column')) {
        this.isCreateColumn = true;
        this.boardId = +params['boardId']; // Ensures number conversion
      } else {
        this.isCreateBoard = true;
      }
    });
  }

  async createBoard() {
    if (this.boardName.trim()) {
      try {
        await this.boardsService.createNewBoard(this.boardName);
        this.router.navigate(['/boards']);
      } catch (error) {
        console.error('Error creating board:', error);
      }
    }
  }

  async createColumn() {
    if (this.columnName.trim()) {
      try {
        await this.columnsService.createNewColumn(this.boardId, this.columnName);
        this.router.navigate(['/boards', this.boardId]);
      } catch (error) {
        console.error('Error creating column:', error);
      }
    }
  }

  cancel() {
    this.router.navigate(['/boards']);
  }
}
