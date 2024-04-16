import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ComplaintDocument = Complaint & Document;

@Schema()
export class Complaint {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ type: String }] })
  categories: string[];

  @Prop({ enum: ['PENDING', 'INPROGRESS', 'RESOLVED', 'REJECTED'], default: 'PENDING' })
  status: string;
}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);
