# DeFolio

A hub for keeping track of your favourite DeFi apps.

## Troubleshooting

### Issues with `yarn android`

Using Gradle 7 fixes some issue but this requires JDK 16 which is not yet supported by expo.
--> Use a JDK below 16

### Issues with Reactotron

If you cannot connect to Reactotron run `yarn adb` first and reload the application.

### `rn-nodeify`

For native dependencies like `crypto` to work the `rn-nodeify` hacks are necessary. This however does not work with expo. Maybe because expo does not disclose the android and ios folders.
