import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Icon } from 'native-base';

class CardContactList extends Component {
  render() {
    const { index, handleSelect, array } = this.props;
    const { id, fullName, contactType, } = this.props.items;
    const { container, container0, container00, txtTextNormal, imageperson } = styles;
    const originalString = fullName;
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

          <View style={{ flexDirection: 'row' }}>

              <View style={ container0 }>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{nameString}</Text>
                <View style={{ height: 10 }} />
              </View>

              <View style={{ marginTop: 20, marginLeft: 10, marginRight: 5, flex: 1}}>
                <Text style={txtTextNormal}>{fullName}</Text>
                <Text style={{ color:'#c6c8d0' }}>{contactType}</Text>
              </View>

              <View style={{justifyContent: 'center', alignItems:'center'}}>
                <View style={[ container00 , {justifyContent: 'center', alignItems:'center'}]}>
                  {
                    array[index] === true ?
                    <Icon
                      type='EvilIcons'
                      name='check'
                      style={{color: '#6d3ccb'}}
                      onPress={() => handleSelect( index,this.props.items)}
                    />
                    :
                    <Icon
                      type='EvilIcons'
                      name='plus'
                      style={{color: '#6d3ccb'}}
                      onPress={() => handleSelect( index,this.props.items)}
                    />
                  }

                </View>
              </View>

          </View>

      </View>
    );
  }
}

const styles = {
  container: {
    padding: 12,
    borderBottomWidth: 1.5,
    borderColor: '#c6c8d0',
    flex: 1
  },
  container0: {
    borderRadius: 30,
    height: 60,
    width: 60,
    backgroundColor: '#c6c8d0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container00: {
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  txtTextNormal: {
    color: '#383e53',
    fontSize: 16
  },
  imageperson: {
      borderRadius: 35,
      height: 70,
      width: 70,
    },
};

export default CardContactList;
