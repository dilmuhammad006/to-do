import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { Create } from './dtos';

@Injectable()
export class ToDoService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const todo = await this.prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      todo,
    };
  }

  async complete(id: number) {
    const founded = await this.prisma.todo.findFirst({ where: { id } });

    if (!founded) {
      throw new NotFoundException('Content not found');
    }
    await this.prisma.todo.delete({ where: { id } });
    return {
      message: 'success',
    };
  }

  async create(payload: Create) {
    const todo = await this.prisma.todo.create({
      data: {
        title: payload.title,
        content: payload.content,
      },
    });

    return {
      todo,
    };
  }
}
