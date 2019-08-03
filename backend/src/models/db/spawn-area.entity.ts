import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Polygon } from 'geojson';
import { MonsterInstanceEntity } from './monster-instance.entity';
import { MonsterMetadataEntity } from './monster-metadata.entity';

@Entity('spawn_area')
export class SpawnAreaEnity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(
    type => MonsterMetadataEntity,
    monsterMetadata => monsterMetadata.id,
  )
  @JoinTable()
  monstersMetadata: MonsterMetadataEntity[];

  @ManyToMany(
    type => MonsterInstanceEntity,
    monsterInstance => monsterInstance.id,
  )
  @JoinTable()
  monsterInstances: MonsterInstanceEntity[];

  @Column('geometry', { spatialFeatureType: 'Polygon' })
  coords: Polygon;
}
