import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from '../entities/user-profile.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
    private jwtService: JwtService, 
    private configService: ConfigService,
  ) {}

  // register
  async register(userData: { user_name: string; password: string; create_user_id: number; update_user_id: number }) {
    // check if exist
    const existingUser = await this.userProfileRepository.findOne({
      where: { user_name: userData.user_name },
    });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // bcrypt Password encryption
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(userData.password, salt);

    const newUser = this.userProfileRepository.create({
      ...userData,
      password_hash: passwordHash,
      u_status: 0, 
    });

    return this.userProfileRepository.save(newUser);
  }

  // Refine login logic (generate JWT token and return it to frontend)
  async login(userName: string, password: string) {
    // search user
    const user = await this.userProfileRepository.findOne({
      where: { user_name: userName, is_deleted: '0' },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // Verify password (encrypted comparison)
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // Generate JWT token
    const payload = { sub: user.id, username: user.user_name };
    const token = this.jwtService.sign(payload);

    // 4. 更新最后登录时间（可选，优化体验）
    await this.userProfileRepository.update(user.id, {
      last_login_time: new Date(),
      update_time: new Date(), 
      update_user_id: user.id,
    });

    // 5. 返回用户信息+token（前端需存储token）
    return {
      id: user.id, // 用户ID（前端上传头像需要）
      user_name: user.user_name,
      phone_num: user.phone_num,
      email: user.email,
      avatar_url: user.avatar_url,
      last_login_time: user.last_login_time?.toISOString() || null,
      token, // 关键：前端必须存储此token
    };
  }
}