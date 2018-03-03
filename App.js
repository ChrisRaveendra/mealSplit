import React from 'react';
import {   StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  AsyncStorage } from 'react-native';
  import { StackNavigator } from 'react-navigation';

  class LoginScreen extends React.Component{
    static navigationOptions = {
      title: 'Login'
    };
    register() {
      this.props.navigation.navigate('Register');
    }
    press() {
      this.props.navigation.navigate('Login2');
    }
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.textBig}>Login to MealSplit!</Text>
          <TouchableOpacity onPress={ () => {this.press()} } style={[styles.button, styles.buttonGreen]}>
            <Text style={styles.buttonLabel}>Tap to Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={ () => {this.register()} }>
            <Text style={styles.buttonLabel}>Tap to Register</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  class RegisterScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: ''
      }
    }
    static navigationOptions = {
      title: 'Register'
    };
    render() {
      return (
        <View style={styles.container}>
          <TextInput style={{height: 40, width: '95%', borderWidth: 0.5, borderColor: 'black', marginBottom: 10, paddingLeft: 10}} type="text" placeholder="Username" value={this.state.username} onChangeText={(text) => this.setState({username: text})}/>
          <TextInput style={{height: 40, width: '95%', borderWidth: 0.5, borderColor: 'black', paddingLeft: 10}} secureTextEntry={true} placeholder="Password" value={this.state.password} onChangeText={(text) => this.setState({password: text})}/>
          <TouchableOpacity style={[styles.button, styles.buttonRed]} onPress={ () => {this.registerButton()} }>
            <Text style={styles.buttonLabel}>Register</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  class LoginPart2Screen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: ''
      }
    }
    static navigationOptions = {
      title: 'Login2'
    };
    render() {
      return (
        <View style={styles.container}>
          <TextInput style={{height: 40, width: '95%', borderWidth: 0.5, borderColor: 'black', marginBottom: 10, paddingLeft: 10}} type="text" placeholder="Username" value={this.state.username} onChangeText={(text) => this.setState({username: text})}/>
          <TextInput style={{height: 40, width: '95%', borderWidth: 0.5, borderColor: 'black', paddingLeft: 10}} secureTextEntry={true} placeholder="Password" value={this.state.password} onChangeText={(text) => this.setState({password: text})}/>
          <TouchableOpacity style={[styles.button, styles.buttonRed]} onPress={ () => {this.registerButton()} }>
            <Text style={styles.buttonLabel}>Login</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  export default StackNavigator({
    Login: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
    Login2: {
      screen: LoginPart2Screen,
      
    }

  }, {initialRouteName: 'Login'});

  //StyleSheet
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      margin: 10,
      borderRadius: 5,
    },
    container1: {
      flex: 1,
      justifyContent: 'center',
      //alignItems: 'center',
      backgroundColor: '#F5FCFF',
      borderRadius: 5,
      borderColor:"black",
      borderWidth:.5,
      padding:4
    },
    containerFull: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    textBig: {
      fontSize: 36,
      textAlign: 'center',
      margin: 10,
    },
    button: {
      alignSelf: 'stretch',
      paddingTop: 10,
      paddingBottom: 10,
      marginTop: 10,
      marginLeft: 5,
      marginRight: 5,
      borderRadius: 5
    },
    buttonRed: {
      backgroundColor: '#FF585B',
    },
    buttonBlue: {
      backgroundColor: '#0074D9',
    },
    buttonGreen: {
      backgroundColor: '#2ECC40'
    },
    buttonLabel: {
      textAlign: 'center',
      fontSize: 16,
      color: 'white'
    },
    buttonLabel1: {
      textAlign: 'center',
      fontSize: 16,
      color: 'black',
      borderColor:'black',
      borderWidth: 0.5,
      paddingTop: 10,
      paddingBottom: 10,
    }
  });
