/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Token } from 'src/common/decorators/token.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { SupabaseAuthGuard } from 'src/common/guards/supabase-auth.guard';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResumeService } from './resume.service';
@Controller('resumes')
@UseGuards(SupabaseAuthGuard)
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get()
  async findAll(@User() user) {
    try {
      return await this.resumeService.findAll(user.id);
    } catch (error) {
      throw new NotFoundException('Could not find resumes');
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @User() user) {
    try {
      const resume = await this.resumeService.findOne(user.id, id);
      if (!resume) {
        throw new NotFoundException(`Resume with ID ${id} not found`);
      }
      return resume;
    } catch (error) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }
  }

  @Post()
  async create(
    @Body()
    createResumeDto: CreateResumeDto,
    @User() user,
    @Token() token: string,
  ) {
    try {
      if (!user || !user.id) {
        throw new UnauthorizedException('User not authenticated');
      }
      return await this.resumeService.createFullResume(
        user.id,
        createResumeDto,
        token,
      );
    } catch (error) {
      throw new Error('Could not create resume');
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateResumeDto: UpdateResumeDto,
    @User() user,
    @Token() token: string,
  ) {
    try {
      const resume = await this.resumeService.update(
        user.id,
        id,
        updateResumeDto,
        token,
      );
      if (!resume) {
        throw new NotFoundException(`Resume with ID ${id} not found`);
      }
      return resume;
    } catch (error) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @User() user,
    @Token() token: string,
  ) {
    try {
      await this.resumeService.remove(user.id, id, token);
      return { message: `Resume with ID ${id} deleted successfully` };
    } catch (error) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }
  }
}
