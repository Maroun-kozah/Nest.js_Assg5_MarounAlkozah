import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Complaint } from './complaint.schema';
import { CreateComplaintDto } from './dto/create-complaint.dto';

@Injectable()
export class ComplaintsService {
  constructor(@InjectModel(Complaint.name) private readonly complaintModel: Model<Complaint>) {}

  async create(createComplaintDto: CreateComplaintDto): Promise<Complaint> {
    const createdComplaint = new this.complaintModel(createComplaintDto);
    return createdComplaint.save();
  }

  async findAll(): Promise<Complaint[]> {
    return this.complaintModel.find().exec();
  }

  async findById(id: string): Promise<Complaint> {
    return this.complaintModel.findById(id).exec();
  }

  async update(id: string, updateComplaintDto: Partial<CreateComplaintDto>): Promise<Complaint> {
    return this.complaintModel.findByIdAndUpdate(id, updateComplaintDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Complaint> {
    return this.complaintModel.findByIdAndDelete(id).exec();
  }
  
  async findUserComplaints(userId: string): Promise<Complaint[]> {
    return this.complaintModel.find({ user: userId }).exec();
  }
  async getComplaintsGroupedByStatus(userId: string): Promise<{ [status: string]: Complaint[] }> {
    const userComplaints = await this.findUserComplaints(userId);

    const groupedComplaints = await this.complaintModel.aggregate([
      {
        $match: { user: userId }, // Filter complaints by user ID
      },
      {
        $group: {
          _id: '$status', // Group by complaint status
          complaints: { $push: '$$ROOT' }, // Push complaints into an array for each status
        },
      },
    ]);

    const result: { [status: string]: Complaint[] } = {};
    groupedComplaints.forEach(group => {
      result[group._id] = group.complaints;
    });

    return result;
  }
}
