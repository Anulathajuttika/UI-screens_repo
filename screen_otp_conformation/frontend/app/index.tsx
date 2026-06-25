import React from "react";
import { View, Text, StyleSheet, StatusBar, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

/** OTP confirmation screen — self-contained, reverse-engineered from FX_otp-1.png. */

const Colors = {
  headerTop: "#6B4CD6",
  headerBottom: "#5B3CC4",
  brand: "#5B3CC4",
  background: "#FFFFFF",
  card: "#F6F5FB",
  cardBorder: "#ECECF2",
  digitBox: "#FFFFFF",
  digitBorder: "#ECECF2",
  lavender: "#EFEBFA",
  title: "#1C1B2E",
  body: "#6E6E7A",
  meta: "#9A9AA5",
  divider: "#ECECF2",
};

const OtpScreenData = {
  headerTitle: "My Tickets",
  primaryHeading: "Share this OTP with the technician",
  otpCode: ["7", "2", "4", "9"],
  validityLeadIn: "This OTP is valid for",
  validityValue: "10:00 minutes",
  warning: "Do not share this OTP with anyone else.",
  refreshingLabel: "Refreshing in 09:30",
};

export default function OtpConfirmationScreen() {
  return (
    <View style={styles.root} testID="otp-confirmation-screen">
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
              {OtpScreenData.headerTitle}
            </Text>
            <View style={styles.headerBtn} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Body — centered card */}
      <View style={styles.body}>
        <View style={styles.card} testID="otp-card">
          {/* Shield icon */}
          <View style={styles.shieldCircle} testID="shield-icon">
            <MaterialCommunityIcons
              name="shield-lock-outline"
              size={32}
              color={Colors.brand}
            />
          </View>

          <Text style={styles.heading} testID="otp-heading">
            {OtpScreenData.primaryHeading}
          </Text>

          {/* OTP digit boxes */}
          <View style={styles.otpRow} testID="otp-row">
            {OtpScreenData.otpCode.map((digit, i) => (
              <View key={i} style={styles.digitBox} testID={`otp-digit-${i}`}>
                <Text style={styles.digitText}>{digit}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.validityLeadIn} testID="otp-validity-lead-in">
            {OtpScreenData.validityLeadIn}
          </Text>
          <Text style={styles.validityValue} testID="otp-validity-value">
            {OtpScreenData.validityValue}
          </Text>

          <Text style={styles.warning} testID="otp-warning">
            {OtpScreenData.warning}
          </Text>

          <View style={styles.divider} testID="otp-divider" />

          <View style={styles.refreshRow} testID="otp-refresh-row">
            <Text style={styles.refreshLabel}>
              {OtpScreenData.refreshingLabel}
            </Text>
            <Pressable
              style={styles.refreshBtn}
              onPress={() => {}}
              hitSlop={8}
              testID="refresh-button"
            >
              <Ionicons name="refresh" size={20} color={Colors.brand} />
            </Pressable>
          </View>
        </View>
      </View>
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
  headerTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },

  body: { flex: 1, paddingHorizontal: 20, justifyContent: "center" },

  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    paddingHorizontal: 22,
    paddingVertical: 28,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },

  shieldCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.lavender,
    alignItems: "center",
    justifyContent: "center",
  },

  heading: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.title,
    textAlign: "center",
    lineHeight: 30,
    marginTop: 18,
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 24,
  },
  digitBox: {
    width: 56,
    height: 64,
    borderRadius: 12,
    backgroundColor: Colors.digitBox,
    borderWidth: 1,
    borderColor: Colors.digitBorder,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  digitText: { fontSize: 28, fontWeight: "800", color: Colors.title },

  validityLeadIn: {
    fontSize: 14,
    color: Colors.body,
    textAlign: "center",
    marginTop: 28,
  },
  validityValue: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.brand,
    textAlign: "center",
    marginTop: 4,
  },
  warning: {
    fontSize: 13,
    color: Colors.meta,
    textAlign: "center",
    lineHeight: 19,
    marginTop: 16,
  },

  divider: {
    height: 1,
    alignSelf: "stretch",
    backgroundColor: Colors.divider,
    marginTop: 22,
  },

  refreshRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 18,
  },
  refreshLabel: { fontSize: 14, color: Colors.body },
  refreshBtn: { padding: 2 },
});
