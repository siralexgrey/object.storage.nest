import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FramesService } from 'src/frames/frames.service';
import { InstancesService } from './instances.service';

@UseGuards(JwtAuthGuard)
@Controller('instances')
export class InstancesController {
    constructor(private instancesService: InstancesService, private framesService: FramesService, @InjectConnection() private connection: Connection) {}

    @Post(':frame_id')
    async create(@Param('frame_id') frame_id: string, @Body() createdInstanceDto: any, @Res() response: Response) {
        const createdInstance = await this.instancesService.create(frame_id, createdInstanceDto);
        response.send(createdInstance);
    }

    @Get(':frame_id')
    async findAll(@Param('frame_id') frame_id: string) {
        return this.instancesService.findAll(frame_id);
    }

    @Get(':frame_id/:id')
    async findById(@Param('frame_id') frame_id: string, @Param('id') id: string) {
        return this.instancesService.findById(frame_id, id);
    }

    @Put(':frame_id/:id')
    async update(@Param('frame_id') frame_id: string, @Param('id') id: string, @Body() body: any) {
        return this.instancesService.update(frame_id, id, body);
    }

    @Delete(':frame_id/:id')
    async delete(@Param('frame_id') frame_id: string, @Param('id') id: string) {
        return this.instancesService.delete(frame_id, id);
    }
}
