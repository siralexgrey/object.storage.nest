import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FilterItemDocument = FilterItem & Document;

@Schema()
export class FilterItem {
  @Prop({ type: String, required: true })
  field: string;

  @Prop({type: String, required: true })
  filter_widget_type: string;
}

export const FilterItemSchema = SchemaFactory.createForClass(FilterItem);
