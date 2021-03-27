import React, { useEffect } from 'react';

const CardContainer = (props) => {
	useEffect(() => {
		props.showGoodWithId(props.match.params.id)
		return () => props.resetFetchingGoodData()
	}, [props.match.params.id])
	return (
		<CardWithPreloader card={props.cardData} addGoodToCart={props.addGoodToCart} addDeleteFromWishlist={props.addDeleteFromWishlist} />
	)
}

const mapStateToProps = (state, props) => {
	return {
		// competitions: state
    initialized: state.app.initialized
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	}
}

const WithURLDataCardContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CardContainer))

export default WithURLDataCardContainer