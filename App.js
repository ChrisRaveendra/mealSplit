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
	AsyncStorage,
	ActivityIndicator,
	PanResponder,
	Animated,
	Dimensions,
	Image} from 'react-native';
	import { StackNavigator } from 'react-navigation';
	import {DisplayAnImage} from './routes/receipt';

var ip = 'http://10.2.110.115:3000'
	// http://10.2.110.91:3000

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
			);
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
				fetch(`${ip}/signup`, {
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
				fetch(`${ip}/login`, {
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
					this.props.navigation.navigate('UploadPhoto')
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

	class PhotoScreen extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				start:true
			}
		}

		static navigationOptions = {
			title: 'Upload Photo'
		}
	
		render() {
			return (
				<View style={styles.container}>{
					this.state.start ? 
						<View>
							<TouchableOpacity onPress={() => this.setState({start:false})}> 
								<View>
									<Image
										style={{ width: 150, height: 100, marginTop: 150 }}
										source={require('./camEra.png')}
									/>
									{/* <Image
										style={{ width: 20, height: 20, marginTop: 150 }}
										source={{ uri: './camEra.png' }}
									/> */}
								</View>
								<Text style={styles.welcome1}>Upload a Photo</Text>
							</TouchableOpacity>
						</View>
						:<TouchableOpacity onPress={() => this.props.navigation.navigate('MealSplit')}>
							<View>
								<Image
									// style={{ width: 100, height: 500 }}
									source={require('./f.jpeg')}
								/>
								<Image
									style={{ width: 50, height: 1 }}
									source={{ uri: './f.jpeg' }}
								/>
							</View>
						</TouchableOpacity>}
				</View>
			)
		}
	}

const hide = [];
	
class MainScreen extends React.Component {
	constructor(props){
			super(props);
			this.state = {
				loaded: false,
				people: [],
				contactsDataSource: new ListView.DataSource({
					rowHasChanged: (row1, row2) => row1 !== row2}).cloneWithRows(['string1', 'string2', 'string3']),
				itemsDataSource: new ListView.DataSource({
					rowHasChanged: (row1, row2) => row1 !== row2}).cloneWithRows(['string1', 'string2', 'string3']),
				photo: false
			};
	}

	static navigationOptions = {
		title: 'MealSplit'
	}
	componentDidMount(){
		fetch(`${ip}/contacts`, {
			method: 'GET',
			credentials: 'include'
		})
		.then((resp) => resp.json())
		.then(respJson => {
			console.log(respJson)
			this.setState({
				people: respJson,
				contactsDataSource: this.state.contactsDataSource.cloneWithRows(respJson)
			})
		})
		.catch(err=>console.log(err))

		fetch(`${ip}/items`, {
			method: 'GET',
			credentials: 'include'
		})
		.then((resp) => resp.json())
		.then(respJson => {
			console.log(respJson)
			this.setState({
				loaded: true,
				itemsDataSource: this.state.itemsDataSource.cloneWithRows(respJson)
			})
		})
		.catch(err=>console.log(err))

	}

	updates(person, item) {
		fetch(`${ip}/items`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
			user: person._id,
			name:item.name,
			price: item.price})})
			.then((resp) => resp.json())
			.then(respJson => {
				this.setState({hide:[...hide, item.name]})
				hide.push(item.name);
				console.log(respJson)
				console.log('UPDATED STATE ITEMS', hide, item.name)
				this.props.navigation.navigate('MealSplit');
			})
			.catch(err => console.log(err))

	}

	render() {
		console.log('STATE HERE: ', this.state)
		return (
			<View>
				<Text style={styles.textBig2}>Contacts</Text>
				{this.state.contactsDataSource?
	
				<ListView
						dataSource={this.state.contactsDataSource}
						renderRow={(rowData) => (
							<TouchableOpacity onPress={() => Alert.alert(rowData.username, "owes you $12.18", 
							[{ text: "Ok", onPress: () => console.log("Cancel Pressed"), style: "cancel" }] )}>
								<Text style={styles.buttonLabel1}>{rowData.username}</Text>
							</TouchableOpacity>
						)}
					/>:null}
					<Text style={styles.textBig3}>Tap to assign items</Text>
					{this.state.loaded?
					<ListView style={{paddingTop:15}}
							dataSource={this.state.itemsDataSource}
							renderRow={(rowData) => (
								<View>{hide.indexOf(rowData.name) !== -1?
									null:<TouchableOpacity 
									style={styles.button2}
									// style={{alignItems:'center'}}
									onPress={() => Alert.alert(rowData.name, "Who ate this?", 
										// [
										// 	{ text: "Ask me later", onPress: () => console.log("Ask me later pressed")},
										// 	{text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
										// 	{text: "OK", onPress: () => console.log("OK Pressed")},
										// ],
										this.state.people.map(person => ({ text: person.username, onPress: () => this.updates(person, rowData) })).concat([{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }]),
										{cancelable: false }
									)}
									// {this.updates.bind(this,rowData)}
									// delayLongPress={500}
									>
										<Text style={{textAlign: 'center'}}>{rowData.name}(${(rowData.price*1.18*1.18).toFixed(2)}) </Text>
								</TouchableOpacity>}
								</View>
							)} 
					/>  : <ActivityIndicator size="large" color="#0000ff" />}
					
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
		},
		UploadPhoto: {
			screen: PhotoScreen
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
			// fontFamily: 'Copperplate-Bold'
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
		welcome1: {
			fontSize: 20,
			textAlign: 'center',
			// marginTop: 500,
			color: 'white'
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
		textBig2: {
			fontSize: 36,
			textAlign: 'center',
			margin: 10,
			color: 'black'
		},
		textBig3: {
			fontSize: 20,
			textAlign: 'center',
			margin: 10,
			color: 'black'
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
		button2: {
			// alignSelf: 'flex-start',
			paddingTop: 10,
			paddingBottom: 10,
			margin: 5,
			borderRadius: 7,
			//height:5,
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
		},
		buttonLabel2: {
			textAlign: 'left',
			fontSize: 16,
			color: 'black',
			borderColor:'black',
			borderWidth: 0.5,
			paddingTop: 10,
			paddingBottom: 10,
		}
	});
