import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { FramesService } from './frames.service';
import { CreateFrameDto } from './dto/create-frame.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('frames')
export class FramesController {

    constructor(private framesService: FramesService) {}

    @Post()
    async create(
      @Body() createFrameDto: CreateFrameDto,
      @Res() response: Response,
      @Req() request: Request
    ) {
      try {
        createFrameDto.account_id = request.user['_id'];
        const createdUser = await this.framesService.create(createFrameDto);
        response.send(createdUser);
      } catch (err) {
        console.error(`Error: ${err.message}`);
      }
    }

    @Get()
    async findAll(@Req() request: Request) {
      return this.framesService.findAll(request.user['_id']);
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
      return this.framesService.findById(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: any) {
      return this.framesService.update(id, body);
    }

    @Put(':id/config')
    async updateConfig(@Param('id') id: string, @Body() body: any) {
      return this.framesService.updateConfig(id, body);
    }

    @Put(':id/filters')
    async updateFilters(@Param('id') id: string, @Body() body: any) {
      return this.framesService.updateFilters(id, body);
    }


    @Delete(':id')
    async delete(@Param('id') id: string) {
      return this.framesService.delete(id);
    }
}
