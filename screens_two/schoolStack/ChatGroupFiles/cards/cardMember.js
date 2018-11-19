import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';

class cardMember extends Component {

  render() {
    const { index } = this.props;
    const { id, profile_pic, name } = this.props.items;
    const { container, container0, imgInfo } = styles;

    const originalString = name;
    const splitString = originalString.split(" ");
    var nameString = ''
    if (splitString.length === 1) {
      nameString = splitString[0].slice(0, 2).toUpperCase();
    } else if (splitString.length === 2) {
      let str1 = splitString[0].slice(0, 1).toUpperCase();
      let str2 = splitString[1].slice(0, 1).toUpperCase();
      nameString = str1 + str2;
    }
    else if (splitString.length > 2) {
      let str1 = splitString[0].slice(0, 1).toUpperCase();
      let str2 = splitString[1].slice(0, 1).toUpperCase();
      nameString = str1 + str2;
    }

    return (
      <View key={`index-${id}`} style={ container}>
        <View style={ container0 }>
        {
          profile_pic !== null ?
          <Image style={styles.imageperson} source={{ uri: profile_pic }} />
          :
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 15 }}>{nameString}</Text>
            <View style={{ height: 10 }} />
          </View>
        }

              <View style={{ height: 10 }} />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    margin: 5,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container0: {
    borderRadius: 35,
    height: 70,
    width: 70,
    backgroundColor: '#c6c8d0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgInfo: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageperson: {
      borderRadius: 35,
      height: 70,
      width: 70,
    },
};

export default cardMember;
