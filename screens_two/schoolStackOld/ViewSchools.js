import React, { Component } from "react";
import { View, Text, SectionList, StatusBar, TouchableOpacity } from "react-native";
import { Toolbar, ThemeProvider } from "react-native-material-ui";
import { SafeAreaView } from 'react-navigation';
import ListItem from "../common/schoolComponent/ListItem";
import Button from "../common/schoolComponent/Button";

import { w, h } from "../common/helpers";
import colors from '@theme/colorsThree';

import Stores from '../../stores/';

const uiTheme = {
  fontFamily: 'System',
  palette: {
    primaryColor: colors.indigoBlue
  }
};

class ViewSchool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: school
    };
  }

  componentWillUnMount(){
    Stores.groupChannelStore.removeListener('GROUP_DATA');
  }

  componentDidMount = () => {
    this.getData()

    Stores.groupChannelStore.on('GROUP_DATA',(data)=>{
      this.getData()
    });
  }

  getData = () => {
    let itemArray = Stores.groupChannelStore.getData()
    let schoolArray = []
    if(itemArray){
      itemArray.forEach(function(i){
        if(i.group_type == 'general') {
          schoolArray.push(i)
        }
      })
    }

    if(schoolArray.length > 0){
      this.setState({schools: schoolArray});
    }
    else{
      this.props.navigation.replace('FindSchool')
    }

  }

  renderItem = item => {
    let icon = "";
    switch (item.item.state) {
      case 1:
        icon = "check";
        break;
      case 0:
        icon = "hourglass";
        break;
      case -1:
        icon = "close";
        break;
    }
    return(
      <TouchableOpacity
        onPress={() => {

          if(item.item.state === 1){
            console.log(JSON.stringify(item.item))
            Stores.screenStore.setData({
              tab: 'school',
              screen: 'SchoolDetailsScreen',
              info: {
                group_id: item.item.group_id,
                group_name: item.item.name,
                group_address: item.item.school_address,
                fromHome: false,
              }
            });
            // this.props.navi.navigate('SchoolRoute');
            let sendData = {
              group_id: item.item.group_id,
              group_name: item.item.name,
              group_address: item.item.school_address,
            }
            Stores.groupStore.setData(sendData);
            console.log('sendData: '+ JSON.stringify(sendData));
            this.props.navigation.navigate('SchoolDetails',sendData);
          }

        }}>
        <ListItem data={item} icon={icon} />
      </TouchableOpacity>
    )
  };

  renderSectionHeader = ({ section }) => {
    return (
      <View
        style={{ paddingLeft: w(21), paddingBottom: h(14), paddingTop: h(20), backgroundColor: colors.paleGrey}}
      >
        <Text
          style={{
            fontFamily: 'System',
            color: colors.charcoalGrey,
            fontWeight: "600",
            fontSize: w(20)
          }}
        >
          {section.title}
        </Text>
        <Text
          style={{
            fontFamily: 'System',
            color: colors.charcoalGrey,
            fontWeight: "400",
            fontSize: w(12)
          }}
        >
          {section.subtext}
        </Text>
      </View>
    );
  };

  render() {
    const data = this.state.schools;
    const add = data.filter((val, indx) => val.state === 1);
    const pend = data.filter(
      (val, indx) => val.state === 0 || val.state === -1
    );
    const added = {
      title: "Added School Groups",
      subtext: "List of school groups added",
      data: add
    };
    const pending = {
      title: "Pending School Groups",
      subtext: "List of school groups pending for approval & rejected",
      data: pend
    };
    const schools = [added, pending];
    // const scahools = data.reduce((acc, next, index) => {
    //   console.log("heck", next);
    //   if (next.status === "added") {
    //     acc.concat({
    //       title: "Schools Added",
    //       subtext: "List of school groups added",
    //       data: next
    //     });
    //     return acc;
    //   }
    //   // if (next.status === "pending") {
    //   //   acc.concat({
    //   //     title: "Pending Schools",
    //   //     subtext: "List of school groups pending for approval & rejected",
    //   //     data: next
    //   //   });
    //   //   return acc;
    //   // }
    //   return acc;
    // }, []);
    // console.log(schools);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.indigoBlue}}>
        <ThemeProvider uiTheme={uiTheme}>
          <StatusBar backgroundColor={colors.indigoBlue} translucent={false} barStyle= "light-content" />
          <View style={styles.container}>
            <Toolbar
              style={styles.toolBar}
              // leftElement="arrow-back"
              onLeftElementPress={() => this.props.navigation.goBack()}
              centerElement="Your Schools"
            />

            <SectionList
              //stickySectionHeadersEnabled
              renderItem={item => this.renderItem(item)}
              renderSectionHeader={this.renderSectionHeader}
              sections={schools}
              keyExtractor={(item, index) => item + index}
              contentContainerStyle={{ paddingBottom: h(70) }}
              showsVerticalScrollIndicator={false}
            />
            <Button
              onPress={() => this.props.navigation.navigate('FindSchool')}
              icon="md-add"
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: w(55),
                height: w(55),
                marginRight: w(20)
              }}
            />
          </View>
        </ThemeProvider>
      </SafeAreaView>
    );
  }
}

