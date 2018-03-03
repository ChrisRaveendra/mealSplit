import React, { Component } from 'react';
import { AppRegistry, View, Image } from 'react-native';

export default class DisplayAnImage extends Component {
    render() {
        return (
            <View>
                <Image
                    source={require('../f.jpeg')}
                />
                <Image
                    style={{ width: 50, height: 50 }}
                    source={{ uri: '../f.jpeg' }}
                />
            </View>
        );
    }
}

// skip this line if using Create React Native App
// AppRegistry.registerComponent('DisplayAnImage', () => DisplayAnImage);