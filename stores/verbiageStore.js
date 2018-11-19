import api from '../api/index';
import {
  AsyncStorage,
} from 'react-native';
import {EventEmitter} from 'events';

class verbiageStore extends EventEmitter{
  constructor(){
    super();
    this.data = {};
  }

  updateData(){
    console.log('updating verbiage store.')
    let thisThing = this
    api.getVerbiage((e, r) => {
      if(e){
        console.log("Error: "+e);
      }
      else{
        if(r.success == true){
          var resArray = r.result.result;
          var newArr = {}
          for (x in resArray) {
            newArr[resArray[x].verbiage_name] = resArray[x].verbiage_text
            // console.log(newArr)
          }
          // alert('verbiage: '+newArr.b_chatGroups)
          thisThing.data = newArr;
          thisThing.emit('VERBIAGE_DATA',thisThing.data);
        }
        else {
          // nothing
        }
      }
    })
  }

  getData(){
    return this.data;
  }

}

module.exports = new verbiageStore();
