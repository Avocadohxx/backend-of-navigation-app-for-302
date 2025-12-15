import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'; 
import { UserModule } from './user/user.module'; 
import { OssModule } from './oss/oss.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), //全局可用
    DatabaseModule,
    AuthModule,
    UserModule,
    OssModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
