import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View  ,TextInput,Button,TouchableOpacity, } from 'react-native';



export default class FlatListTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  componentDidMount() {
  }

  get=()=>{
    fetch(' http://127.0.0.1:5000/api/appointment_history')
            .then((response) => response.json())
            .then((json) => {
                this.setState({ data:json.key})
            })
            .catch((error) => {
                alert(error)
            })
    
  }
  _header = function () {
    return (
        <View style={{flex:1,flexDirection:'row', justifyContent:'space-between'}}>
        <View style={{flex:1}}>
          <Text style={flatListStyles.Header2}>weekday</Text>
        </View>
        <View style={{flex:1}}>
          <Text style={flatListStyles.Header2}>start_time</Text>
        </View>
        <View style={{flex:1}}>
          <Text style={flatListStyles.Header2}>end_time</Text>
        </View>
      </View>
    );
  }

  createEmptyView() {
    return (
      <Text style={{fontSize: 40, alignSelf: 'center'}}>here is nothing！</Text>
    );
  }


  _renderItem = ({item, index}) => {
    return (
      <View style={{flex:1,flexDirection:'row', justifyContent:'space-between'}}>
        <View style={{flex:1}}>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>{item.weekday}</Text>
        </View>
        <View style={{flex:1}}>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>{item.start_time}</Text>
        </View>
        <View style={{flex:1}}>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>{item.end_time}</Text>
        </View>
    </View>
    );
  }
  _sourceData = [
    {weekday: 'Monday',start_time:'09:00',end_time:'10:00'},
    {weekday: 'Tuesday',start_time:'09:00',end_time:'10:00'},
    {weekday: 'May',start_time:'09:00',end_time:'10:00'},
    {weekday: 'Tueadsday',start_time:'09:00',end_time:'10:00'}
  ]

  render() {
    return (
      <View style={flatListStyles.container}>
        <View style={flatListStyles.Header_container}>
        <Text style={flatListStyles.Header}>Appoint history</Text>
        </View>
        <View style={{flex:20}}>
        <FlatList
          data={this.state.data}
          
          ref={(flatList) => this._flatList = flatList}
          ListHeaderComponent={this._header}
          ItemSeparatorComponent={ItemDivideComponent}
          
          ListEmptyComponent={this.createEmptyView()}
          
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
        />
        </View>
      </View>
    );
  }
}
;

class ItemDivideComponent
  extends Component {
  render() {
    return (
      <View style={{height: 1, backgroundColor: 'skyblue'}}/>
    );
  }
}
;

const flatListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  Header_container: {
    flex:1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom:20
  },
  Header:{
    fontWeight: 'bold',
    fontSize: 25
  },
  Header2:{
    color: "#ffc581",
    fontWeight: 'bold',
    fontSize: 20
  }
})
