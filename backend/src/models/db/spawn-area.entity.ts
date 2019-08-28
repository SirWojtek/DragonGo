import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Polygon } from 'geojson';
import { MonsterInstanceEntity } from './monster-instance.entity';
import { MonsterMetadataEntity } from './monster-metadata.entity';
import { MapFragmentEntity } from './map-fragment.entity';

@Entity('spawn_area')
export class SpawnAreaEnity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('geometry', { spatialFeatureType: 'Polygon' })
  coords: Polygon;

  @ManyToMany(
    type => MonsterInstanceEntity,
    monsterInstance => monsterInstance.id,
  )
  @JoinTable()
  monsterInstances: MonsterInstanceEntity[];

  @ManyToOne(type => MapFragmentEntity, mapFragment => mapFragment.id)
  mapFragment: MapFragmentEntity;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
