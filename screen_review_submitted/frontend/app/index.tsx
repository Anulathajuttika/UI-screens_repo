import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

/** Review Submitted — confirmation screen. Self-contained, no external src imports. */

const Colors = {
  headerTop: "#7C5FCC",
  headerBottom: "#6A4DBB",
  primary: "#6A4DBB",
  star: "#6A4DBB",
  starEmpty: "#D8D3EA",
  infoBanner: "#F1ECFB",
  page: "#FFFFFF",
  cardBorder: "#ECECF2",
  title: "#1C1B2E",
  body: "#5A5A6A",
  meta: "#9A9AA5",
  green: "#2AA457",
  greenBg: "#E7F7EA",
  tileBg: "#F1ECFB",
};

const TOTAL_STARS = 5;

function StarRating({
  rating,
  onChange,
}: {
  rating: number;
  onChange: (next: number) => void;
}) {
  return (
    <View style={styles.starsRow} testID="star-rating">
      {Array.from({ length: TOTAL_STARS }).map((_, i) => {
        const filled = i < rating;
        return (
          <Pressable
            key={i}
            testID={`star-${i + 1}`}
            hitSlop={6}
            onPress={() => onChange(i + 1)}
          >
            <Ionicons
              name="star"
              size={30}
              color={filled ? Colors.star : Colors.starEmpty}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

export default function ReviewSubmittedScreen() {
  const [rating, setRating] = useState(5);

  return (
    <View style={styles.root} testID="review-submitted-screen">
      <StatusBar barStyle="light-content" backgroundColor={Colors.headerTop} />

      {/* Header */}
      <LinearGradient
        colors={[Colors.headerTop, Colors.headerBottom]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView edges={["top"]}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Pressable
                testID="back-button"
                hitSlop={12}
                onPress={() => {}}
              >
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </Pressable>

              <Text style={styles.headerTitle} numberOfLines={1}>
                Review Submitted
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Body */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="review-scroll"
      >
        {/* Success check */}
        <View style={styles.successCircle} testID="success-check">
          <Ionicons name="checkmark" size={42} color="#FFFFFF" />
        </View>

        <Text style={styles.thankYou}>Thank You!</Text>
        <Text style={styles.subtitle}>
          Your review has been submitted successfully.
        </Text>

        {/* Rating card */}
        <View style={styles.card} testID="rating-card">
          <StarRating rating={rating} onChange={setRating} />
          <View style={styles.excellentPill} testID="excellent-pill">
            <Text style={styles.excellentText}>Excellent</Text>
          </View>
        </View>

        {/* Company card */}
        <View style={styles.companyCard} testID="company-card">
          <View style={styles.acTile}>
            <MaterialCommunityIcons
              name="air-conditioner"
              size={32}
              color={Colors.primary}
            />
            <MaterialCommunityIcons
              name="snowflake"
              size={18}
              color={Colors.primary}
              style={styles.acSnow}
            />
          </View>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>Cool Breeze AC Services</Text>
            <View style={styles.techRow}>
              <View style={styles.avatarWrap}>
                <Image
                  source={require("../assets/images/ramesh.png")}
                  style={styles.avatar}
                  resizeMode="cover"
                  testID="technician-avatar"
                />
              </View>
              <View style={styles.techInfo}>
                <Text style={styles.techLabel}>Technician</Text>
                <Text style={styles.techName}>Ramesh Kumar</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Reward banner */}
        <View style={styles.rewardBanner} testID="reward-banner">
          <View style={styles.giftIconWrap}>
            <Ionicons name="gift-outline" size={26} color={Colors.green} />
          </View>
          <View style={styles.rewardTextWrap}>
            <Text style={styles.rewardTitle}>+20 Reward Points Earned</Text>
            <Text style={styles.rewardSub}>
              Thank you for helping our community!
            </Text>
          </View>
        </View>

        {/* Buttons */}
        <Pressable
          testID="view-review-button"
          style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
          onPress={() => {}}
        >
          <Text style={styles.primaryBtnText}>View My Review</Text>
        </Pressable>

        <Pressable
          testID="back-to-ticket-button"
          style={({ pressed }) => [styles.outlineBtn, pressed && styles.pressed]}
          onPress={() => {}}
        >
          <Text style={styles.outlineBtnText}>Back to Ticket</Text>
        </Pressable>

        <Pressable
          testID="back-to-home-button"
          style={({ pressed }) => [styles.linkBtn, pressed && styles.pressed]}
          onPress={() => {}}
        >
          <Text style={styles.linkBtnText}>Back to Home</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.page },
  pressed: { opacity: 0.85 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  headerTitle: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  scroll: { flex: 1, backgroundColor: Colors.page },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 32,
    alignItems: "center",
  },

  successCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.green,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1C1B2E",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  thankYou: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.title,
    marginTop: 18,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: Colors.body,
    marginTop: 8,
    textAlign: "center",
    lineHeight: 21,
  },

  card: {
    width: "100%",
    backgroundColor: Colors.page,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginTop: 22,
    alignItems: "center",
    shadowColor: "#1C1B2E",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  starsRow: { flexDirection: "row", gap: 8 },
  excellentPill: {
    backgroundColor: Colors.greenBg,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 12,
  },
  excellentText: { color: Colors.green, fontSize: 12.5, fontWeight: "700" },

  companyCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: Colors.page,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginTop: 16,
    shadowColor: "#1C1B2E",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  acTile: {
    width: 64,
    height: 90,
    borderRadius: 16,
    backgroundColor: Colors.tileBg,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  acSnow: { marginTop: 1 },
  companyInfo: { flex: 1 },
  companyName: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.title,
    marginBottom: 14,
  },

  techRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    overflow: "hidden",
    backgroundColor: Colors.tileBg,
  },
  avatar: { width: "100%", height: "100%" },
  techInfo: { flex: 1 },
  techLabel: { fontSize: 12.5, color: Colors.meta },
  techName: { fontSize: 15, fontWeight: "700", color: Colors.title, marginTop: 2 },

  rewardBanner: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: Colors.greenBg,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 18,
  },
  giftIconWrap: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  rewardTextWrap: { flex: 1 },
  rewardTitle: { fontSize: 15, fontWeight: "700", color: Colors.title },
  rewardSub: { fontSize: 13, color: Colors.body, marginTop: 3 },

  primaryBtn: {
    width: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 26,
    shadowColor: "#1C1B2E",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  primaryBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },

  outlineBtn: {
    width: "100%",
    backgroundColor: Colors.page,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 14,
  },
  outlineBtnText: { color: Colors.primary, fontSize: 16, fontWeight: "700" },

  linkBtn: { paddingVertical: 16, alignItems: "center", marginTop: 6 },
  linkBtnText: { color: Colors.primary, fontSize: 15, fontWeight: "700" },
});
