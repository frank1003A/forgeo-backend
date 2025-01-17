import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './config/configuration';
import { ResumeController } from './modules/resume/resume.controller';
import { ResumeModule } from './modules/resume/resume.module';
import { ResumeService } from './modules/resume/resume.service';
import { SupabaseModule } from './modules/supabase/supabase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ResumeModule,
    SupabaseModule,
  ],
  controllers: [AppController, ResumeController],
  providers: [AppService, ResumeService],
})
export class AppModule {}
