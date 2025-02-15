import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tableName: string = 'tasks'
  supabaseClient: SupabaseClient

  constructor(private subabaseService: SupabaseService) {
    this.supabaseClient = this.subabaseService.getClient()
  }

  async moveTaskToColumn(taskId: number, columnId: number) {
    const movedTo = (await this.supabaseClient.from(this.tableName).update([{'column_id':columnId}]).eq('id',taskId)).data
    console.log(movedTo)

  }

}