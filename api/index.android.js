// this contains all the API calls needed
import { NetInfo, Alert, Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob'

import AppConfig from '../config.js'
const url = AppConfig.apiLoc
var apiCalls={};

// the API calls go here

apiCalls.createUser=(data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/register', {
        method: 'POST',
        headers: {
          "Accept": 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          facebook: data.facebook,
          refferId: data.refferId
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.forgotPassWord = (email,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/forgotpassword', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);group
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.login = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      cb('offline')
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.resetPassword = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/resetPassword', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          code:data.code,
          new_password: data.password
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.myProfile = (token, cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/my/profile', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': token
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.changePassword = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/my/password/update', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          old_password: data.old,
          new_password: data.new
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.myProfileUpdate = (data, cb) => {
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/my/profile/update', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify(
          {
            field: data.field,
            value: data.value
          }
        ),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.getAllSchools = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/groups/search/school/'+data.zip, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.getAllBusiness = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/groups/search/business/'+data.zip+'/'+data.distance+'/'+data.typeId, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.getMyGroups = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/my/groups', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.announcements = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/announcements', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.notifications = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/my/notifications', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.getGroupInfo = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/groups/'+data.group_id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.sendInviteRequest = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/groups/request/join', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          groupId: data.groupId
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.nearbySchools = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/groups/nearby/school/'+data.lat+'/'+data.lon+'/'+data.radius, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.createGroup = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/groups/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          group_type: data.group_type,
          address: data.address,
          description: data.description,
          zip: data.zip,
          name: data.name
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.getGroupParticipants = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/groups/participants/'+data.group_id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.getGroupChannels = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/groups/channels/'+data.group_id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.nearbyBusiness = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/groups/nearby/business/'+data.lat+'/'+data.lon+'/'+data.radius, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.listGroupRequest = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/list/groups/request', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.acceptJoinRequest = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/groups/accept/join', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          subscriptionId: data.sid
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.subscribeChannel = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/groups/channels/subscribe/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          groupId: data.gid,
          channelId: data.cid
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.unSubscribeChannel = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/groups/channels/unsubscribe/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          groupId: data.gid,
          channelId: data.cid
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.createChannel = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/groups/channel/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          icon: data.icon,
          description: data.desc,
          access_type: data.access,
          group_id: data.gid,
          channel_name: data.c_name,
          member:data.member
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.privateChannel = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/my/private/channel', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.sendChatInviteRequest = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/group/channel/request/join', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          channelId: data.channelId
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.nearbyBusinessWithFilter = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/groups/filter/nearby/business/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          lat: data.lat,
          lon: data.lon,
          radius: data.rad,
          filters: data.filters
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.listChannelRequest = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/list/channel/request', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.acceptChannelJoinRequest = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/group/channel/accept/join', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          channel_sub_id: data.sid
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.joinChannelAction = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/group/channel/join/action', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          channel_sub_id: data.sid,
          state: data.state
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.joinGroupAction = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/groups/join/action', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          subscriptionId: data.sid,
          state: data.state
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.addConncetion = (data)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/me/add/connection', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          participant_one: data.p1,
          participant_two: data.p2
        }),
      })

      fetch(url+'/me/add/connection', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          participant_one: data.p2.toString(),
          participant_two: data.p1.toString()
        }),
      })
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.getMyConnections = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/my/connections', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.uploadFile = (data,cb)=>{
  console.log('@upload api')
  console.log(JSON.stringify(data.fileData))
  var uploadableFile = RNFetchBlob.wrap(data.fileData.image);

  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){

      RNFetchBlob.fetch('POST', url+'/upload', {
        'x-access-token': data.token,
        'Content-Type' : 'multipart/form-data'
      },[{
        name : 'theFile', // this is the field name which server is expecting the file to be in
        filename : data.fileData.fileName,
        data: uploadableFile // this is the parsed file
      }])

      // .then((response) => response.json())
      .then((responseJson) => {
        console.log('@api: Success upload: '+JSON.stringify(responseJson))
        cb(null, responseJson.data)
      })
      .catch((error) => {
        console.log('@api: Failed upload: '+JSON.stringify(error))
        cb(error);
      });

    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.getChannelInfo = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/channel/info/'+data.cid, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.getChannelMember = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/channel/members/'+data.cid, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.editChannelMembers = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/channel/edit/members', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          cid: data.cid,
          add: data.add,
          remove: data.remove
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.listGroupUpdates = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/updates/groups', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.listChannelUpdates = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/updates/channel', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.myOwnGroup = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/own/group', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.invitePeople = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/add/people', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          email: data.email,
          groupId: data.groupId,
          groupName: data.groupName
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.findBusiness = (data,cb)=>{
  var sendData = {
    zip: data.zip
  }

  if(data.name){
    sendData.name = data.name
  }

  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/find/business', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify(sendData),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.findSchool = (data,cb)=>{
  var sendData = {
    zip: data.zip
  }

  if(data.type){
    if(data.type != 'All'){
      sendData.type = data.type
    }
  }

  if(data.name){
    sendData.name = data.name
  }

  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/find/school', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify(sendData),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.addRequest = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/groups/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          address: data.address,
          type: data.type,
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.getVerbiage = (cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/verbiage', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.getUnreadCount = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/chat/unreads', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.resetUnreadCount = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/chat/unreads/reset/'+data.type+'/'+data.id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.updateDevice = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/device/update', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          device_id:data.d_info.device_id,
          brand:data.d_info.brand,
          carrier:data.d_info.carrier,
          country:data.d_info.country,
          device_name:data.d_info.device_name,
          app_first_installed:data.d_info.app_first_installed,
          manufacturer:data.d_info.manufacturer,
          model:data.d_info.model,
          systemName:data.d_info.systemName,
          systemVersion:data.d_info.systemVersion,
          timeZone:data.d_info.timeZone,
          unique_id:data.d_info.unique_id,
          app_version:data.d_info.app_version,
          isEmulator:data.d_info.isEmulator.toString(),
          isTablet:data.d_info.isTablet.toString(),
          fcm_token:data.fcm
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.removeDevice = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/delete/device', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          device_id: data.device_id,
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.verifyOtp = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/verify/otp', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          otp: data.otp,
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.resendOtp = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/resend/otp', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.joinGradeChannel = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/group/channel/grade/join', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          channelId: data.channelId
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.login2 = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/v2/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: data.phone
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      cb('offline')
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.createUser2=(data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/v2/register', {
        method: 'POST',
        headers: {
          "Accept": 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.verifyUser = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/v2/verify/otp', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp: data.otp,
          phone: data.phone
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.getBlogs = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/vibe/get/blog', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          level:data.level,
          data:data.data,
          limit:data.limit
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.getGroupVibe = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/vibe/get/groups', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          limit:data.limit
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.getLocalVibe = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/v2/vibe/get/local', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          limit:data.limit,
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.reactVibe = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/vibe/react', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          vid:data.vid,
          react:data.react
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.createUser3=(data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/v3/register', {
        method: 'POST',
        headers: {
          "Accept": 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname: data.fname,
          lname: data.lname,
          zip: data.zip,
          phone: data.phone
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.completeProfile = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/profile/complete', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          email: data.email,
          interests:data.interests,
          profile_pic:data.pic
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.getGroupLevel = (cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/level/groups/', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.getMyChatGroups = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/my/chatGroups', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      cb('offline');
    }
  });
}


apiCalls.getVibe = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/get/vibe', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        body: JSON.stringify({
          type:data.type,
          level:data.level,
          limit:data.limit
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      console.log('You are Offline. Please check your connection.')
    }
  });
}

apiCalls.createVibe = (data,cb)=>{
  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected){
      fetch(url+'/vibe/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "cache-control": "no-cache",
          'Content-Type': 'application/json',
          'x-access-token': data.token
        },
        // body: JSON.stringify({
        //   groupId: data.allData
        // }),
        body: data.allData
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(null, responseJson)
      })
      .catch((error) => {
        cb(error);
      });
    }
    else{
      alert('You are Offline. Please check your connection.')
    }
  });
}

module.exports=apiCalls;
