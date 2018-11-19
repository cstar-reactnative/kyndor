import React from 'react';
import { Platform } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import CreateChatGroup from '../pages/CreateChatGroup';
import MemberList from '../pages/MemberList';
import SubGroupList from '../pages/SubGroupList';
import InviteMember from '../pages/InviteMember';
import ContactList from '../pages/ContactList';

const Navigator = (props) => {
  return (
    <Router
      barButtonIconStyle={{ tintColor: '#000' }}
      navBarButtonColor='#000'
      navigationBarStyle={{ ...Platform.select({
        android: {
          //  marginTop: StatusBar.currentHeight
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        }
      })
      }}
    >
      <Scene key="root">
        <Scene
          type='reset'
          key="createchatgroup"
          component={CreateChatGroup} hideNavBar={'true'}

          />
          <Scene
            key="subgrouplist"
            component={SubGroupList} hideNavBar={'true'}
            initial={!props.isLogin}
          />
          <Scene
            key="memberlist"
            component={MemberList} hideNavBar={'true'}
          />
          <Scene
            key="invitemember"
            component={InviteMember} hideNavBar={'true'}
          />
          <Scene
            key="contactlist"
            component={ContactList} hideNavBar={'true'}
          />
      </Scene>
    </Router>
  );
};
export default Navigator;
