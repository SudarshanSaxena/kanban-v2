import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseUrl = 'https://iozfoyekuejzswosydjf.supabase.co/';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvemZveWVrdWVqenN3b3N5ZGpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1Njc4ODQsImV4cCI6MjA1NTE0Mzg4NH0.EtvaF5JJYKT0TdhL3Me10MsGtSdwtY9f6NM0e-dntuM';
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}
