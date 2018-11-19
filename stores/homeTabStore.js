import {
  AsyncStorage,
} from 'react-native';
import {EventEmitter} from 'events';

class homeTabStore extends EventEmitter{
  constructor(){
    super();
    this.data = 'business';
  }
  getData(){
    return this.data;
  }
  setData(data){
    this.data = data;
    this.emit('ActiveHomeTab',this.data);
  }
}

module.exports = new homeTabStore();
