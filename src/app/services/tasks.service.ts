import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tableName: string = 'tasks';
  supabaseClient: SupabaseClient;

  constructor(private supabaseService: SupabaseService) {
    this.supabaseClient = this.supabaseService.getClient();
  }

  async moveTaskToColumn(taskId: number, columnId: number,currentIndex:number): Promise<void> {
    try {
      const { error } = await this.supabaseClient
        .from(this.tableName)
        .update({ column_id: columnId, current_index: currentIndex})
        .eq('id', taskId);

      if (error) {
        console.error('Error moving task:', error.message);
        throw new Error('Failed to move the task. Please try again.');
      }
    } catch (err) {
      console.error('Unexpected error in moveTaskToColumn:', err);
      throw new Error('An unexpected error occurred while moving the task.');
    }
  }

  async getTaskById(taskId: number): Promise<Task | null> {
    try {
      const { data, error } = await this.supabaseClient
        .from(this.tableName)
        .select('*')
        .eq('id', taskId)
        .single();

      if (error) {
        console.error('Error fetching task:', error.message);
        throw new Error('Failed to fetch the task. Please try again.');
      }
      console.log('task data',data)
      return data || null;
    } catch (err) {
      console.error('Unexpected error in getTaskById:', err);
      throw new Error('An unexpected error occurred while fetching the task.');
    }
  }

  async updateTask(taskId: number, payload: any): Promise<void> {
    try {
      const { error } = await this.supabaseClient
        .from(this.tableName)
        .update(payload)
        .eq('id', taskId);

      if (error) {
        console.error('Error updating task:', error.message);
        throw new Error('Failed to update the task. Please try again.');
      }
    } catch (err) {
      console.error('Unexpected error in updateTask:', err);
      throw new Error('An unexpected error occurred while updating the task.');
    }
  }

  async deleteTask(taskId: number): Promise<void> {
    try {
      const { error } = await this.supabaseClient
        .from(this.tableName)
        .delete()
        .eq('id', taskId);

      if (error) {
        console.error('Error deleting task:', error.message);
        throw new Error('Failed to delete the task. Please try again.');
      }
    } catch (err) {
      console.error('Unexpected error in deleteTask:', err);
      throw new Error('An unexpected error occurred while deleting the task.');
    }
  }

  async addTaskToColumn(payload: any): Promise<void> {
    try {
      const { error } = await this.supabaseClient
        .from(this.tableName)
        .insert([payload]);

      if (error) {
        console.error('Error adding task:', error.message);
        throw new Error('Failed to add the task. Please try again.');
      }
    } catch (err) {
      console.error('Unexpected error in addTaskToColumn:', err);
      throw new Error('An unexpected error occurred while adding the task.');
    }
  }
}
