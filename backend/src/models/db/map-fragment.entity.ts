import { Polygon } from 'geojson';
import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm';
import { SpawnAreaEnity } from './spawn-area.entity';

@Entity('map_fragment')
export class MapFragmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('geometry', { spatialFeatureType: 'Polygon' })
  coords: Polygon;

  @OneToMany(type => SpawnAreaEnity, spawnArea => spawnArea.id)
  spawnAreas: SpawnAreaEnity[];
}
