import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('monster')
export class MonsterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;
}
