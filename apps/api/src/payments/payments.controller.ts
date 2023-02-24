import { Body, Controller, Logger, Post, Redirect } from '@nestjs/common';
import { CheckoutDto } from './dto/checkout.dto';
import { VerifyDto } from './dto/verify.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  private logger = new Logger(PaymentsController.name);
  constructor(private readonly paymentService: PaymentsService) {}

  @Post('/checkout')
  async checkout(@Body() checkoutDto: CheckoutDto) {
    this.logger.log(checkoutDto);
    return await this.paymentService.checkout(checkoutDto);
  }

  @Post('/verify')
  @Redirect('http://localhost:5173/payments/success', 302)
  async verify(@Body() verifyDto: VerifyDto) {
    this.logger.log(verifyDto);
    const res = await this.paymentService.verify(verifyDto);

    if (res.signatureIsValid) {
      return {
        url: `http://localhost:5173/payments/success?payment_id=${verifyDto.razorpay_payment_id}`,
        statusCode: 302,
      };
    } else {
      return {
        url: `http://localhost:5173/payments/failure?payment_id=${verifyDto.razorpay_payment_id}`,
        statusCode: 302,
      };
    }
  }
}
