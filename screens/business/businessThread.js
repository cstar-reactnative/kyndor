import React, { Component } from 'react';
import {
  StyleSheet,
 Text,
 View,
 TouchableOpacity,
 TouchableHighlight,
 StatusBar,
 ToolbarAndroid,
 Image,
 ScrollView,
 Animated
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class businessThread extends React.Component {

  render(){
    const { navigate } = this.props.navigation;
    return(
        <ScrollView style={{backgroundColor: 'white'}}>
          {/* <Accordion
            sections={SECTIONS}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            underlayColor='transparent'
          /> */}


          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, paddingRight: 15, paddingLeft: 15 }} >
            <View>
            <Text style={{color: '#454887', fontSize: 16, fontWeight: 'bold'}} >
            {'General discussion    \u25BC'}
            </Text>
            </View>
            <View>
            <MaterialIcons
            name='add'
            size={30}
            color='#9513fe'
            />
            </View>
          </View> */}
          <View style={{justifyContent: 'space-between', paddingTop: 15, paddingBottom: 15}} >
            {/* <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, paddingRight: 15 }} >
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
              <View style={{flex: 0.12, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('../../images/School-Thread-Oval.png')} style={{width: 30, height: 30}} />
              </View>
              <View style={{flex: 0.78}} >
              <Text style={{fontSize: 18, fontWeight: '400', color: '#212121', paddingLeft: 10}} >General Discussion</Text>
              </View>
              </View>
              <MaterialIcons
              name='star'
              size={30}
              color='#9513fe'
              />
            </View> */}

            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 15, paddingLeft: 15, paddingRight: 15 }} >
              <View style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                <Text style={{fontFamily: 'System',fontSize: 16, fontWeight: 'bold', color: '#000000'}} >Announcement</Text>
              </View>
              <MaterialIcons
                name='star-border'
                size={30}
                color='#989898'
              />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15}} >
              <View style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                <Text style={{fontFamily: 'System',fontSize: 16, fontWeight: 'bold', color: '#000000'}} >Offers and coupons</Text>
              </View>
              <MaterialIcons
                name='star-border'
                size={30}
                color='#989898'
              />
            </View>

            {/* <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, paddingLeft: 15, paddingRight: 15, paddingBottom: 15}} >
              <View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000000'}} >Basketball 2nd grade</Text>
              <Text style={{fontSize: 12, color: '#989898'}} ></Text>
              </View>
              <MaterialIcons
              name='star'
              size={30}
              color='#9513fe'
              />
            </View> */}
          </View>
          <View style={styles.hr}/>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, paddingRight: 15, paddingLeft: 15 }} >
            <View>
              <Text style={{fontFamily: 'System',color: '#454887', fontSize: 16, fontWeight: 'bold'}} >
                {'Custom Chat Groups    \u25BC'}
              </Text>
            </View>
            <View>
              {/* <TouchableHighlight
                onPress={this.isStarred}
                >
                <MaterialIcons
                size={30}
                />
              </TouchableHighlight> */}
              <MaterialIcons
                name='add'
                size={30}
                color='#9513fe'
              />
            </View>
          </View>

          <View style={{justifyContent: 'space-between'}} >
            {/* <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, paddingRight: 15 }} >
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
              <View style={{flex: 0.12, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('../../images/School-Thread-Oval.png')} style={{width: 30, height: 30}} />
              </View>
              <View style={{flex: 0.78}} >
              <Text style={{fontSize: 18, fontWeight: '400', color: '#212121', paddingLeft: 10}} >General Discussion</Text>
              </View>
              </View>
              <MaterialIcons
              name='star'
              size={30}
              color='#9513fe'
              />
            </View> */}

            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 5, paddingLeft: 15, paddingRight: 15 }} >
              <View style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                <Text style={{fontFamily: 'System',fontSize: 16, fontWeight: 'bold', color: '#000000'}} >Karibou | Bouncing Bunnies</Text>
                <Text style={{fontFamily: 'System',fontSize: 12, color: '#989898', fontWeight: 'bold'}} >My son's class</Text>
              </View>
              <MaterialIcons
                name='star'
                size={30}
                color='#9513fe'
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 15, paddingRight: 15, paddingTop: 10 }} >
              <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                <Text style={{fontFamily: 'System',fontSize: 16, color: '#adadad', fontWeight: 'bold'}} >Basketball - Children</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}} >
                <View style={{justifyContent: 'center', alignItems: 'center'}} >
                  <Text style={{fontFamily: 'System',fontSize: 12, color: '#c4c4c4'}} >Not a member</Text>
                </View>
                <View style={{justifyContent: 'center', paddingLeft: 15}}>
                  <MaterialIcons
                    name='star'
                    size={30}
                    color='#9513fe'
                  />
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 15, paddingRight: 15, paddingTop: 10 }} >
              <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                <Text style={{fontFamily: 'System',fontSize: 16, color: '#adadad', fontWeight: 'bold'}} >Basketball - Children</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}} >
                <View style={{justifyContent: 'center', alignItems: 'center'}} >
                  <Text style={{fontFamily: 'System',fontSize: 12, color: '#c4c4c4'}} >Not a member</Text>
                </View>
                <View style={{justifyContent: 'center', paddingLeft: 15}}>
                  <MaterialIcons
                    name='star'
                    size={30}
                    color='#9513fe'
                  />
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 15, paddingRight: 15, paddingTop: 10 }} >
              <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                <Text style={{fontFamily: 'System',fontSize: 16, color: '#adadad', fontWeight: 'bold'}} >Basketball - Children</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}} >
                <View style={{justifyContent: 'center', alignItems: 'center'}} >
                  <Text style={{fontFamily: 'System',fontSize: 12, color: '#c4c4c4'}} >Not a member</Text>
                </View>
                <View style={{justifyContent: 'center', paddingLeft: 15}}>
                  <MaterialIcons
                    name='star'
                    size={30}
                    color='#9513fe'
                  />
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 15, paddingRight: 15, paddingTop: 10 }} >
              <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                <Text style={{fontFamily: 'System',fontSize: 16, color: '#adadad', fontWeight: 'bold'}} >Basketball - Children</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}} >
                <View style={{justifyContent: 'center', alignItems: 'center'}} >
                  <Text style={{fontFamily: 'System',fontSize: 12, color: '#c4c4c4'}} >Not a member</Text>
                </View>
                <View style={{justifyContent: 'center', paddingLeft: 15}}>
                  <MaterialIcons
                    name='star'
                    size={30}
                    color='#9513fe'
                  />
                </View>
              </View>
            </View>
            {/* <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, paddingLeft: 15, paddingRight: 15, paddingBottom: 15}} >
              <View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000000'}} >Gym Class</Text>
              <Text style={{fontSize: 12, color: '#989898'}} ></Text>
              </View>
              <MaterialIcons
              name='star'
              size={30}
              color='#9513fe'
              />
            </View> */}
          </View>
          <View style={styles.hr}/>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, paddingLeft: 15, paddingRight: 15 }} >
            <View>
              <Text style={{fontFamily: 'System',color: '#454887', fontSize: 16, fontWeight: 'bold'}} >
                {'Team discussion    \u25BC'}
              </Text>
            </View>
            <View>
              <MaterialIcons
                name='add'
                size={30}
                color='#9513fe'
              />
            </View>
          </View>
          <View style={{justifyContent: 'space-between'}} >
            {/* <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, paddingRight: 15 }} >
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
              <View style={{flex: 0.12, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('../../images/School-Thread-Oval.png')} style={{width: 30, height: 30}} />
              </View>
              <View style={{flex: 0.78}} >
              <Text style={{fontSize: 18, fontWeight: '400', color: '#212121', paddingLeft: 10}} >General Discussion</Text>
              </View>
              </View>
              <MaterialIcons
              name='star'
              size={30}
              color='#9513fe'
              />
            </View> */}
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 5, paddingLeft: 15, paddingRight: 15 }} >
              <View style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                <Text style={{fontFamily: 'System',fontSize: 16, fontWeight: 'bold', color: '#000000'}} >Basketball 1st grade</Text>
                <Text style={{fontFamily: 'System',fontSize: 12, color: '#989898'}} ></Text>
              </View>
              <MaterialIcons
                name='star'
                size={30}
                color='#9513fe'
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, paddingLeft: 15, paddingRight: 15, paddingBottom: 15}} >
              <View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
                <Text style={{fontFamily: 'System',fontSize: 16, fontWeight: 'bold', color: '#000000'}} >Basketball 2nd grade</Text>
                <Text style={{fontFamily: 'System',fontSize: 12, color: '#989898'}} ></Text>
              </View>
              <MaterialIcons
                name='star'
                size={30}
                color='#9513fe'
              />
            </View>
          </View>
          <View style={styles.hr}/>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, paddingLeft: 15, paddingRight: 15 }} >
            <View>
              <Text style={{fontFamily: 'System',color: '#454887', fontSize: 16, fontWeight: 'bold'}} >
                {'Events    \u25BC'}
              </Text>
            </View>
            <View>
              <MaterialIcons
                name='add'
                size={30}
                color='#9513fe'
              />
            </View>
          </View>
          <View style={{justifyContent: 'space-between'}} >
            {/* <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, paddingRight: 15 }} >
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
              <View style={{flex: 0.12, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('../../images/School-Thread-Oval.png')} style={{width: 30, height: 30}} />
              </View>
              <View style={{flex: 0.78}} >
              <Text style={{fontSize: 18, fontWeight: '400', color: '#212121', paddingLeft: 10}} >General Discussion</Text>
              </View>
              </View>
              <MaterialIcons
              name='star'
              size={30}
              color='#9513fe'
              />
            </View> */}
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 5, paddingLeft: 15, paddingRight: 15 }} >
              <View style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                <Text style={{fontFamily: 'System',fontSize: 16, fontWeight: 'bold', color: '#000000'}} >Sports event</Text>
                <Text style={{fontFamily: 'System',fontSize: 12, color: '#989898'}} ></Text>
              </View>
              <MaterialIcons
                name='star'
                size={30}
                color='#9513fe'
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, paddingLeft: 15, paddingRight: 15, paddingBottom: 15}} >
              <View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
                <Text style={{fontFamily: 'System',fontSize: 16, fontWeight: 'bold', color: '#000000'}} >2nd event</Text>
                <Text style={{fontFamily: 'System',fontSize: 12, color: '#989898'}} ></Text>
              </View>
              <MaterialIcons
                name='star'
                size={30}
                color='#9513fe'
              />
            </View>
          </View>
          <View style={styles.hr}/>
          {/* <View style={{backgroundColor: '#9513fe', justifyContent: 'center', alignContent: 'center', height: 60, width: 60, borderRadius: 30, position: 'absolute', bottom: 15, right: 15, elevation: 10, }} >
            <MaterialIcons
            name='add'
            size={30}
            color='#fff'
            style={{alignSelf: 'center'}}
            />
          </View> */}
        </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
   hr: {
       borderBottomColor: "#e0e0e0",
       borderBottomWidth: 1,
       //paddingTop: 7,
       //paddingBottom: 7
   }
});
