import { Polygon } from 'geojson';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MapFragmentEntity } from './map-fragment.entity';
import { MonsterInstanceEntity } from './monster-instance.entity';
import { MonsterMetadataEntity } from './monster-metadata.entity';

@Entity('spawn_area')
export class SpawnAreaEntity {
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
