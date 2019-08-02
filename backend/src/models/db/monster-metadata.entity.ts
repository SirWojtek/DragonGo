import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MonsterInstanceEntity } from './monster-instance.entity';

@Entity('monster_metadata')
export class MonsterMetadataEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  minLevel: number;

  @Column()
  maxLevel: number;

  @OneToMany(
    type => MonsterInstanceEntity,
    monsterInstance => monsterInstance.id,
  )
  monsterInstances: MonsterInstanceEntity[];

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