export default ViewSchool;

const styles = {
  container: {
    backgroundColor: colors.paleGrey,
    flex: 1
  },

  toolBar: {
    container: { backgroundColor: colors.indigoBlue },
    centerElementContainer: { alignItems: "center", marginRight: w(40) },
    titleText: { fontFamily: 'System', color: colors.white, fontSize: w(18), fontWeight: "600", fontStyle: "normal", letterSpacing: 0,textAlign: "center", }
  }
};

const school = [
  {
    name: "Elementary school",
    type: "elementary",
    zip: "77494",
    members: [1, 2, 3, 4, 5, 6, 7, 8],
    status: "pending"
  },
  {
    name: "Cornerstone EL School",
    type: "elementary",
    zip: "77494",
    members: [1, 2, 3, 4, 5, 6, 9, 5, 5, 7, 8],
    status: "added"
  },
  {
    name: "Jenks Elementary School",
    type: "elementary",
    zip: "77495",
    members: [1, 2, 8],
    status: "pending"
  },
  {
    name: "Another Primary school",
    type: "primary",
    zip: "77495",
    members: [1, 2, 3, 4, 5, 6, 9, 5, 5, 7, 8],
    status: "added"
  },
  {
    name: "One more Elementary school",
    type: "elementary",
    zip: "77496",
    members: [1, 2, 3, 4, 5, 6, 9, 5, 5, 7, 8],
    status: "added"
  },
  {
    name: "One more Primary school",
    type: "primary",
    zip: "77496",
    members: [1, 2, 8],
    status: "pending"
  },
  {
    name: "Primary school",
    type: "primary",
    zip: "77496",
    members: [1, 2, 8],
    status: "pending"
  },
  {
    name: "Elementary school",
    type: "elementary",
    zip: "77494",
    members: [1, 2, 3, 4, 5, 6, 7, 8],
    status: "rejected"
  },
  {
    name: "Cornerstone EL School",
    type: "elementary",
    zip: "77494",
    members: [1, 2, 3, 4, 5, 6, 9, 5, 5, 7, 8],
    status: "added"
  },
  {
    name: "Jenks Elementary School",
    type: "elementary",
    zip: "77495",
    members: [1, 2, 8],
    status: "rejected"
  },
  {
    name: "Another Primary school",
    type: "primary",
    zip: "77495",
    members: [1, 2, 3, 4, 5, 6, 9, 5, 5, 7, 8],
    status: "added"
  },
  {
    name: "One more Elementary school",
    type: "elementary",
    zip: "77496",
    members: [1, 2, 3, 4, 5, 6, 9, 5, 5, 7, 8],
    status: "added"
  },
  {
    name: "One more Primary school",
    type: "primary",
    zip: "77496",
    members: [1, 2, 8],
    status: "rejected"
  },
  {
    name: "Primary school",
    type: "primary",
    zip: "77496",
    members: [1, 2, 8],
    status: "rejected"
  }
];
