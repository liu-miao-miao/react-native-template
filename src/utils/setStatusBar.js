import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { StatusBar, Platform } from 'react-native';

export const setStatusBar = (statusbarProps = {}) => WrappedComponent => {
	class Component extends React.Component {
		constructor(props) {
			super(props);
			this._navListener = props.navigation.addListener('willFocus', this._setStatusBar);
		}

		componentWillUnmount() {
			this._navListener.remove();
		}

		_setStatusBar = () => {
			const {
				barStyle = "dark-content",
				backgroundColor = '#fff',
				translucent = false
			} = statusbarProps;
			StatusBar.setBarStyle(barStyle);
			if (Platform.OS === 'android') {
				StatusBar.setTranslucent(translucent);
				StatusBar.setBackgroundColor(backgroundColor);
			}
		}

		render() {
			return <WrappedComponent {...this.props} />
		}
	}

	return hoistNonReactStatics(Component, WrappedComponent);
}
