import React from 'react';
import {render} from 'react-dom';
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

  class WelcomeScreen extends React.Component{
    static navigationOptions = {
      title: 'Welcome'
    };
    register() {
      this.props.navigation.navigate('Register');
    }
    press() {
      this.props.navigation.navigate('Login');
    }
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.textBig}>Welcome to MealSplit!</Text>
          <TouchableOpacity onPress={ () => {this.press()} } style={styles.button}>
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
    registerButton() {
      this.props.navigation.navigate('MealSplit');
    }
    render() {
      return (
        <View style={styles.container}>
          <TextInput style={{height: 40, width: '95%', borderWidth: 0.5, borderColor: 'black', marginBottom: 10, paddingLeft: 10}} type="text" placeholder="Username" value={this.state.username} onChangeText={(text) => this.setState({username: text})}/>
          <TextInput style={{height: 40, width: '95%', borderWidth: 0.5, borderColor: 'black', paddingLeft: 10}} secureTextEntry={true} placeholder="Password" value={this.state.password} onChangeText={(text) => this.setState({password: text})}/>
          <TouchableOpacity style={styles.button} onPress={ () => {this.registerButton()} }>
            <Text style={styles.buttonLabel}>Register</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  class LoginScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: ''
      }
    }
    static navigationOptions = {
      title: 'Login'
    };

    registerButton() {
      this.props.navigation.navigate('MealSplit');
    }

    render() {
      return (
        <View style={styles.container}>
          <TextInput style={{height: 40, width: '95%', borderWidth: 0.5, borderColor: 'black', marginBottom: 10, paddingLeft: 10}} type="text" placeholder="Username" value={this.state.username} onChangeText={(text) => this.setState({username: text})}/>
          <TextInput style={{height: 40, width: '95%', borderWidth: 0.5, borderColor: 'black', paddingLeft: 10}} secureTextEntry={true} placeholder="Password" value={this.state.password} onChangeText={(text) => this.setState({password: text})}/>
          <TouchableOpacity style={styles.button} onPress={ () => {this.registerButton()} }>
            <Text style={styles.buttonLabel}>Login</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }


class MainScreen extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2}).cloneWithRows(['string1', 'string2', 'string3']), 
      };
  }

  static navigationOptions = {
    title: 'MealSplit'
  }

  renderRow(items) {
    return (
      <Text>{items}</Text>
    );
  }
  render() {
    return (
      <ListView
      style={{margin: 40}}
      dataSource={this.state.dataSource}
      renderRow={this.renderRow}
      />
    );
  }
}

  export default StackNavigator({
    Welcome: {
      screen: WelcomeScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
    Login: {
      screen: LoginScreen,
      
    },
    MealSplit: {
      screen: MainScreen,
    }

  }, {initialRouteName: 'Welcome'});

  //StyleSheet
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0066ff80',
      margin: 10,
      borderRadius: 5,
      fontFamily: 'Copperplate-Bold'
    },
    container1: {
      flex: 1,
      justifyContent: 'center',
      //alignItems: 'center',
      backgroundColor: '#F5FCFF80',
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
      color: 'white'
    },
    button: {
      alignSelf: 'stretch',
      paddingTop: 10,
      paddingBottom: 10,
      marginTop: 10,
      marginLeft: 5,
      marginRight: 5,
      borderRadius: 5,
      backgroundColor: '#cce0ff'
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
