import {EventEmitter} from 'events';

class rootNavStore extends EventEmitter{
  constructor(){
    super();
    this.data = 'Login';
  }
  getData(){
    return this.data;
  }
  setData(screen){
    this.data = screen;
    this.emit('ROOT_NAV',this.data);
  }
}

module.exports = new rootNavStore();
