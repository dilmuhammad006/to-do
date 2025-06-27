import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { ToDoService } from './to-do.service';
import { ToDoController } from './to-do.controller';

@Module({
  providers: [PrismaService, ToDoService],
  controllers: [ToDoController],
})
export class ToDoModule {}
