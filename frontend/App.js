import React from "react";
import { ImageEditor, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login_page from "./pages/login_page";
import Signup_page from "./pages/signup_page";
import Edit_password_page from "./pages/edit_password_page";
import Edit_appointment_page from "./pages/edit_appointment_page";
import Edit_appointment_submit_page from "./pages/edit_appointment_submit_page";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Edit_appointment_page">
          <Stack.Screen
            name="Login_page"
            component={Login_page}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup_page"
            component={Signup_page}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Edit_password_page"
            component={Edit_password_page}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Edit_appointment_page"
            component={Edit_appointment_page}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Edit_appointment_submit_page"
            component={Edit_appointment_submit_page}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
