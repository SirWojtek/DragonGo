import { Polygon } from 'geojson';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SpawnAreaEntity } from './spawn-area.entity';

@Entity('map_fragment')
export class MapFragmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('geometry', { spatialFeatureType: 'Polygon' })
  coords: Polygon;

  @OneToMany(type => SpawnAreaEntity, spawnArea => spawnArea.id)
  spawnAreas: SpawnAreaEntity[];

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
