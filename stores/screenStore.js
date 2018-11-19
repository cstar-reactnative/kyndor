import {EventEmitter} from 'events';

class screenStore extends EventEmitter{
  constructor(){
    super();
    this.data = ['home', null];
  }
  getData(){
    return this.data;
  }
  setData(data){
    this.data = data;
    this.emit('NAV_TO',{tab:data.tab,screen:data.screen,info:data.info});
  }
}

module.exports = new screenStore();
