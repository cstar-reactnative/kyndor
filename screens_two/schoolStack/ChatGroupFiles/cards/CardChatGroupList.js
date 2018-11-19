import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'native-base';
import { chatGroup } from '../helper/Constant';

class CardChatGroupList extends Component {
  render() {
    const { index, handleSelect, array } = this.props;
    const { id, channel_id, group_id, access_type, channel_name, description, icon } = this.props.items;
    const { container, container0, container00, txtTextNormal, imageperson, txtTextBold } = styles;
    return (
      <View key={`index-${id}`} style={ container}>

        <View
          style={{ flexDirection: 'row',
              backgroundColor: '#FFFFFF',
              borderRadius: 5,
              shadowRadius: 1,
              shadowOpacity: 0.3,
              shadowColor: '#c6c8d0',
              height: 60 ,
              justifyContent: 'center',
              alignItems: 'center'
          }}
        >
          <View style={ container0 }>
            <Image
              source={chatGroup} style={styles.imageperson}
                />
                <View style={{ height: 10 }} />
              </View>

              <View style={{ marginTop: 5, marginLeft: 10, marginRight: 5, flex: 1}}>
                <Text style={txtTextBold}>{channel_name}</Text>
                <Text style={{ color:'#c6c8d0' }}>{description}</Text>
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
    marginTop: 20,
    flex: 1,
    backgroundColor: '#f3f3f7',
  },
  container0: {
    borderRadius: 20,
    height: 40,
    width: 40,
    backgroundColor: '#32aee6',
    margin: 10,
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
  txtTextBold: {
    color: '#383e53',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageperson: {
      marginTop: 10,
      height: 30,
      width: 30,
    },
};

export default CardChatGroupList;
