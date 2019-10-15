import { Point } from 'geojson';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @Column('geometry', { spatialFeatureType: 'Point' })
  latLng: Point;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
