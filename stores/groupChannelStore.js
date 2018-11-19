import api from '../api/index';
import {EventEmitter} from 'events';
import {
  AsyncStorage,
} from 'react-native';

class groupChannelStore extends EventEmitter{
  constructor(){
    super();
    this.data = [];
  }
  getData(){
    return this.data;
  }
  setData(data){
    this.data = data;
    this.emit('GROUP_DATA',this.data);
  }
  updateData(user_type = 'parent'){
    let thisComponent = this;
    AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
      if(err){
        // console.log(err)
      }
      else{
        if(user_type == 'parent'){
          api.getMyGroups({token: item}, (e, r) => {
            if(e){
              console.log("Error: "+e);
            }
            else{
              if(r.success == true){
                // AsyncStorage.setItem('@KyndorStore:subscribed_groups', JSON.stringify(r.result.subscribed_groups));
                thisComponent.data = r.result.subscribed_groups;
                thisComponent.emit('GROUP_DATA',thisComponent.data);
              }
              else {
                // console.log('Failed!');
              }
            }
          })
        }
        else if(user_type == 'owner'){
          api.myOwnGroup(item, (e, r) => {
            console.log('myOwnGroup API:')
            console.log('e: '+e)
            console.log('r: '+JSON.stringify(r))
            if(e){
              return null
            }
            else{
              if(r.success == true){
                thisComponent.data = r.result;
                thisComponent.emit('GROUP_DATA',thisComponent.data);
              }
              else {
                console.log('success - false')
              }
            }
          })


          // api.getMyGroups({token: item}, (e, r) => {
          //   if(e){
          //     console.log("Error: "+e);
          //   }
          //   else{
          //     if(r.success == true){
          //       // AsyncStorage.setItem('@KyndorStore:subscribed_groups', JSON.stringify(r.result.subscribed_groups));
          //       thisComponent.data = r.result.subscribed_groups;
          //       this.emit('GROUP_DATA',thisComponent.data);
          //     }
          //     else {
          //       // console.log('Failed!');
          //     }
          //   }
          // })

        }
      }
    });
  }
}

module.exports = new groupChannelStore();
