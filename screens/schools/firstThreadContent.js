import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform
} from 'react-native';

export default class FirstThreadContent extends React.Component {
    render() {
        return(
            <FlatList
                data={[
                    {key: 'Location', value: 'Bhubaneswar'},
                    {key: 'Orientation', value: 'Straight'},
                    {key: 'Ethnicity', value: 'White'},
                ]}
                renderItem={({item}) =>
                <View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 12, paddingBottom: 12}} >
                        <Text style={styles.aboutListContent} >{item.key}</Text>
                        <Text style={styles.aboutListContent} >{item.value}</Text>
                    </View>
                    <View style={styles.hr}/>
                </View>
                }
            />
        );
    }
}

const styles =StyleSheet.create({
    aboutListContent: {
      fontFamily: "System",
        fontSize: 14,
        color: '#000'
    },
    hr: {
        borderBottomColor: "#efeff4",
        borderBottomWidth: 1
    },
})
