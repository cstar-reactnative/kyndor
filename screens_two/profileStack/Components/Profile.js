import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ListItem, Button } from "react-native-elements";
import Colors from '@theme/colorsThree';
import { UserinfoList } from "./UserinfoList";
import { ListView } from "./ListView";

import { Groups, Activities, About } from "./ListData";

export const Profile = ({ user, nav }) => {
  return (
    <View>
      <UserinfoList user={user} />
      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:5}}>
        <View style={{paddingBottom: 450}}>
          <View style={styles.item}>
            {Groups.map((list, i) => {
              return <ListView key={i} list={list} navi={nav} />;
            })}
          </View>
          <View style={styles.item}>
            {Activities.map((list, i) => {
              return <ListView key={i} list={list} navi={nav} />;
            })}
          </View>
          <View style={styles.item}>
            {About.map((list, i) => {
              return <ListView key={i} list={list} navi={nav} />;
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginTop: 20,
    borderRadius: 4,
  backgroundColor: Colors.white,
  shadowColor: "rgba(0, 0, 0, 0.13)",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowRadius: 4,
  shadowOpacity: 1
  }
});
