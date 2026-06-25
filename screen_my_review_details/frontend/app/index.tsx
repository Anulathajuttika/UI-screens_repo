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

/** My Review Details — Cool Breeze AC Services. Self-contained, no external src imports. */

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
  danger: "#E0413B",
};

type DetailRow = { label: string; value: string };

const DETAIL_ROWS: DetailRow[] = [
  { label: "Service Type", value: "AC Repair" },
  { label: "Technician", value: "Ramesh Kumar" },
  { label: "Company", value: "Cool Breeze AC Services" },
];

const PHOTOS = [
  require("../assets/images/job1.png"),
  require("../assets/images/job2.png"),
];

function StarRow({ rating }: { rating: number }) {
  return (
    <View style={styles.starRow} testID="review-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={26}
          color={i <= rating ? Colors.star : Colors.starEmpty}
          style={styles.starIcon}
        />
      ))}
    </View>
  );
}

export default function MyReviewDetailsScreen() {
  const [rating] = useState(5);

  return (
    <View style={styles.root} testID="my-review-details-screen">
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
              <Text style={styles.headerTitle} numberOfLines={1}>
                My Review Details
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
        {/* Ticket card */}
        <View style={styles.card} testID="ticket-card">
          <View style={styles.utilityTag}>
            <Text style={styles.utilityTagText}>UTILITY</Text>
          </View>
          <View style={styles.ticketRow}>
            <View style={styles.iconTile}>
              <MaterialCommunityIcons
                name="air-conditioner"
                size={26}
                color={Colors.primary}
              />
            </View>
            <View style={styles.ticketInfo}>
              <Text style={styles.ticketTitle}>AC Not Cooling</Text>
              <Text style={styles.ticketMeta}>
                <Text style={styles.ticketMetaLabel}>Ticket ID: </Text>
                AC-25874
              </Text>
              <Text style={styles.ticketMeta}>
                <Text style={styles.ticketMetaLabel}>Technician: </Text>
                Ramesh Kumar
              </Text>
              <Text style={styles.ticketMeta}>
                <Text style={styles.ticketMetaLabel}>Company: </Text>
                Cool Breeze AC Services
              </Text>
            </View>
          </View>
        </View>

        {/* Your Review card */}
        <View style={styles.card} testID="your-review-card">
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardHeading}>Your Review</Text>
            <View style={styles.verifiedPill}>
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>

          <StarRow rating={rating} />

          <Text style={styles.reviewHeadline}>Excellent Service</Text>
          <Text style={styles.reviewBody}>
            Technician was very professional and fixed the issue quickly. He
            explained everything clearly. Very happy with the service.
          </Text>

          <View style={styles.byRow}>
            <View style={styles.byLeft}>
              <Ionicons name="person" size={15} color={Colors.meta} />
              <Text style={styles.byText}>By: You</Text>
            </View>
            <Text style={styles.byDate}>24 Jun 2026, 11:30 AM</Text>
          </View>
        </View>

        {/* Review Details card */}
        <View style={styles.card} testID="review-details-card">
          <Text style={styles.cardHeading}>Review Details</Text>
          <View style={styles.detailList}>
            {DETAIL_ROWS.map((row) => (
              <View style={styles.detailRow} key={row.label}>
                <Text style={styles.detailLabel}>{row.label}</Text>
                <Text style={styles.detailColon}>:</Text>
                <Text style={styles.detailValue}>{row.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Photos Uploaded card */}
        <View style={styles.card} testID="photos-card">
          <Text style={styles.cardHeading}>Photos Uploaded (2)</Text>
          <View style={styles.photosRow}>
            {PHOTOS.map((src, idx) => (
              <View style={styles.photoWrap} key={idx} testID={`photo-${idx}`}>
                <Image source={src} style={styles.photo} resizeMode="cover" />
                <View style={styles.expandBadge}>
                  <Ionicons name="expand-outline" size={14} color="#FFFFFF" />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <Pressable
            testID="edit-review-button"
            style={({ pressed }) => [
              styles.outlineBtn,
              styles.editBtn,
              pressed && styles.pressed,
            ]}
            onPress={() => {}}
          >
            <Ionicons name="create-outline" size={18} color={Colors.primary} />
            <Text style={styles.editBtnText}>Edit Review</Text>
          </Pressable>

          <Pressable
            testID="delete-review-button"
            style={({ pressed }) => [
              styles.outlineBtn,
              styles.deleteBtn,
              pressed && styles.pressed,
            ]}
            onPress={() => {}}
          >
            <Ionicons name="trash-outline" size={18} color={Colors.danger} />
            <Text style={styles.deleteBtnText}>Delete Review</Text>
          </Pressable>
        </View>

        {/* View Company Reviews */}
        <Pressable
          testID="view-company-reviews-button"
          style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
          onPress={() => {}}
        >
          <Text style={styles.primaryBtnText}>View Company Reviews</Text>
          <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
        </Pressable>
      </ScrollView>
    </View>
  );
}

const cardShadow = {
  shadowColor: "#1C1B2E",
  shadowOpacity: 0.06,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
  elevation: 3,
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.page },
  pressed: { opacity: 0.85 },

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
    flex: 1,
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  scroll: { flex: 1, backgroundColor: Colors.page },
  scrollContent: { padding: 16, paddingBottom: 32 },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 16,
    marginBottom: 14,
    ...cardShadow,
  },

  // Ticket card
  utilityTag: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: Colors.infoBanner,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  utilityTagText: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  ticketRow: { flexDirection: "row", gap: 14, paddingRight: 60 },
  iconTile: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: Colors.infoBanner,
    alignItems: "center",
    justifyContent: "center",
  },
  ticketInfo: { flex: 1 },
  ticketTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.title,
    marginBottom: 6,
  },
  ticketMeta: { fontSize: 13, color: Colors.body, lineHeight: 20 },
  ticketMetaLabel: { color: Colors.meta },

  // Card heading row
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardHeading: { fontSize: 15, fontWeight: "700", color: Colors.title },
  verifiedPill: {
    backgroundColor: Colors.greenBg,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  verifiedText: { color: Colors.green, fontSize: 12, fontWeight: "700" },

  // Stars
  starRow: { flexDirection: "row", marginTop: 14, marginBottom: 12 },
  starIcon: { marginRight: 6 },

  reviewHeadline: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.title,
    marginBottom: 6,
  },
  reviewBody: { fontSize: 13.5, color: Colors.body, lineHeight: 21 },

  byRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  byLeft: { flexDirection: "row", alignItems: "center", gap: 6 },
  byText: { fontSize: 13, color: Colors.body, fontWeight: "600" },
  byDate: { fontSize: 12.5, color: Colors.meta },

  // Review details list
  detailList: { marginTop: 14, gap: 12 },
  detailRow: { flexDirection: "row", alignItems: "flex-start" },
  detailLabel: { width: 110, fontSize: 13.5, color: Colors.meta },
  detailColon: { width: 14, fontSize: 13.5, color: Colors.meta },
  detailValue: {
    flex: 1,
    fontSize: 13.5,
    color: Colors.title,
    fontWeight: "600",
  },

  // Photos
  photosRow: { flexDirection: "row", gap: 14, marginTop: 14 },
  photoWrap: {
    width: "46%",
    height: 110,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: Colors.infoBanner,
  },
  photo: { width: "100%", height: "100%" },
  expandBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(28,27,46,0.55)",
    alignItems: "center",
    justifyContent: "center",
  },

  // Action buttons
  actionRow: { flexDirection: "row", gap: 14, marginBottom: 14 },
  outlineBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 14,
    borderWidth: 1.5,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
  },
  editBtn: { borderColor: Colors.primary },
  editBtnText: { color: Colors.primary, fontSize: 14, fontWeight: "700" },
  deleteBtn: { borderColor: Colors.danger },
  deleteBtnText: { color: Colors.danger, fontSize: 14, fontWeight: "700" },

  // Primary button
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    ...cardShadow,
  },
  primaryBtnText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
});
