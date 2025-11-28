import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('user_profile')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  create_user_id: number;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  create_time: Date;

  @Column({ type: 'int', nullable: false })
  update_user_id: number;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  update_time: Date;

  @Column({ type: 'bit', nullable: false, default: '0' })
  is_deleted: string | boolean;

  @Column({ type: 'varchar', length: 50, nullable: false })
  user_name: string;

  @Column({ type: 'smallint', nullable: false, default: 0 })
  u_status: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password_hash: string;

  @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  pwd_update_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_login_time: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  last_login_ip: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar_url: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  phone_num: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  email: string;
}