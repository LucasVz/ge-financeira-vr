import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { PrismaModule } from "../prisma/prisma.module"; // Importando o módulo

@Module({
  imports: [PrismaModule], // Colocando ele aqui dentro
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
