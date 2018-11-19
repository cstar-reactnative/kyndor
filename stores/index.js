// this file only exports all the available stores
import groupStore from './groupStore.js';
import preferenceStore from './preferenceStore.js';
import screenStore from './screenStore.js';
import locationStore from './locationStore.js';
import filterStore from './filterStore.js';
import privateChannelStore from './privateChannelStore.js';
import announcementStore from './announcementStore.js';
import rootNavStore from './rootNavStore.js';
import groupChannelStore from './groupChannelStore.js';
import searchStore from './searchStore.js';
import chatStore from './chatStore.js';
import homeTabStore from './homeTabStore.js';
import chartStore from './chartStore.js';
import myGroupStore from './myCreatedGroupStore.js';
import webPageData from './webPageData.js';
import verbiageStore from './verbiageStore.js';
import unreadCountStore from './unreadCountStore.js';
import deviceInfo from './deviceInfo.js';
import pushStore from './pushStore.js';
import vibeStore from './vibeStore.js';

const stores = {
  webPageData,
  pushStore,
  myGroupStore,
  chartStore,
  homeTabStore,
  chatStore,
  announcementStore,
  filterStore,
  groupStore,
  preferenceStore,
  screenStore,
  locationStore,
  privateChannelStore,
  rootNavStore,
  groupChannelStore,
  searchStore,
  unreadCountStore,
  deviceInfo,
  vibeStore,
  verbiageStore
}

module.exports = stores;
