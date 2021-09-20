import Geolocation from 'react-native-geolocation-service';

class GeoLocationServices {
  getUserLocation() {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    });
  }
}
export const GeoLocation = new GeoLocationServices();
