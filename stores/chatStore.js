import api from '../api/index';
import {EventEmitter} from 'events';
import {
  AsyncStorage,
} from 'react-native';

class chatStore extends EventEmitter{
  constructor(){
    super();
    this.data = [];
  }
  getData(){
    return this.data;
  }
  setData(data){
    this.data = data;
    this.emit('CONNECTION_DATA',this.data);
  }
  updateData(){
    let thisComponent = this;
    AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
      if(err){
        // console.log(err)
      }
      else{
        api.getMyConnections({token: item}, (e, r) => {
          if(e){
            console.log("Error: "+e);
          }
          else{
            if(r.success == true){
              // AsyncStorage.setItem('@KyndorStore:subscribed_groups', JSON.stringify(r.result.subscribed_groups));
              thisComponent.data = r.result.r;
              this.emit('CONNECTION_DATA',thisComponent.data);
            }
            else {
              // console.log('Failed!');
            }
          }
        })
      }
    });
  }
}

module.exports = new chatStore();
