import React from "react";
import { View, Text, StyleSheet, StatusBar, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

/** Thank You (feedback) screen — self-contained, reverse-engineered from REF_thankfeedback-1.png. */

const Colors = {
  headerTop: "#7C5FCC",
  headerBottom: "#6A4DBB",
  brand: "#6A4DBB",
  background: "#FFFFFF",
  title: "#1C1B2E",
  body: "#6E6E7A",
  green: "#2AA457",
  greenSoftBg: "#E5F6EE",
  confettiPurple: "#7C5FCC",
  confettiBlue: "#4DA3F2",
  confettiPink: "#F06FB0",
  confettiYellow: "#F5A623",
  confettiGreen: "#3FBF6B",
};

type Dot = {
  top: number;
  left: number;
  size: number;
  color: string;
  radius: number;
  rotate?: string;
};

// Scattered confetti dots/streaks positioned around the check circle (relative to a 240x240 box).
const CONFETTI: Dot[] = [
  { top: 18, left: 36, size: 14, color: Colors.confettiPurple, radius: 7, rotate: "40deg" },
  { top: 8, left: 118, size: 8, color: Colors.confettiPink, radius: 4 },
  { top: 14, left: 176, size: 11, color: Colors.confettiPurple, radius: 3, rotate: "20deg" },
  { top: 50, left: 70, size: 12, color: Colors.confettiBlue, radius: 3, rotate: "30deg" },
  { top: 48, left: 196, size: 16, color: Colors.confettiPink, radius: 4, rotate: "55deg" },
  { top: 86, left: 16, size: 12, color: Colors.confettiPink, radius: 3, rotate: "15deg" },
  { top: 108, left: 214, size: 12, color: Colors.confettiYellow, radius: 3, rotate: "10deg" },
  { top: 132, left: 30, size: 12, color: Colors.confettiYellow, radius: 3, rotate: "45deg" },
  { top: 162, left: 18, size: 16, color: Colors.confettiGreen, radius: 4, rotate: "120deg" },
  { top: 188, left: 70, size: 8, color: Colors.confettiPink, radius: 4 },
  { top: 196, left: 152, size: 7, color: Colors.confettiBlue, radius: 3.5 },
  { top: 170, left: 206, size: 16, color: Colors.confettiGreen, radius: 4, rotate: "60deg" },
];

function Confetti() {
  return (
    <View style={styles.confettiLayer} pointerEvents="none" testID="confetti-layer">
      {CONFETTI.map((d, i) => (
        <View
          key={i}
          style={{
            position: "absolute",
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            borderRadius: d.radius,
            backgroundColor: d.color,
            transform: d.rotate ? [{ rotate: d.rotate }] : undefined,
          }}
        />
      ))}
    </View>
  );
}

export default function ThankYouFeedbackScreen() {
  return (
    <View style={styles.root} testID="thank-you-feedback-screen">
      <StatusBar barStyle="light-content" backgroundColor={Colors.headerTop} />

      {/* Purple header */}
      <LinearGradient
        colors={[Colors.headerTop, Colors.headerBottom]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerStrip}
      >
        <SafeAreaView edges={["top"]}>

          <View style={styles.header}>
            <Pressable
              style={styles.headerBtn}
              onPress={() => {}}
              hitSlop={8}
              testID="back-button"
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </Pressable>
            <Pressable
              style={styles.headerBtn}
              onPress={() => {}}
              hitSlop={8}
              testID="menu-button"
            >
              <Ionicons name="ellipsis-vertical" size={20} color="#FFFFFF" />
            </Pressable>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* White body, vertically centered */}
      <View style={styles.body}>
        <View style={styles.content}>
          <View style={styles.illustration} testID="success-illustration">
            <Confetti />
            <View style={styles.checkHalo}>
              <View style={styles.checkCircle}>
                <Ionicons name="checkmark" size={56} color="#FFFFFF" />
              </View>
            </View>
          </View>

          <Text style={styles.title} testID="thank-you-title">
            Thank You!
          </Text>
          <Text style={styles.subtitle} testID="thank-you-subtitle">
            Your feedback helps us{"\n"}serve you better.
          </Text>
        </View>
      </View>

      {/* Bottom button */}
      <SafeAreaView edges={["bottom"]} style={styles.footer}>
        <Pressable
          style={({ pressed }) => [styles.homeBtn, pressed && { opacity: 0.92 }]}
          onPress={() => {}}
          testID="back-to-home-button"
        >
          <Text style={styles.homeBtnText}>Back to Home</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },

  headerStrip: { borderBottomLeftRadius: 22, borderBottomRightRadius: 22 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerBtn: { padding: 4 },

  body: { flex: 1, paddingHorizontal: 24 },
  content: { flex: 1, alignItems: "center", justifyContent: "center" },

  illustration: {
    width: 240,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  confettiLayer: { ...StyleSheet.absoluteFillObject },
  checkHalo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.greenSoftBg,
    alignItems: "center",
    justifyContent: "center",
  },
  checkCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.green,
    alignItems: "center",
    justifyContent: "center",
  },

  title: { fontSize: 32, fontWeight: "800", color: Colors.title, marginTop: 8 },
  subtitle: {
    fontSize: 17,
    color: Colors.body,
    textAlign: "center",
    lineHeight: 26,
    marginTop: 12,
  },

  footer: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 10 },
  homeBtn: {
    backgroundColor: Colors.brand,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
  },
  homeBtnText: { color: "#FFFFFF", fontWeight: "800", fontSize: 17 },
});
