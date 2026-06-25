import React from "react";
import { View, Text, StyleSheet, StatusBar, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

/** Thank You screen — reverse-engineered from thank_you.pdf. Self-contained. */

const Colors = {
  headerTop: "#7C5FCC",
  headerBottom: "#6A4DBB",
  brand: "#6A4DBB",
  background: "#FFFFFF",
  title: "#1C1B2E",
  body: "#3A3A45",
  cardBorder: "#E6E4F1",
  circleBg: "#F1EFFC",
  green: "#27AE60",
  confetti: "#6A4DBB",
};

export default function ThankYouScreen() {
  return (
    <View style={styles.root} testID="thank-you-screen">
      <StatusBar barStyle="light-content" backgroundColor={Colors.headerTop} />

      {/* Short purple header strip */}
      <LinearGradient
        colors={[Colors.headerTop, Colors.headerBottom]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerStrip}
      >
        <SafeAreaView edges={["top"]}>
          <View style={styles.headerRow}>
            <Pressable testID="back-button" hitSlop={12} onPress={() => {}}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </Pressable>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <SafeAreaView style={styles.body} edges={["bottom"]}>
        <View style={styles.content}>
          {/* Confetti illustration */}
          <View style={styles.circle}>
            <Image source={require("../assets/images/confetti.png")} style={styles.confettiImg} resizeMode="cover" />
          </View>

          <Text style={styles.title}>Thank You!</Text>
          <Text style={styles.subtitle}>
            Your review has been submitted{"\n"}successfully.
          </Text>

          {/* Appreciation card */}
          <View style={styles.card}>
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.cardText}>
              We appreciate your feedback. It helps us improve and serve you better.
            </Text>
          </View>
        </View>

        {/* Back to Home */}
        <Pressable style={({ pressed }) => [styles.homeBtn, pressed && { opacity: 0.9 }]} onPress={() => {}}>
          <Text style={styles.homeBtnText}>Back to Home</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  headerStrip: { height: 110 },
  headerRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingTop: 12 },

  body: { flex: 1, paddingHorizontal: 24, justifyContent: "space-between" },
  content: { flex: 1, alignItems: "center", justifyContent: "center" },

  circle: { width: 180, height: 180, borderRadius: 90, backgroundColor: Colors.circleBg, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  confettiImg: { width: 126, height: 126 },

  title: { fontSize: 34, fontWeight: "900", color: Colors.title, marginTop: 36 },
  subtitle: { fontSize: 17, color: Colors.body, textAlign: "center", lineHeight: 26, marginTop: 14 },

  card: { flexDirection: "row", alignItems: "flex-start", gap: 14, borderWidth: 1, borderColor: Colors.cardBorder, borderRadius: 14, padding: 18, marginTop: 36, width: "100%" },
  checkCircle: { width: 26, height: 26, borderRadius: 13, backgroundColor: Colors.green, alignItems: "center", justifyContent: "center", marginTop: 2 },
  cardText: { flex: 1, fontSize: 16, color: Colors.body, lineHeight: 25 },

  homeBtn: { backgroundColor: Colors.brand, borderRadius: 14, paddingVertical: 18, alignItems: "center", marginBottom: 10 },
  homeBtnText: { color: "#FFFFFF", fontWeight: "800", fontSize: 17 },
});
