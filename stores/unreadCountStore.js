import api from '../api/index';
import {
  AsyncStorage,
} from 'react-native';
import {EventEmitter} from 'events';

class unreadCount extends EventEmitter{
  constructor(){
    super();
    this.data = {};
    this.myId = 0
  }

  updateData(){
    console.log('updating unread counts store.')

    let thisComponent = this;
    AsyncStorage.getItem('@KyndorStore:myData', (err, myData) => {
      var myUserId = JSON.parse(myData).user_id
      console.log('my id: '+myUserId);

      this.myId = myUserId;
      console.log('my id: '+this.myId);
    });

    AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
      if(err){
        console.log(err)
      }
      else{
        api.getUnreadCount(item, (e, r) => {
          if(e){
            console.log("Error: "+e);
          }
          else{
            console.log('unread result')
            // console.log(r)
            if(r.success == true){
              var allUnread = r.result.notificationCount;

              // let groupUnread = allUnread.groupNotification
              // let privateUnread = allUnread.privateNotification
              //
              // var gu = {}
              // for (x in groupUnread) {
              //   gu[groupUnread[x].channel_id] = groupUnread[x].unread_count
              // }
              //
              // var myUserId = this.myId
              // var pu = {}
              //
              // for (x in privateUnread) {
              //   if(privateUnread[x].participant_one == myUserId){
              //     pu[privateUnread[x].participant_two] = privateUnread[x].unread_count
              //   }
              //   if(privateUnread[x].participant_two == myUserId){
              //     pu[privateUnread[x].participant_one] = privateUnread[x].unread_count
              //   }
              // }
              //
              // thisComponent.data = {
              //   channel: gu,
              //   personal: pu
              // }

              thisComponent.data = allUnread

              console.log(thisComponent.data)
              this.emit('UNREAD_COUNT',true);
            }
            else {
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

  // getUnread(type, id){
  //   if(type == 'c'){
  //     console.log(id)
  //     console.log(this.data['channel'][id])
  //     return this.data.channel;
  //   }
  //   else if(type == 'p'){
  //     console.log(this.data['personal'][id])
  //     return this.data.personal;
  //   }
  // }

  getUnread(type, xid){
    console.log(type +' - '+ xid)

    if(type == 'c'){
      var channelData = this.data.groupNotification
      var returnVal = 0

      for (x in channelData) {
        if(channelData[x].channel_id == xid){
          returnVal = channelData[x].unread_count
          break;
        }
      }
      return returnVal;
    }

    else if(type == 'p'){
      return this.data.privateNotification
    }
  }

}

module.exports = new unreadCount();
