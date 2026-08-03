export class CreateIncomeDto {
  serviceId!: number;
  paymentMethodId!: number;
  amount!: number;
  installments!: number;
  attendanceType!: string;
  registrationDate!: string;
}
