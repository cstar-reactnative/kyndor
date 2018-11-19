import api from '../api/index';
import {EventEmitter} from 'events';
import {
  AsyncStorage,
} from 'react-native';

class groupStore extends EventEmitter{
  constructor(){
    super();
    this.data = [];
  }
  getData(){
    return this.data;
  }
  setData(data){
    this.data = data;
  }
}

module.exports = new groupStore();
