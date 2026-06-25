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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

/**
 * "Home" / business profile screen for Cool Breeze AC Services.
 * Reverse-engineered from the FX_home reference (the screenshot is the contract).
 * Fully self-contained: palette, mock data, sub-components and styles all live
 * in this file, so the screen has no dependency on a shared src/ folder and
 * requires no external image assets.
 */

const Colors = {
  headerTop: "#7C5FCC",
  headerBottom: "#6A4DBB",
  brand: "#6A4DBB",
  background: "#FFFFFF",
  pageTint: "#F6F5FB",
  card: "#FFFFFF",
  cardBorder: "#ECECF2",
  title: "#1C1B2E",
  body: "#6E6E7A",
  meta: "#9A9AA5",
  price: "#6A4DBB",
  chevronBg: "#EFEBFA",
  tabActiveBg: "#EFEBFA",
  tabInactive: "#3A3A45",
  green: "#2AA457",
  greenSoft: "#E5F6EE",
  star: "#F5A623",
  logoCircle: "#1B1530",
  quickActionBg: "#EFEBFA",
  // service icon tints
  tintPurpleBg: "#EDE8FA",
  tintBlueBg: "#E6EEFB",
  tintBlue: "#3D7DE0",
  tintGreenBg: "#E5F6EE",
  tintGreen: "#2BB673",
  tintOrangeBg: "#FDEEDF",
  tintOrange: "#F2994A",
};

type Service = {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  iconBg: string;
  iconColor: string;
};

const SERVICES: Service[] = [
  {
    id: "ac-repair",
    title: "AC Repair",
    description: "Fix all types of AC issues",
    price: "₹299",
    icon: "tools",
    iconBg: Colors.tintPurpleBg,
    iconColor: Colors.brand,
  },
  {
    id: "ac-installation",
    title: "AC Installation",
    description: "Professional AC installation",
    price: "₹799",
    icon: "air-conditioner",
    iconBg: Colors.tintBlueBg,
    iconColor: Colors.tintBlue,
  },
  {
    id: "ac-gas-filling",
    title: "AC Gas Filling",
    description: "Gas top-up for better cooling",
    price: "₹499",
    icon: "gas-cylinder",
    iconBg: Colors.tintGreenBg,
    iconColor: Colors.tintGreen,
  },
  {
    id: "ac-maintenance",
    title: "AC Maintenance",
    description: "General service & cleaning",
    price: "₹399",
    icon: "wrench-cog-outline",
    iconBg: Colors.tintOrangeBg,
    iconColor: Colors.tintOrange,
  },
];

const TABS = ["Our Services", "Offers & Updates", "Reviews"];

type QuickAction = {
  id: string;
  label: string;
  icon: string;
};

const QUICK_ACTIONS: QuickAction[] = [
  { id: "chat", label: "Chat", icon: "chatbubble-ellipses-outline" },
  { id: "voip-call", label: "VoiP call", icon: "git-compare" },
  { id: "call", label: "call", icon: "call" },
  { id: "directions", label: "Directions", icon: "navigate" },
];

function ServiceCard({ service }: { service: Service }) {
  return (
    <Pressable
      testID={`service-card-${service.id}`}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => {}}
    >
      <View style={[styles.serviceIconWrap, { backgroundColor: service.iconBg }]}>
        <MaterialCommunityIcons
          name={service.icon as any}
          size={24}
          color={service.iconColor}
        />
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{service.title}</Text>
        <Text style={styles.cardDescription}>{service.description}</Text>
        <Text style={styles.cardPrice}>
          starting from <Text style={styles.cardPriceValue}>{service.price}</Text>
        </Text>
      </View>

      <View style={styles.chevronCircle}>
        <Ionicons name="chevron-forward" size={16} color={Colors.brand} />
      </View>
    </Pressable>
  );
}

