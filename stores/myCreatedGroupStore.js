import api from '../api/index';
import {EventEmitter} from 'events';
import {
  AsyncStorage,
} from 'react-native';

class myGroupStore extends EventEmitter{
  constructor(){
    super();
    this.data = {
      groupDetails: null,
      groupChannels: []
    }
  }

  getData(){
    return this.data;
  }
  setData(data){
    this.data = data;
  }
}

module.exports = new myGroupStore();
