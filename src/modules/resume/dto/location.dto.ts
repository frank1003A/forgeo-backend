import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LocationDto {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsNotEmpty()
  @IsString()
  country: string;
}
