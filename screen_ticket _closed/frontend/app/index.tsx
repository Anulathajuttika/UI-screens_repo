import React from "react";
import { View, Text, StyleSheet, StatusBar, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

/** Ticket Closed (success) screen — self-contained, reverse-engineered from FX_closed-1.png. */

const Colors = {
  headerTop: "#7C5FCC",
  headerBottom: "#6A4DBB",
  brand: "#6A4DBB",
  buttonFill: "#6E59C7",
  background: "#FFFFFF",
  title: "#1C1B2E",
  body: "#6E6E7A",
  green: "#2AA457",
  star: "#F5A623",
  confettiPurple: "#7C5FCC",
  confettiBlue: "#4DA3F2",
  confettiPink: "#F06FB0",
  confettiYellow: "#F5A623",
  confettiGreen: "#3FBF6B",
  confettiRed: "#E5484D",
};

type Dot = {
  top: number;
  left: number;
  size: number;
  color: string;
  radius: number;
  rotate?: string;
};

// Scattered confetti dots/streaks positioned around the check circle (relative to a 260x260 box).
const CONFETTI: Dot[] = [
  { top: 20, left: 40, size: 14, color: Colors.confettiPurple, radius: 4, rotate: "40deg" },
  { top: 10, left: 128, size: 8, color: Colors.confettiPink, radius: 4 },
  { top: 18, left: 196, size: 12, color: Colors.confettiPurple, radius: 3, rotate: "20deg" },
  { top: 56, left: 80, size: 12, color: Colors.confettiBlue, radius: 3, rotate: "30deg" },
  { top: 52, left: 214, size: 16, color: Colors.confettiPink, radius: 4, rotate: "55deg" },
  { top: 92, left: 18, size: 12, color: Colors.confettiRed, radius: 3, rotate: "15deg" },
  { top: 118, left: 232, size: 12, color: Colors.confettiYellow, radius: 3, rotate: "10deg" },
  { top: 146, left: 34, size: 12, color: Colors.confettiYellow, radius: 3, rotate: "45deg" },
  { top: 176, left: 20, size: 16, color: Colors.confettiGreen, radius: 4, rotate: "120deg" },
  { top: 206, left: 80, size: 8, color: Colors.confettiPink, radius: 4 },
  { top: 214, left: 168, size: 7, color: Colors.confettiBlue, radius: 3.5 },
  { top: 186, left: 224, size: 16, color: Colors.confettiGreen, radius: 4, rotate: "60deg" },
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

function Stars({ size = 30 }: { size?: number }) {
  return (
    <View style={styles.starsRow} testID="rating-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <Ionicons key={i} name="star" size={size} color={Colors.star} />
      ))}
    </View>
  );
}

export default function TicketClosedScreen() {
  return (
    <View style={styles.root} testID="ticket-closed-screen">
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
            <Text style={styles.headerTitle} testID="header-title">
              My Tickets
            </Text>
            <View style={styles.headerBtn} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* White body, vertically centered */}
      <View style={styles.body}>
        <View style={styles.content}>
          <View style={styles.illustration} testID="success-illustration">
            <Confetti />
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark" size={64} color="#FFFFFF" />
            </View>
          </View>

          <Text style={styles.title} testID="success-title">
            Ticket Closed Successfully!
          </Text>

          <Text style={styles.subtitle} testID="thank-you-text">
            Thank you for choosing{"\n"}Cool Breeze AC Services.
          </Text>

          <Text style={styles.ticketId} testID="ticket-id">
            AC-25874
          </Text>

          <Stars />
        </View>
      </View>

      {/* Bottom button */}
      <SafeAreaView edges={["bottom"]} style={styles.footer}>
        <Pressable
          style={({ pressed }) => [styles.rateBtn, pressed && { opacity: 0.92 }]}
          onPress={() => {}}
          testID="rate-service-button"
        >
          <Text style={styles.rateBtnText}>Rate Service</Text>
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
  headerBtn: { width: 32, padding: 4 },
  headerTitle: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 4,
  },

  body: { flex: 1, paddingHorizontal: 24 },
  content: { flex: 1, alignItems: "center", justifyContent: "center" },

  illustration: {
    width: 260,
    height: 260,
    alignItems: "center",
    justifyContent: "center",
  },
  confettiLayer: { ...StyleSheet.absoluteFillObject },
  checkCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.green,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.brand,
    textAlign: "center",
    marginTop: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.body,
    textAlign: "center",
    lineHeight: 24,
    marginTop: 16,
  },
  ticketId: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.brand,
    textAlign: "center",
    marginTop: 20,
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 18,
  },

  footer: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 10 },
  rateBtn: {
    backgroundColor: Colors.buttonFill,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
  },
  rateBtnText: { color: "#FFFFFF", fontWeight: "700", fontSize: 17 },
});
