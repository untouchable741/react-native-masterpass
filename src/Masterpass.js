import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import MasterpassManager from './MasterpassManager';
import Dimensions from 'Dimensions';

import url from 'url';
import querystring from 'querystring';

var width = Dimensions.get('window').width;

let apiConfig = { baseUrl: 'http://camacafe.savantdegrees.com',
                  pairingRequestUrl: '/api/1.0/cub/pairingRequest/',
                  pairingCheckoutRequestUrl: '/api/1.0/cub/pairingCheckoutRequest/',
                  precheckoutRequestUrl: '/api/1.0/cub/precheckoutRequest/',
                  unpairCheckoutRequestUrl: '/api/1.0/cub/unpairingRequest/',
                  authKey: 'q4bNJeJ5xmlXBD0zxuo7ho1BbPrOm8Yl', 
                  brandCode: 'cama' }

MasterpassManager.initialize(apiConfig);

export default class Masterpass extends Component {

    constructor(props) {
        super(props);
        this.state = { authToken : 'MbFR9a80JDAra68L0bhsrMEk9RMALF5J',
                       deviceToken : 'test_device' }
    }

    componentWillMount() { 
        this.sendPairingRequest();
    }

    sendUnpairRequest() {
        MasterpassManager.unpairingRequest(this.state.authToken, this.state.deviceToken)
            .then(response => {
                console.log(response);
            });
    }

    sendPrecheckoutRequest() {
        MasterpassManager.precheckoutRequest(this.state.authToken, this.state.deviceToken)
            .then(response => {
                console.log(response);
            })
    }

    sendPairingCheckoutRequest() {
         MasterpassManager.pairingCheckoutRequest(this.state.authToken, this.state.deviceToken, 1000, 1).then(jsonResponse => {
            if (jsonResponse['success'] == true) {
                this.setState({ injectedJavaScript: jsonResponse['injectedJavaScript']})
                this.refs['authWebview'].reload();
            }
            else {
                if (typeof this.props.onPairingFail === 'function') {
                    this.props.onPairingFail(jsonResponse['message']);
                }
                else {
                    console.log('Please implement onPairingFail to receive error message');
                }
            }
        })
    }

    sendPairingRequest() {
         MasterpassManager.pairingRequest(this.state.authToken, this.state.deviceToken).then(jsonResponse => {
            if (jsonResponse['success'] == true) {
                this.setState({ injectedJavaScript: jsonResponse['injectedJavaScript']})
                this.refs['authWebview'].reload();
            }
            else {
                if (typeof this.props.onParingFail === 'function') {
                    this.props.onPairingFail(jsonResponse['message']);
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
        if (lastPathComponent === 'pairingSuccess') {
            if (typeof this.props.onPairingCompleted === 'function') {
                this.props.onPairingCompleted(queryString)
            }
            else {
                console.log('Please implement onPairingCompleted to receive result object')
            }
        }
    }

    render() {
        return (
            <WebView style={styles.container}
                source={{uri: `${apiConfig.baseUrl}` + '/masterpass'}}
                injectedJavaScript = {this.state.injectedJavaScript}
                ref='authWebview' onNavigationStateChange={this.onNavigationStateChange}/>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        width: width,
    }
}