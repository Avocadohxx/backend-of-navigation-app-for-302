import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from '../entities/user-profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  // 新增：更新用户头像URL
  async updateAvatar(userId: number, avatarUrl: string) {
    const user = await this.userProfileRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    await this.userProfileRepository.update(userId, {
      avatar_url: avatarUrl,
      update_time: new Date(), // 可选：如果表有update_time字段
    });

    return this.userProfileRepository.findOne({ where: { id: userId } });
  }

  // 新增：更新手机号和邮箱
  async updateProfile(userId: number, phoneNum: string, email: string) {
    const user = await this.userProfileRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    await this.userProfileRepository.update(userId, {
      phone_num: phoneNum,
      email: email,
      update_time: new Date(), // 可选
    });
  }
}