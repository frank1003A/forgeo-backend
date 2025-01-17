import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { LocationDto } from './location.dto';

export class ContactDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsUrl()
  linkedin?: string;

  @IsOptional()
  @IsUrl()
  github?: string;

  @IsOptional()
  @IsUrl()
  portfolio?: string;

  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;
}

export class EducationDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsNotEmpty()
  @IsString()
  institution: string;

  @IsNotEmpty()
  @IsString()
  degree: string;

  @IsNotEmpty()
  @IsString()
  field: string;

  @IsNotEmpty()
  @IsDateString()
  start_date: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(4)
  gpa?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  achievements?: string[];

  @IsOptional()
  @IsString()
  location?: string;
}

export class ExperienceDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  @IsDateString()
  start_date: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  description: string[];

  @IsArray()
  @IsString({ each: true })
  skills_used: string[];

  @IsArray()
  @IsString({ each: true })
  achievements: string[];
}

export class SkillDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsOptional()
  @IsEnum(['Beginner', 'Intermediate', 'Advanced', 'Expert'])
  proficiency_level?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  years_experience?: number;
}

export class ProjectDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  technologies: string[];

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  highlights: string[];
}

export class StylingPreferencesDto {
  @IsNotEmpty()
  @IsString()
  template: string;

  @IsOptional()
  @IsString()
  color_scheme?: string;

  @IsOptional()
  @IsString()
  font_family?: string;
}

export class CreateResumeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  full_name: string;

  @IsNotEmpty()
  @IsString()
  professional_summary: string;

  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education?: EducationDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experience?: ExperienceDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDto)
  skills?: SkillDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectDto)
  projects?: ProjectDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => StylingPreferencesDto)
  styling_preferences?: StylingPreferencesDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  industry_focus?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  job_titles_targeted?: string[];
}
