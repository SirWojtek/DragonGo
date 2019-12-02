import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { FAB } from 'react-native-paper';
import { connect } from 'react-redux';
import userSlice from '../../store/slices/userSlice';
import store, { IStoreState } from '../../store/store';
import { ILocation } from '../../store/types/ILocation';

const DELTA = 0.001;

interface IProps {
  currentLocation: ILocation;
}

function mapStateToProps(state: IStoreState): IProps {
  return { currentLocation: state.user.location };
}

class DevLocationButtons extends React.Component<IProps> {
  public render() {
    return (
      <View style={viewStyles}>
        <FAB
          small={true}
          icon="arrow-back"
          onPress={() => this.onLocationChange(0, -DELTA)}
        />
        <FAB
          small={true}
          icon="arrow-upward"
          onPress={() => this.onLocationChange(DELTA, 0)}
        />
        <FAB
          small={true}
          icon="arrow-downward"
          onPress={() => this.onLocationChange(-DELTA, 0)}
        />
        <FAB
          small={true}
          icon="arrow-forward"
          onPress={() => this.onLocationChange(0, DELTA)}
        />
      </View>
    );
  }

  private onLocationChange(latDelta: number, lngDelta: number) {
    const location = {
      lat: this.props.currentLocation.lat + latDelta,
      lng: this.props.currentLocation.lng + lngDelta
    };

    store.dispatch(userSlice.actions.setLocation(location));
  }
}

const viewStyles: StyleProp<ViewStyle> = {
  position: 'absolute',
  margin: 16,
  left: 0,
  bottom: 0
};

export default connect(mapStateToProps)(DevLocationButtons);
