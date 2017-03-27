/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions';

import {
	MasterpassWebView,
	MasterpassButton,
	MasterpassCardListView,
	MasterpassApi
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
		authToken: 'yBD0vtDqtywfJRQPdLtVV7dT9yEXvbBf',	// should refresh this if expired
		deviceToken: 'admin2359',
	}

	state = {
		screen: 'pairing',	// 'pairing' || 'checkout',
		paired: false
	}

	masterpassApi = MasterpassApi.instantiate(this.apiConfig);

  onPairingCompleted = (result) => {
		const { authToken, deviceToken } = this.exampleProps
    console.log(result);
		this.setState({
			screen: 'checkout',
			paired: true
		})
  }

  onPairingFail = (error) => {
    console.log(error);
	}
	
	_handlePrecheckoutResult = (precheckoutResult) => {
		let walletData = precheckoutResult.walletData;
		let preCheckoutData = walletData && walletData.PreCheckoutData;
		let cardsData = preCheckoutData && preCheckoutData.CARDS;
		let cardArray = cardsData && cardsData.CARD;

		this.setState({
			cardsAvailable: cardArray && cardArray.length > 0
		})
	}

	render() {
		const { authToken, deviceToken } = this.exampleProps;
		switch (this.state.screen) {
			case 'pairing': {
				return (
					<MasterpassWebView
						style={{flex:1, width: windowWidth}}	
						checkoutParams={this.exampleProps.checkoutParams}
						authToken={authToken}
						deviceToken={deviceToken}
						config={this.apiConfig}
						onPairingCompleted={this.onPairingCompleted}
						onPairingFail={this.onPairingFail}
						/>
				)
			}

			case 'checkout': {
				return (
					<View style={{marginTop: 20}}>
					<TouchableOpacity onPress={() => {
						this.masterpassApi.precheckoutRequest(authToken, deviceToken)
							.then(this._handlePrecheckoutResult)
							.catch(error => console.log(error));
						} }><Text>Request precheckout</Text>
					</TouchableOpacity>		
					<MasterpassButton
						paired={this.state.paired}
						cardsAvailable={this.state.cardsAvailable}
						onOpenMissingCardAlert={() => { console.log('missing cards') } }
						onOpenCardListView={() => { console.log('open card list view') } }
					/>	
					</View>
				)
			}

			default: return null;	
		}
  }
}
