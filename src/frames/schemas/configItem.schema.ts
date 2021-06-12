import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConfigItemDocument = ConfigItem & Document;

@Schema()
export class ConfigItem {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String })
  defaultValue: string;
}

export const ConfigItemSchema = SchemaFactory.createForClass(ConfigItem);
