import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import DateTimePickerModel from "react-native-modal-datetime-picker"

class Edit_appointment_submit_page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_field: "",
      choice: null,
      date: null
    };
  }
  componentDidMount() {}

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
              name
            </Text>
            <Text style={{ flex: 2, fontSize: 15 }}>name</Text>
          </View>
          <View style={{ margin: 10, alignItems: "flex-end" }}>
            <Text style={{ flex: 2, fontSize: 20 }}>first</Text>
            <Text style={{ flex: 2, fontSize: 15 }}>second</Text>
          </View>
        </View>
        <Text>Change to</Text>
        <DatePickerIOS
        mode="date"
        format="YYYY-MM-DD"
        confirmBtnText="Comfirm"
        cancelBtnText="Cancel"
        androidMode="spinner"
        customStyles={{dateIcon:{display: "none"}}}
        onDateChange={(date)=>{this.setState({date: date})}}/>
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
  }
});

export default Edit_appointment_submit_page;
