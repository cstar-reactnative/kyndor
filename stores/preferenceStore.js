import {
  AsyncStorage,
} from 'react-native';
import {EventEmitter} from 'events';

class preferenceStore extends EventEmitter{
  constructor(){
    super();
    this.data = []
    AsyncStorage.getItem('@KyndorStore:preference', (err, item) => {
      if(err){
        // this.data = []
      }
      else{
        this.data = (item ? JSON.parse(item) : [])
      }
    });
  }
  getData(){
    return this.data;
  }
  setData(data){
    this.data = data;
    AsyncStorage.setItem('@KyndorStore:preference', JSON.stringify(this.data));
  }
}

module.exports = new preferenceStore();
