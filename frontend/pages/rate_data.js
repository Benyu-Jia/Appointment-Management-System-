import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View ,Image,TextInput,Button,TouchableOpacity, } from 'react-native';


export default class FlatListTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this._sourceData,
    };
  }
  componentDidMount() {
    this.get();
  }

  get=()=>{
    fetch(' http://127.0.0.1:5000/api/rate_data')
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
          <Text style={flatListStyles.Header2}>name</Text>
        </View>
        <View style={{flex:2}}>
          <Text style={flatListStyles.Header2}>email</Text>
        </View>
        <View style={{flex:1}}>
          <Text style={flatListStyles.Header2}>rate</Text>
        </View>
      </View>
    );
  }

  createEmptyView() {
    return (
      <Text style={{fontSize: 40, alignSelf: 'center'}}>Here is nothing！</Text>
    );
  }

  _renderItem = ({item, index}) => {
    return (
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <View style={{flex:1}}>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>{item.name}</Text>
        </View>
        <View style={{flex:2}}>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>{item.email}</Text>
        </View>
        <View style={{flex:1}}>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>{item.rate}</Text>
        </View>
      </View>
    );
  }
  _sourceData = [
    {name: 'Tom',email:'123@123',rate:'5'},
    {name: 'Sun',email:'1132@123',rate:'4'},
    
    {name: 'Fly',email:'1223@123',rate:'1'},
    {name: 'John',email:'334@123',rate:'3'}
  ]

  render() {
    return (
      <View style={flatListStyles.container}>
        <View style={flatListStyles.Header_container}>
        <Text style={flatListStyles.Header}>Rate_infomation</Text>
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
