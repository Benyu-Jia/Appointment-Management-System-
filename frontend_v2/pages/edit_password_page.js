import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { StackActions } from "@react-navigation/routers";

class Edit_password_page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      old_password: null,
      new_password: null
    };
  }
  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        style={{ backgroundColor: "#fff" }}
      >
        <View style={styles.input_container}>
          <Text style={styles.header1}>Edit Password</Text>
          <Text style={styles.header2}>Email</Text>
          <TextInput
            style={styles.input_box}
            placeholder="student@purdue.edu"
            textContentType="username"
            clearButtonMode="while-editing"
            onChangeText={(value) => this.setState({ email: value })}
            value={this.state.email}
          />
          <Text style={styles.header2}>Old Password</Text>
          <TextInput
            style={styles.input_box}
            placeholder="example password"
            textContentType="password"
            clearButtonMode="while-editing"
            secureTextEntry={true}
            onChangeText={(value) => this.setState({ old_password: value })}
            value={this.state.old_password}
          />
          <Text style={styles.header2}>New Password</Text>
          <TextInput
            style={styles.input_box}
            placeholder="example password"
            textContentType="password"
            clearButtonMode="while-editing"
            secureTextEntry={true}
            onChangeText={(value) => this.setState({ new_password: value })}
            value={this.state.new_password}
          />
          <TouchableOpacity
            style={styles.button_style}
            onPress={() => {
              axios({
                method: "post",
                url: "http://172.20.10.2:5000/api/edit_password",
                timeout: 5 * 1000,
                data: {
                  email: this.state.email,
                  old_password: this.state.old_password,
                  new_password: this.state.new_password
                }
              })
                .then(function (response) {
                  // console.log(response)
                  if (response.status == 200) {
                    if (response.data.status == 0) {
                      Alert.alert("Successfully Changed Password.");
                    } else if (response.data.status == 1) {
                      Alert.alert("Wrong Email.");
                    } else if (response.data.status == 2) {
                      Alert.alert("Wrong Old Password.");
                    }
                  }
                })
                .catch(function (error) {
                  Alert.alert(
                    "Unable to load. Please check your network settings."
                  );
                });
            }}
          >
            <Text style={{ color: "white", fontSize: 20}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: 30
  },
  input_container: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 40
  },
  image: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "center",
    alignSelf: "center",
    paddingTop: 150
  },
  input_box: {
    borderBottomWidth: 2,
    borderColor: "gray",
    alignSelf: "stretch",
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  header1: {
    fontWeight: "bold",
    fontSize: 25,
    letterSpacing: 2,
    marginBottom: 30
  },
  header2: {
    color: "#ffc581",
    fontSize: 15,
    fontWeight: "bold"
  },
  sub_text: {
    color: "gray",
    fontSize: 15,
    marginBottom: 80
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

export default Edit_password_page;
