import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Post()
  async create(@Body() createComplaintDto: CreateComplaintDto) {
    return this.complaintsService.create(createComplaintDto);
  }

  @Get()
  async findAll() {
    return this.complaintsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.complaintsService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateComplaintDto: Partial<CreateComplaintDto>) {
    return this.complaintsService.update(id, updateComplaintDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.complaintsService.delete(id);
  }
}
