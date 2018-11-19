import React, { Component } from "react";
import ReactNative, {
  View,
  Text,
  PlatformIOS,
  TouchableOpacity,
  Image,
  StatusBar
} from "react-native";
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Toolbar, ThemeProvider } from "react-native-material-ui";
import { Sae } from "react-native-textinput-effects";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import InputForm from "../common/schoolComponent/InputForm";
import Button from "../common/schoolComponent/Button";
import CustomPicker from "../common/schoolComponent/CustomPicker";
import { w, h } from "../common/helpers";
import colors from '@theme/colorsThree';
import images from "../../images/index";
const api =  require('../../api/index');

const uiTheme = {
  fontFamily: 'System',
  palette: {
    primaryColor: colors.indigoBlue
  }
};

const inputs = [
  { label: "School Zip Code", name: "zip", autoCapitalize: "none" },
  { label: "School Name", name: "name" }
];

const pickerItems = ["All", "Elementary", "Middle", "High", "Private"];

class FindSchool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {},
      schoolType: "",
      pickerItems:["All"],
      pickerVisible: false
    };
  }
  componentDidMount = () => {
    let thisComp = this
    let levArray = ["All"]
    api.getGroupLevel((e, r) => {
      console.log("R: "+JSON.stringify(r))
      if(e){
        console.log("Error2: "+e);
      }
      else{
        console.log("R: "+JSON.stringify(r))
        if(r.success == true){
          let levels = r.result.level
          for (x in levels) {
            levArray.push(levels[x].group_level_name)
          }
          thisComp.setState({
            pickerItems:levArray
          })
        }
        else {

        }
      }
    })
  }
  _scroll = (ref, offset) => {
    var scrollResponder = this.scroll.props.getScrollResponder();
    scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
      ReactNative.findNodeHandle(ref),
      offset,
      true
    );
  };

  onChangeText = (text, name) => {
    this.setState({ values: { ...this.state.values, [name]: text } });
  };

  onInputFocus = name => {
    if (!PlatformIOS) {
      this._scroll(this[name], 110);
    }
  };

  onSubmitEditing = name => {
    const refNames = inputs.map((val, key) => val.name);
    let pos = refNames.indexOf(name);
    if (pos !== refNames.length - 1) {
      this[refNames[pos + 1]].focus();
    } else {
      this[name].blur();
    }
  };
  onFindSchool = () => {
    const data = {
      ...this.state.values,
      type: this.state.schoolType
    };
    console.log('fliter values.')
    console.log(data);
    this.props.navigation.navigate("AddSchool",{data});
  };
  showPicker = () => this.setState({ pickerVisible: true });
  hidePicker = () => this.setState({ pickerVisible: false });
  renderInputForm = () => {
    return (
      <View style={styles.inputContainer}>
        <InputForm
          noHeader
          inputs={inputs}
          values={this.state.values}
          inputRef={(ref, name) => (this[name] = ref)}
          onFocus={name => this.onInputFocus(name)}
          onSubmitEditing={this.onSubmitEditing}
          onChangeText={this.onChangeText}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this.showPicker}
          // style={{ borderWidth: 1 }}
        >
          <Sae
            label="School Type"
            editable={false}
            iconClass={FontAwesome}
            iconName="caret-down"
            iconColor={colors.blueGrey}
            ref={ref => (this.schoolType = ref)}
            value={this.state.schoolType}
            style={{
              borderBottomWidth: 1,
              borderColor: colors.blueGrey
            }}
            labelStyle={{ fontFamily: 'System', color: colors.blueGrey, fontWeight: "400" }}
            inputStyle={{ fontFamily: 'System', color: colors.charcoalGrey }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderPicker = () => {
    return (
      <CustomPicker
        items={this.state.pickerItems}
        visible={this.state.pickerVisible}
        close={this.hidePicker}
        onSelect={this.pickSchoolType}
        title="Pick School Type"
      />
    );
  };

  pickSchoolType = val => {
    this.setState({ schoolType: val, pickerVisible: false });
  };

  renderButton = () => {
    return (
      <View style={{ flex: 0.14 }}>
        <Button
          text="Find your school"
          onPress={this.onFindSchool}
          style={styles.button}
        />
      </View>
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
              centerElement="Add Your School"
              // rightElement=""
            />

            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="always"
              enableOnAndroid={true}
              enableAutomaticScroll={true}
              showsVerticalScrollIndicator={false}
              style={styles.scrollView}
              innerRef={ref => {
                this.scroll = ref;
              }}
            >
              {/* <Image source={images.popupimage} style={styles.topImage} /> */}
              <Text style={[styles.titleText, {marginTop:20}]}>{"Search & Add Your School"}</Text>
              <Text style={styles.infoText}>
                {
                  "Add your school to stay up-to-date on upcoming \n events, activities & announcements"
                }
              </Text>

              {this.renderInputForm()}
              {this.renderPicker()}
              {this.renderButton()}
            </KeyboardAwareScrollView>
          </View>
        </ThemeProvider>
      </SafeAreaView>
    );
  }
}

export default FindSchool;

const styles = {
  container: {
    backgroundColor: colors.white,
    alignItems: "center",
    flex: 1
  },
  topImage: { width: w(375), height: h(180), marginBottom: h(25) },
  inputContainer: {
    marginHorizontal: w(45)
  },
  button: {
    marginTop: h(65),
    marginBottom: h(50),
    width: w(250),
    height: h(50),
    alignSelf: "center"
  },
  titleText: {
    fontFamily: 'System',
    alignSelf: "center",
    color: colors.charcoalGrey,
    fontSize: w(19),
    fontWeight: "600"
  },
  infoText: {
    fontFamily: 'System',
    textAlign: "center",
    color: colors.charcoalGrey,
    fontSize: w(12),
    lineHeight: h(22)
  },
  toolBar: {
    container: { backgroundColor: colors.indigoBlue },
    leftElementContainer: { width: '10%'},
    // rightElementContainer: { width: '10%'},
    centerElementContainer: { width:'80%', marginRight:'10%', alignItems:"center"},
    // centerElementContainer: { alignItems: "center"},
    titleText: { fontFamily: 'System', color: colors.white, fontSize: w(18), fontWeight: "600", fontStyle: "normal", letterSpacing: 0,textAlign: "center", }
  }
};
