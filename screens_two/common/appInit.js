import { AsyncStorage, Platform } from "react-native";
const api =  require('../../api/index');
import Stores from '../../stores/';
var DeviceInfo = require('react-native-device-info');
import FCM from 'react-native-fcm';
import { registerKilledListener, registerAppListener } from "../../screens/common/push_listeners";
registerKilledListener();

var appInit={};

appInit.updateDeviceInfo=(fcm)=>{
  var thisComp = this
  AsyncStorage.getItem('@KyndorStore:token', (err, token) => {
    if(err){
      alert(err)
    }
    else{
      api.updateDevice({
        token:token,
        fcm:fcm,
        d_info: appInit.d_info
      },
      (e, r) => {
        if(e){
          console.log("updateDeviceInfo Error: ");
          console.log(e)
        }
        else{
          if(r.success == true){
            console.log('updateDeviceInfo success')
          }
          else {
            console.log('updateDeviceInfo Error');
          }
          console.log(r)
        }
      })
    }
  });
}

appInit.registerFCM = () => {
  try {
    FCM.requestPermissions({ badge: true, sound: true, alert: true });
    const token = FCM.getFCMToken();
    console.log('getFCMToken token: '+token)
    appInit.updateDeviceInfo(token)
  }
  catch(e) {
    console.log('token error: '+e)
  }
  if (Platform.OS === "ios") {
    FCM.getAPNSToken().then(token => {
      console.log("APNS TOKEN: ", token);
    });
  }
}

appInit.getPrivateChannel = () => {
  AsyncStorage.getItem('@KyndorStore:token', (err, item) => {
    if(err){
      // alert(err)
    }
    else{
      api.privateChannel({token: item}, (e, r) => {
        if(e){
          // alert("Error: "+e);
        }
        else{
          if(r.success == true){
            Stores.privateChannelStore.setData(r.result);
          }
          else {

          }
        }
      })
    }
  });
}

appInit.start = () => {
  appInit.d_info = {
    device_id: DeviceInfo.getDeviceId(),
    brand: DeviceInfo.getBrand(),
    carrier: DeviceInfo.getCarrier(),
    country: DeviceInfo.getDeviceCountry(),
    device_name: DeviceInfo.getDeviceName(),
    app_first_installed: DeviceInfo.getFirstInstallTime(),
    manufacturer: DeviceInfo.getManufacturer(),
    model: DeviceInfo.getModel(),
    systemName: DeviceInfo.getSystemName(),
    systemVersion: DeviceInfo.getSystemVersion(),
    timeZone: DeviceInfo.getTimezone(),
    unique_id: DeviceInfo.getUniqueID(),
    app_version: DeviceInfo.getVersion(),
    isEmulator: DeviceInfo.isEmulator(),
    isTablet: DeviceInfo.isTablet()
  }
  Stores.deviceInfo.setData(appInit.d_info)
  appInit.registerFCM();
  Stores.vibeStore.updateAll()
  appInit.getPrivateChannel();
  Stores.chatStore.updateData()
  Stores.groupChannelStore.updateData();
  // Stores.unreadCountStore.updateData();
}

module.exports = appInit;
