import { Injectable } from "@nestjs/common";
import { CreateIncomeDto } from "./dto/create-income.dto";
import { UpdateIncomeDto } from "./dto/update-income.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class IncomesService {
  constructor(private prisma: PrismaService) {}

  create(createIncomeDto: CreateIncomeDto) {
    return this.prisma.income.create({
      data: createIncomeDto,
    });
  }

  findAll() {
    return this.prisma.income.findMany();
  }

  findOne(id: number) {
    return this.prisma.income.findUnique({
      where: { id },
    });
  }

  update(id: number, updateIncomeDto: UpdateIncomeDto) {
    return this.prisma.income.update({
      where: { id },
      data: updateIncomeDto,
    });
  }

  remove(id: number) {
    return this.prisma.income.delete({
      where: { id },
    });
  }
}
