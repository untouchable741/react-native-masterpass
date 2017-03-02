import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import querystring from 'querystring';
import Dimensions from 'Dimensions';
import MasterpassManager from './MasterpassManager';

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
        this.state = { authToken : 'RzY24fF2bMC2YQANv4E4fOUtfI3DJtGD',
                       deviceToken : 'test_device' }

    }

    componentWillMount() {
        this.sendPairingRequest()
    }

    sendPairingRequest() {
         MasterpassManager.pairingRequest(this.state.authToken, this.state.deviceToken).then(jsonResponse => {
            if (jsonResponse['success'] == true) {
                console.log(jsonResponse['injectedJavaScript']);
                this.setState({ injectedJavaScript: jsonResponse['injectedJavaScript']})
                this.refs['authWebview'].reload();
            }
            else {
                console.log('Pairing error ' + jsonResponse['message']);
            }
        })
    }

    render() {
        console.log('injected ' + this.state.injectedJavaScript);
        return (
            <WebView style={styles.container}
                source={{uri: `${apiConfig.baseUrl}` + '/masterpass'}}
                injectedJavaScript = {this.state.injectedJavaScript}
                ref='authWebview'/>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        width: width,
    }
}