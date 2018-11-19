import React from "react";
import { TouchableOpacity } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import Colors from '@theme/colorsThree';

// const _Avatar = ({ name, type, bg_color }) => {
//   return (
//     <Avatar
//       icon={{
//         name,
//         type,
//         size: 22,
//         color: "#fff"
//       }}
//       containerStyle={{ marginLeft: 5 }}
//       overlayContainerStyle={{
//         backgroundColor: `${bg_color}`,
//         borderRadius: 8
//       }}
//     />
//   );
// };

export const ListView = ({ list, navi }) => {
  return (
    <TouchableOpacity>
      <ListItem
        // avatar={
        //   <_Avatar
        //     name={list.icon_name}
        //     type={list.icon_type}
        //     bg_color={list.bg_color}
        //   />
        // }
        title={list.name}
        titleStyle={{ fontFamily: "System", marginLeft: 10, fontSize: 16, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0, color: Colors.charcoalGrey }}
        avatarStyle={{backgroundColor: "#fff"}}
        avatar={list.icon_name}
        containerStyle={{
          //backgroundColor: "#fff",
          //borderBottomColor: "#fff",
          //borderRadius: 4
          borderStyle: "solid",
          borderBottomWidth: 1,
          borderBottomColor: "#f5f5f5"
        }}
        // onPress={()=>alert("I want this")}
        onPress={() => {navi(list.nav, {from:list.from})}}
      />
    </TouchableOpacity>
  );
};
