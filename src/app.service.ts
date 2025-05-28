import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Returns a greeting string
   */
  getHello(): string {
    return 'Hello World!';
  }
}