function QuickActionButton({ action }: { action: QuickAction }) {
  return (
    <Pressable
      testID={`quick-action-${action.id}`}
      style={({ pressed }) => [styles.quickAction, pressed && styles.cardPressed]}
      onPress={() => {}}
    >
      <View style={styles.quickActionCircle}>
        <Ionicons name={action.icon as any} size={22} color={Colors.brand} />
      </View>
      <Text style={styles.quickActionLabel}>{action.label}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View style={styles.root} testID="home-screen">
      <StatusBar barStyle="light-content" backgroundColor={Colors.headerBottom} />

      {/* ---------- Purple header ---------- */}
      <LinearGradient
        colors={[Colors.headerTop, Colors.headerBottom]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView edges={["top"]}>
          <View style={styles.header} testID="home-header">
            <Pressable
              testID="home-back-button"
              hitSlop={12}
              onPress={() => {}}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.headerTitle}>Home</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ---------- White profile section ---------- */}
        <View style={styles.profileSection} testID="business-profile">
          <View style={styles.logoCircle} testID="business-logo">
            <MaterialCommunityIcons name="snowflake" size={40} color="#FFFFFF" />
          </View>

          <View style={styles.profileNameRow}>
            <Text style={styles.businessName} testID="business-name">
              Cool Breeze AC Services
            </Text>
            <Ionicons
              name="checkmark-circle"
              size={18}
              color={Colors.brand}
              style={styles.verifiedBadge}
              testID="verified-badge"
            />
          </View>

          <View style={styles.ratingRow} testID="rating-row">
            <Ionicons name="star" size={15} color={Colors.star} />
            <Text style={styles.ratingValue}>4.2</Text>
            <Text style={styles.ratingCount}>(128 reviews)</Text>
          </View>

          <Text style={styles.profileCategory}>AC Repair & Installation</Text>
          <Text style={styles.profileLocation}>Hyderabad, Telangana</Text>
          <Text style={styles.profileOpen} testID="open-status">
            Open now - Closes 8:00 PM
          </Text>

          {/* ---------- Quick actions ---------- */}
          <View style={styles.quickActionsRow} testID="quick-actions">
            {QUICK_ACTIONS.map((action) => (
              <QuickActionButton key={action.id} action={action} />
            ))}
          </View>
        </View>

        {/* ---------- Divider ---------- */}
        <View style={styles.divider} />

        {/* ---------- Tab bar ---------- */}
        <View style={styles.tabBar} testID="tab-bar">
          {TABS.map((tab, i) => {
            const active = i === activeTab;
            return (
              <Pressable
                key={tab}
                testID={`tab-${i}`}
                onPress={() => setActiveTab(i)}
                style={[styles.tab, active && styles.tabActive]}
              >
                <Text style={[styles.tabText, active && styles.tabTextActive]}>
                  {tab}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* ---------- Hero banner ---------- */}
        <LinearGradient
          colors={["#7C5FCC", "#6A4DBB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
          testID="hero-banner"
        >
          <MaterialCommunityIcons
            name="snowflake"
            size={22}
            color="rgba(255,255,255,0.13)"
            style={styles.flake1}
          />
          <MaterialCommunityIcons
            name="snowflake"
            size={14}
            color="rgba(255,255,255,0.13)"
            style={styles.flake2}
          />

          <View style={styles.heroTextWrap}>
            <Text style={styles.heroTitle}>Expert AC Solutions</Text>
            <Text style={styles.heroSubtitle}>Fast. Reliable. Affordable.</Text>
            <Text style={styles.heroSubtitle}>All AC services under one roof.</Text>
          </View>

          <MaterialCommunityIcons
            name="air-conditioner"
            size={92}
            color="rgba(255,255,255,0.9)"
            style={styles.heroAc}
          />
        </LinearGradient>

        {/* ---------- AC Services list ---------- */}
        <Text style={styles.sectionTitle}>AC Services</Text>
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}

        {/* ---------- Working hours ---------- */}
        <View style={styles.hoursCard} testID="working-hours">
          <View style={styles.hoursLeft}>
            <Ionicons name="time-outline" size={20} color={Colors.title} />
            <View style={styles.hoursTextWrap}>
              <Text style={styles.hoursTitle}>Working hours</Text>
              <Text style={styles.hoursValue}>9:00 AM - 9:00PM (Mon-Sun)</Text>
            </View>
          </View>
          <View style={styles.openPill}>
            <Text style={styles.openPillText}>Open Now</Text>
            <View style={styles.openDot} />
          </View>
        </View>
      </ScrollView>

      {/* ---------- Bottom action bar ---------- */}
      <SafeAreaView edges={["bottom"]} style={styles.bottomSafe}>
        <View style={styles.bottomBar}>
          <Pressable
            testID="chat-with-us"
            style={({ pressed }) => [styles.chatBtn, pressed && styles.pressed]}
            onPress={() => {}}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={20} color={Colors.brand} />
            <Text style={styles.chatBtnText}>Chat with Us</Text>
          </Pressable>
          <Pressable
            testID="call-now"
            style={({ pressed }) => [styles.callBtn, pressed && styles.pressed]}
            onPress={() => {}}
          >
            <Ionicons name="call" size={20} color="#FFFFFF" />
            <Text style={styles.callBtnText}>Call Now</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 16,
  },
  headerTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },

  // Scroll body
  scroll: { flex: 1, backgroundColor: Colors.pageTint },
  scrollContent: { paddingBottom: 24 },

  // Profile section
  profileSection: {
    backgroundColor: Colors.background,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 8,
  },
  logoCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: Colors.logoCircle,
    alignItems: "center",
    justifyContent: "center",
  },
  profileNameRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 14,
  },
  businessName: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.title,
    flexShrink: 1,
    lineHeight: 28,
  },
  verifiedBadge: { marginLeft: 6, marginTop: 5 },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
  },
  ratingValue: { fontSize: 14, fontWeight: "800", color: Colors.title },
  ratingCount: { fontSize: 14, color: Colors.body, marginLeft: 2 },
  profileCategory: { fontSize: 14, color: Colors.title, marginTop: 8 },
  profileLocation: { fontSize: 14, color: Colors.body, marginTop: 4 },
  profileOpen: {
    fontSize: 14,
    color: Colors.brand,
    fontWeight: "700",
    marginTop: 4,
  },

  // Quick actions
  quickActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  quickAction: { alignItems: "center", gap: 6, flex: 1 },
  quickActionCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.quickActionBg,
    alignItems: "center",
    justifyContent: "center",
  },
  quickActionLabel: { fontSize: 12.5, color: Colors.title, fontWeight: "600" },

  // Divider
  divider: {
    height: 1,
    backgroundColor: Colors.cardBorder,
  },

  // Tabs
  tabBar: {
    flexDirection: "row",
    backgroundColor: Colors.pageTint,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 6,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  tabActive: { backgroundColor: Colors.tabActiveBg },
  tabText: { fontSize: 13, color: Colors.tabInactive, fontWeight: "600" },
  tabTextActive: { color: Colors.brand, fontWeight: "700" },

  // Hero
  hero: {
    justifyContent: "center",
    borderRadius: 22,
    padding: 18,
    overflow: "hidden",
    position: "relative",
    minHeight: 120,
    marginHorizontal: 16,
    marginTop: 4,
  },
  heroTextWrap: { maxWidth: "65%" },
  heroAc: { position: "absolute", right: 6, top: 18 },
  flake1: { position: "absolute", top: 16, right: 130 },
  flake2: { position: "absolute", bottom: 16, right: 60 },
  heroTitle: { color: "#FFFFFF", fontSize: 19, fontWeight: "800" },
  heroSubtitle: { color: "rgba(255,255,255,0.9)", fontSize: 13, marginTop: 3 },

  // Section
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.title,
    marginTop: 20,
    marginBottom: 12,
    marginHorizontal: 16,
  },

  // Service card
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: "rgba(31,22,64,0.08)",
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardPressed: { opacity: 0.85 },
  serviceIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  cardBody: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: "700", color: Colors.title },
  cardDescription: { fontSize: 12.5, color: Colors.body, marginTop: 2 },
  cardPrice: { fontSize: 12.5, color: Colors.body, marginTop: 5 },
  cardPriceValue: { color: Colors.price, fontWeight: "800" },
  chevronCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.chevronBg,
    alignItems: "center",
    justifyContent: "center",
  },

  // Working hours
  hoursCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 14,
    marginHorizontal: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  hoursLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  hoursTextWrap: { marginLeft: 10 },
  hoursTitle: { fontSize: 14, fontWeight: "700", color: Colors.title },
  hoursValue: { fontSize: 12.5, color: Colors.body, marginTop: 2 },
  openPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.greenSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  openPillText: { color: Colors.green, fontWeight: "700", fontSize: 12 },
  openDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.green },

  // Bottom bar
  bottomSafe: {
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  bottomBar: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
  },
  pressed: { opacity: 0.85 },
  chatBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 14,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: Colors.brand,
    backgroundColor: "#FFFFFF",
  },
  chatBtnText: { color: Colors.brand, fontWeight: "700", fontSize: 15 },
  callBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 14,
    paddingVertical: 14,
    backgroundColor: Colors.brand,
  },
  callBtnText: { color: "#FFFFFF", fontWeight: "700", fontSize: 15 },
});
