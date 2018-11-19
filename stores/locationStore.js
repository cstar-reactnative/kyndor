import {
  AsyncStorage,
} from 'react-native';
import {EventEmitter} from 'events';

class locationStore extends EventEmitter{

  constructor(){
    super();
    this.data = {
      latitude: 29.785786,
      longitude: -95.824394,
      zip: 77494,
      updated: false
    }

    AsyncStorage.getItem('@KyndorStore:location', (err, item) => {
      if(err){
        this.data = {
          latitude: 29.785786,
          longitude: -95.824394,
          zip: 77494,
          updated: false
        }
        AsyncStorage.setItem('@KyndorStore:location', JSON.stringify(this.data));
      }
      else{
        if(item != null){
          this.data = JSON.parse(item)
        }
      }
    });
  }

  getData(){
    return this.data;
  }

  setData(lat,lon,zipCode){
    this.data = {
      latitude: lat,
      longitude: lon,
      zip: zipCode,
      updated: true
    }
    // this.emit('LOCATION_UPDATE', this.data);
    AsyncStorage.setItem('@KyndorStore:location', JSON.stringify(this.data));
  }
}

module.exports = new locationStore();
