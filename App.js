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
      if (this.state.username === '' || this.state.password === '') {
        alert('Invalid username or password.')
      } else {
        fetch('http://10.2.110.91:3000/signup', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          this.props.navigation.navigate('MealSplit');
          /* do something with responseJson and go back to the Login view but
          * make sure to check for responseJson.success! */
        })
        .catch((err) => {
          console.log(err)
          alert(err.message);
        });
      }
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
      if (this.state.username === '' || this.state.password === '') {
        alert('Invalid username or password.')
      } else {
        fetch('http://10.2.110.91:3000/login', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          this.props.navigation.navigate('MealSplit')
        })
        .then(()=>AsyncStorage.setItem('user', JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })))
        .catch((err) => {
          alert( err);
        });
      }
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
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2}).cloneWithRows(['string1', 'string2', 'string3']),
      };
  }

  static navigationOptions = {
    title: 'MealSplit'
  }
  componentDidMount(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    fetch('http://10.2.110.91:3000/contacts', {
      method: 'GET',
      credentials: 'include'
    })
    .then((resp) => resp.json())
    .then(respJson => {
      console.log(respJson)
      this.setState({
        dataSource: ds.cloneWithRows(respJson)
      })
    })
    .catch(err=>console.log(err))
  }

  render() {
    return (
      <View>
      {this.state.dataSource?
    <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => (
          <TouchableOpacity>
            <Text style={styles.buttonLabel1}>{rowData.username}</Text>
          </TouchableOpacity>
        )}
      />:null}

    </View>
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
