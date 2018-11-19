import React, { Component } from 'react';
import {
  Text
} from 'react-native';
import Stores from '../../stores/'

export default class SchoolRoute extends React.Component {

  static navigationOptions = {
    title: 'Schools',
    header: null
  };

  componentDidMount(){
    let screenData = Stores.screenStore.getData()
    let screen_name = 'SchoolListScreen'
    if((screenData.screen != 'default') && (screenData.screen != 'Default')){
      screen_name = screenData.screen
      Stores.groupStore.setData(screenData.info);
    }
    const { replace } = this.props.navigation;
    replace(screen_name, screenData.info)
  }

  render(){
    return(
      <Text>Loading..</Text>
    )
  }
}
