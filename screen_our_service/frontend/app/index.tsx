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

/**
 * "Our Services" screen for Cool Breeze AC Services.
 * Reverse-engineered from the Frame 614 design (the screenshot is the contract).
 * Fully self-contained: palette, mock data, sub-components and styles all live
 * in this file, so the screen has no dependency on a shared src/ folder.
 */

const Colors = {
  headerTop: "#6A4DBB",
  headerBottom: "#6A4DBB",
  brand: "#6A4DBB",
  background: "#FFFFFF",
  pageTint: "#F6F5FB",
  card: "#FFFFFF",
  cardBorder: "#ECECF2",
  title: "#1C1B2E",
  body: "#6E6E7A",
  price: "#6A4DBB",
  chevronBg: "#EFEBFA",
  tabActiveBg: "#EFEBFA",
  tabInactive: "#3A3A45",
  green: "#2AA457",
  greenSoft: "#E5F6EE",
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

type Feature = { id: string; label: string; lib: "ion" | "mci"; icon: string; circled?: boolean };

const FEATURES: Feature[] = [
  { id: "certified", label: "Certified\nTechnicians", lib: "mci", icon: "clipboard-check-outline" },
  { id: "ontime", label: "On-Time\nService", lib: "ion", icon: "time-outline" },
  { id: "quality", label: "Quality\nAssured", lib: "ion", icon: "ribbon-outline" },
  { id: "pricing", label: "Affordable\nPricing", lib: "mci", icon: "currency-inr", circled: true },
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

function FeatureItem({ feature, isLast }: { feature: Feature; isLast?: boolean }) {
  const size = feature.circled ? 16 : 26;
  const glyph =
    feature.lib === "ion" ? (
      <Ionicons name={feature.icon as any} size={size} color={Colors.brand} />
    ) : (
      <MaterialCommunityIcons name={feature.icon as any} size={size} color={Colors.brand} />
    );
  return (
    <View style={[styles.feature, !isLast && styles.featureDivider]} testID={`feature-${feature.id}`}>
      {feature.circled ? <View style={styles.featureCircle}>{glyph}</View> : glyph}
      <Text style={styles.featureLabel}>{feature.label}</Text>
    </View>
  );
}

export default function OurServicesScreen() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View style={styles.root} testID="our-services-screen">
      <StatusBar barStyle="light-content" backgroundColor={Colors.headerTop} />

      {/* ---------- Purple header ---------- */}
      <LinearGradient
        colors={[Colors.headerTop, Colors.headerBottom]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView edges={["top"]}>
          <View style={styles.header} testID="our-services-header">
            <Pressable
              testID="our-services-back-button"
              hitSlop={12}
              onPress={() => {}}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </Pressable>

            <View style={styles.avatarWrap}>
              <Image source={require("../assets/images/logo.png")} style={styles.avatar} resizeMode="cover" />
              <View style={styles.onlineDot} />
            </View>

            <View style={styles.headerTitleWrap}>
              <View style={styles.titleRow}>
                <Text style={styles.headerTitle} numberOfLines={1}>
                  Cool Breeze AC Services
                </Text>
                <Ionicons name="checkmark-circle" size={16} color="#3DD17F" />
              </View>
              <Text style={styles.headerSubtitle}>Online</Text>
            </View>

            <Pressable
              testID="our-services-menu-button"
              hitSlop={12}
              onPress={() => {}}
            >
              <Ionicons name="ellipsis-vertical" size={20} color="#FFFFFF" />
            </Pressable>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* ---------- Tab bar ---------- */}
      <View style={styles.tabBar}>
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

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ---------- Hero banner ---------- */}
        <LinearGradient
          colors={["#7C5FCC", "#6A4DBB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <MaterialCommunityIcons name="snowflake" size={22} color="rgba(255,255,255,0.13)" style={styles.flake1} />
          <MaterialCommunityIcons name="snowflake" size={14} color="rgba(255,255,255,0.13)" style={styles.flake2} />
          <MaterialCommunityIcons name="snowflake" size={16} color="rgba(255,255,255,0.13)" style={styles.flake3} />

          <Image
            source={require("../assets/images/hero-ac.png")}
            style={styles.heroAc}
            resizeMode="contain"
          />
          <View style={styles.heroTextWrap}>
            <View style={styles.heroTitleRow}>
              <Image source={require("../assets/images/hero-badge.png")} style={styles.heroBadgeImg} resizeMode="contain" />
              <Text style={styles.heroTitle} numberOfLines={1} adjustsFontSizeToFit>
                Expert AC Solutions
              </Text>
            </View>
            <Text style={styles.heroSubtitle}>Fast. Reliable. Affordable.</Text>
            <Text style={styles.heroSubtitle}>All AC services under one roof.</Text>
          </View>
        </LinearGradient>

        {/* ---------- AC Services list ---------- */}
        <Text style={styles.sectionTitle}>AC Services</Text>
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}

        <Pressable
          testID="view-all-services"
          style={styles.viewAll}
          onPress={() => {}}
        >
          <Text style={styles.viewAllText}>View All Services</Text>
          <Ionicons name="chevron-down" size={16} color={Colors.brand} />
        </Pressable>

        {/* ---------- Feature row ---------- */}
        <View style={styles.featureRow}>
          {FEATURES.map((feature, i) => (
            <FeatureItem key={feature.id} feature={feature} isLast={i === FEATURES.length - 1} />
          ))}
        </View>

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
            <Text style={styles.openText}>Open Now</Text>
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
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  avatarWrap: { width: 40, height: 40 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1B1530",
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
    backgroundColor: "#3DD17F",
    borderWidth: 2,
    borderColor: Colors.headerTop,
  },
  headerTitleWrap: { flex: 1 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  headerTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", flexShrink: 1 },
  headerSubtitle: { color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 1 },

  // Tabs
  tabBar: {
    flexDirection: "row",
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
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

  // Scroll body
  scroll: { flex: 1, backgroundColor: Colors.pageTint },
  scrollContent: { padding: 16, paddingBottom: 24 },

  // Hero
  hero: {
    justifyContent: "center",
    borderRadius: 22,
    padding: 18,
    overflow: "hidden",
    position: "relative",
    minHeight: 150,
  },
  heroAc: { position: "absolute", right: -4, top: 12, width: 150, height: 124 },
  heroTextWrap: { maxWidth: "60%" },
  heroTitleRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
  heroBadgeImg: { width: 38, height: 47 },
  flake1: { position: "absolute", top: 16, right: 150 },
  flake2: { position: "absolute", bottom: 16, right: 70 },
  flake3: { position: "absolute", top: 70, right: 196 },
  heroTitle: { color: "#FFFFFF", fontSize: 19, fontWeight: "800", flexShrink: 1 },
  heroSubtitle: { color: "rgba(255,255,255,0.9)", fontSize: 13, marginTop: 3 },
  heroImage: { marginLeft: 8 },

  // Section
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.title,
    marginTop: 20,
    marginBottom: 12,
  },

  // Service card
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
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

  // View all
  viewAll: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 6,
    marginBottom: 8,
  },
  viewAllText: { color: Colors.brand, fontWeight: "700", fontSize: 14 },

  // Features
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    marginBottom: 18,
  },
  feature: { flex: 1, alignItems: "center", gap: 6 },
  featureDivider: { borderRightWidth: 1, borderRightColor: Colors.cardBorder },
  featureCircle: { width: 26, height: 26, borderRadius: 13, borderWidth: 1.5, borderColor: Colors.brand, alignItems: "center", justifyContent: "center" },
  featureLabel: {
    textAlign: "center",
    fontSize: 11.5,
    color: Colors.title,
    fontWeight: "600",
    lineHeight: 15,
  },

  // Working hours
  hoursCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 14,
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
  openText: { color: Colors.green, fontWeight: "700", fontSize: 12 },
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
