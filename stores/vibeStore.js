import api from '../api/index';
import {EventEmitter} from 'events';
import {
  AsyncStorage,
} from 'react-native';

class viveStore extends EventEmitter{
  constructor(){
    super();
    this.blogs = [];
    this.locals = [];
    this.groups = [];
  }

  getBlogs(x = this.blogs.length){
    if(x < this.blogs.length){
      return this.blogs.slice(0, x);
    }
    else{
      return this.blogs;
    }
  }
  getLocals(x = this.locals.length){
    if(x < this.locals.length){
      return this.locals.slice(0, x)
    }
    else{
      return this.locals;
    }
  }
  getGroups(x = this.groups.length){
    if(x < this.groups.length){
      return this.groups.slice(0, x)
    }
    else{
      return this.groups;
    }
  }

  setBlogs(data){
    this.blogs = data;
    this.emit('VIBE_BLOGS',this.blogs);
  }
  setLocals(data){
    this.locals = data;
    this.emit('VIBE_LOCALS',this.locals);
  }
  setGroups(data){
    this.groups = data;
    this.emit('VIBE_GROUPS',this.groups);
  }

  updateBlogs(){
    let thisComponent = this;
    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        // console.log(err)
      }
      else{
        api.getBlogs({limit:50, data:'null', level:'generic', token:tokenItem}, (e, r) => {

          console.log('get blogs e: ')
          console.log(JSON.stringify(e))
          console.log('get blogs r: ')
          console.log(JSON.stringify(r))

          if(e){

          }
          else{
            if(r.success == true){
              let genericBlog = r.result.records
              thisComponent.setBlogs(genericBlog)
            }
            else {
              // alert('Something went wrong. Please try again.');
            }
          }
        })

      }
    });
  }

  updateLocals(){
    let thisComponent = this;
    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        // console.log(err)
      }
      else{
        api.getLocalVibe({limit:50, token:tokenItem}, (e, r) => {
          if(e){
            console.log('updateLocals error:')
            console.log(JSON.stringify(e))
            // alert("Error: "+e);
          }
          else{
            if(r.success == true){
              let myLocalVibe = r.result.records
              thisComponent.setLocals(myLocalVibe)
            }
            else {
              // alert('Something went wrong. Please try again.');
            }
          }
        })

      }
    });
  }

  updateGroups(){
    let thisComponent = this;
    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        // console.log(err)
      }
      else{

        api.getGroupVibe({limit:50, token:tokenItem}, (e, r) => {
          if(e){
            console.log('error:')
            console.log(JSON.stringify(e))
          }
          else{
            if(r.success == true){
              let myGroupVibe = r.result.records
              thisComponent.setGroups(myGroupVibe)
            }
            else {
              // alert('Something went wrong. Please try again.');
            }
          }
        })

      }
    });
  }

  updateAll(){
    this.updateBlogs()
    this.updateLocals()
    this.updateGroups()
  }

}

module.exports = new viveStore();
