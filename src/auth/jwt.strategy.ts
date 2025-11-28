import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from '../entities/user-profile.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService, // from .env read JWT_SECRET
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {
    super({
      // "Authorization: Bearer <token>" extract token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, 
      secretOrKey: configService.get('JWT_SECRET') as string, //get secret
    });
  }

  // After token verification succeeds, query the user and inject req.user.
  async validate(payload: any) {
    // The payload is the decoded content of the JWT. During login, it is stored in user.id (key: sub).
    const userId = payload.sub;

    // Query users from the database (retrieve only ID and username to avoid returning sensitive information)
    const user = await this.userProfileRepository.findOne({
      where: { id: userId },
      select: ['id', 'user_name'],
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return { id: user.id, userName: user.user_name };
  }
}