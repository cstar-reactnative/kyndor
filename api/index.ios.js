import RNFetchBlob from 'react-native-fetch-blob'

import AppConfig from '../config.js'
const url = AppConfig.apiLoc
var apiCalls={};

// the API calls go here

apiCalls.createUser=(data,cb)=>{
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

apiCalls.forgotPassWord = (email,cb)=>{
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
    cb(error);
  });
}

apiCalls.login = (data,cb)=>{
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

apiCalls.resetPassword = (data,cb)=>{
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

apiCalls.myProfile = (token, cb)=>{
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

apiCalls.changePassword = (data,cb)=>{
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

apiCalls.myProfileUpdate = (data, cb) => {
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

apiCalls.getAllSchools = (data,cb)=>{
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

apiCalls.getAllBusiness = (data,cb)=>{
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

apiCalls.getMyGroups = (data,cb)=>{
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

apiCalls.announcements = (data,cb)=>{
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

apiCalls.notifications = (data,cb)=>{
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

apiCalls.getGroupInfo = (data,cb)=>{
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

apiCalls.sendInviteRequest = (data,cb)=>{
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

apiCalls.nearbySchools = (data,cb)=>{
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

apiCalls.createGroup = (data,cb)=>{
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

apiCalls.getGroupParticipants = (data,cb)=>{
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

apiCalls.getGroupChannels = (data,cb)=>{
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

apiCalls.nearbyBusiness = (data,cb)=>{
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

apiCalls.listGroupRequest = (data,cb)=>{
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

apiCalls.acceptJoinRequest = (data,cb)=>{
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

apiCalls.subscribeChannel = (data,cb)=>{
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

apiCalls.unSubscribeChannel = (data,cb)=>{
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

apiCalls.createChannel = (data,cb)=>{
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

apiCalls.privateChannel = (data,cb)=>{
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

apiCalls.sendChatInviteRequest = (data,cb)=>{
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

apiCalls.nearbyBusinessWithFilter = (data,cb)=>{
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

apiCalls.listChannelRequest = (data,cb)=>{
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

apiCalls.acceptChannelJoinRequest = (data,cb)=>{
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

apiCalls.joinChannelAction = (data,cb)=>{
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

apiCalls.joinGroupAction = (data,cb)=>{
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

apiCalls.addConncetion = (data)=>{
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

apiCalls.getMyConnections = (data,cb)=>{
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

apiCalls.uploadFile = (data,cb)=>{
  console.log('@upload api')
  console.log(JSON.stringify(data.fileData))
  var uploadableFile = RNFetchBlob.wrap(data.fileData.image);
  //var uploadableFile = RNFetchBlob.wrap(data.fileData.filePath);
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
    //console.log('@api: Success upload: '+JSON.stringify(responseJson))
    cb(null, responseJson.data)
  })
  .catch((error) => {
    //console.log('@api: Failed upload: '+JSON.stringify(error))
    cb(error);
  });
}

apiCalls.getChannelInfo = (data,cb)=>{
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

apiCalls.getChannelMember = (data,cb)=>{
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

apiCalls.editChannelMembers = (data,cb)=>{
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

apiCalls.listGroupUpdates = (data,cb)=>{
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

apiCalls.listChannelUpdates = (data,cb)=>{
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

apiCalls.myOwnGroup = (data,cb)=>{
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

apiCalls.invitePeople = (data,cb)=>{
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

apiCalls.findBusiness = (data,cb)=>{
  var sendData = {
    zip: data.zip
  }

  if(data.name){
    sendData.name = data.name
  }

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

apiCalls.findSchool = (data,cb)=>{
  var sendData = {
    zip: data.zip
  }

  if(data.type){
    sendData.type = data.type
  }

  if(data.name){
    sendData.name = data.name
  }

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

apiCalls.addRequest = (data,cb)=>{
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

apiCalls.getVerbiage = (cb)=>{
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

apiCalls.getUnreadCount = (data,cb)=>{
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

apiCalls.resetUnreadCount = (data,cb)=>{
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

apiCalls.updateDevice = (data,cb)=>{
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

apiCalls.removeDevice = (data,cb)=>{
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

apiCalls.verifyOtp = (data,cb)=>{
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

apiCalls.resendOtp = (data,cb)=>{
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

apiCalls.joinGradeChannel = (data,cb)=>{
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

apiCalls.login2 = (data,cb)=>{
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

apiCalls.createUser2=(data,cb)=>{
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

apiCalls.verifyUser = (data,cb)=>{
  fetch(url+'/v2/verify/otp', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      "cache-control": "no-cache",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone: data.phone,
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

apiCalls.getBlogs = (data,cb)=>{
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

apiCalls.getGroupVibe = (data,cb)=>{
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

apiCalls.getLocalVibe = (data,cb)=>{
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

apiCalls.reactVibe = (data,cb)=>{
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

apiCalls.createUser3=(data,cb)=>{
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

apiCalls.completeProfile = (data,cb)=>{
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

apiCalls.getGroupLevel = (cb)=>{
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

apiCalls.getMyChatGroups = (data,cb)=>{
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

apiCalls.getVibe = (data,cb)=>{
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

apiCalls.createVibe = (data,cb)=>{
  fetch(url+'/vibe/create', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      "cache-control": "no-cache",
      'Content-Type': 'application/json',
      'x-access-token': data.token
    },
    // body: JSON.stringify({
    //   type:data.type,
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

module.exports=apiCalls;
