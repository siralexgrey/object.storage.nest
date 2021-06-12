import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Schema } from 'mongoose';
import { FramesService } from '../frames/frames.service';

@Injectable()
export class InstancesService {

    constructor(@InjectConnection() private connection: Connection, private framesService: FramesService) {}

    async create(frame_id, body) {
        const InstanceModel = await this.getInstanceModel(frame_id);
        const createdInstance = new InstanceModel(body);
        return await createdInstance.save();
    }

    async findAll(frame_id): Promise<any[]> {
        const InstanceModel = await this.getInstanceModel(frame_id);
        return InstanceModel.find().exec();
    }

    async findById(frame_id: string, id: string): Promise<any> {
        const InstanceModel = await this.getInstanceModel(frame_id);
        return InstanceModel.findById(id).exec();
    }

    async update(frame_id: string, id: string, body: any): Promise<any> {
        const InstanceModel = await this.getInstanceModel(frame_id);
        return InstanceModel.findByIdAndUpdate(id, body, {new: true}).exec();
    }

    async delete(frame_id: string, id: string): Promise<any> {
        const InstanceModel = await this.getInstanceModel(frame_id);
        return InstanceModel.findByIdAndDelete(id).exec();
    }

    async getInstanceModel(frame_id) {
        const modelName = frame_id;
        if (this.connection.modelNames().includes(modelName)) {
            return this.connection.model(modelName);
        } else {
            const frame = await this.framesService.findById(frame_id);
            const FrameConfig = frame.config;
            const FrameFilters = frame.filters;
            const InstanceSchema = await this.generateNewInstanceCollection(FrameConfig, FrameFilters);
            return this.connection.model(modelName, InstanceSchema, `Instance_${frame_id}`);
        }
    }

    async generateNewInstanceCollection(config: any, filters: Array<any>) {
        const schema = {};
        config.forEach(property => {
            schema[property.name] = {
                type: property.type,
                index: this.isIndexed(filters, property.name),
                default: this.setDefaultValue(property.type, property.defaultValue)
            }
        });
        const InstanceSchema = new Schema(
            schema,
        );
        return InstanceSchema;
    }

    isIndexed(filters: Array<any>, fieldName: string) {
        let indexed = false;
        if (!filters.length) { return indexed; }
        filters.forEach(filter => {
            if (filter.field === fieldName) {
                indexed = true;
            }
        });
        return indexed;
    }

    setDefaultValue(type: string, value: any) {
        if (value) {
            if (type === 'String') {
                return value.toString();
            } else if (type === 'Number') {
                return parseInt(value, 10);
            } else {
                return value;
            }
        } else {
            return value;
        }

    }
}
