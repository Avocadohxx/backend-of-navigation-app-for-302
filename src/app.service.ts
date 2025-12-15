import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!!!!!';
  }
  getCat(): string {
    return 'a CAT is watching you...'
  }
}
