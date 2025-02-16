import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Board } from '../../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  supabaseClient: SupabaseClient;
  tableName: string = 'boards';

  constructor(private supabaseService: SupabaseService) {
    this.supabaseClient = this.supabaseService.getClient();
  }

  async getBoards(): Promise<Board[]> {
    try {
      const { data, error } = await this.supabaseClient.from(this.tableName).select('*');
      
      if (error) {
        console.error('Error fetching boards:', error.message);
        throw new Error('Failed to fetch boards. Please try again later.');
      }

      return data?.map((board: any) => new Board(board.id, board.name)) || [];
    } catch (err) {
      console.error('Unexpected error in getBoards:', err);
      throw new Error('An unexpected error occurred while fetching boards.');
    }
  }

  async createNewBoard(name: string): Promise<void> {
    try {
      const { error } = await this.supabaseClient.from(this.tableName).insert([{ name }]);
      
      if (error) {
        console.error('Error creating new board:', error.message);
        throw new Error('Failed to create a new board. Please try again.');
      }
    } catch (err) {
      console.error('Unexpected error in createNewBoard:', err);
      throw new Error('An unexpected error occurred while creating a board.');
    }
  }
}
