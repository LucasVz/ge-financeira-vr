import { Injectable } from "@nestjs/common";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createServiceDto: CreateServiceDto) {
    return this.prisma.service.create({
      data: {
        name: createServiceDto.name,
        categoryId: createServiceDto.categoryId,
      },
    });
  }

  findAll() {
    return this.prisma.service.findMany({
      include: {
        category: true,
      },
    });
  }

  findOne(id: number) {
    const service = this.prisma.service.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
    return service;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    await this.findOne(id);
    return this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.service.delete({
      where: { id },
    });
  }
}
