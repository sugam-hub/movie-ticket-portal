import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

interface IGeolocation {
  latitude: number;
  longitude: number;
}

const MapScreen = () => {
  const [location, setLocation] = useState<IGeolocation>({latitude: 0, longitude: 0}); 
  // const [currentLongitude, setCurrentLongitude] = useState<any>('');
  // const [currentLatitude, setCurrentLatitude] = useState<any>('');
  // const [locationStatus, setLocationStatus] = useState<any>('');

  // let watchID: number;

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude } = position.coords;
        setLocation({
          latitude: latitude,
          longitude: longitude,
        })
      },
      error => {
        console.log(error.code, error.message)
      },
      {enableHighAccuracy: true, maximumAge: 10000, timeout: 5000}
    )
  }, [])

  return (
    <View style={styles.container}>
     {location && (
      <MapView style={styles.map}
      provider= {PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 27.7293,
        longitude: 85.3343,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      // onRegionChange={region => {
      //   setLocation({
      //     latitude: region.latitude,
      //     longitude: region.longitude
      //   })
      // }}
      // onRegionChangeComplete={region => {
      //   setLocation({
      //     latitude: region.latitude,
      //     longitude: region.longitude,
      //   });
      // }}
      >
        <Marker 
          coordinate={{latitude: location.latitude, longitude: location.longitude }}
          title='This is a marker'
          description='This is a marker example'
        />
      </MapView>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    map: {
      width: "100%",
      height: "100%",
    },
});

export default MapScreen;