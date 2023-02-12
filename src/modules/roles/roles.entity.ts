import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class RolesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  value: string;

  @Column({ nullable: true })
  description: string;

}