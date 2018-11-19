import {EventEmitter} from 'events';

class searchStore extends EventEmitter{
  constructor(){
    super();
    this.data = '';
  }
  getData(){
    return this.data;
  }
  setData(data){
    this.data = data;
    this.emit('SEARCH_FOR',data);
  }
}

module.exports = new searchStore();
