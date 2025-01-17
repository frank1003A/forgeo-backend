import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';
import { Resume } from './entities/resume.entity';

@Injectable()
export class ResumeService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createFullResume(
    userId: string,
    data: Partial<Resume>,
    token: string,
  ): Promise<Resume> {
    try {
      const supabase = this.supabaseService.getClient(token);

      const formattedData = this.formatResumeData(userId, data);
      const { education, experience, skills, projects, ...mainResumeData } =
        formattedData;

      const resume = await this.insertResume(mainResumeData, supabase);

      await this.insertRelatedData(
        resume.id,
        {
          education,
          experience,
          skills,
          projects,
        },
        supabase,
      );

      return resume;
    } catch (error) {
      console.error('Error creating resume:', error);
      throw error;
    }
  }
  async findAll(userId: string) {
    const supabase = this.supabaseService.getClient();
    const { data: resumes, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Supabase query error:', error.message);
      throw new NotFoundException('Could not find resumes');
    }

    return resumes;
  }

  async findOne(userId: string, id: number) {
    const supabase = this.supabaseService.getClient();
    const { data: resume, error } = await supabase
      .from('resumes')
      .select(
        `
        *,
        experience (*),
        education (*),
        skills (*),
        projects(*),
        certifications(*),
        awards(*)
      `,
      )
      .eq('user_id', userId)
      .eq('id', id)
      .single();

    if (error) throw error;
    return resume;
  }

  async update(
    userId: string,
    id: number,
    data: Partial<Resume>,
    token: string,
  ) {
    const supabase = this.supabaseService.getClient(token);
    const { data: resume, error } = await supabase
      .from('resumes')
      .update(data)
      .eq('user_id', userId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return resume;
  }

  async remove(userId: string, id: number, token: string) {
    const supabase = this.supabaseService.getClient(token);
    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('user_id', userId)
      .eq('id', id);

    if (error) throw error;
    return { id };
  }

  /** HELPER FUNCTIONS */
  private formatResumeData(
    userId: string,
    data: Partial<Resume>,
  ): Partial<Resume> {
    return {
      ...data,
      user_id: userId,
      status: data.status || 'draft',
      version: 1,
      contact:
        data.contact && typeof data.contact === 'object'
          ? data.contact
          : ({
              email: '',
              location: '',
              github: '',
              linkedin: '',
              phone: '',
              portfolio: '',
            } as any),
      styling_preferences:
        data.styling_preferences && typeof data.styling_preferences === 'object'
          ? data.styling_preferences
          : { template: 'default' },
      keywords: Array.isArray(data.keywords) ? data.keywords : [],
      industry_focus: Array.isArray(data.industry_focus)
        ? data.industry_focus
        : [],
      job_titles_targeted: Array.isArray(data.job_titles_targeted)
        ? data.job_titles_targeted
        : [],
    };
  }

  private async insertResume(
    resumeData: any,
    client: SupabaseClient,
  ): Promise<Resume> {
    const { data: resume, error } = await client
      .from('resumes')
      .insert({ ...resumeData })
      .select()
      .single();

    if (error) {
      console.error('Failed to insert resume:', error);
      throw new Error(`Resume insertion failed: ${error.message}`);
    }
    return resume;
  }

  private async insertRelatedData(
    resumeId: number,
    relatedData: Record<string, any[]>,
    client: SupabaseClient,
  ): Promise<void> {
    const { education, experience, skills, projects } = relatedData;

    const insertIntoTable = async (
      tableName: string,
      records: any[],
    ): Promise<void> => {
      if (!records?.length) return;

      const { error } = await client
        .from(tableName)
        .insert(records.map((record) => ({ ...record, resume_id: resumeId })));

      if (error) {
        console.error(`Failed to insert into ${tableName}:`, error);
        throw new Error(`${tableName} insertion failed: ${error.message}`);
      }
    };

    await insertIntoTable('education', education);
    await insertIntoTable('experience', experience);
    await insertIntoTable('skills', skills);
    await insertIntoTable('projects', projects);
  }
}
