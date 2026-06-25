import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

/** Cool Breeze AC Services — in-app audio call (outgoing/active) screen. Self-contained. */

const Colors = {
  bgTop: "#0B0F1A",
  bgMid: "#10141F",
  bgBottom: "#070A12",
  white: "#FFFFFF",
  subtle: "rgba(255,255,255,0.6)",
  control: "rgba(255,255,255,0.12)",
  controlBorder: "rgba(255,255,255,0.16)",
  red: "#FF3B30",
};

function ControlButton({
  icon,
  onPress,
  testID,
}: {
  icon: string;
  onPress: () => void;
  testID: string;
}) {
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={({ pressed }) => [styles.control, pressed && styles.pressed]}
    >
      <Ionicons name={icon as any} size={26} color={Colors.white} />
    </Pressable>
  );
}

export default function InAppCallScreen() {
  return (
    <View style={styles.root} testID="inapp-call-screen">
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgTop} />

      <LinearGradient
        colors={[Colors.bgTop, Colors.bgMid, Colors.bgBottom]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.fill}
      >
        {/* Faint logo watermark behind everything */}
        <Image
          source={require("../assets/images/cb-logo.png")}
          style={styles.watermark}
          resizeMode="contain"
        />

        <SafeAreaView edges={["top", "bottom"]} style={styles.safe}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable hitSlop={12} onPress={() => {}} testID="back-button">
              <Ionicons name="arrow-back" size={24} color={Colors.white} />
            </Pressable>
            <Text style={styles.headerTitle}>Audio call</Text>
          </View>

          {/* Caller info */}
          <View style={styles.center}>
            <Image
              source={require("../assets/images/cb-logo.png")}
              style={styles.avatar}
              resizeMode="cover"
            />
            <Text style={styles.name}>Cool Breeze AC Services</Text>
            <Text style={styles.status}>Ringing</Text>
          </View>

          {/* Call controls */}
          <View style={styles.controls}>
            <ControlButton testID="mute-button" icon="mic-off" onPress={() => {}} />
            <Pressable
              testID="end-call-button"
              onPress={() => {}}
              style={({ pressed }) => [styles.endBtn, pressed && styles.pressed]}
            >
              <MaterialCommunityIcons name="phone-hangup" size={32} color={Colors.white} />
            </Pressable>
            <ControlButton testID="speaker-button" icon="volume-high" onPress={() => {}} />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bgTop },
  fill: { flex: 1 },
  pressed: { opacity: 0.7 },

  watermark: {
    position: "absolute",
    alignSelf: "center",
    top: "26%",
    width: "85%",
    height: "44%",
    opacity: 0.06,
  },

  safe: { flex: 1 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  headerTitle: { color: Colors.white, fontSize: 17, fontWeight: "600" },

  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  avatar: {
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: "#000000",
  },
  name: {
    color: Colors.white,
    fontSize: 21,
    fontWeight: "700",
    marginTop: 22,
    textAlign: "center",
  },
  status: { color: Colors.subtle, fontSize: 14, marginTop: 7 },

  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 34,
    paddingBottom: 36,
    paddingTop: 8,
  },
  control: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.control,
    borderWidth: 1,
    borderColor: Colors.controlBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  endBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.red,
    alignItems: "center",
    justifyContent: "center",
  },
});
