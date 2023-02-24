import { Injectable, Logger } from '@nestjs/common';
import Razorpay from 'razorpay';
import { Orders } from 'razorpay/dist/types/orders';
import { CheckoutDto } from './dto/checkout.dto';
import { VerifyDto } from './dto/verify.dto';
import crypto from 'crypto';

@Injectable()
export class PaymentsService {
  private instance: Razorpay;
  private secret = '5sYhYBdqzuZVHzFeJ2Uxp4KM';
  private logger = new Logger(PaymentsService.name);

  constructor() {
    this.instance = new Razorpay({
      key_id: 'rzp_test_I8tVAe8LGxChDU',
      key_secret: this.secret,
    });
  }

  async checkout(checkoutDto: CheckoutDto): Promise<Orders.RazorpayOrder> {
    const options = {
      amount: checkoutDto.amount * 100, // amount in the smallest currency unit
      currency: checkoutDto.currency,
    };
    const order = await this.instance.orders.create(options);
    this.logger.log(`Order created: result: ${JSON.stringify(order)}`);
    return order;
  }

  async verify(verifyDto: VerifyDto) {
    const body =
      verifyDto.razorpay_order_id + '|' + verifyDto.razorpay_payment_id;

    var expectedSignature = crypto
      .createHmac('sha256', this.secret)
      .update(body.toString())
      .digest('hex');
    console.log('sig received ', verifyDto.razorpay_signature);
    console.log('sig generated ', expectedSignature);
    var response = { signatureIsValid: 'false' };
    if (expectedSignature === verifyDto.razorpay_signature) {
      response = { signatureIsValid: 'true' };
    }
    return response;
  }
}
