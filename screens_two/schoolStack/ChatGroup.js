import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, AppState, StatusBar
} from 'react-native';
import { Root } from 'native-base';
import colors from '@theme/colorsThree';
import Navigator from './ChatGroupFiles/action/Navigator';

export const tempArray = [
  {
    id: '1',
    name: 'Banned',
    avatar: 'https://pbs.twimg.com/profile_images/718314968102367232/ypY1GPCQ_400x400.jpg',
    description: 'Moderator'
  },
  {
    id: '2',
    name: 'BlackPillDealer',
    avatar: 'https://secure.i.telegraph.co.uk/multimedia/archive/02265/obama_2265374b.jpg',
    description: 'Moderator'
  },
  {
    id: '3',
    name: 'nazincel',
    avatar: 'https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg',
    description: 'Moderator'
  },
  {
    id: '4',
    name: 'nazincel',
    avatar: 'https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg',
    description: 'Moderator'
  },
  {
    id: '5',
    name: 'BlackPillDealer',
    avatar: 'https://secure.i.telegraph.co.uk/multimedia/archive/02265/obama_2265374b.jpg',
    description: 'Moderator'
  },
  {
    id: '6',
    name: 'BlackPillDealer',
    avatar: 'https://secure.i.telegraph.co.uk/multimedia/archive/02265/obama_2265374b.jpg',
    description: 'Moderator'
  },
  ,
  {
    id: '7',
    name: 'BlackPillDealer',
    avatar: 'https://secure.i.telegraph.co.uk/multimedia/archive/02265/obama_2265374b.jpg',
    description: 'Moderator'
  },
];

export const tempFavGroupArray = [
  {
    id: '1',
    name: 'Important Links',
    avatar: 'https://pbs.twimg.com/profile_images/718314968102367232/ypY1GPCQ_400x400.jpg',
    description: '50 Members'
  },
  {
    id: '2',
    name: 'Reminders',
    avatar: 'https://secure.i.telegraph.co.uk/multimedia/archive/02265/obama_2265374b.jpg',
    description: '50 Members'
  },
  {
    id: '3',
    name: 'nazincel',
    avatar: 'https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg',
    description: '30 Members'
  },
  {
    id: '4',
    name: 'nazincel',
    avatar: 'https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg',
    description: '20 Members'
  },
  {
    id: '5',
    name: 'BlackPillDealer',
    avatar: 'https://secure.i.telegraph.co.uk/multimedia/archive/02265/obama_2265374b.jpg',
    description: '10 Members'
  },
  {
    id: '6',
    name: 'BlackPillDealer',
    avatar: 'https://secure.i.telegraph.co.uk/multimedia/archive/02265/obama_2265374b.jpg',
    description: '50 Members'
  },
  ,
  {
    id: '7',
    name: 'BlackPillDealer',
    avatar: 'https://secure.i.telegraph.co.uk/multimedia/archive/02265/obama_2265374b.jpg',
    description: '5 Members'
  },
];

export const tempCustomeGroupArray = [
  {
    id: '1',
    name: 'Important Links',
    avatar: 'https://pbs.twimg.com/profile_images/718314968102367232/ypY1GPCQ_400x400.jpg',
    description: '50 Members'
  },
  {
    id: '2',
    name: 'Reminders',
    avatar: 'https://secure.i.telegraph.co.uk/multimedia/archive/02265/obama_2265374b.jpg',
    description: '50 Members'
  },
  {
    id: '3',
    name: 'nazincel',
    avatar: 'https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg',
    description: '30 Members'
  },
  {
    id: '4',
    name: 'nazincel',
    avatar: 'https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg',
    description: '20 Members'
  },
  {
    id: '5',
    name: 'BlackPillDealer',
    avatar: 'https://secure.i.telegraph.co.uk/multimedia/archive/02265/obama_2265374b.jpg',
    description: '10 Members'
  },
  {
    id: '6',
    name: 'BlackPillDealer',
    avatar: 'https://secure.i.telegraph.co.uk/multimedia/archive/02265/obama_2265374b.jpg',
    description: '50 Members'
  },
  ,
  {
    id: '7',
    name: 'BlackPillDealer',
    avatar: 'https://secure.i.telegraph.co.uk/multimedia/archive/02265/obama_2265374b.jpg',
    description: '5 Members'
  },
];

export default class ChatGroup extends Component {
  constructor(props) {
   super(props);
   this.state = {
     loading: true,
     isLogin: false,
     isConnected: true,
     fromLink: false,
     appState: AppState.currentState
   };
}

spinerRender() {
      return (
      <View style={{ flex: 1 }}>
        <Navigator isLogin={this.state.isLogin} />
      </View>
      );
    }

  render() {
    return (
      <Root style={styles.container}>
        <StatusBar backgroundColor={colors.indigoBlue} translucent={false} barStyle= "light-content" />
          {this.spinerRender()}
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


// ImageUpload1(){
//   const configure = { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'x-access-token': API_TOKEN } };
//   var data = new FormData();
//   data.append('theFile', { uri: this.state.groupImage, name: 'user.png', type: 'image/png' });
//   axios.post(IMAGE_UPLOAD_URL, data, configure)
//   .then((response) => {
//     if (response.data.success === true) {
//       console.log('Image Upload response:', response.data.result);
//       this.setState({ uploadedImagePath: response.data.result.theFile[0].filename })
//     } else {
//       console.log('Error:-', response.data.message);
//     }
//   })
//   .catch((error) => {
//     console.log(`Error:.. ${error.response.data}`);
//     this.setState({ message: `${error}`, loading: false });
//   });
// }
