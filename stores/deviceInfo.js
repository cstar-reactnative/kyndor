import {EventEmitter} from 'events';

class deviceInfo extends EventEmitter{
  constructor(){
    super();
    this.data = '';
  }
  getData(){
    return this.data;
  }
  setData(data){
    this.data = data;
  }
}

module.exports = new deviceInfo();
