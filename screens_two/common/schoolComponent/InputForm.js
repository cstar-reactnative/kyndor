import React, { Component } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Sae } from "react-native-textinput-effects";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import SectionHeader from "./SectionHeader";
import { w, h } from "../helpers";
import colors from '@theme/colorsThree';

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { container } = styles;

    return (
      <View style={container}>
        {!this.props.noHeader && (
          <SectionHeader
            label="Personal Details"
            withButton={false}
            style={{ marginTop: 0, marginBottom: 0 }}
            textStyle={{ fontFamily: 'System', fontSize: w(22) }}
          />
        )}

        {this.props.inputs.map((val, key) => {
          const lastElement = this.props.inputs.length - 1;
          return (
            <Sae
              key={key}
              iconClass={FontAwesomeIcon}
              iconName={null}
              iconColor={colors.blueGrey}
              ref={ref => this.props.inputRef(ref, val.name)}
              returnKeyType={lastElement !== key ? "next" : "done"}
              onFocus={() => this.props.onFocus(val.name)}
              onSubmitEditing={() => this.props.onSubmitEditing(val.name)}
              onChangeText={text => this.props.onChangeText(text, val.name)}
              blurOnSubmit={lastElement !== key ? false : true}
              value={this.props.values[val.name]}
              autoCorrect={false}
              style={{
                borderBottomWidth: 1,
                borderColor: colors.blueGrey
              }}
              labelStyle={{ color: colors.blueGrey, fontFamily: 'System', fontWeight: "400" }}
              inputStyle={{ fontFamily: 'System', color: colors.charcoalGrey }}
              {...val}
            />
          );
        })}
      </View>
    );
  }
}

export default InputForm;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start"
  },
  iconContainer: {
    backgroundColor: colors.lightBlueGrey,
    width: w(120),
    height: w(120),
    borderRadius: w(60),
    alignItems: "center",
    justifyContent: "center"
  },
  icon: { width: w(50), height: w(50) }
});
