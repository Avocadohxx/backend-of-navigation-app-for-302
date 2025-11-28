import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DataSource } from 'typeorm'; 

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // 注入 TypeORM 的数据库连接管理器（无需实体，直接测试连接）
    private dataSource: DataSource,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 新增测试接口：查询数据库版本
  @Get('db-test')
  async testDbConnection() {
    try {
      // 执行简单的 PostgreSQL 内置查询（获取数据库版本）
      const result = await this.dataSource.query('SELECT version();');
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
