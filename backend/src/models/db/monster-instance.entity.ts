import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { MonsterMetadataEntity } from './monster-metadata.entity';

@Entity('monster_instance')
export class MonsterInstanceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  level: number;

  @Column()
  monsterMetadataId: string;

  @ManyToOne(
    type => MonsterMetadataEntity,
    monsterMetadata => monsterMetadata.id,
    { eager: true },
  )
  monsterMetadata: MonsterMetadataEntity;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
