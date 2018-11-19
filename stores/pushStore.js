import {EventEmitter} from 'events';

class pushStore extends EventEmitter{
  constructor(){
    super();
    this.data = null;
  }
  getData(){
    return this.data;
  }
  setData(data){
    this.data = data;
  }
}

module.exports = new pushStore();
