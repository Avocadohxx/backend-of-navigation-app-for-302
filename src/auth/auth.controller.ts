import { Controller, Post, Body, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OssService } from '../oss/oss.service';
import { UserService } from '../user/user.service'; 
import express from 'express';
import { AuthGuard } from '@nestjs/passport'; 

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly ossService: OssService,
    private readonly userService: UserService, 
  ) {}

  // interface：POST /auth/register
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() userData: { user_name: string; password: string; create_user_id: number; update_user_id: number },
  ) {
    try {
      await this.authService.register(userData);
      return {
        success: true,
        message: 'Registration successful',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Registration failed',
      };
    }
  }

    // interface: login
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(
        @Body() loginData: { user_name: string; password: string },
    ) {
        try {
        const userInfo = await this.authService.login(
            loginData.user_name,
            loginData.password,
        );
        return {
            success: true,
            message: 'Login successful',
            data: userInfo, 
        };
        } catch (error) {
        return {
            success: false,
            message: error.message || 'Login failed',
        };
        }
    }

  // 新增：生成头像上传的预签名URL
//   @Post('avatar/signature')
//   async getAvatarSignature(@Req() req: express.Request) {
//     const userId = req.user.id; // 从请求中获取登录用户ID（需确保登录后用户信息已注入req.user）
//     const fileExt = req.body.fileExt; // 前端传递的文件后缀（如png、jpg）
//     return this.ossService.generatePresignedUrl(userId, fileExt);
//   }

//   // 新增：上传成功后更新数据库的头像URL
//   @Post('avatar/update')
//   @HttpCode(HttpStatus.OK)
//   async updateAvatar(@Body() data: { userId: number; avatarUrl: string }) {
//     return this.userService.updateAvatar(data.userId, data.avatarUrl);
//   }
}
