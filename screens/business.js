import React, { Component } from 'react';
import {
  createStackNavigator,
} from 'react-navigation';

import B_map from './business/b_map.js';
import B_list from './business/b_list.js';
import B_details from './business/b_details.js';
import BusinessSearch from './business/businessSearch.js';
// import B_route from './business/businessRoute.js';
import B_join from './business/b_join.js';
import Invite_people from './common/invite_people.js';
import B_filter from './business/b_filter.js';
import B_add from './business/bAddRequest.js';

// const BusinessApp = createStackNavigator({
export default createStackNavigator({
  // B_route: {screen: B_route},
  B_filter: {screen: B_filter},
  B_add: {screen: B_add},
  ListScreen: {screen: B_list},
  BusinessSearch: {screen: BusinessSearch},
  MapScreen: { screen: B_map },
  B_details: {screen: B_details},
  B_join: {screen: B_join},
  B_invite: {screen: Invite_people},
});

// // export default BusinessApp
//
// export default class BusinessAppScreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       goToScreen: 'MapScreen',
//     }
//   }
//   componentWillMount(){
//     this.setState({goToScreen: this.props})
//     // alert(this.state.goToScreen)
//   }
//   render(){
//     return(
//       <BusinessApp screenProps={this.state.goToScreen} />
//     )
//   }
// }
