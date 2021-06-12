import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    try {
      const createdUser = await this.usersService.create(createUserDto);
      response.send(createdUser);
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() newUser: unknown) {
    return this.usersService.updateById(id, newUser);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
