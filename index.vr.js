import React from 'react';
import SockJS from 'sockjs-client';

import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton
} from 'react-vr';

export default class ChatVR extends React.Component {

  constructor() {
    super();
    this.state = {message: "no connection"};

    this.sock = new SockJS('https://chat-server.azurewebsites.net/chat');

    this.sock.onopen = () => {
      this.setState( { message: 'connection open' });
    };

    this.sock.onmessage = e => {
      this.setState( { message: e.data });
    };

    this.sock.onclose = () => {
      this.setState( { message: 'connection closed' });
    };
  }

  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <NestedMessage sock={this.sock} message={this.state.message} />
        <TextBoxes sock={this.sock} />
      </View>
    );
  }
};

class NestedMessage extends React.Component {

  handleClick () {
    this.props.sock.send('Hi from VR World');
  }

  render() {
    return (
      <View>
          <VrButton
            onClick={this.handleClick.bind(this)}
          >
            <Text
              style={{
                backgroundColor: '#777879',
                fontSize: 0.8,
                fontWeight: '400',
                layoutOrigin: [0.5, .5],
                paddingLeft: 0.2,
                paddingRight: 0.2,
                textAlign: 'center',
                textAlignVertical: 'center',
                transform: [{translate: [0, 0, -5]}]
              }}
              >
            {this.props.message}
            </Text>
          </VrButton>
      </View>
    );
  }
};

class TextBoxes extends React.Component {

  handleYesClick () {
    this.props.sock.send('Yes');
  }

  handleNoClick () {
    this.props.sock.send('No');
  }


  render() {
    return (
      <View  style={{
            flex: 1,
            width: 2,
            flexDirection: 'row',
            alignItems: 'stretch',
            layoutOrigin: [0.5, 0.5],
            transform: [
              { translate: [0, -.6, -5] }
            ]
          }} >
        <VrButton onClick={this.handleYesClick.bind(this) }>
          <View style={{ margin: 0.1, height: 0.3, backgroundColor: '#777879'}}>
            <Text style={{fontSize: 0.2, textAlign: 'center'}}>Yes</Text>
          </View>
        </VrButton>
        <VrButton  onClick={this.handleNoClick.bind(this) }>
          <View style={{ margin: 0.1, height: 0.3, backgroundColor: '#777879'}}>
            <Text style={{fontSize: 0.2, textAlign: 'center'}}>No</Text>
          </View>
        </VrButton>
      </View>
    )
  }
}


AppRegistry.registerComponent('ChatVR', () => ChatVR);