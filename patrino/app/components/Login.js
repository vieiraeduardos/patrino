import React, { Component } from "react";
import {
  Alert,
  AppRegistry,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Text,
  View
} from "react-native";

import AsyncStorage from '@react-native-community/async-storage';

import { StackNavigator } from "react-navigation";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      logging: "false"
    };
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "white",
      elevation: null
    },
    header: null
  };

  async onLoginPress() {
    const CorrectEmail = "eduardo";
    const CorrectPassword = "@eduardo";

    const { email, password } = this.state;

    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("password", password);

    if (email == CorrectEmail && password == CorrectPassword) {
      await AsyncStorage.setItem("logging", "true");

      this.props.navigation.navigate("HomeScreen");

    } else {
      Alert.alert(
         "E-mail ou senha estão incorretos!"
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View behavior="padding" style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("./heart.png")} />
            <Text style={styles.subtext}>Patrino</Text>
          </View>
          <KeyboardAvoidingView style={styles.keyboard}>
            <View style={styles.window}>
              <TextInput
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
            </View>
            <View style={styles.window}>
              <TextInput
                placeholder="Senha"
                returnKeyType="go"
                secureTextEntry
                ref={input => (this.passwordInput = input)}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.onLoginPress.bind(this)}
            >
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 200
  },
  subtext: {
    color: "black",
    marginTop: 10,
    width: 200,
    textAlign: "center",
    opacity: 0.8,
    fontSize: 50
  },
  keyboard: {
    margin: 20,
    padding: 20,
    alignSelf: "stretch"
  },
  buttonContainer: {
    backgroundColor: "#3c8dbc",
    paddingVertical: 15
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700"
  },
  button: {
    backgroundColor: "#3c8dbc",
    paddingVertical: 15
  },
  window: {
    marginBottom: 15
  }
});

AppRegistry.registerComponent("Login", () => Login);
