import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  WebView,
  ActivityIndicator,
  StatusBar
} from "react-native";
import { SafeAreaView } from 'react-navigation';
import { Toolbar, ThemeProvider } from "react-native-material-ui";
import colors from '@theme/colorsThree';
import { w, h } from "../common/helpers";
const uiTheme = {
  fontFamily: 'System',
  palette: {
    primaryColor: colors.indigoBlue
  }
};
const styles = {
  webView: {},
  toolBar: {
    container: { backgroundColor: colors.indigoBlue },
    centerElementContainer: { alignItems: "center", paddingRight: w(50) },
    titleText: { fontFamily: 'System', color: colors.white, fontSize: w(18), fontWeight: "600", fontStyle: "normal", letterSpacing: 0,textAlign: "center", }
  }
};

export default class Blog extends Component {
  ActivityIndicatorLoadingView() {
    return (
      <ActivityIndicator
        color={colors.indigoBlue}
        size='large'
        style={{position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
        justifyContent: 'center'}}
      />
    );
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.indigoBlue}}>
        <ThemeProvider uiTheme={uiTheme}>
          <StatusBar backgroundColor={colors.indigoBlue} translucent={false} barStyle= "light-content" />
          <View style={{ backgroundColor: colors.white, flex: 1 }}>
            <Toolbar
              style={styles.toolBar}
              leftElement="arrow-back"
              onLeftElementPress={() => this.props.navigation.goBack()}
              centerElement={this.props.navigation.state.params.title}
            />
            <WebView
              style={styles.webView}
              source={{ uri: this.props.navigation.state.params.url }}
              renderLoading={this.ActivityIndicatorLoadingView}
              startInLoadingState={true}
            />
          </View>
        </ThemeProvider>
      </SafeAreaView>
    );
  }
}
