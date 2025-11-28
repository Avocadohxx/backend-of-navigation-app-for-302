import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from '../entities/user-profile.entity';
import { OssModule } from '../oss/oss.module';
import { UserModule } from '../user/user.module';
// 新增JWT相关导入
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserProfile]),
    OssModule,
    UserModule,
    // 注册Passport，默认使用JWT策略
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // 配置JWT（从环境变量读取密钥和过期时间）
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // 注入JWT策略
  exports: [JwtModule],
})
export class AuthModule {}