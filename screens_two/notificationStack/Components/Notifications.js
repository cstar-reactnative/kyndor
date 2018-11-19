import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import {RequestList} from './RequestList';
import {NotifyList} from './NotifyList';

export const Notifications = ({groupNotification, groupUpdates, channelNotification, channelUpdates}) => {
  return (
    <View>
      {groupNotification.map((list, i) => {
        return <RequestList key={i} list={list} />
      })}

      {groupUpdates.map((list, i) => {
        return <RequestList key={i} list={list} />
      })}

      {channelNotification.map((list, i) => {
        return <NotifyList key={i} list={list} />
      })}

      {channelUpdates.map((list, i) => {
        return <NotifyList key={i} list={list} />
      })}
    </View>
  );
};
