// src/oss/oss.module.ts
import { Module } from '@nestjs/common';
import { OssService } from './oss.service'; // 导入你的OssService

@Module({
  providers: [OssService], // 注册OSS服务
  exports: [OssService], // 允许其他模块（如auth）使用该服务
})
export class OssModule {} // 导出模块