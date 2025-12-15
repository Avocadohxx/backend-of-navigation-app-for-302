import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DataSource } from 'typeorm'; 

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('cat')
  getCat(): string {
    return this.appService.getCat();
  }

  //测试连接数据库：浏览器localhost:3000/db-test
  @Get('db-test')
  async testDbConnection() {
    try {
      const result = await this.dataSource.query('SELECT * from user_profile;');
      return { 
        success: true, 
        message: '数据库连接成功', 
        data: result 
      };
    } catch (error) {
      return { 
        success: false, 
        message: '数据库连接失败', 
        error: error.message 
      };
    }
  }
}
