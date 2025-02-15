import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { Column } from '../../models/column.model';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class ColumnsService {

  supabaseClient: SupabaseClient
  tableName: string = 'columns'

  constructor(private subabaseService: SupabaseService) {
    this.supabaseClient = this.subabaseService.getClient()
  }

  async getColumns(boardId: number): Promise<Column[]> {

    // Get the columns for a board
    const columns = (await this.supabaseClient.from(this.tableName).select("*,tasks(*)").eq('board_id', boardId)).data

    // Translate the columns to model
    const allRelatedColumns: Column[] = []
    columns?.forEach((column: Column) => {
      allRelatedColumns.push(column)
    })

    // Return the boards
    return allRelatedColumns

  }

  async createNewColumn(name: string) {
    const newBoard = await this.supabaseClient.from(this.tableName).insert([{ 'name': name }])
  }
}
