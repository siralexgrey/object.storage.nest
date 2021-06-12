import { InstancesService } from './instances.service';
import { InstancesController } from './instances.controller';
import { Module } from '@nestjs/common';
import { FramesModule } from 'src/frames/frames.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        FramesModule,
        MongooseModule.forFeature()
    ],
    controllers: [
        InstancesController, ],
    providers: [
        InstancesService, ],
})
export class InstancesModule {}
