import { isPointWithinRadius } from 'geolib';
import React from 'react';
import { View } from 'react-native';
import { LatLng, Polygon } from 'react-native-maps';
import { connect } from 'react-redux';
import modalSlice from '../../store/slices/modalSlice';
import snackbarSlice from '../../store/slices/snackbarSlice';
import store, { IStoreState } from '../../store/store';
import { ILocation } from '../../store/types/ILocation';
import { IMonster } from '../../store/types/IMonster';
import { IUser } from '../../store/types/IUser';
import MonsterInfo from '../monster/MonsterInfo';
import MonsterMarker from './markers/MonsterMarker';

interface IMonsterWithLocation extends IMonster {
  location: ILocation;
}

interface IProps {
  spawnAreas: {
    coordinates: LatLng[];
    monsters: IMonsterWithLocation[];
  }[];
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
          latitude: area.viewport.southwest.lat,
          longitude: area.viewport.northeast.lng
        },
        {
          latitude: area.viewport.northeast.lat,
          longitude: area.viewport.northeast.lng
        },
        {
          latitude: area.viewport.northeast.lat,
          longitude: area.viewport.southwest.lng
        },
        {
          latitude: area.viewport.southwest.lat,
          longitude: area.viewport.southwest.lng
        }
      ],
      monsters: state.monsters.filter(m => m.spawnAreaId === area.id)
    })),
    user: state.user
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

    return this.props.spawnAreas.map((area, i) => (
      <View key={'area-' + i}>
        <Polygon
          coordinates={area.coordinates}
          strokeWidth={3}
          fillColor={'rgba(0, 255, 0, 0.3)'}
        />
        {area.monsters.map((monster, j) => (
          <MonsterMarker
            key={'area-' + i + '-monster-' + j}
            coordinate={{
              latitude: monster.location.lat,
              longitude: monster.location.lng
            }}
            monster={monster}
            onPress={(coords, m) => this.onMonsterMarkerPress(coords, m)}
          />
        ))}
      </View>
    ));
  }

  public onMonsterMarkerPress(coords: LatLng, monster: IMonster) {
    if (
      __DEV__ ||
      isPointWithinRadius(
        coords,
        this.props.user.location,
        this.props.user.maxRange
      )
    ) {
      store.dispatch(
        modalSlice.actions.show({
          content: (
            <MonsterInfo
              monster={monster}
              onExitClick={() => store.dispatch(modalSlice.actions.hide())}
            />
          )
        })
      );
    } else {
      store.dispatch(
        snackbarSlice.actions.show({
          content: 'You are out of range!',
          duration: 3000
        })
      );
    }
  }
}

export default connect(mapStateToProps)(SpawnAreasContainer);
