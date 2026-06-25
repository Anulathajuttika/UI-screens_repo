import React from "react";
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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

/** Ticket Created screen — reverse-engineered from REF_ticketcreated-1.png. Self-contained. */

const Colors = {
  headerTop: "#7C5FCC",
  headerBottom: "#6A4DBB",
  brand: "#6A4DBB",
  ticketId: "#3A2CC4",
  background: "#FFFFFF",
  pageTint: "#F6F5FB",
  card: "#FFFFFF",
  cardBorder: "#ECECF2",
  divider: "#EDEDF3",
  title: "#1C1B2E",
  body: "#3A3A45",
  meta: "#9A9AA5",
  red: "#E5484D",
  iconBg: "#EFEBFA",
};

type DetailIcon = "cog" | "map-marker" | "shield-check" | "alert" | "arrow-up";

type DetailRow = {
  key: string;
  icon: DetailIcon;
  label: string;
  value: string;
  valueColor?: string;
};

const DETAILS: DetailRow[] = [
  { key: "issue", icon: "cog", label: "Issue", value: "AC Not Cooling" },
  { key: "location", icon: "map-marker", label: "Location", value: "Miyapur, Hyderabad" },
  { key: "brand", icon: "shield-check", label: "Brand", value: "LG Split AC" },
  { key: "priority", icon: "alert", label: "Priority", value: "High", valueColor: Colors.red },
  { key: "created-at", icon: "arrow-up", label: "Created At", value: "May 24, 2025 • 10:33 AM" },
];

function DetailItem({ row }: { row: DetailRow }) {
  const isArrowUp = row.icon === "arrow-up";
  return (
    <View style={styles.detailRow} testID={`detail-row-${row.key}`}>
      <View style={styles.detailIconWrap}>
        {isArrowUp ? (
          <Ionicons name="arrow-up" size={20} color={Colors.brand} />
        ) : (
          <MaterialCommunityIcons name={row.icon} size={20} color={Colors.brand} />
        )}
      </View>
      <View style={styles.detailText}>
        <Text style={styles.detailLabel}>{row.label}</Text>
        <Text style={[styles.detailValue, row.valueColor ? { color: row.valueColor } : null]}>
          {row.value}
        </Text>
      </View>
    </View>
  );
}

export default function TicketCreatedScreen() {
  return (
    <View style={styles.root} testID="ticket-created-screen">
      <StatusBar barStyle="light-content" backgroundColor={Colors.headerBottom} />

      {/* Header */}
      <LinearGradient
        colors={[Colors.headerTop, Colors.headerBottom]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView edges={["top"]}>
          <View style={styles.header}>
            <Pressable hitSlop={12} onPress={() => {}} testID="header-back-button">
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </Pressable>
            <Pressable hitSlop={12} onPress={() => {}} testID="header-menu-button">
              <Ionicons name="ellipsis-vertical" size={20} color="#FFFFFF" />
            </Pressable>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success card */}
        <View style={styles.successCard} testID="success-card">
          <Text style={styles.successTitle}>🎉 Ticket Created Successfully!</Text>
          <Text style={styles.ticketIdLabel}>Ticket ID</Text>
          <Text style={styles.ticketIdValue} testID="ticket-id-value">AC-25874</Text>
        </View>

        {/* Details card */}
        <View style={styles.detailsCard} testID="details-card">
          {DETAILS.map((row) => (
            <DetailItem key={row.key} row={row} />
          ))}

          <View style={styles.divider} />

          <Text style={styles.footnote}>
            Our team has been notified and will connect with you shortly.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom safe area (no action button in this design) */}
      <SafeAreaView edges={["bottom"]} style={styles.bottomSafe} testID="bottom-safe-area" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.pageTint },


  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  scroll: { flex: 1, backgroundColor: Colors.pageTint },
  scrollContent: { padding: 16, paddingBottom: 28 },

  successCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    paddingVertical: 26,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#1C1B2E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.title,
    textAlign: "center",
  },
  ticketIdLabel: {
    fontSize: 14,
    color: Colors.brand,
    textAlign: "center",
    marginTop: 18,
  },
  ticketIdValue: {
    fontSize: 34,
    fontWeight: "800",
    color: Colors.ticketId,
    textAlign: "center",
    marginTop: 6,
  },

  detailsCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginTop: 16,
    shadowColor: "#1C1B2E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
  },
  detailIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.iconBg,
    alignItems: "center",
    justifyContent: "center",
  },
  detailText: { flex: 1 },
  detailLabel: { fontSize: 13, color: Colors.meta },
  detailValue: { fontSize: 16, fontWeight: "700", color: Colors.title, marginTop: 3 },

  divider: { height: 1, backgroundColor: Colors.divider, marginTop: 10, marginBottom: 18 },

  footnote: {
    fontSize: 14,
    color: Colors.meta,
    textAlign: "center",
    lineHeight: 21,
    paddingHorizontal: 12,
    paddingBottom: 16,
  },

  bottomSafe: { backgroundColor: Colors.pageTint },
});
