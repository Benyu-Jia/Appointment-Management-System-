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

class Signup_page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_email: null,
      input_password: null
    };
  }
  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        style={{ backgroundColor: "#fff" }}
      >
        <View style={styles.input_container}>
          <Text style={styles.header1}>Sign Up</Text>
          <Text style={styles.header2}>Email</Text>
          <TextInput
            style={styles.input_box}
            placeholder="student@purdue.edu"
            textContentType="username"
            clearButtonMode="while-editing"
            onChangeText={(value) => this.setState({ input_email: value })}
            value={this.state.input_email}
          />
          <Text style={styles.header2}>Password</Text>
          <TextInput
            style={styles.input_box}
            placeholder="example password"
            textContentType="password"
            clearButtonMode="while-editing"
            secureTextEntry={true}
            onChangeText={(value) => this.setState({ input_password: value })}
            value={this.state.input_password}
          />
          <TouchableOpacity
            style={styles.button_style}
            onPress={() => {
              axios({
                method: "post",
                url: "http://172.20.10.2:5000/api/signup",
                timeout: 5 * 1000,
                data: {
                  email: this.state.input_email,
                  password: this.state.input_password
                }
              })
                .then(function (response) {
                  // console.log(response)
                  if (response.status == 200) {
                    if (response.data.status == 0) {
                      Alert.alert("Successfully Sign Up.");
                    } else if (response.data.status == 1) {
                      Alert.alert("You Have Already Signed Up.");
                    } else if (response.data.status == 2) {
                      Alert.alert("Wrong Email.");
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
            <Text style={{ color: "white", fontSize: 20 }}>Continue</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={{ color: "gray", marginTop: 20, marginRight: 80 }}>
                Already Have An Account?
              </Text>
            </View>
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => {
                this.props.navigation.dispatch(
                  StackActions.replace("Login_page")
                );
              }}
            >
              <Text style={{ color: "#ffc581" }}>Sign In</Text>
            </TouchableOpacity>
          </View>
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

export default Signup_page;
