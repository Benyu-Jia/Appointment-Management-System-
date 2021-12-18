import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";
import { Ionicons } from "react-native-vector-icons";

class Edit_appointment_page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_field: "",
      choice: null,
      data: [
        { id: "1", name: "first", time1: "2021-12-01", time2: "14:00" },
        { id: "2", name: "second", time1: "2021-12-01", time2: "14:00" }
      ]
    };
  }
  componentDidMount() {}

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("Edit_appointment_submit_page")
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
            {item.name}
          </Text>
          <Text style={{ flex: 2, fontSize: 15 }}>{item.name}</Text>
        </View>
        <View style={{ margin: 10, alignItems: "flex-end" }}>
          <Text style={{ flex: 2, fontSize: 20 }}>{item.time1}</Text>
          <Text style={{ flex: 2, fontSize: 15 }}>{item.time2}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  createEmptyView() {
    return (
      <Text style={{ fontSize: 40, alignSelf: "center" }}>
        here is nothing!
      </Text>
    );
  }

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

export default Edit_appointment_page;
