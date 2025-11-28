// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service'; // 导入你的UserService
import { UserProfile } from '../entities/user-profile.entity'; // 导入实体

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile])], // 注册实体
  providers: [UserService], // 注册服务
  exports: [UserService], // 允许其他模块（如auth）使用该服务
})
export class UserModule {} // 导出模块（供其他模块导入）