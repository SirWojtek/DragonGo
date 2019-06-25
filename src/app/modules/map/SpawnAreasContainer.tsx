import React from 'react';
import { View } from 'react-native';
import { LatLng, Polygon } from 'react-native-maps';
import { connect } from 'react-redux';
import { IMonsterStore } from '../../store/slices/monstersSlice';
import { IStoreState } from '../../store/store';
import { ILocation } from '../../store/types/ILocation';
import { IMonster } from '../../store/types/IMonster';
import { ISpawnArea } from '../../store/types/ISpawnArea';
import MonsterMarker from './markers/MonsterMarker';

interface IMonsterWithLocation extends IMonster {
  location: ILocation;
}

interface IProps {
  spawnAreas: Array<{
    coordinates: LatLng[];
    monsters: IMonsterWithLocation[];
  }>;
}

function mapStateToProps(state: IStoreState): IProps {
  return {
    spawnAreas: state.spawnAreas.map(area => ({
      coordinates: [
        {
          latitude: area.viewport.southwest.latitude,
          longitude: area.viewport.northeast.longitude,
        },
        {
          latitude: area.viewport.northeast.latitude,
          longitude: area.viewport.northeast.longitude,
        },
        {
          latitude: area.viewport.northeast.latitude,
          longitude: area.viewport.southwest.longitude,
        },
        {
          latitude: area.viewport.southwest.latitude,
          longitude: area.viewport.southwest.longitude,
        },
      ],
      monsters: area.monsters.map(m => ({
        ...m,
        ...state.monsters[m.id]
      })),
    })),
  };
}

class SpawnAreasContainer extends React.Component<IProps> {

  public render() {
    if (!this.props.spawnAreas) {
      return null;
    }

    return this.props.spawnAreas.map((area, i) =>
      <View key={'area-' + i}>
        <Polygon
          coordinates={area.coordinates}
          strokeWidth={3}
          fillColor={'rgba(0, 255, 0, 0.3)'}
        / >
        { area.monsters.map((monster, j) =>
            <MonsterMarker
              key={'area-' + i + '-monster-' + j}
              coordinate={monster.location}
            />
          )
        }
      </View>
    );
  }
}

export default connect(mapStateToProps)(SpawnAreasContainer);
