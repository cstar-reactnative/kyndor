import {
  AsyncStorage,
} from 'react-native';
import {EventEmitter} from 'events';

class filterStore extends EventEmitter{
  constructor(){
    super();
    this.schoolFilter = []
    this.businessFilter = []

    AsyncStorage.getItem('@KyndorStore:schoolFilters', (err, item) => {
      if(err){
        // this.data = []
      }
      else{
        this.schoolFilter = (item) ? JSON.parse(item) : []
      }
    });

    AsyncStorage.getItem('@KyndorStore:businessFilter', (err, item) => {
      if(err){
        // this.data = []
      }
      else{
        this.businessFilter = (item) ? JSON.parse(item) : []
      }
    });
  }

  getSchoolFilters(){
    return this.schoolFilter
  }

  setSchoolFilters(data){
    this.schoolFilter = data;
    AsyncStorage.setItem('@KyndorStore:schoolFilters', JSON.stringify(this.schoolFilter));
  }

  getBusinessFilters(){
    return this.businessFilter;
  }

  setBusinessFilters(data){
    this.businessFilter = data;
    AsyncStorage.setItem('@KyndorStore:businessFilter', JSON.stringify(this.businessFilter));
  }

}

module.exports = new filterStore();
