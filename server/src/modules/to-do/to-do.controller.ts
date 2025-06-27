import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { Create } from './dtos';

@Controller('to-do')
export class ToDoController {
  constructor(private readonly service: ToDoService) {}

  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @Post(':id')
  async complete(@Param('id', ParseIntPipe) id: number) {
    return await this.service.complete(id);
  }

  @Post()
  async create(@Body() payload: Create) {
    return await this.service.create(payload);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.service.delete(id);
  }
}
