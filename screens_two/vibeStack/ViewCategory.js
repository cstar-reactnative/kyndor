import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  AsyncStorage,
  ScrollView,
  StatusBar
} from "react-native";
import { SafeAreaView } from 'react-navigation';
import { Toolbar, ThemeProvider } from "react-native-material-ui";

import colors from '@theme/colorsThree';
import { w, h } from "../common/helpers";

import { Vertical } from "../common/vibeComponent/cards";
import Button from "../common/vibeComponent/Button";
const api =  require('../../api/index');
import Stores from '../../stores/';
import { FloatingAction } from 'react-native-floating-action';

const actions = [{
    text: 'Create Event',
    icon: require('../../images/events/events.png'),
    name: 'bt_event',
    position: 1,
    textColor: colors.indigoBlue,
    color: colors.indigoBlue,
    textContainerStyle: {borderRadius: 50 },
    textStyle: {fontSize: w(14), fontWeight: "normal", fontStyle: "normal", letterSpacing: 0},
    nav: 'event'
  }, {
    text: 'Create Announcement',
    icon: require('../../images/announcements/announcements.png'),
    name: 'bt_announce',
    position: 2,
    textColor: colors.indigoBlue,
    color: colors.indigoBlue,
    textContainerStyle: {borderRadius: 50 },
    textStyle: {fontSize: w(14), fontWeight: "normal", fontStyle: "normal", letterSpacing: 0},
    nav: 'announcement'
  }, {
    text: 'Create Blog',
    icon: require('../../images/blog/blog.png'),
    name: 'bt_blog',
    position: 3,
    textColor: colors.indigoBlue,
    color: colors.indigoBlue,
    textContainerStyle: {borderRadius: 50 },
    textStyle: {fontSize: w(14), fontWeight: "normal", fontStyle: "normal", letterSpacing: 0},
    nav: 'blog'
  }];

const uiTheme = {
  fontFamily: 'System',
  palette: {
    primaryColor: colors.indigoBlue
  }
};

class ViewCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.state.params.data,
      //searchPressed: false,
      listData:this.props.navigation.state.params.data
    };
  }

  componentWillUnMount = () => {
    console.log('view_details will unmount')
  }

  loadCategoryVibes = () => {
    let title = this.props.navigation.state.params.title;
    let thisComp = this

    if(title == 'School Board'){
      // get my group vibes
      thisComp.setState({listData:Stores.vibeStore.getGroups()})
    }

    if(title == 'Local Board'){
      // get my local vibes
      thisComp.setState({listData:Stores.vibeStore.getLocals()})
    }

    if(title == 'Blogs'){
      // get blogs
      thisComp.setState({listData:Stores.vibeStore.getBlogs()})
    }

  }

  componentWillUnMount(){
    Stores.vibeStore.removeListener('VIBE_BLOGS');
    Stores.vibeStore.removeListener('VIBE_LOCALS');
    Stores.vibeStore.removeListener('VIBE_GROUPS');
  }

  componentDidMount = () => {
    this.loadCategoryVibes()

    let title = this.props.navigation.state.params.title;
    switch (title){
      case 'School Board':
      Stores.vibeStore.on('VIBE_GROUPS',(data)=>{
        this.setState({listData:data})
      });
      break;

      case 'Local Board':
      Stores.vibeStore.on('VIBE_LOCALS',(data)=>{
        this.setState({listData:data})
      });
      break;

      case 'Blogs':
      Stores.vibeStore.on('VIBE_BLOGS',(data)=>{
        this.setState({listData:data})
      });
      break;
    }
  }

  //onSearchPressed = () => this.setState({ searchPressed: true });
  //onSearchClosed = () => this.setState({ searchPressed: false });

  addItem = () => {
    alert("add item");
  };

  createVibe = vType => {
    console.log('createVibe clicked')
    console.log(vType)
    let navV = (vType == 'bt_event' ? 'event' : ((vType == 'bt_blog') ? 'blog' : 'announcement') )
    console.log(navV)
    let thisComp = this
    this.props.navigation.navigate("CreateVibe", {
      refresh:thisComp.loadCategoryVibes,
      vibeType: navV
    })
  }

  onItemPress = item => {
    console.log('@ view category: itme clicked: '+item.vibeType)
    console.log(JSON.stringify(item))
    let thisComp = this

    if(item.vibeType == "blog"){
      this.props.navigation.navigate("Blog", {
        refresh:thisComp.loadCategoryVibes,
        url: item.url,
        title: item.title
      })
    }
    else{
      this.props.navigation.navigate("Details", {
        refresh:thisComp.loadCategoryVibes,
        data: this.state.data,
        item
      });
    }
  };

  renderItem = ({ item }) => {
    return <Vertical item={item} onPress={() => this.onItemPress(item)} />;
  };

  renderList = data => {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          // data={data}
          data={this.state.listData}
          contentContainerStyle={{
            backgroundColor: colors.paleGrey,
            paddingHorizontal: w(17),
            paddingTop: h(17),
            paddingBottom: h(70)
          }}
          keyExtractor={(i, k) => `${k}`}
          renderItem={this.renderItem}
          ItemSeparatorComponent={() => (
            <View style={{ width: w(335), height: h(14) }} />
          )}
        />
      </View>
    );
  };

  renderAddBtn = () => {
    return (
      // <Button
      //   icon="md-add"
      //   onPress={this.addItem}
      //   style={{
      //     position: "absolute",
      //     right: 0,
      //     bottom: 0,
      //     width: w(55),
      //     height: w(55),
      //     marginRight: w(20)
      //   }}
      // />
      <FloatingAction
        actions={actions}
        color={colors.indigoBlue}
        iconWidth={25}
        iconHeight={25}
        onPressItem={
          (nav) => {
            this.createVibe(nav)
          }
        }
      />

    );
  };

  render() {
    const { title } = this.props.navigation.state.params;
    const { data } = this.state;

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.indigoBlue}}>
        <ThemeProvider uiTheme={uiTheme}>
          <StatusBar backgroundColor={colors.indigoBlue} translucent={false} barStyle= "light-content" />
          <View style={{ backgroundColor: colors.paleGrey, flex: 1 }}>
            <Toolbar
              style={styles.toolBar}
              leftElement="arrow-back"
              onLeftElementPress={() => {
                this.props.navigation.state.params.refresh()
                this.props.navigation.goBack()
              }}
              centerElement={title}
              // searchable={{
              //   autoFocus: true,
              //   placeholder: "Search",
              //   onSearchPressed: () => this.onSearchPressed(),
              //   onSearchClosed: () => this.onSearchClosed(),
              //   onSearchCloseRequested: () => this.onSearchClosed()
              // }}
            />
            {this.renderList(data)}
            {this.renderAddBtn(title)}
          </View>
        </ThemeProvider>
      </SafeAreaView>
    );
  }
}

export default ViewCategory;

const styles = {
  toolBar: {
    container: { backgroundColor: colors.indigoBlue },
    centerElementContainer: { alignItems: "center", paddingRight: w(50) },
    titleText: { fontFamily: 'System', color: colors.white, fontSize: w(18), fontWeight: "600", fontStyle: "normal", letterSpacing: 0,textAlign: "center", }
  }
};
