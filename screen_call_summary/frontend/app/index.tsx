import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Pressable,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

/** Cool Breeze AC Services — Call Summary chat screen. Self-contained, no external src imports. */

const Colors = {
  headerTop: "#7C5FCC",
  headerBottom: "#6A4DBB",
  brand: "#6A4DBB",
  background: "#FFFFFF",
  chatBg: "#F6F5FB",
  botBubble: "#FFFFFF",
  card: "#FFFFFF",
  cardBorder: "#ECECF2",
  divider: "#EFEFF4",
  title: "#1C1B2E",
  body: "#6E6E7A",
  meta: "#9A9AA5",
  green: "#2AA457",
  warn: "#E5860B",
  inputBg: "#F2F1F8",
  logoBg: "#1B1530",
  iconChip: "#EFEBFA",
};

type DetailRow = {
  id: string;
  family: "ion" | "mci";
  icon: string;
  color: string;
  label: string;
  value: string;
};

const DETAILS: DetailRow[] = [
  {
    id: "location",
    family: "ion",
    icon: "location",
    color: Colors.brand,
    label: "Location",
    value: "Miyapur, Hyderabad",
  },
  {
    id: "service",
    family: "mci",
    icon: "cog",
    color: Colors.brand,
    label: "Service Type",
    value: "AC Service",
  },
  {
    id: "issue",
    family: "mci",
    icon: "alert",
    color: Colors.warn,
    label: "Issue Detected",
    value: "AC Not Cooling",
  },
  {
    id: "brand",
    family: "ion",
    icon: "pricetag",
    color: Colors.brand,
    label: "Brand",
    value: "LG Split AC",
  },
];

const TICKET_OPTIONS = ["Water Leakage", "Unusual Noise", "Remote Not Working"];

function DetailLine({ item }: { item: DetailRow }) {
  return (
    <View style={styles.detailRow} testID={`detail-${item.id}`}>
      <View style={styles.detailLeft}>
        {item.family === "ion" ? (
          <Ionicons name={item.icon as never} size={18} color={item.color} />
        ) : (
          <MaterialCommunityIcons name={item.icon as never} size={18} color={item.color} />
        )}
        <Text style={styles.detailLabel}>{item.label}</Text>
      </View>
      <Text style={styles.detailValue} numberOfLines={1}>
        {item.value}
      </Text>
    </View>
  );
}

