import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CategoriesModule } from "./categories/categories.module";
import { ServicesModule } from "./services/services.module";
import { PaymentMethodsModule } from "./payment-methods/payment-methods.module";
import { IncomesModule } from "./incomes/incomes.module";
import { ExpensesModule } from "./expenses/expenses.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [
    CategoriesModule,
    ServicesModule,
    PaymentMethodsModule,
    IncomesModule,
    ExpensesModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
