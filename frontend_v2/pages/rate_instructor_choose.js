import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import axios from "axios";

class Rate_instructor_choose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.route.params.email,
      password: props.route.params.password,
      data: null
    };
  }
  componentDidMount() {
    this.query_instructor();
  }

  query_instructor() {
    axios({
      method: "post",
      url: "http://172.20.10.2:5000/api/query_instructor",
      timeout: 5 * 1000,
      data: {
        student_email: this.state.email
      }
    })
      .then((response) => {
        // console.log(response)
        if (response.status == 200) {
          if (response.data.status == 0) {
            this.setState({
              data: response.data.data
            });
          }
        }
      })
      .catch(function (error) {
        // console.log(error)
        Alert.alert("Unable to load. Please check your network settings.");
      });
  }

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("Rate_instructor", {
            email: this.state.email,
            password: this.state.password,
            name: item.name,
            type: item.type,
            title: item.title
          })
        }
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-start",
          shadowColor: "gray",
          borderRadius: 10,
          backgroundColor: "#fff",
          shadowColor: "gray",
          shadowOpacity: 0.4,
          shadowRadius: 5,
          shadowOffset: { width: 1, height: 10 },
          margin: 10
        }}
      >
        <Text style={{ flex: 2, fontSize: 20 }}>{item.type}</Text>
        <Text style={{ flex: 2, fontSize: 20 }}>{item.title}</Text>
        <Text style={{ flex: 2, fontSize: 20 }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  createEmptyView() {
    return (
      <Text style={{ fontSize: 20, alignSelf: "center" }}>
        no instructors available
      </Text>
    );
  }

  render() {
    // console.log(this.state.data);
    return (
      <View style={styles.container}>
        <View style={styles.header_container}>
          <TouchableOpacity
            style={{ alignSelf: "flex-start" }}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back" size={40} />
          </TouchableOpacity>
          <Text style={styles.header}>Rate Instructor</Text>
        </View>
        <View style={styles.subheader_container}>
          <Text style={styles.subheader}>available instructor</Text>
          <View style={styles.line}></View>
        </View>
        <FlatList
          data={this.state.data}
          ListEmptyComponent={this.createEmptyView()}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 47,
    paddingRight: 10,
    paddingLeft: 10
  },
  header_container: {
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 15
  },
  header: {
    fontWeight: "bold",
    fontSize: 25,
    letterSpacing: 2,
    paddingLeft: 20,
    paddingRight: 10
  },
  subheader_container: {
    backgroundColor: "#fff",
    marginBottom: 10
  },
  subheader: {
    fontSize: 15,
    alignSelf: "flex-end"
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    width: 200,
    alignSelf: "flex-end",
    paddingBottom: 5,
    paddingRight: 10
  },
  button_style: {
    backgroundColor: "#ffc581",
    borderRadius: 10,
    alignSelf: "stretch",
    marginTop: 10,
    shadowColor: "gray",
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 10 },
    alignItems: "center",
    padding: 6
  }
});

export default Rate_instructor_choose;
