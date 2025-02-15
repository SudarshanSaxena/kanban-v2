import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Board } from '../../models/board.model';


@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  supabaseClient: SupabaseClient
  tableName:string = 'boards'

  constructor(private subabaseService: SupabaseService) {
    this.supabaseClient = this.subabaseService.getClient()
   }

  async getBoards(): Promise<Board[]>{

    // Get the boards
    const boards = (await this.supabaseClient.from(this.tableName).select('*')).data

    // Translate the boards to model
    const allBoards: Board[] = []
    boards?.forEach((board:any)=>{
      const newBoard = new Board(board.id,board.name)
      allBoards.push(newBoard)
    })

    // Return the boards
    return allBoards

  }

  async createNewBoard(name: string){
    const newBoard = await this.supabaseClient.from(this.tableName).insert([{'name':name}])
  }
}
