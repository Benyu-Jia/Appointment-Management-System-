import axios from "axios";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Button
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import Moment from "moment";
// import DateTimePickerModel from "react-native-modal-datetime-picker"

// Date.prototype.Format = function (fmt) {
//   var o = {
//     "M+": this.getMonth() + 1,

//   }
// }

class Edit_appointment_submit_page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.route.params.email,
      password: props.route.params.password,
      office_hour_num: props.route.params.num,
      day_time: props.route.params.day_time,
      date: null,
      name: "name",
      description: "description",
      time1: "time1",
      time2: "time2",
      similar_office_hour: null,
      choice: null,
      dateVisible: false,
      new_day_time: "wait to choose"
    };
  }
  componentDidMount() {
    this.query_appointment();
    this.query_similar_office_hour();
  }

  query_appointment() {
    axios({
      method: "post",
      url: "http://172.20.10.2:5000/api/query_appointment_info",
      timeout: 5 * 1000,
      data: {
        office_hour_num: this.state.office_hour_num
      }
    })
      .then((response) => {
        // console.log(response)
        if (response.status == 200) {
          if (response.data.status == 0) {
            this.setState({
              name: response.data.name,
              description: response.data.title,
              time1: response.data.start_time + "-" + response.data.end_time,
              time2: response.data.day
            });
          }
        }
      })
      .catch(function (error) {
        // console.log(error)
        Alert.alert("Unable to load. Please check your network settings.");
      });
  }

  query_similar_office_hour() {
    axios({
      method: "post",
      url: "http://172.20.10.2:5000/api/query_similar_office_hour",
      timeout: 5 * 1000,
      data: {
        office_hour_num: this.state.office_hour_num
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

  createEmptyView() {
    return (
      <Text style={{ fontSize: 20, alignSelf: "center" }}>
        no other available time
      </Text>
    );
  }

  _renderItem = ({ item, index }) => {
    if (this.state.choice != null && this.state.choice == item.id) {
      return (
        <TouchableOpacity
          onPress={() => this.setState({ choice: item.id })}
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
            shadowColor: "gray",
            borderRadius: 10,
            backgroundColor: "grey",
            shadowColor: "gray",
            shadowOpacity: 0.4,
            shadowRadius: 5,
            shadowOffset: { width: 1, height: 10 },
            margin: 10
          }}
        >
          <Text style={{ flex: 2, fontSize: 20 }}>
            {item.start_time} - {item.end_time}
          </Text>
          <Text style={{ flex: 2, fontSize: 15 }}>{item.day}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => this.setState({ choice: item.id })}
          style={{
            flex: 1,
            flexDirection: "column",
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
          <Text style={{ flex: 2, fontSize: 20 }}>
            {item.start_time} - {item.end_time}
          </Text>
          <Text style={{ flex: 2, fontSize: 15 }}>{item.day}</Text>
        </TouchableOpacity>
      );
    }
  };

  render() {
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
          <Text style={styles.header}>Edit Appointment</Text>
        </View>
        <View style={styles.subheader_container}>
          <Text style={styles.subheader}>Existing appointments</Text>
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
          <View style={{ margin: 10 }}>
            <Ionicons name="person" size={50} />
          </View>
          <View
            style={{
              flex: 1,
              margin: 10,
              flexDirection: "column"
            }}
          >
            <Text style={{ flex: 2, fontWeight: "bold", fontSize: 20 }}>
              {this.state.name}
            </Text>
            <Text style={{ flex: 2, fontSize: 15 }}>
              {this.state.description}
            </Text>
          </View>
          <View style={{ margin: 10, alignItems: "flex-end" }}>
            <Text style={{ flex: 2, fontSize: 20 }}>{this.state.time1}</Text>
            <Text style={{ flex: 2, fontSize: 15 }}>{this.state.time2}</Text>
          </View>
        </View>
        <Text>Change to</Text>
        <FlatList
          data={this.state.data}
          ListEmptyComponent={this.createEmptyView()}
          renderItem={this._renderItem}
        />
        <View style={{ flex: 2 }}>
          <Text style={{ fontSize: 20 }}>Date</Text>
          <Text style={{ fontSize: 20, alignSelf: "center" }}>
            "{this.state.new_day_time}"
          </Text>
          <Button
            title="Show Date Picker"
            onPress={() => this.setState({ dateVisible: true })}
          />
        </View>
        <DateTimePickerModal
          isVisible={this.state.dateVisible}
          mode="date"
          onConfirm={(date) => {
            var formatter = new Date(date);
            this.setState({
              new_day_time:
                String(formatter.getFullYear()) +
                "-" +
                String(formatter.getMonth() + 1) +
                "-" +
                String(formatter.getDate()),
              dateVisible: false
            });
          }}
          onCancel={() => this.setState({ dateVisible: false })}
        />
        <View style={{ alignSelf: "center" }}>
          <TouchableOpacity
            style={styles.button_style}
            onPress={() => {
              // console.log(this.state.data[Number(this.state.choice) - 1]["num"])
              axios({
                method: "post",
                url: "http://172.20.10.2:5000/api/edit_appointment",
                timeout: 5 * 1000,
                data: {
                  email: this.state.email,
                  password: this.state.password,
                  old_office_hour_num: this.state.office_hour_num,
                  old_day_time: this.state.day_time,
                  new_office_hour_num: this.state.data[Number(this.state.choice) - 1]["num"],
                  new_day_time: this.state.new_day_time
                }
              })
                  .then((response) => {
                    // console.log(response)
                    if (response.status == 200) {
                      if (response.data.status == 0) {
                        Alert.alert("Successfully edited appointment");
                      }
                      if (response.data.status != 0) {
                        Alert.alert("Error happens when edited appointment");
                      }
                    }
                  })
                  .catch(function (error) {
                    // console.log(error)
                    Alert.alert(
                      "Unable to load. Please check your network settings or missing filling"
                    );
                  })
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button_style}
            onPress={() => {
              axios({
                method: "post",
                url: "http://172.20.10.2:5000/api/cancel_appointment",
                timeout: 5 * 1000,
                data: {
                  email: this.state.email,
                  password: this.state.password,
                  office_hour_num: this.state.office_hour_num,
                  day_time: this.state.day_time
                }
              })
                .then((response) => {
                  // console.log(response)
                  if (response.status == 200) {
                    if (response.data.status == 0) {
                      Alert.alert("Successfully canceled appointment");
                    }
                    if (response.data.status != 0) {
                      Alert.alert("Error happens when canceling appointment");
                    }
                  }
                })
                .catch((error) => {
                  console.log(this.state)
                  Alert.alert(
                    "Unable to load. Please check your network settings."
                  );
                });
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
    paddingLeft: 10,
    paddingBottom: 47
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

export default Edit_appointment_submit_page;
