import { DefaultTheme } from 'react-native-paper'

/* 
Parts of the Login Screen and its components (BackButton, Button, TextInput, theme) were taken from a 
public github repository: https://github.com/venits/react-native-login-template
*/

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    primary: '#560CCE',
    secondary: '#414757',
    error: '#f13a59',
  },
}