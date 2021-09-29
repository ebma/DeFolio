import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Modal, TextStyle, View, ViewStyle } from "react-native"
import { WebView } from "react-native-webview"
import { Button, GradientBackground, Header, Screen, TextField } from "../../components"
import { NavigatorParamList } from "../../navigators"
import { WalletConnector } from "../../services/wallet-connect"
import { color, spacing } from "../../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  flex: 1,
}
const DEMO: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}

const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const DEMO_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const centeredView: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22,
}
const modalView: ViewStyle = {
  margin: 20,
  backgroundColor: color.background,
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowOffset: {
    width: 0,
    height: 2,
  },
}

export const WebViewScreen: FC<StackScreenProps<NavigatorParamList, "webview">> = observer(
  function WebViewScreen({ navigation }) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    const goBack = () => navigation.goBack()

    const [modalVisible, setModalVisible] = React.useState(false)

    // TODO fetch from local store
    const webAppTitle = "Zapper.fi"

    const [uri, setUri] = React.useState<string | undefined>(undefined)
    const connector: WalletConnector | null = React.useMemo(() => {
      if (uri) {
        try {
          return new WalletConnector(uri)
        } catch (error) {
          console.tron.error("Could not create WalletConnector: " + error.message, null)
        }
      } else return null
    }, [uri])

    React.useEffect(() => {
      // DO something
    }, [connector])

    return (
      <View testID="WebViewScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible)
            }}
          >
            <View style={centeredView}>
              <View style={modalView}>
                <TextField
                  onChangeText={(value) => setUri(value)}
                  value={uri}
                  label="wallet-connect uri"
                />
                <Button tx="common.cancel" onPress={() => setModalVisible(!modalVisible)} />
              </View>
            </View>
          </Modal>
          <Header
            headerText={webAppTitle}
            leftIcon="back"
            rightIcon="bullet"
            onLeftPress={goBack}
            onRightPress={() => setModalVisible(true)}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />

          <WebView source={{ uri: "https://zapper.fi" }} />
        </Screen>
      </View>
    )
  },
)
