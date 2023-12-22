import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Platform, PermissionsAndroid, ToastAndroid, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useMutation, useQuery } from 'react-query';
import { getMovieHall } from '../api/moviehall/moviehall';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONTSIZE } from '../theme/theme';
import MapViewDirections from 'react-native-maps-directions';

export interface MovieHall {
  id: number;
  hall_name: string;
  latitude: number;
  longitude: number;
}


const MapScreen: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number }>();

  const [selectedDestination, setSelectedDestination] = useState<{ latitude: number; longitude: number } | null>(
    null
  );

  const {data, isLoading, isError} = useQuery("movieHall", getMovieHall);

  useEffect(() => {
    const checkAndRequestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
  
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.error('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
  
    checkAndRequestLocationPermission();
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      (error) => {
        console.error('Error getting current location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const getPath = (destination: { latitude: number; longitude: number }) => {
    setSelectedDestination(destination);
  };
  return (
    <View style={styles.container}>
      {currentLocation && data &&  (
        <MapView
        provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker 
            coordinate= {{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title='Your current location'
          >
          <MaterialIcons name='man' color={COLORS.Orange} size={FONTSIZE.size_30} />
          </Marker>
         {data.data.map((item: any) => (
          <Marker
            key={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            title={item.hall_name}
            description="Movie hall location"
            onPress={() => {
              getPath({latitude: item.latitude, longitude: item.longitude})
            }}
       >
    <MaterialIcons name='movie' color={COLORS.Orange} size={FONTSIZE.size_30} />
  </Marker>
))}
    {selectedDestination && (
            <MapViewDirections
              origin={currentLocation}
              destination={selectedDestination}
              apikey='AIzaSyBUTbF306tbLC8rrFCbCqKtbp8EiFlMrNw'
              strokeWidth={3}
              strokeColor='hotpink'
            />
     )}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
