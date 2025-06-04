import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 60 })
  email: string;

  @Column({ length: 60 })
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
