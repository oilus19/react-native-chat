'use strict';
import React from 'react';
import { View } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import { SignUpStore } from '../stores/SignUpStore';
import { observer } from 'mobx-react';
import { Router } from '../router';
import { Constants } from '../utils/constants';
import Storage from 'react-native-key-value-store';

interface Props {
	navigation: any;
}

interface State {
	username: string;
	password: string;
	repassword: string;
}

@observer
export class SignUp extends React.Component<Props, State> {
	private store: SignUpStore;

	constructor(props) {
		super(props);
		this.store = new SignUpStore();
	}

	componentDidMount() {
		Storage.get(Constants.KEY_TOKEN, '').then((token: string) => {
			if (token !== '') {
				Router.navigateToHome(this.props.navigation.dispatch, token);
			}
		});
	}

	render() {
		return (
			<View style={{ paddingVertical: 20 }}>
				<Card>
					<FormLabel>Email</FormLabel>
					<FormInput placeholder='Email address...'
						value={this.store.username}
						onChangeText={(text) => this.store.setUsername(text)}>
					</FormInput>
					<FormLabel>Password</FormLabel>
					<FormInput secureTextEntry placeholder='Password...'
						value={this.store.password}
						onChangeText={(text) => this.store.setPassword(text)}>
					</FormInput>
					<FormLabel>Confirm Password</FormLabel>
					<FormInput secureTextEntry placeholder='Confirm Password...'
						value={this.store.repassword}
						onChangeText={(text) => this.store.setRePassword(text)}>
					</FormInput>

					<Button
						buttonStyle={{ marginTop: 20 }}
						backgroundColor='#03A9F4'
						title='SIGN UP'
						disabled={this.store.isBusy}
						onPress={() => this.store.signUp()}
					/>
					<Button
						buttonStyle={{ marginTop: 20 }}
						backgroundColor='transparent'
						textStyle={{ color: '#bcbec1' }}
						title='Already have an account?'
						disabled={this.store.isBusy}
						onPress={() => Router.navigateToSingIn(this.props.navigation.dispatch)}
					/>
				</Card>
			</View>
		)
	}
}