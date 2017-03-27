import React, { Component } from 'react';
import {
	View,
	Text,
	ListView,
	Image,
	TouchableOpacity
} from 'react-native';

const cardIcons = {
	amex: require('../images/card_amex.png'),
	diners: require('../images/card_diners.png'),
	discover: require('../images/card_discover.png'),
	maestro: require('../images/card_maestro.png'),
	mastercard: require('../images/card_mastercard.png'),
	visa: require('../images/card_visa.png')
}	

class MasterpassCardListView extends Component {
	constructor(props) {
		super(props);

		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});		
		this.dataSource = ds.cloneWithRows(props.cards || []);
	}

	_renderRow = (card) => {
		const { onCardSelected, renderRow, cardIconStyle, rowStyle, cardTextStyle, style } = this.props;
		if (renderRow) {
			return (
				<TouchableOpacity onPress={() => onCardSelected && onCardSelected(card)}>
					{renderRow(card)}
				</TouchableOpacity>	
			)
		}

		return (
			<TouchableOpacity onPress={() => onCardSelected && onCardSelected(card)}>
				<View style={{
					flexDirection: 'row',
					justifyContent: 'flex-end',
					alignItems: 'center',
					width: style && style.width,
					...rowStyle
				}}>
					<Text style={{
						textAlign: 'center',
						flex: 1,
						fontWeight: 'bold',
						color: 'white',
						...cardTextStyle
					}}>{`****${card.get('LASTFOUR')}`}</Text>
					<Image resizeMode='contain' source={cardIcons[card.get('BRANDNAME').toLowerCase()]} style={cardIconStyle} />
				</View>
			</TouchableOpacity>
		)
	}

	_renderSeparator = (sectionId, rowId) => {
		if (rowId >= this.dataSource.getRowCount() - 1) return null;

		const { renderSeparator, renderRow, cards, style, separatorStyle } = this.props;
		if (renderSeparator) return renderSeparator(sectionId, rowId);

		return (
			<View style={{
				backgroundColor: 'white', 
				height: 1,
				width: style && style.width,
				...separatorStyle
			}}/>
		)
	}

	render() {
		const {style} = this.props;
		return (
			<View style={style}>
				<ListView
					renderSeparator={this._renderSeparator}
					dataSource={this.dataSource}
					renderRow={this._renderRow}
						/>
			</View>
		)
	}
}

export default MasterpassCardListView;
