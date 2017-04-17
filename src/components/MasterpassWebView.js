import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import MasterpassApi from '../MasterpassApi';

import url from 'url';
import querystring from 'querystring';

export default class MasterpassWebView extends Component {
	masterpassApi = null;
	apiConfig = null;

	pairingResultData = {
		resourceId: '',
		querystring: null
	};

	constructor(props) {
		super(props);
		this.state = {
				authToken: props.authToken,
				deviceToken: props.deviceToken
		}

		this.apiConfig = props.config;		
		masterpassApi = MasterpassApi.instantiate(props.config);
	}

	componentWillMount() { 
		if (this.props.checkoutParams) {
				this.sendPairingCheckoutRequest();
		} else {
				this.sendPairingRequest();
		}
	}

	sendPairingCheckoutRequest = () => {
		const { onPairingFail, checkoutParams } = this.props;
		masterpassApi.pairingCheckoutRequest(this.state.authToken, this.state.deviceToken, checkoutParams.amount, checkoutParams.store)
				.then(jsonResponse => {
						if (jsonResponse['success'] == true) {
								this.setState({ injectedJavaScript: jsonResponse['injectedJavaScript']})
								this.refs['authWebview'].reload();

								this.pairingResultData.resourceId = jsonResponse.resourceId;
						}
						else {
								if (typeof onPairingFail === 'function') {
										onPairingFail(jsonResponse['message']);
								}
								else {
										console.log('Please implement onPairingFail to receive error message');
								}
						}
				})
	}

	sendPairingRequest = () => {
		console.log('send mp pairing request ', this.state.authToken, this.state.deviceToken)
		const { onPairingFail } = this.props;
		masterpassApi.pairingRequest(this.state.authToken, this.state.deviceToken)
				.then(jsonResponse => {
						if (jsonResponse['success'] == true) {
								const injectedJavaScript = jsonResponse['injectedJavaScript'];
								this.setState({ injectedJavaScript})
								this.refs['authWebview'].reload();
						}
						else {
								if (typeof onPairingFail === 'function') {
										onPairingFail(jsonResponse['message']);
								}
								else {
										console.log('Please implement onPairingFail to receive error message');
								}
						}
		})
	}

	onNavigationStateChange = (webview) => {
		var urlComponents = url.parse(webview.url);
		var queryString = querystring.parse(urlComponents.query);
		var pathComponents = urlComponents.pathname.split('/')
		let lastPathComponent = pathComponents[pathComponents.length - 1]
		if (lastPathComponent === 'pairingSuccess' || lastPathComponent=== 'pairingCheckoutSuccess') {
			//Check if webview actually finished loading
			if (webview.loading == false) {
				if (typeof this.props.onPairingCompleted === 'function') {
					this.pairingResultData.querystring = querystring;
					this.props.onPairingCompleted(this.pairingResultData)
				}
				else {
					console.log('Please implement onPairingCompleted to receive result object')
				}
			}
		}
	}

	render() {
		return (
				<WebView 
					{...this.props}
					source={{uri: `${this.apiConfig.baseUrl}` + '/masterpass'}}
					injectedJavaScript = {this.state.injectedJavaScript}
					ref='authWebview' onNavigationStateChange={this.onNavigationStateChange}/>
		);
	}
}
