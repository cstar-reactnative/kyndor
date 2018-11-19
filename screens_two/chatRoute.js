import { createStackNavigator } from "react-navigation";

import ChatList from "./chat/chatList";
import ChatScreen from "../screens/chat/singleChat.js";
import RequestGrade from '../screens/chat/requestGrade.js';
import ChatInvite from '../screens/chat/chat_invite.js';
import RequestSent from '../screens/chat/request_sent.js';

export default createStackNavigator(
  {
    ChatList: { screen: ChatList },
    ChatScreen: { screen: ChatScreen },
    RequestGrade: { screen: RequestGrade },
    ChatInvite: { screen: ChatInvite },
    RequestSent: {screen:RequestSent}
  },
  {
    headerMode: () => null
  }
);
