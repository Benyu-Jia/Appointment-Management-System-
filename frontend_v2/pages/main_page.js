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

class Main_page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.route.params.email,
      password: props.route.params.password
    };
  }
  render() {
    // console.log(this.state.data);
    return (
      <View style={styles.container}>
        <View style={styles.header_container}>
          <Text style={styles.header}>Main Page</Text>
        </View>
        <View style={styles.subheader_container}>
          <Text style={styles.subheader}>available options</Text>
          <View style={styles.line}></View>
        </View>
        <TouchableOpacity
            style={styles.button_style}
            onPress={() => {this.props.navigation.navigate("Rate_instructor_choose", {
                email: this.state.email,
                password: this.state.password
              })
            }}
          >
          <Text style={{ color: "white", fontSize: 20 }}>Rate instructors</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button_style}
            onPress={() => {this.props.navigation.navigate("Edit_appointment_page", {
                email: this.state.email,
                password: this.state.password
              })
            }}
          >
          <Text style={{ color: "white", fontSize: 20 }}>Edit Appointment</Text>
        </TouchableOpacity>
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

export default Main_page;
