import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BoardsService } from './services/boards.service';
import { ColumnsService } from './services/columns.service';

@Component({
  selector: 'app-create-update-board',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-update-board.component.html',
  styleUrl: './create-update-board.component.scss'
})
export class CreateUpdateBoardComponent {
  boardName: string = '';
  columnName: string = '';
  isCreateBoard: boolean = false;
  isCreateColumn: boolean = false;
  boardId!: number;

  constructor(private router: Router, private boardsService: BoardsService,private route: ActivatedRoute,private columnsService: ColumnsService) {
    const url = this.router.url
    if(url.includes('column')){
      this.isCreateColumn = true
      this.route.params.subscribe(params => {
        this.boardId = params['boardId'];
      });
    }else{
      this.isCreateBoard = true
    }
  }

  createBoard() {
    if (this.boardName.trim()) {
      // Logic to save board can go here (e.g., API call)
      this.boardsService.createNewBoard(this.boardName)
      this.router.navigate(['/boards']);
    }
  }
  
  createColumn(){
    if(this.columnName.trim()){
      this.columnsService.createNewColumn(+this.boardId,this.columnName)
      this.router.navigate(['/boards',this.boardId]);
    }
  }

  cancel() {
    this.router.navigate(['/boards']);
  }
}