function CheckboxRow({ label }: { label: string }) {
  return (
    <View
      style={styles.checkRow}
      testID={`ticket-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <View style={styles.checkbox}>
        <Ionicons name="checkmark" size={16} color="#FFFFFF" />
      </View>
      <Text style={styles.checkLabel}>{label}</Text>
    </View>
  );
}

function CallSummaryCard() {
  return (
    <View style={styles.card} testID="call-summary-card">
      {/* Header row */}
      <View style={styles.cardHeader}>
        <View style={styles.cardIconCircle}>
          <Ionicons name="call" size={22} color={Colors.brand} />
        </View>
        <Text style={styles.cardTitle}>Call Summary</Text>
      </View>

      {/* Status row */}
      <View style={styles.statusRow}>
        <Ionicons name="checkmark-circle" size={18} color={Colors.green} />
        <Text style={styles.statusText}>Call Completed Successfully</Text>
      </View>

      <View style={styles.divider} />

      {/* Customer details */}
      <Text style={styles.sectionHeading}>Customer Details Extracted</Text>
      <View style={styles.detailsGroup}>
        {DETAILS.map((d) => (
          <DetailLine key={d.id} item={d} />
        ))}
      </View>

      <View style={styles.divider} />

      {/* Call notes */}
      <Text style={styles.sectionHeading}>Call Notes</Text>
      <Text style={styles.notesText}>
        Customer reported that the AC is running but not providing sufficient cooling.
        Service assistance requested.
      </Text>

      <View style={styles.divider} />

      {/* Ticket selection */}
      <Text style={styles.sectionHeading}>Select Issue to Create Ticket</Text>
      <View style={styles.ticketGroup}>
        {TICKET_OPTIONS.map((label) => (
          <CheckboxRow key={label} label={label} />
        ))}
      </View>
    </View>
  );
}

export default function CallSummaryScreen() {
  const [draft, setDraft] = useState("");

  return (
    <View style={styles.root} testID="call-summary-screen">
      <StatusBar barStyle="light-content" backgroundColor={Colors.headerTop} />

      {/* Header */}
      <LinearGradient
        colors={[Colors.headerTop, Colors.headerBottom]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView edges={["top"]}>
          <View style={styles.header}>
            <Pressable testID="back-button" hitSlop={12} onPress={() => {}}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </Pressable>

            <View style={styles.avatarWrap} testID="brand-avatar">
              <View style={styles.avatar}>
                <MaterialCommunityIcons name="snowflake" size={22} color="#FFFFFF" />
              </View>
              <View style={styles.onlineDot} />
            </View>

            <View style={styles.headerTitleWrap}>
              <View style={styles.titleRow}>
                <Text style={styles.headerTitle} numberOfLines={1}>
                  Cool Breeze AC Services
                </Text>
                <Ionicons name="checkmark-circle" size={16} color={Colors.green} />
              </View>
              <Text style={styles.headerSubtitle}>Online</Text>
            </View>

            <Pressable testID="menu-button" hitSlop={12} onPress={() => {}}>
              <Ionicons name="ellipsis-vertical" size={20} color="#FFFFFF" />
            </Pressable>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Chat body */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="chat-scroll"
      >
        {/* Bot bubble */}
        <View style={styles.rowLeft} testID="message-m1">
          <View style={[styles.bubble, styles.botBubble]}>
            <Text style={styles.botText}>
              Thank you! Our executive has completed the call with you.
            </Text>
            <Text style={styles.botTime}>10:33 AM</Text>
          </View>
        </View>

        {/* Call Summary card */}
        <CallSummaryCard />
      </ScrollView>

      {/* Bottom input bar */}
      <SafeAreaView edges={["bottom"]} style={styles.bottomSafe}>
        <View style={styles.inputBar}>
          <Pressable testID="add-button" hitSlop={8} onPress={() => {}}>
            <Ionicons name="add-circle-outline" size={28} color={Colors.brand} />
          </Pressable>

          <View style={styles.inputWrap}>
            <TextInput
              testID="message-input"
              style={styles.input}
              value={draft}
              onChangeText={setDraft}
              placeholder="Write your message"
              placeholderTextColor={Colors.meta}
            />
            <Pressable testID="attach-button" hitSlop={8} onPress={() => {}}>
              <Ionicons name="attach" size={22} color={Colors.meta} />
            </Pressable>
          </View>

          <Pressable
            testID="voice-button"
            style={({ pressed }) => [styles.micBtn, pressed && styles.pressed]}
            onPress={() => {}}
          >
            <Ionicons name="mic" size={22} color="#FFFFFF" />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.chatBg },
  pressed: { opacity: 0.85 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  avatarWrap: { width: 40, height: 40 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.logoBg,
    alignItems: "center",
    justifyContent: "center",
  },
  onlineDot: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: Colors.green,
    borderWidth: 2,
    borderColor: Colors.headerTop,
  },
  headerTitleWrap: { flex: 1 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  headerTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", flexShrink: 1 },
  headerSubtitle: { color: "rgba(255,255,255,0.85)", fontSize: 12, marginTop: 1 },

  scroll: { flex: 1, backgroundColor: Colors.chatBg },
  scrollContent: { padding: 14, paddingBottom: 18 },

  rowLeft: { flexDirection: "row", justifyContent: "flex-start", marginBottom: 12 },

  bubble: { maxWidth: "82%", borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10 },
  botBubble: {
    backgroundColor: Colors.botBubble,
    borderTopLeftRadius: 6,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  botText: { fontSize: 14.5, color: Colors.title, lineHeight: 20 },
  botTime: { fontSize: 11, color: Colors.meta, marginTop: 6, alignSelf: "flex-end" },

  // Card
  card: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  cardIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.iconChip,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: { fontSize: 18, fontWeight: "700", color: Colors.title },

  statusRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 12 },
  statusText: { fontSize: 14, color: Colors.title, fontWeight: "500" },

  divider: { height: 1, backgroundColor: Colors.divider, marginVertical: 14 },

  sectionHeading: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.brand,
    letterSpacing: 0.2,
    marginBottom: 10,
  },

  detailsGroup: { gap: 12 },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  detailLeft: { flexDirection: "row", alignItems: "center", gap: 10, flexShrink: 1 },
  detailLabel: { fontSize: 14, color: Colors.body },
  detailValue: {
    fontSize: 14,
    color: Colors.title,
    fontWeight: "600",
    textAlign: "right",
    flexShrink: 1,
  },

  notesText: { fontSize: 14, color: Colors.body, lineHeight: 20 },

  ticketGroup: { gap: 14 },
  checkRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: Colors.brand,
    alignItems: "center",
    justifyContent: "center",
  },
  checkLabel: { fontSize: 14, color: Colors.title, fontWeight: "500" },

  // Bottom bar
  bottomSafe: {
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 6,
  },
  inputWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.inputBg,
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 4,
  },
  input: { flex: 1, fontSize: 14.5, color: Colors.title, paddingVertical: 8 },
  micBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.brand,
    alignItems: "center",
    justifyContent: "center",
  },
});
