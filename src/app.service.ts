import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Returns a greeting string
   */
  getHello(): string {
    return 'Hello World!';
  }

  /**
   * Returns a greeting string
   */
  getHi(): string {
    return 'Hi World!!!!';
  }
}
