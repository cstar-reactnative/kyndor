import api from '../api/index';
import {
  AsyncStorage,
} from 'react-native';
import {EventEmitter} from 'events';

class privateChannelStore extends EventEmitter{
  constructor(){
    super();
    this.data = [];
  }

  updateData(){
    let thisThing = this
    AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
      if(err){
        console.log(err)
      }
      else{
        api.privateChannel({token: item}, (e, r) => {
          if(e){
            console.log("Error: "+e);
          }
          else{
            if(r.success == true){
              // this.setState({allData : r.result});
              thisThing.setData(r.result);
            }
            else {
              //this.props.navToChat.navigate('RequestSent',{room:a.channel_id});
              // console.log('Failed!');
            }
          }
        })
      }
    });
  }

  getData(){
    return this.data;
  }

  setData(data){
    this.data = data;
  }
}

module.exports = new privateChannelStore();
