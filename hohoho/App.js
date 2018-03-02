import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Location, Permissions, MapView } from 'expo';
import Swiper from 'react-native-swiper';

//Screens
class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login'
  };

  press() {
    this.props.navigation.navigate('Login2');
  }
  register() {
    this.props.navigation.navigate('Register');
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textBig}>Login to HoHoHo!</Text>
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

  registerButton() {
    if (this.state.username === '' || this.state.password === '') {
      alert('Invalid username or password.')
    } else {
      fetch('https://hohoho-backend.herokuapp.com/register', {
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
        this.props.navigation.goBack()
        /* do something with responseJson and go back to the Login view but
        * make sure to check for responseJson.success! */
      })
      .catch((err) => {
        alert('error', err);
      });
    }
  }

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

  registerButton() {
    if (this.state.username === '' || this.state.password === '') {
      alert('Invalid username or password.')
    } else {
      fetch('https://hohoho-backend.herokuapp.com/login', {
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
        this.props.navigation.navigate('Swiper')
      })
      .then(()=>AsyncStorage.setItem('user', JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })))
      .catch((err) => {
        alert('error', err);
      });
    }
  }
  componentDidMount(){
    AsyncStorage.getItem('user')
    .then(result => {
      var parsedResult = JSON.parse(result);
      var username = parsedResult.username;
      var password = parsedResult.password;
      if (username && password) {
        return fetch('https://hohoho-backend.herokuapp.com/login', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
          })
        })
        .then(resp => resp.json())
        .then((responseJson) => {
          console.log(responseJson)
          this.props.navigation.navigate('Swiper')
        })
        .then(()=> AsyncStorage.setItem('user', JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })))
      }
      // Don't really need an else clause, we don't do anything in this case.
    })
    .catch(err => {console.log(err) })
  }

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
var self;
class UsersScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource:false,
    };
    self = this;

  }
  static navigationOptions = {
    title: 'Users',
    headerRight: <TouchableOpacity onPress={() => self.messages()}><Text style={{color:'#0074D9', fontSize:18, paddingRight:10 }}>Messages</Text></TouchableOpacity>
  };

  componentDidMount(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    fetch('https://hohoho-backend.herokuapp.com/users', {
      method: 'GET',
      credentials: 'include'
    })
    .then((resp) => resp.json())
    .then(respJson => {
      console.log(respJson)
      this.setState({
        dataSource: ds.cloneWithRows(respJson.users)
      })
    })
    .catch(err=>console.log(err))
  }

  touchUser(user){
    fetch('https://hohoho-backend.herokuapp.com/messages', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        to: user._id,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {

      console.log(user)
      Alert.alert('Alert Title',
      'your HOHOHO to '+user.username+" has been sent",
      [{text: 'Dismiss Button'}]
    )
    console.log(responseJson)
  })
  .catch((err) => {
    alert('Failure',
    'your HOHOHO to '+user.username+" could not be sent",
    [{text: 'Dismiss Button'}]
  )
  console.log(err)});
}
messages(){
  this.props.navigation.navigate('Messages');
}
sendLocation = async(user) => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    //handle failure
    console.log(status)
  }else{
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    console.log("location", location)
    fetch('https://hohoho-backend.herokuapp.com/messages', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({

        to: user._id,
        location: {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude
        }

      })
    })
    .then((response) => response.json())
    .then((responseJson) => {

      Alert.alert('Alert Title',
      'your location to '+user.username+" has been sent",
      [{text: 'Dismiss Button'}]
    )
    console.log(responseJson, "send loc")
  })
  .catch((err) => {
    alert('Failure',
    'your location to '+user.username+" could not be sent",
    [{text: 'Dismiss Button'}]
  )
  console.log(err)})
  }

}
render() {
  return (
    this.state.dataSource?
  <ListView
      dataSource={this.state.dataSource}
      renderRow={(rowData) => (
        <TouchableOpacity
          onPress={this.touchUser.bind(this, rowData)}
          onLongPress={this.sendLocation.bind(this, rowData)}
          delayLongPress={1500}>
          <Text style={styles.buttonLabel1}>{rowData.username}</Text>
        </TouchableOpacity>
      )}
    />:null
  );
}
}

class MessagesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource:false,
    };
  }
  static navigationOptions = {
    title: 'Messages'
  };

  componentDidMount(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    fetch('https://hohoho-backend.herokuapp.com/messages', {
      method: 'GET',
      credentials: 'include'
    })
    .then((resp) => resp.json())
    .then(respJson => {
      console.log(respJson)
      this.setState({
        dataSource: ds.cloneWithRows(respJson.messages)
      })
    })
    .catch(err=>console.log(err))
  }

  render() {
    return (
      <View>
        {this.state.dataSource ? (
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => (
                <View style={ styles.container1 }>
                <Text>from: {rowData.from.username}</Text>
                <Text>to: {rowData.to.username}</Text>
                <Text>message: {rowData.body}</Text>
                <Text>when: {rowData.timestamp}</Text>

                {rowData.location && rowData.location.longitude ? (
                  <View>
                    <MapView
                      region={{
                        latitude: rowData.location.latitude,
                        longitude: rowData.location.longitude,
                        latitudeDelta:0.5,
                        longitudeDelta:0.25
                      }}
                      style={{height:100}}
                      >

                    <MapView.Marker
                      coordinate={{latitude: rowData.location.latitude, longitude: rowData.location.longitude}}
                    />
                  </MapView>
                </View>
                ) : null}
              </View>
          )}
        />
      ) : null}
      </View>
    );
  }
}

class SwiperScreen extends React.Component {
  static navigationOptions = {
    title: 'HoHoHo!'
  };

  render() {
    return (
      <Swiper loop={false}>
        <UsersScreen navigation={this.props.navigation}/>
        <MessagesScreen navigation={this.props.navigation}/>
      </Swiper>
    );
  }
}

//Navigator
export default StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  Login2: {
    screen: LoginPart2Screen,
  },
  Users: {
    screen: UsersScreen,
  },
  Messages: {
    screen: MessagesScreen,
  },
  Swiper: {
    screen: SwiperScreen,
  }
}, {initialRouteName: 'Login'});


//Styles
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
