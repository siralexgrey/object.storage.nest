import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel} from '@nestjs/mongoose';
import { Connection, Model} from 'mongoose';
import { Frame, FrameDocument } from './schemas/frame.shema';
import { CreateFrameDto } from './dto/create-frame.dto';
import { ConfigItem } from './schemas/configItem.schema';
import { FilterItem } from './schemas/filterItem.schema';

@Injectable()
export class FramesService {
    constructor(
        @InjectModel(Frame.name) private readonly frameModel: Model<FrameDocument>,
        @InjectConnection() private connection: Connection
    ) {}

    async create(createFrameDto: CreateFrameDto): Promise<Frame> {
        const createdFrame = new this.frameModel(createFrameDto);
        return createdFrame.save();
    }

    async findAll(id: string): Promise<Frame[]> {
        return this.frameModel.find({account_id: id}).exec();
    }

    async findById(id: string): Promise<Frame> {
        return this.frameModel.findById(id).exec();
    }

    async update(id: string, body): Promise<Frame> {
        body.config.forEach(configItem => {
            this.updateConfig(id, configItem)
        });
        body.filters.forEach(filterItem => {
            this.updateFilters(id, filterItem);
        });
        return this.frameModel.findByIdAndUpdate(id, 
        {$set: {
            name: body.name,
            description: body.description
        }}, {new: true});
    }

    async updateConfig(id: string, body: ConfigItem) {
        return this.frameModel.findOneAndUpdate({_id: id, 'config.name': body.name},
        {$set: {
            'config.$.type': body.type,
            'confog.$.defaultValue': body.defaultValue
        }},
        {new: true});
    }

    async updateFilters(id: string, body: FilterItem) {
        return this.frameModel.findOneAndUpdate({_id: id, 'filters.field': body.field},
        {$set: {
            'filters.$.filter_widgte_type': body.filter_widget_type
        }},
        {new: true});
    }

    async delete(id: string): Promise<Frame> {
        return this.frameModel.findByIdAndRemove(id);
    }
}
