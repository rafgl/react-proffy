import React from "react";
import { View, ImageBackground, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import giveClassesBgImage from "../../assets/images/give-classes-background.png";

export default function GiveClasses() {
  const { goBack } = useNavigation();

  function handleNavigationBack() {
    goBack();
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={giveClassesBgImage} style={styles.content} resizeMode="contain">
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>
        Para começar, você precisa se registrar como professor em nossa plataforma web.
        </Text>
      </ImageBackground>
      <RectButton style={styles.okButton} onPress={handleNavigationBack}>
        <Text style={styles.okButtonText}>Tudo bem</Text>
      </RectButton>
    </View>
  );
}
