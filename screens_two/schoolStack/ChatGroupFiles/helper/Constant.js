import React, { Component } from 'react';
import {
  AsyncStorage,
} from 'react-native';
export const IS_LOGIN = 'kyndor_isLogin';

 export const API_TOKEN =  'eyJlbWFpbCI6ImZpZnRoQHVzZXIuY29tIiwibmFtZSI6ImZpZnRoVXNlciIsInByb2ZpbGVfcGljIjoiaHR0cHM6Ly9zdGFnaW5na3luZG9yLmItY2RuLm5ldC9maWxlcy81MDM5YmM0YWM3M2U1YTMwMmNlNmJhZWEwZDdlNTJjMi5qcGciLCJqb2luX2RhdGUiOiIxNTIzMDIxNjY0MjY1IiwidXNlcl9pZCI6NjksImZhY2Vib29rIjoiTk8iLCJhY3RpdmUiOmZhbHNlLCJ6aXBfY29kZSI6Nzc4ODksImFib3V0IjoiQW0gdGhlIGZpZnRoIGVsZW1lbnQiLCJ1c2VyX3R5cGUiOiJ1c2VyIiwicmVmZXJyZWRfYnkiOm51bGwsInBob25lIjoiOTE3MzgxMDM5MDQ0IiwiaXNfZW1haWxfdmVyaWZpZWQiOnRydWUsImlzX3Bob25lX3ZlcmlmaWVkIjp0cnVlLCJpYXQiOjE1MzgxOTM5MTAsImV4cCI6MTg4MTgxOTM5MTB9.Q1Jimazv47b9OFX05w_EScX4cKFYO4SMUm4sDXimY9E';

export const chatGroup = require('../../../../images/chatgroup.png');
export const group = require('../../../../images/invitemember.png');

// BASE URL
export const BASE_URL = 'https://staging-api.kyndor.com/';

export const CREATE_GROUP_URL = BASE_URL + 'groups/channel/create';
export const ADD_MEMBER_GROUP_URL = BASE_URL + 'add/people';
export const IMAGE_UPLOAD_URL = BASE_URL + 'upload';
export const GET_MEMBER_URL = BASE_URL + 'groups/participants/1730';
export const GET_GROUP_URL = BASE_URL + 'groups/channels/1730';
export const SEND_INVITATION_URL = BASE_URL + 'add/people';

// <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
//
//    <Switch
//    onValueChange={this.onChangeSwitch}
//    value={this.state.toggleSwitch}
//    />
//  </View>
