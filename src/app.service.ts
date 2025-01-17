import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getForgeoWelcome(): string {
    return 'Welcome to Forgeo.com!';
  }
}
