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

class Login_page extends React.Component {
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
        <Image source={require("../images/logo.png")} style={styles.image} />
        <View style={styles.input_container}>
          <Text style={styles.header1}>Sign In</Text>
          <Text style={styles.sub_text}>Hi there! Nice to see you again.</Text>
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
          <View style={styles.button_style}>
            <Button
              title="Sign In"
              color="white"
              onPress={() => {
                axios({
                  method: "post",
                  url: "http://172.20.10.2:5000/api/signin",
                  timeout: 5 * 1000,
                  data: {
                    email: this.state.input_email,
                    password: this.state.input_password
                  }
                })
                  .then((response) => {
                    if (response.status == 200) {
                      console.log(response);
                      if (response.data.status == 0) {
                        Alert.alert("Successfully Login.");
                        this.props.navigation.navigate("Main_page", {email: this.state.input_email, password: this.state.input_password})
                      } else if (response.data.status == 1) {
                        Alert.alert("Wrong Email.");
                      } else if (response.data.status == 2) {
                        Alert.alert("Please Sign Up Before.");
                      } else if (response.data.status == 3) {
                        Alert.alert("Wrong Email or Password.");
                      }
                    }
                  })
                  .catch(function (error) {
                    Alert.alert(
                      "Unable to load. Please check your network settings."
                    );
                  });
              }}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={{ marginTop: 20, marginRight: 130 }} onPress={()=>{
              this.props.navigation.navigate("Edit_password_page")
            }}>
              <Text style={{ color: "gray" }}>Forget Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => {
                // this.props.navigation.navigate("Signup_page");
                this.props.navigation.dispatch(StackActions.replace("Signup_page"));
              }}
            >
              <Text style={{ color: "#ffc581" }}>Sign Up</Text>
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
    flexDirection: "column"
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
    marginBottom: 10,
    letterSpacing: 2
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
    shadowOffset: { width: 1, height: 10 }
  }
});

export default Login_page;
