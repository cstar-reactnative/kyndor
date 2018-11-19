import {
  AsyncStorage,
} from 'react-native';
import {EventEmitter} from 'events';

class chartStore extends EventEmitter{
  constructor(){
    super();
    this.data = {
      home: {
        schools: true,
        business: true,
        oneon1: true
      },
      notification: {
        main: true
      },
      schools: {
        map: true,
        individual: true,
        chatrooms: true,
        participants: true,
        list: true
      },
      business: {
        map: true,
        individual: true,
        chatrooms: true,
        participants: true,
        list: true
      },
      profile: {
        main: true
      }
    };
  }
  getData(){
    return this.data;
  }
  setData(data){
    this.data = data;
  }
}

module.exports = new chartStore();
