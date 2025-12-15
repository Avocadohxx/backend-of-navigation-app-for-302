import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from '../entities/user-profile.entity';

@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '0318990',
        database: 'postgres',
        entities: [UserProfile], 
        synchronize: true,
        autoLoadEntities: true,
      }),
    ],
  })
  export class DatabaseModule {}
