import {EventEmitter} from 'events';

class webPageData extends EventEmitter{
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

module.exports = new webPageData();
