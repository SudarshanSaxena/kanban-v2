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
    (await this.supabaseClient.from(this.tableName).update([{ 'column_id': columnId }]).eq('id', taskId)).data
  }

  async getTaskById(taskId: number){
    const task = (await (this.supabaseClient.from(this.tableName).select('*').eq('id',taskId))).data
    if(task?.length){
      return task[0]
    }
  }

  async updateTask(taskId: number, payload: any){
    (await this.supabaseClient.from(this.tableName).update([payload]).eq('id',taskId)).data
  }

  async deleteTask(taskId: number){
    (await this.supabaseClient.from(this.tableName).delete().eq('id',taskId)).data
  }

  async addTaskToColumn(payload: any){
    (await this.supabaseClient.from(this.tableName).insert([payload])).data
  }
}