/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View
} from 'react-native';
import Dimensions from 'Dimensions';

import {
	Masterpass
} from 'react-native-masterpass';

const windowWidth = Dimensions.get('window').width;

export default class ExampleApp extends Component {
	apiConfig = {
		baseUrl: 'http://camacafe.savantdegrees.com',
		authKey: 'q4bNJeJ5xmlXBD0zxuo7ho1BbPrOm8Yl', 
		brandCode: 'cama',
		pairingRequestUrl: '/api/1.0/cub/pairingRequest/',
		pairingCheckoutRequestUrl: '/api/1.0/cub/pairingCheckoutRequest/',
		precheckoutRequestUrl: '/api/1.0/cub/precheckoutRequest/',
		unpairCheckoutRequestUrl: '/api/1.0/cub/unpairingRequest/',
	}

	exampleProps = {
		checkoutParams: null,
		authToken: 'brdj6nTIh64N48WZXMX0ZhstcZNNAxa7',	// should refresh this if expired
		deviceToken: '86395fbb-7712-41fa-b7aa-12c40b0ac1bb',
	}

  onPairingCompleted = (result) => {
    console.log(result);
  }

  onPairingFail = (error) => {
    console.log(error);
  }

	render() {
    return (
			<Masterpass
				style={{flex:1, width: windowWidth}}	
				checkoutParams={this.exampleProps.checkoutParams}
				authToken={this.exampleProps.authToken}
				deviceToken={this.exampleProps.deviceToken}
				config={this.apiConfig}
				onPairingCompleted={this.onPairingCompleted}
				onPairingFail={this.onPairingFail}
				/>
    )
  }
}
