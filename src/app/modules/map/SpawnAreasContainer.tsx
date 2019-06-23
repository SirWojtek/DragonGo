import React from 'react';
import { LatLng, Polygon } from 'react-native-maps';
import { connect } from 'react-redux';
import { IStoreState } from '../../store/store';
import { ISpawnArea } from '../../store/types/ISpawnArea';

interface IProps {
  spawnAreas: LatLng[][];
}

function mapStateToProps(state: IStoreState): IProps {
  return {
    spawnAreas: state.spawnAreas.map(area => ([
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
    ]))
  };
}

class SpawnAreasContainer extends React.Component<IProps> {

  public render() {
    if (!this.props.spawnAreas) {
      return null;
    }

    return this.props.spawnAreas.map((area, i) =>
      <Polygon key={'area-' + i} coordinates={area} />
    );
  }
}

export default connect(mapStateToProps)(SpawnAreasContainer);
