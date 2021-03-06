/* eslint-disable prettier/prettier */
/**
 *
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ToastAndroid,
  Alert,
  CheckBox,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// import components
import Button from '../../components/buttons/Button';
import UnderlinePasswordInput from '../../components/textinputs/UnderlinePasswordInput';
import UnderlineTextInput from '../../components/textinputs/UnderlineTextInput';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { passAuth } from '../../config/firebase';
// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';
import { getDatabase, ref, set } from 'firebase/database';

// SignUp Config
const PLACEHOLDER_TEXT_COLOR = Colors.onPrimaryColor;
const INPUT_TEXT_COLOR = Colors.onPrimaryColor;
const INPUT_BORDER_COLOR = Colors.onPrimaryColor;
const INPUT_FOCUSED_BORDER_COLOR = Colors.onPrimaryColor;

// SignUp Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
  contentContainerStyle: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  form: {
    paddingHorizontal: Layout.LARGE_PADDING,
  },
  inputContainer: { marginBottom: 7 },
  vSpacer: {
    height: 15,
  },
  buttonContainer: {
    paddingVertical: 23,
  },
  buttonsGroup: {
    paddingTop: 23,
  },
  separator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 64,
    height: 1,
    backgroundColor: INPUT_BORDER_COLOR,
  },
  orText: {
    top: -2,
    paddingHorizontal: 8,
    color: PLACEHOLDER_TEXT_COLOR,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  termsContainer: {
    flexDirection: 'row',
  },
  footerText: {
    fontWeight: '300',
    fontSize: 13,
    color: Colors.onPrimaryColor,
  },
  footerLink: {
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  checkboxContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    color: '#fff',
    margin: 8,
  },
});

// SignUp
export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailFocused: false,
      phone: '',
      phoneFocused: false,
      password: '',
      passwordFocused: false,
      secureTextEntry: true,
      isSelected: false,
    };
  }

  emailChange = (text) => {
    this.setState({
      email: text,
    });
  };

  emailFocus = () => {
    this.setState({
      emailFocused: true,
      phoneFocused: false,
      passwordFocused: false,
    });
  };

  phoneChange = (text) => {
    this.setState({
      phone: text,
    });
  };

  phoneFocus = () => {
    this.setState({
      phoneFocused: true,
      emailFocused: false,
      passwordFocused: false,
    });
  };

  passwordChange = (text) => {
    this.setState({
      password: text,
    });
  };

  passwordFocus = () => {
    this.setState({
      passwordFocused: true,
      emailFocused: false,
      phoneFocused: false,
    });
  };

  onTogglePress = () => {
    const { secureTextEntry } = this.state;
    this.setState({
      secureTextEntry: !secureTextEntry,
    });
  };

  navigateTo = (screen) => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  createAccount = async () => {
    console.log(this.state.isSelected);
    if (this.state.isSelected === false) {
      Alert.alert('Error','Accept Privacy Statement');
      return;
    }
    // const { email, phone, password } = this.state;
    this.setState({
      emailFocused: false,
      phoneFocused: false,
      passwordFocused: false,
    });
    const { navigation } = this.props;
    try {
      createUserWithEmailAndPassword(
        passAuth(),
        this.state.email,
        this.state.password,
      )
        .then((result) => {
          navigation.navigate('SignIn');
          const user = result.user;
          console.log(user);
          const db = getDatabase();
          set(ref(db, `Accounts/${user.uid}`), {
            UserID: user.uid,
            email: this.state.email,
            name: '',
            phone: this.state.phone,
            admin: false,
            status: 'active',
          });
          Alert.alert(
            'Signup ',
            'Succesfully Created an Account.. Proceed to login',

            [
              {
                text: 'ok',
                style: 'cancel',
              },
            ],
            {
              cancelable: true,
            },
          );
        })
        .catch((error) => {
          Alert.alert(
            'Signup ',
            `Failed to Create an Account..${error}`,

            [
              {
                text: 'ok',
                style: 'cancel',
              },
            ],
            {
              cancelable: true,
            },
          );
        });
    } catch (error) {
      Alert.alert(
        'Signup ',
        'Failed to Create an Account..Try Again',

        [
          {
            text: 'ok',
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
        },
      );
    }
  };

  focusOn = (nextFiled) => () => {
    if (nextFiled) {
      nextFiled.focus();
    }
  };
  setSelection(e) {
    console.log(e);
    this.setState({
      isSelected: e,
    });


  }

  render() {
    const {
      isSelected,
      emailFocused,
      phoneFocused,
      password,
      passwordFocused,
      secureTextEntry,
    } = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.content}>
            <View />

            <View style={styles.form}>
              <UnderlineTextInput
                onRef={(r) => {
                  this.email = r;
                }}
                onChangeText={this.emailChange}
                onFocus={this.emailFocus}
                inputFocused={emailFocused}
                onSubmitEditing={this.focusOn(this.phone)}
                returnKeyType="next"
                blurOnSubmit={false}
                keyboardType="email-address"
                placeholder="E-mail"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputContainerStyle={styles.inputContainer}
              />

              <UnderlineTextInput
                onRef={(r) => {
                  this.phone = r;
                }}
                onChangeText={this.phoneChange}
                onFocus={this.phoneFocus}
                inputFocused={phoneFocused}
                onSubmitEditing={this.focusOn(this.password)}
                returnKeyType="next"
                blurOnSubmit={false}
                keyboardType="phone-pad"
                placeholder="Phone number"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                inputTextColor={INPUT_TEXT_COLOR}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                inputContainerStyle={styles.inputContainer}
              />

              <UnderlinePasswordInput
                onRef={(r) => {
                  this.password = r;
                }}
                onChangeText={this.passwordChange}
                onFocus={this.passwordFocus}
                inputFocused={passwordFocused}
                onSubmitEditing={this.createAccount}
                returnKeyType="done"
                placeholder="Password"
                placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                secureTextEntry={secureTextEntry}
                borderColor={INPUT_BORDER_COLOR}
                focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                toggleVisible={password.length > 0}
                toggleText={secureTextEntry ? 'Show' : 'Hide'}
                onTogglePress={this.onTogglePress}
              />
              <View style={styles.checkboxContainer} >
                <CheckBox
                  value={isSelected}
                  onValueChange={(e) => this.setSelection(e)}
                  style={styles.checkbox}
                />
                <Text style={styles.label} onPress={this.navigateTo('Terms')}>Accept Privacy Statement </Text>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  color={'#fff'}
                  rounded
                  borderRadius
                  onPress={this.createAccount}
                  title={'Create Account'.toUpperCase()}
                  titleColor={Colors.primaryColor}
                />
              </View>

              <View style={styles.separator}>
                <View style={styles.line} />

                <View style={styles.line} />
              </View>
            </View>

            <TouchableWithoutFeedback>
              <View style={styles.footer} />
            </TouchableWithoutFeedback>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
