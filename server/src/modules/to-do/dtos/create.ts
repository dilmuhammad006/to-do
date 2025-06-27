import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class Create {
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'salom dunyo',
  })
  @IsString()
  title: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'Hello world!',
  })
  content: string;
}
