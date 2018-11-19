import React, { Component } from "react";
import { View, TextInput, Text, FlatList, Alert, AsyncStorage, ImageBackground, TouchableOpacity, StatusBar, ActivityIndicator } from "react-native";
import { Toolbar, ThemeProvider } from "react-native-material-ui";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from 'react-navigation';
import ListItem from "../common/schoolComponent/ListItem";
import PopUpModal from "../common/schoolComponent/PopUpModal";
import { w, h } from "../common/helpers";
import colors from '@theme/colorsThree';
import Stores from '../../stores/';
const api =  require('../../api/index');

const uiTheme = {
  palette: {
    primaryColor: colors.indigoBlue
  }
};

class AddSchool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      schools: [],
      pending:[],
      accepted:[],
      rejected:[],
      // selected:[0,1],
      value: "",
      visible: false,
      addedSchoolName: "",
      loading:false,
      myName:''
    };
  }

  componentWillUnMount(){
    Stores.groupChannelStore.removeListener('GROUP_DATA');
  }

  componentDidMount = () => {
    let thisComp = this
    this.getAllData()
    Stores.groupChannelStore.on('GROUP_DATA',(data)=>{
      this.getAllData()
    });

    const myName = AsyncStorage.getItem('@KyndorStore:myName');

    AsyncStorage.getItem('@KyndorStore:myName', (err, nameItem) => {
      if(err){
        console.log(err)
      }
      else{
        thisComp.setState({
          myName:nameItem
        })
      }
    });
  }

  getAllData = () => {
    let myGroups = Stores.groupChannelStore.getData();
    console.log('myGroups: '+JSON.stringify(myGroups))
    let thisComp = this
    let groupIds1 = []
    let groupIds2 = []
    let groupIds3 = []
    for(x in myGroups){
      console.log(myGroups[x].group_id + ' - ' + myGroups[x].state)

      if(myGroups[x].state == -1){
        groupIds1.push(myGroups[x].group_id)
      }
      if(myGroups[x].state == 0){
        groupIds2.push(myGroups[x].group_id)
      }
      if(myGroups[x].state == 1){
        groupIds3.push(myGroups[x].group_id)
      }
    }
    console.log('pending: '+JSON.stringify(groupIds2))
    console.log('accepted: '+JSON.stringify(groupIds3))
    console.log('rejected: '+JSON.stringify(groupIds1))

    this.setState({
      accepted:groupIds3,
      pending:groupIds2,
      rejected:groupIds1
    });

    console.log('pending: '+JSON.stringify(this.state.pending))
    console.log('accepted: '+JSON.stringify(this.state.accepted))
    console.log('rejected: '+JSON.stringify(this.state.rejected))

    let filterData = this.props.navigation.state.params.data
    console.log('@ add school')
    console.log(filterData)
    if((filterData.zip != undefined) && (filterData.name != undefined)){
      let searchTxt = filterData.zip + ', ' + filterData.name
      thisComp.setState({
        value:searchTxt
      })
    }
    else{
      if(filterData.zip == undefined){
        thisComp.setState({
          value:filterData.name
        })
      }
      else if (filterData.name == undefined){
        thisComp.setState({
          value:filterData.zip
        })
      }
    }
    // call filter API
    // var schoolLevel = ''
    // switch(filterData.type) {
    //   case 'Elementary':
    //   schoolLevel = 'ELEMENTARY';
    //   break;
    //
    //   case 'High':
    //   schoolLevel = 'SENIOR';
    //   break;
    //
    //   case 'Middle':
    //   schoolLevel = 'JUNIOR';
    //   break;
    //
    //   // case 'Charter Schools':
    //   // schoolLevel = 'CHARTER';
    //   // break;
    //
    //   case 'Private':
    //   schoolLevel = 'PRIVATE';
    //   break;
    // }

    AsyncStorage.getItem('@KyndorStore:token', (err, tokenitem) => {
      if(err){
        console.log(err)
      }
      else{
        thisComp.setState({loading:true})
        api.findSchool({
          name: filterData.name,
          zip: filterData.zip,
          type: filterData.type,
          token: tokenitem
        }, (e, r) => {
          if(e){
            // loaderHandler.hideLoader();
            console.log("Error: "+e);
            thisComp.setState({loading:false})
          }
          else{
            if(r.success == true){
              thisComp.setState({loading:false})
              this.setState({schools: r.result.result});
              // if(r.result.result.length > 20){
              //   Alert.alert(
              //     'School search',
              //     'Your search has more than maximum limit of results. Please add more data to search.',
              //     [
              //       //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              //       {text: 'OK', onPress: () => this.props.navigation.goBack()},
              //     ],
              //     { cancelable: false }
              //   )
              // }
              // else if(r.result.result.length == 0){
              //   Alert.alert(
              //     'School search',
              //     'No result found. Please add more data to search.',
              //     [
              //       //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              //       {text: 'Add more data to search', onPress: () => this.props.navigation.goBack()},
              //       // {text: 'Request to add School', onPress: () => navigate('SchoolAdd')},
              //     ],
              //     { cancelable: false }
              //   )
              // }
              // else{
              //   this.setState({schools: r.result.result});
              // }
            }
            else {
              thisComp.setState({loading:false})
              // alert('Failed!');
            }
          }
        })
      }
    });

  }

  onAddSchool = item => {
    let thisComp = this
    // thisComp.setState({clicked:true})
    console.log("add school", item);
    this.setState({ addedSchoolName: item.name });
    // call request school api
    AsyncStorage.getItem('@KyndorStore:token', (err, tokenItem) => {
      if(err){
        console.log("Error1: "+err);
      }
      else{
        api.sendInviteRequest({groupId:item.group_id, token:tokenItem}, (e, r) => {
          console.log("R: "+JSON.stringify(r))
          if(e){
            console.log("Error2: "+e);
          }
          else{
            console.log("R: "+JSON.stringify(r))
            if(r.success == true){
              // update store
              Stores.groupChannelStore.updateData();
              thisComp.showModal();
              // thisComp.getAllData()
            }
            else {

            }
          }
        })
      }
    });
  };

  centerElement = () => {
    return (
      <View style={styles.search}>
        <View style = {{marginTop:6}}>
          <Ionicons name="ios-search" color="#fff" size={25} />
        </View>
        <TextInput
          placeholder="Search"
          placeholderTextColor={colors.blueGrey}
          style={styles.searchInput}
          underlineColorAndroid="transparent"
          value={this.state.value}
          editable={false}
          onChangeText={text => this.setState({ value: text })}
        />
      </View>
    );
  };

  checkGroup = (gid) => {
    console.log('@check group: '+JSON.stringify(gid))
    if(this.state.pending.includes(gid)){
      console.log("hourglass")
      return "hourglass"
    }
    else if(this.state.accepted.includes(gid)){
      console.log("check")
      return "check"
    }
    else if(this.state.rejected.includes(gid)){
      console.log("close")
      return "close"
    }
    else{
      console.log("add")
      return "add"
    }
  }

  renderItem = item => (
    <ListItem
      data={item}
      onAddIconPress={this.onAddSchool}
      icon={this.checkGroup(item.item.group_id)}
      // selected={this.state.selected}
    />
  );

  renderList = () => {
    return (
      <FlatList
        data={this.state.schools}
        renderItem={this.renderItem}
        keyExtractor={(i, k) => `${k}`}
        contentContainerStyle={{ paddingBottom: h(40) }}
        ListHeaderComponent={this.renderNoSchool}
        ListFooterComponent={this.renderFooter}
        //ListEmptyComponen={this.renderEmpty}
      />
    );
  };

  // renderEmpty = () => {
  //   return(
  //     <View style={{flex: 1}}>
  //       <ImageBackground
  //         source={ require("../../images/school_search.png") }
  //         style={{
  //           flex: 1,
  //           width: w(120),
  //           height: h(145),
  //           marginTop: h(40),
  //           justifyContent: 'center',
  //           alignSelf: 'center'
  //         }}
  //         resizeMode="contain"
  //       resizeMethod="resize">
  //       </ImageBackground>
  //
  //       <Text style={styles.titleText}>
  //         {"Sorry, no schools found."}
  //       </Text>
  //
  //       <View style={{alignItems: "center",
  //         paddingVertical: h(10),
  //       }}>
  //         <TouchableOpacity style={{
  //           backgroundColor: colors.indigoBlue,
  //           alignItems: "center",
  //           justifyContent: "center",
  //           borderRadius: w(30),
  //           width: w(250),
  //           height: h(40)}}>
  //           <Text
  //             style={{
  //               fontFamily: "System",
  //               fontSize: 15,
  //               fontWeight: "600",
  //               letterSpacing: 0.32,color:colors.white,paddingVertical: h(20)
  //             }}
  //             onPress={() => this.props.navigation.goBack()}
  //           >
  //             Search Again
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // }

  renderFooter = () => {
    if(this.state.loading){
      return(
        <View>
          {/* <Text style={styles.titleText}>
            {"Add your schools to get latest updates"}
          </Text> */}
        </View>
      );
    }
    else{
    if(this.state.schools.length && this.state.schools.length > 0)
    {
      return(
        <View style={{alignItems: "center",
          paddingVertical: h(10), marginTop: 25,
        }}>
          <Text style={{fontFamily: "System",
            fontSize: 20,
            fontWeight: "normal",
            fontStyle: "normal",
            lineHeight: 22,
            letterSpacing: 0,
            textAlign: "center",
            padding: 15,
          color: colors.charcoalGrey}}> {"Didnt find your school here?"} </Text>
          <TouchableOpacity style={{
            backgroundColor: colors.indigoBlue,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: w(30),
            width: w(250),
            height: h(40)}}>
            <Text
              style={{
                fontFamily: "System",
                fontSize: 15,
                fontWeight: "600",
                letterSpacing: 0.32,color:colors.white,paddingVertical: h(20)
              }}
              onPress={() => this.props.navigation.navigate("SchoolAddRequest")}
            >
              Request to add one
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return(
      <Text></Text>
    );
    }
  }
  }

  renderNoSchool = () => {
    if(this.state.loading){
      return(
        <View style={{flex:1, marginTop: "50%", alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator
            color={colors.indigoBlue}
            animating={this.state.loading}
            size="large"
            //style={{justifyContent: 'center', flex: 1}}
          />
        </View>
      );
    }
    else{
      if(this.state.schools.length == 0){
        return(
          <View style={{flex: 1}}>
            {/* <ImageBackground
              source={ require("../../images/school_search.png") }
              style={{
                flex: 1,
                width: w(120),
                height: h(145),
                marginTop: h(40),
                justifyContent: 'center',
                alignSelf: 'center'
              }}
              resizeMode="contain"
            resizeMethod="resize">
            </ImageBackground> */}

            <Text style={styles.titleText}>
              {"Sorry, no schools found."}
            </Text>

            <View style={{alignItems: "center",
              paddingVertical: h(10),
            }}>
              <TouchableOpacity style={{
                backgroundColor: colors.indigoBlue,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: w(30),
                width: w(250),
                height: h(40)}}>
                <Text
                  style={{
                    fontFamily: "System",
                    fontSize: 15,
                    fontWeight: "600",
                    letterSpacing: 0.32,color:colors.white,paddingVertical: h(20)
                  }}
                  onPress={() => this.props.navigation.goBack()}
                >
                  Search Again
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
      else{
        return(
          <View>
            <Text style={styles.titleText}>
              {"Add your schools to get latest updates"}
            </Text>
          </View>
        );
      }
    }
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  hideModal = () => {
    this.setState({ visible: false });
  };
  onModalBtn = () => {
    this.setState({ visible: false });
    this.props.navigation.navigate("ViewSchool");
  };
  renderModal = () => {
    return (
      <PopUpModal
        visible={this.state.visible}
        close={this.hideModal}
        value={this.state.addedSchoolName}
        onPress={this.onModalBtn}
        myName={this.state.myName}
      />
    );
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.indigoBlue}}>
        <ThemeProvider uiTheme={uiTheme}>
          <StatusBar backgroundColor={colors.indigoBlue} translucent={false} barStyle= "light-content" />
          <View style={styles.container}>
            <Toolbar
              style={styles.toolBar}
              leftElement="arrow-back"
              onLeftElementPress={() => this.props.navigation.goBack()}
              centerElement={this.centerElement()}
              rightElement="edit"
              onRightElementPress={() => this.props.navigation.goBack()}
            />
            {this.renderList()}
            {this.renderModal()}
          </View>
        </ThemeProvider>
      </SafeAreaView>
    );
  }
}

export default AddSchool;

const styles = {
  container: {
    backgroundColor: colors.paleGrey,
    flex: 1
  },

  toolBar: {
    container: { backgroundColor: colors.indigoBlue },
    centerElementContainer: {
      //flex: 1,
      // backgroundColor: colors.bluePurple,
      backgroundColor: 'transparent',
      //height: h(36),
      //borderRadius: 20,
      marginRight:20,
      justifyContent:"center"
    },
    titleText: { fontFamily: 'System', color: colors.white, fontSize: w(18), fontWeight: "600", fontStyle: "normal", letterSpacing: 0,textAlign: "center", }
  },
  titleText: {
    fontFamily:"System",
    alignSelf: "center",
    textAlign: "center",
    color: colors.charcoalGrey,
    fontSize: w(19),
    fontWeight: "400",
    marginTop: h(35),
    marginBottom: h(30)
  },
  search: {
    flexDirection: "row",
    //alignItems: "center",
    paddingLeft: 15,
  },
  searchInput: {
    color: 'white',
    flex: 1,
    marginLeft: 10,
    marginRight: 15,
    //alignSelf: "flex-end",
    //paddingBottom: 6
  }
};
