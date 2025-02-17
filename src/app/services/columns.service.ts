import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { Column } from '../../models/column.model';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class ColumnsService {
  supabaseClient: SupabaseClient;
  tableName: string = 'columns';

  constructor(private supabaseService: SupabaseService) {
    this.supabaseClient = this.supabaseService.getClient();
  }

  async getColumns(boardId: number): Promise<Column[]> {
    try {
      const { data, error } = await this.supabaseClient
        .from(this.tableName)
        .select("*, tasks(*)")
        .eq('board_id', boardId);

      if (error) {
        console.error('Error fetching columns:', error.message);
        throw new Error('Failed to fetch columns. Please try again later.');
      }

      return data?.map((column: any) => new Column(column.id, column.name, column.tasks.map((task:any)=>new Task(task.id,task.name,task.description,task.current_index)) || [])) || [];
    } catch (err) {
      console.error('Unexpected error in getColumns:', err);
      throw new Error('An unexpected error occurred while fetching columns.');
    }
  }

  async createNewColumn(boardId: number, name: string): Promise<void> {
    try {
      const { error } = await this.supabaseClient
        .from(this.tableName)
        .insert([{ name, board_id: boardId }]);

      if (error) {
        console.error('Error creating new column:', error.message);
        throw new Error('Failed to create a new column. Please try again.');
      }
    } catch (err) {
      console.error('Unexpected error in createNewColumn:', err);
      throw new Error('An unexpected error occurred while creating a column.');
    }
  }
}
