import api from '../api/index';
import {EventEmitter} from 'events';

class announcementStore extends EventEmitter{
  constructor(){
    super();
    this.data = [{
      title: 'Dummy Annoncement.',
      text: 'This is a one time announcement.'
    }];
  }

  // currently not in use.
  fetchNewAnnouncement(){
    api.announcements({token: item}, (e, r) => {
      if(e){
        console.log("Error: "+e);
      }
      else{
        if(r.success == true){
          // console.log('Annoucement: '+r.result.announcements.length)
        }
        else {
          // console.log('Failed!');
        }
      }
    })
  }

  // temp use
  reStartDemo(){
    this.data = [{
      title: 'Dummy Annoncement.',
      text: 'This is a one time announcement.'
    }];
  }

  getData(){
    return this.data;
  }

  setData(data){
    this.data = data;
  }
}

module.exports = new announcementStore();
