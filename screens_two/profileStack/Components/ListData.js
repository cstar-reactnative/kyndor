export const Groups = [
  {
    name: "Favourite Chat Groups",
    icon_type: "ionicon",
    // icon_name: "ios-chatbubbles",
    icon_name: require('../../../images/profiles/profilechats.png'),
    bg_color: "#17a258",
    nav:'ChatList',
    from: 'profile'
  },
  {
    name: "My School Groups",
    icon_type: "ionicon",
    //icon_name: "ios-school",
    icon_name: require('../../../images/profiles/profileschools.png'),
    bg_color: "#32aee6",
    nav:'ViewSchool',
    from: 'profile'
  }
];

export const Activities = [
  // {
  //   name: "Invite Members",
  //   icon_type: "ionicon",
  //   //icon_name: "ios-person-add",
  //   icon_name: require('../../../images/profiles/profileinvitemembers.png'),
  //   bg_color: "#f7c620"
  // },
  {
    name: "Areas of Interest",
    icon_type: "ionicon",
    //icon_name: "ios-heart",
    icon_name: require('../../../images/profiles/profileareasofinteres.png'),
    bg_color: "#ff3b30",
    nav:'ProfileEdit',
    from: 'profile'
  },
  // {
  //   name: "My Activity",
  //   icon_type: "ionicon",
  //   //icon_name: "ios-calendar",
  //   icon_name: require('../../../images/profiles/group.png'),
  //   bg_color: "#17a258"
  // },
  {
    name: "My Notifications",
    icon_type: "ionicon",
    //icon_name: "ios-notifications",
    icon_name: require('../../../images/profiles/profilenotifications.png'),
    bg_color: "#6361e1",
    nav:'Notifications',
    from: 'profile'
  }
];

export const About = [
  // {
  //   name: "About Kyndor",
  //   icon_type: "ionicon",
  //   //icon_name: "ios-leaf",
  //   icon_name: require('../../../images/profiles/profilekyndor.png'),
  //   bg_color: "#6d3ccb",
  //   nav:'Home',
  //   from: 'profile'
  // },
  {
    name: "Account Settings",
    icon_type: "ionicon",
    //icon_name: "ios-settings",
    icon_name: require('../../../images/profiles/profilesettings.png'),
    bg_color: "#383e53",
    nav:'ProfileSettings',
    from: 'profile'
  }
];
