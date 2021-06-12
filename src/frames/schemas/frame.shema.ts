import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ConfigItem } from './configItem.schema';
import { FilterItem } from './filterItem.schema';

export type FrameDocument = Frame & Document;

@Schema()
export class Frame {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  account_id: string;

  @Prop({required: true})
  config: ConfigItem[];

  @Prop()
  filters: FilterItem[];
}

export const FrameSchema = SchemaFactory.createForClass(Frame);
