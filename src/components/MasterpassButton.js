import React, { Component } from 'react';
import {
	View,
	Image,
	TouchableOpacity,
	Text,
} from 'react-native'

const imgMasterpassBtn = require('../images/btn_mp.png')
const imgMasterpassCard = require('../images/card_masterpass.png')

class MasterpassButton extends Component {
	_renderCard = () => {
		const { card, renderCard, cardTextStyle } = this.props;
		if (!card) return null;

		if (renderCard) return renderCard(card)

		return (
			<Text style={{
				flex: 1,
				textAlign: 'center',
				fontWeight: 'bold',
				...cardTextStyle,
			}} > {`PAY WITH ****${card.get('LASTFOUR')}`}</Text>
		)
	}

	_onButtonLongPress = () => {
		const {
			paired,
			cardsAvailable,
			onOpenPairingAlert,
			onOpenMissingCardAlert,
			onOpenCardListView
		} = this.props;

		if (!paired) {
			// touch to open pairing alert
			return onOpenPairingAlert && onOpenPairingAlert();
		}

		if (!cardsAvailable) {
			// touch to open dialog informing user that no cards available
			return onOpenMissingCardAlert && onOpenMissingCardAlert();
		}

		// touch to open card selection popup
		onOpenCardListView && onOpenCardListView();
	}

	_onButtonPress = () => {
		const { card, onProceedCheckout } = this.props;
		if (!card) return;

		onProceedCheckout && onProceedCheckout(card);
	}

	render() {
		const { card, style, disabled, masterpassIconStyle } = this.props;

		if (card) {
			return (
				<TouchableOpacity
					disabled={disabled}
					onLongPress={this._onButtonLongPress}
					onPress={this._onButtonPress}
					>

					<View style={{
						flexDirection: 'row',
						alignItems: 'center',
						...style,
					}}>

						<Image resizeMode='contain' source={imgMasterpassCard} style={{
							...masterpassIconStyle,
						}} />

						{this._renderCard()}
					</View>
				</TouchableOpacity>	
			)
		}

		return (
			<TouchableOpacity
				disabled={disabled}	
				onPress={this._onButtonLongPress}
				>
				<Image source={imgMasterpassBtn} resizeMode='contain' style={{
					...style
				}}/>
			</TouchableOpacity>	
		)
	}
}

export default MasterpassButton;
