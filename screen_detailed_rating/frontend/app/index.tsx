import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

/** Detailed Rating — self-contained review screen. No external src imports. */

const Colors = {
  headerTop: "#7C5FCC",
  headerBottom: "#6A4DBB",
  primary: "#6A4DBB",
  star: "#6A4DBB",
  starEmpty: "#D8D3EA",
  infoBanner: "#F1ECFB",
  page: "#FFFFFF",
  cardBorder: "#ECECF2",
  divider: "#ECECF2",
  title: "#1C1B2E",
  body: "#5A5A6A",
  meta: "#9A9AA5",
  green: "#2AA457",
  greenBg: "#E7F7EA",
};

const ASPECTS = [
  "Service Quality",
  "Technician Behaviour",
  "Communication",
  "Problem Resolution",
  "Value For Money",
  "Cleanliness",
] as const;

type Aspect = (typeof ASPECTS)[number];
type Ratings = Record<Aspect, number>;

const DEFAULT_RATINGS: Ratings = ASPECTS.reduce((acc, aspect) => {
  acc[aspect] = 5;
  return acc;
}, {} as Ratings);

function StarRow({
  value,
  onChange,
  testID,
}: {
  value: number;
  onChange: (next: number) => void;
  testID: string;
}) {
  return (
    <View style={styles.stars} testID={testID}>
      {[1, 2, 3, 4, 5].map((index) => {
        const filled = index <= value;
        return (
          <Pressable
            key={index}
            testID={`${testID}-star-${index}`}
            hitSlop={6}
            onPress={() => onChange(index)}
            style={({ pressed }) => [styles.starBtn, pressed && styles.pressed]}
          >
            <Ionicons
              name={filled ? "star" : "star-outline"}
              size={20}
              color={filled ? Colors.star : Colors.starEmpty}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

export default function DetailedRatingScreen() {
  const [ratings, setRatings] = useState<Ratings>(DEFAULT_RATINGS);

  const setAspect = (aspect: Aspect, next: number) =>
    setRatings((prev) => ({ ...prev, [aspect]: next }));

  return (
    <View style={styles.root} testID="detailed-rating-screen">
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
              <Pressable testID="back-button" hitSlop={12} onPress={() => {}}>
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </Pressable>
              <Text style={styles.headerTitle}>Detailed Rating</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Body */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="rating-scroll"
      >
        {/* Info banner */}
        <View style={styles.infoBanner} testID="info-banner">
          <View style={styles.infoIconWrap}>
            <Ionicons name="ribbon-outline" size={22} color={Colors.primary} />
          </View>
          <View style={styles.infoTextWrap}>
            <Text style={styles.infoTitle}>Please rate the following aspects</Text>
            <Text style={styles.infoSubtitle}>
              Your honest feedback is valuable to us.
            </Text>
          </View>
        </View>

        {/* Aspects card */}
        <View style={styles.card} testID="aspects-card">
          {ASPECTS.map((aspect, idx) => (
            <View key={aspect}>
              {idx > 0 && <View style={styles.divider} />}
              <View style={styles.aspectRow} testID={`aspect-row-${idx}`}>
                <Text style={styles.aspectLabel}>{aspect}</Text>
                <StarRow
                  testID={`stars-${idx}`}
                  value={ratings[aspect]}
                  onChange={(next) => setAspect(aspect, next)}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Tip banner */}
        <View style={styles.tipBanner} testID="tip-banner">
          <Ionicons name="bulb-outline" size={20} color={Colors.primary} />
          <Text style={styles.tipText}>
            <Text style={styles.tipBold}>Tip: </Text>
            Better ratings help service providers grow and serve you even better.
          </Text>
        </View>

        {/* Submit */}
        <Pressable
          testID="submit-button"
          style={({ pressed }) => [styles.submitBtn, pressed && styles.pressed]}
          onPress={() => {}}
        >
          <Text style={styles.submitText}>Submit Review</Text>
        </Pressable>

        {/* Back link */}
        <Pressable
          testID="back-link"
          hitSlop={8}
          style={({ pressed }) => [styles.backLink, pressed && styles.pressed]}
          onPress={() => {}}
        >
          <Text style={styles.backLinkText}>Back</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.page },
  pressed: { opacity: 0.7 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  scroll: { flex: 1, backgroundColor: Colors.page },
  scrollContent: { padding: 16, paddingBottom: 32 },

  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.infoBanner,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  infoIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  infoTextWrap: { flex: 1 },
  infoTitle: { fontSize: 14.5, fontWeight: "700", color: Colors.title },
  infoSubtitle: { fontSize: 12.5, color: Colors.body, marginTop: 3 },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    paddingHorizontal: 16,
    marginTop: 16,
    shadowColor: "#1C1B2E",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  aspectRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  aspectLabel: { fontSize: 14, fontWeight: "600", color: Colors.title, flex: 1 },
  divider: { height: 1, backgroundColor: Colors.divider },

  stars: { flexDirection: "row", alignItems: "center" },
  starBtn: { paddingHorizontal: 3 },

  tipBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: Colors.infoBanner,
    borderRadius: 16,
    padding: 16,
    gap: 10,
    marginTop: 16,
  },
  tipText: { flex: 1, fontSize: 13, color: Colors.body, lineHeight: 19 },
  tipBold: { fontWeight: "700", color: Colors.title },

  submitBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: "center",
    marginTop: 24,
    shadowColor: "#1C1B2E",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  submitText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },

  backLink: { alignItems: "center", paddingVertical: 18 },
  backLinkText: { color: Colors.primary, fontSize: 15, fontWeight: "700" },
});
