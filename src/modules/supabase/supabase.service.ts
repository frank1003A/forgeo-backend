import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private clientInstance: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.clientInstance = createClient(
      this.configService.get<string>('supabase.url'),
      this.configService.get<string>('supabase.key'),
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      },
    );
  }

  getClient(token?: string): SupabaseClient {
    if (token) {
      return createClient(
        this.configService.get<string>('supabase.url'),
        this.configService.get<string>('supabase.key'),
        {
          global: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        },
      );
    }
    return this.clientInstance;
  }
}
