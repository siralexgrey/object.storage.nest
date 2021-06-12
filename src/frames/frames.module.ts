import { FramesController } from './frames.controller';
import { FramesService } from './frames.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Frame, FrameSchema } from './schemas/frame.shema';
import { ConfigItem, ConfigItemSchema } from './schemas/configItem.schema';
import { FilterItem, FilterItemSchema } from './schemas/filterItem.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {name: Frame.name, schema: FrameSchema},
        {name: ConfigItem.name, schema: ConfigItemSchema},
        {name: FilterItem.name, schema: FilterItemSchema}
      ]
    )
  ],
  controllers: [FramesController],
  providers: [FramesService],
  exports: [FramesService]
})
export class FramesModule {}
