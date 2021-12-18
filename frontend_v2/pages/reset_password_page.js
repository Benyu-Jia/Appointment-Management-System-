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

class Reset_password_page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      PUID: null,
      birthday:null,
      new_password: null,
    };
  }

  postMessage=(data)=>{
    axios({
      method: "post",
      url: "http://localhost:5000/api/reset_password",
      timeout: 5 * 1000,
      data: data
    })
      .then(function (response) {
        // console.log(response)
        if (response.status == 200) {
          if (response.data.status == 0) {
            Alert.alert("Successfully Changed Password.");
          } else if (response.data.status == 1) {
            Alert.alert("Wrong Email.");
          }
        }
      })
      .catch(function (error) {
        Alert.alert(
          "Unable to load. Please check your network settings."
        );
      });
  }

  post(data) {
    const url=" http://127.0.0.1:5000/api/reset_password"
    fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
            .then((json) => {
                console.log(JSON.stringify(json));
                if (json.status == 0) {
                  Alert.alert("Successfully Changed Password.");
                } else if (json.status == 1) {
                  Alert.alert("Wrong infomation. Please check your info.");
                }
            })
      .catch(function (error) {
        Alert.alert(
          "Unable to load. Please check your network settings."
        );
      });
  }

  submit=(data)=>{
    this.post(data)
  }

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        style={{ backgroundColor: "#fff" }}
      >
        <View style={styles.input_container}>
          <Text style={styles.header1}>Authentication</Text>
          <Text style={styles.header2}>PUID</Text>
          <TextInput
            style={styles.input_box}
            placeholder="000111"
            textContentType="PUID"
            clearButtonMode="while-editing"
            onChangeText={(value) => this.setState({ PUID: value })}
          />
          <Text style={styles.header2}>Email</Text>
          <TextInput
            style={styles.input_box}
            placeholder="student@purdue.edu"
            textContentType="username"
            clearButtonMode="while-editing"
            onChangeText={(value) => this.setState({ email: value })}
          />
          <Text style={styles.header2}>Date of Birth</Text>
          <TextInput
            style={styles.input_box}
            placeholder="MM/DD/YY"
            textContentType="birthday"
            clearButtonMode="while-editing"
            onChangeText={(value) => this.setState({ birthday: value })}
          />
          <Text style={styles.header1}>Reset Password</Text>
          <Text style={styles.header2}>New Password</Text>
          <TextInput
            style={styles.input_box}
            placeholder="password"
            textContentType="password"
            clearButtonMode="while-editing"
            secureTextEntry={true}
            onChangeText={(value) => this.setState({ new_password: value })}
          />
          <TouchableOpacity
            style={styles.button_style}
            onPress={()=>this.submit(this.state)}
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
    marginTop:10,
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
    marginTop: 60,
    marginBottom:20,
    shadowColor: "gray",
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 10 },
    alignItems: "center",
    padding: 6
  }
});

export default Reset_password_page;
