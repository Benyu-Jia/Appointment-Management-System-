import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import axios from "axios";
import ModalDropdown from "react-native-modal-dropdown";

class Rate_instructor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.route.params.email,
      password: props.route.params.password,
      name: props.route.params.name,
      type: props.route.params.type,
      title: props.route.params.title,
      score: null
    };
  }
  componentDidMount() {}

  render() {
    // console.log(this.state.name);
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
        <View
          style={{
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
          <Text style={{ flex: 2, fontSize: 20 }}>{this.state.type}</Text>
          <Text style={{ flex: 2, fontSize: 20 }}>{this.state.title}</Text>
          <Text style={{ flex: 2, fontSize: 20 }}>{this.state.name}</Text>
        </View>
        <ModalDropdown
          options={["1", "2", "3", "4", "5"]}
          style={styles.select_box}
          textStyle={{fontSize: 20}}
          dropdownStyle={{width: 130}}
          onSelect={(index, value) => this.setState({score: value})}
        />
        <TouchableOpacity
            style={styles.button_style}
            onPress={() => {
              axios({
                method: "post",
                url: "http://172.20.10.2:5000/api/rate_instructor",
                timeout: 5 * 1000,
                data: {
                  student_email: this.state.email,
                  password: this.state.password,
                  instructor_email: this.state.name,
                  score: this.state.score
                }
              })
                .then((response) => {
                  // console.log(response)
                  if (response.status == 200) {
                    if (response.data.status == 0) {
                      Alert.alert("Successfully submit rating");
                      this.props.navigation.navigate("Main_page", {email: this.state.email, password: this.state.password})
                    }
                    if (response.data.status != 0) {
                      Alert.alert("Error happens when submit rating");
                    }
                  }
                })
                .catch((error) =>{
                  console.log(this.state)
                  Alert.alert(
                    "Unable to submit. Please check your network settings or check missing filling or already rated"
                  );
                });
            }}
          >
          <Text style={{ color: "white", fontSize: 20 }}>submit</Text>
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
  },
  select_box: {
    alignSelf: "center",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default Rate_instructor;
