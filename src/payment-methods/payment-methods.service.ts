import { Injectable } from "@nestjs/common";
import { CreatePaymentMethodDto } from "./dto/create-payment-method.dto";
import { UpdatePaymentMethodDto } from "./dto/update-payment-method.dto";
import { PrismaService } from "../prisma/prisma.service"; // Certifique-se de que o caminho do seu PrismaService está correto

@Injectable()
export class PaymentMethodsService {
  constructor(private prisma: PrismaService) {}

  create(createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.prisma.paymentMethod.create({
      data: {
        name: createPaymentMethodDto.name,
      },
    });
  }

  findAll() {
    return this.prisma.paymentMethod.findMany();
  }

  findOne(id: number) {
    return this.prisma.paymentMethod.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return this.prisma.paymentMethod.update({
      where: { id },
      data: updatePaymentMethodDto,
    });
  }

  remove(id: number) {
    return this.prisma.paymentMethod.delete({
      where: { id },
    });
  }
}
