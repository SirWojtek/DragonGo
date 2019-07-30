import { isPointWithinRadius } from 'geolib';
import React from 'react';
import { Text, View } from 'react-native';
import { LatLng, MapEvent, Marker, Polygon } from 'react-native-maps';
import { Modal, Portal, Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
import modalSlice from '../../store/slices/modalSlice';
import { IMonsterStore } from '../../store/slices/monstersSlice';
import snackbarSlice from '../../store/slices/snackbarSlice';
import store, { IStoreState } from '../../store/store';
import { ILocation } from '../../store/types/ILocation';
import { IMonster } from '../../store/types/IMonster';
import { ISpawnArea } from '../../store/types/ISpawnArea';
import { IUser } from '../../store/types/IUser';
import { latLngDistance } from '../../utils/distance';
import MonsterInfo from '../monster/MonsterInfo';
import MonsterMarker from './markers/MonsterMarker';

interface IMonsterWithLocation extends IMonster {
  location: ILocation;
}

interface IProps {
  spawnAreas: Array<{
    coordinates: LatLng[];
    monsters: IMonsterWithLocation[];
  }>;
  user: IUser;
}

interface IState {
  rangeLimitMessageVisible: boolean;
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
    user: state.user,
  };
}

class SpawnAreasContainer extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      rangeLimitMessageVisible: false
    };
  }

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
              monster={monster}
              onPress={(coords, m) => this.onMonsterMarkerPress(coords, m) }
            />
          )
        }
      </View>
    );

  }

  public onMonsterMarkerPress(coords: LatLng, monster: IMonster) {
    if (__DEV__ || isPointWithinRadius(coords, this.props.user.location, this.props.user.maxRange)) {
      store.dispatch(modalSlice.actions.show({
        content: <MonsterInfo
            monster={monster}
            onExitClick={() => store.dispatch(modalSlice.actions.hide({})) }
          />
      }));
    } else {
      store.dispatch(snackbarSlice.actions.show({
        content: 'You are out of range!',
        duration: 3000
      }));
    }
  }

}

export default connect(mapStateToProps)(SpawnAreasContainer);