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

/** Offers & Updates screen — reverse-engineered from offers_updates.pdf. Self-contained. */

const Colors = {
  headerTop: "#7C5FCC",
  headerBottom: "#6A4DBB",
  brand: "#6A4DBB",
  brandText: "#6A4DBB",
  background: "#FFFFFF",
  pageTint: "#FFFFFF",
  card: "#FFFFFF",
  cardBorder: "#ECECF2",
  title: "#1C1B2E",
  body: "#6E6E7A",
  meta: "#9A9AA5",
  offerBg: "#EAEDFB",
  chipBg: "#EEEBFA",
  tabActiveBg: "#EFEBFA",
  tabInactive: "#3A3A45",
  tintPurpleBg: "#6A4DBB",
  tintGreenBg: "#E5F6EE",
  tintGreen: "#2BB673",
  tintOrangeBg: "#FDEEDF",
  tintOrange: "#F2994A",
  tintBlueBg: "#E6EEFB",
  tintBlue: "#3D7DE0",
};

const TABS = ["Our Services", "Offers & Updates", "Reviews"];

type Update = {
  id: string;
  title: string;
  desc: string;
  date: string;
  tag: string;
  icon: string;
  iconBg: string;
  iconColor: string;
};

const UPDATES: Update[] = [
  {
    id: "checkup",
    title: "Pre-Summer AC Check-up",
    desc: "Get your AC checked before the summer rush. Ensure best cooling performance.",
    date: "22 May 2025",
    tag: "Service Update",
    icon: "air-conditioner",
    iconBg: Colors.tintPurpleBg,
    iconColor: "#FFFFFF",
  },
  {
    id: "filter",
    title: "Filter Cleaning Reminder",
    desc: "Regular filter cleaning improves air quality and saves electricity.",
    date: "18 May 2025",
    tag: "Tips & Advice",
    icon: "air-filter",
    iconBg: Colors.tintGreenBg,
    iconColor: Colors.tintGreen,
  },
  {
    id: "branch",
    title: "New Branch Opening",
    desc: "We are excited to announce our new service center in Kondapur!",
    date: "15 May 2025",
    tag: "Announcement",
    icon: "bullhorn",
    iconBg: Colors.tintOrangeBg,
    iconColor: Colors.tintOrange,
  },
  {
    id: "amc",
    title: "AMC Plans Available",
    desc: "Choose an AMC plan and enjoy priority service & exclusive benefits.",
    date: "10 May 2025",
    tag: "Plan Update",
    icon: "shield-check",
    iconBg: Colors.tintBlueBg,
    iconColor: Colors.tintBlue,
  },
];

const SOCIALS = [
  { id: "wa", icon: "logo-whatsapp", color: "#25D366" },
  { id: "fb", icon: "logo-facebook", color: "#1877F2" },
  { id: "ig", icon: "logo-instagram", color: "#E1306C" },
  { id: "yt", icon: "logo-youtube", color: "#FF0000" },
];

function UpdateCard({ item }: { item: Update }) {
  return (
    <Pressable
      testID={`update-${item.id}`}
      style={({ pressed }) => [styles.updateCard, pressed && styles.pressed]}
      onPress={() => {}}
    >
      <View style={[styles.updateIcon, { backgroundColor: item.iconBg }]}>
        <MaterialCommunityIcons name={item.icon as any} size={22} color={item.iconColor} />
      </View>
      <View style={styles.updateBody}>
        <Text style={styles.updateTitle}>{item.title}</Text>
        <Text style={styles.updateDesc}>{item.desc}</Text>
        <View style={styles.tagChip}>
          <Text style={styles.tagText}>{item.tag}</Text>
        </View>
      </View>
      <View style={styles.updateRight}>
        <Text style={styles.updateDate}>{item.date}</Text>
        <Ionicons name="chevron-forward" size={18} color={Colors.meta} />
      </View>
    </Pressable>
  );
}

export default function OffersUpdatesScreen() {
  const [activeTab, setActiveTab] = useState(1);
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.root} testID="offers-updates-screen">
      <StatusBar barStyle="light-content" backgroundColor={Colors.headerTop} />

      {/* Header */}
      <LinearGradient colors={[Colors.headerTop, Colors.headerBottom]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
        <SafeAreaView edges={["top"]}>
          <View style={styles.header}>
            <Pressable hitSlop={12} onPress={() => {}}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </Pressable>
            <View style={styles.avatarWrap}>
              <Image source={require("../assets/images/logo.png")} style={styles.avatar} resizeMode="cover" />
              <View style={styles.onlineDot} />
            </View>
            <View style={styles.headerTitleWrap}>
              <View style={styles.titleRow}>
                <Text style={styles.headerTitle} numberOfLines={1}>Cool Breeze AC Services</Text>
                <Ionicons name="checkmark-circle" size={16} color="#3DD17F" />
              </View>
              <Text style={styles.headerSubtitle}>Online</Text>
            </View>
            <Pressable hitSlop={12} onPress={() => {}}>
              <Ionicons name="ellipsis-vertical" size={20} color="#FFFFFF" />
            </Pressable>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabBar}>
        {TABS.map((tab, i) => {
          const active = i === activeTab;
          return (
            <Pressable key={tab} onPress={() => setActiveTab(i)} style={[styles.tab, active && styles.tabActive]}>
              <Text style={[styles.tabText, active && styles.tabTextActive]}>{tab}</Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Latest Offers */}
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Latest Offers</Text>
          <Pressable style={styles.linkRow} onPress={() => {}}>
            <Text style={styles.link}>View All Offers</Text>
            <Ionicons name="chevron-forward" size={15} color={Colors.brandText} />
          </Pressable>
        </View>

        {/* Offer banner */}
        <View style={styles.offerCard}>
          <Image
            source={require("../assets/images/offer-ac.png")}
            style={styles.offerAc}
            resizeMode="cover"
          />
          <View style={styles.offerTextWrap}>
            <View style={styles.offerBadge}>
              <Text style={styles.offerBadgeText}>SUMMER SPECIAL OFFER</Text>
            </View>
            <Text style={styles.offerHeadline}>
              <Text style={styles.offerPercent}>Flat 20% </Text>OFF
            </Text>
            <Text style={styles.offerSub}>on AC Services</Text>
            <Text style={styles.offerValid}>Valid till 31 May, 2025</Text>
            <Pressable style={styles.bookBtn} onPress={() => {}}>
              <Text style={styles.bookBtnText}>Book Now</Text>
            </Pressable>
          </View>
          <View style={styles.offerSeal}>
            <Text style={styles.offerSealNum}>20%</Text>
            <Text style={styles.offerSealOff}>OFF</Text>
          </View>
        </View>

        {/* Carousel dots */}
        <View style={styles.dots}>
          {[0, 1, 2, 3].map((d) => (
            <View key={d} style={[styles.dot, d === 0 && styles.dotActive]} />
          ))}
        </View>

        {/* Updates */}
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Updates</Text>
          <Pressable style={styles.linkRow} onPress={() => {}}>
            <Text style={styles.link}>View All Updates</Text>
            <Ionicons name="chevron-forward" size={15} color={Colors.brandText} />
          </Pressable>
        </View>

        {UPDATES.map((u) => (
          <UpdateCard key={u.id} item={u} />
        ))}

        {/* Notifications toggle */}
        <View style={styles.notifyCard}>
          <Text style={styles.notifyText}>Notifications</Text>
          <Pressable
            testID="notifications-toggle"
            onPress={() => setNotifications((v) => !v)}
            style={[styles.toggle, notifications ? styles.toggleOn : styles.toggleOff]}
          >
            {notifications && <Text style={styles.toggleLabel}>ON</Text>}
            <View style={styles.knob} />
            {!notifications && <Text style={styles.toggleLabelOff}>OFF</Text>}
          </Pressable>
        </View>

        {/* Follow us */}
        <View style={styles.followRow}>
          <View>
            <Text style={styles.followTitle}>Follow Us</Text>
            <Text style={styles.followSub}>Stay connected on our social media</Text>
          </View>
          <View style={styles.socials}>
            {SOCIALS.map((s) => (
              <Pressable key={s.id} style={styles.socialBtn} onPress={() => {}}>
                <Ionicons name={s.icon as any} size={20} color={s.color} />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom bar */}
      <SafeAreaView edges={["bottom"]} style={styles.bottomSafe}>
        <View style={styles.bottomBar}>
          <Pressable style={({ pressed }) => [styles.chatBtn, pressed && styles.pressed]} onPress={() => {}}>
            <Ionicons name="chatbubble-ellipses-outline" size={20} color={Colors.brand} />
            <Text style={styles.chatBtnText}>Chat with Us</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.callBtn, pressed && styles.pressed]} onPress={() => {}}>
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
  pressed: { opacity: 0.85 },

  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 12, gap: 10 },
  avatarWrap: { width: 40, height: 40 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#1B1530", alignItems: "center", justifyContent: "center" },
  onlineDot: { position: "absolute", right: 0, bottom: 0, width: 11, height: 11, borderRadius: 6, backgroundColor: "#3DD17F", borderWidth: 2, borderColor: Colors.headerTop },
  headerTitleWrap: { flex: 1 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  headerTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", flexShrink: 1 },
  headerSubtitle: { color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 1 },

  tabBar: { flexDirection: "row", backgroundColor: Colors.background, paddingHorizontal: 10, paddingVertical: 10, gap: 6, borderBottomWidth: 1, borderBottomColor: Colors.cardBorder },
  tab: { flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: "center" },
  tabActive: { backgroundColor: Colors.tabActiveBg },
  tabText: { fontSize: 13, color: Colors.tabInactive, fontWeight: "600" },
  tabTextActive: { color: Colors.brandText, fontWeight: "700" },

  scroll: { flex: 1, backgroundColor: Colors.pageTint },
  scrollContent: { padding: 16, paddingBottom: 24 },

  sectionHead: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 18, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: Colors.title },
  linkRow: { flexDirection: "row", alignItems: "center", gap: 2 },
  link: { color: Colors.brandText, fontWeight: "700", fontSize: 13 },

  offerCard: { backgroundColor: Colors.offerBg, borderRadius: 18, padding: 18, overflow: "hidden", position: "relative", minHeight: 205 },
  offerTextWrap: { maxWidth: "63%" },
  offerAc: { position: "absolute", right: -6, top: 26, width: 224, height: 142 },
  offerBadge: { alignSelf: "flex-start", backgroundColor: Colors.brand, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 5, marginBottom: 10 },
  offerBadgeText: { color: "#FFFFFF", fontSize: 9.5, fontWeight: "800", letterSpacing: 0.3 },
  offerHeadline: { fontSize: 26, fontWeight: "900", color: Colors.title },
  offerPercent: { color: Colors.brandText },
  offerSub: { fontSize: 18, fontWeight: "800", color: Colors.title, marginTop: -2 },
  offerValid: { fontSize: 13, color: Colors.body, marginTop: 8 },
  bookBtn: { alignSelf: "flex-start", backgroundColor: Colors.brand, borderRadius: 10, paddingHorizontal: 18, paddingVertical: 10, marginTop: 14 },
  bookBtnText: { color: "#FFFFFF", fontWeight: "700", fontSize: 14 },
  offerSeal: { position: "absolute", right: 16, bottom: 16, width: 58, height: 58, borderRadius: 29, backgroundColor: Colors.brand, alignItems: "center", justifyContent: "center" },
  offerSealNum: { color: "#FFFFFF", fontWeight: "900", fontSize: 16 },
  offerSealOff: { color: "#FFFFFF", fontWeight: "700", fontSize: 10 },

  dots: { flexDirection: "row", justifyContent: "center", gap: 6, marginTop: 12 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#D6D2EC" },
  dotActive: { backgroundColor: Colors.brand, width: 8, height: 8, borderRadius: 4 },

  updateCard: { flexDirection: "row", backgroundColor: Colors.card, borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: Colors.cardBorder },
  updateIcon: { width: 46, height: 46, borderRadius: 12, alignItems: "center", justifyContent: "center", marginRight: 12 },
  updateBody: { flex: 1 },
  updateTitle: { fontSize: 15, fontWeight: "700", color: Colors.title },
  updateDesc: { fontSize: 12.5, color: Colors.body, marginTop: 3, lineHeight: 18 },
  tagChip: { alignSelf: "flex-start", backgroundColor: Colors.chipBg, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4, marginTop: 8 },
  tagText: { color: Colors.brandText, fontSize: 11, fontWeight: "700" },
  updateRight: { alignItems: "flex-end", justifyContent: "space-between", marginLeft: 8 },
  updateDate: { fontSize: 11.5, color: Colors.meta },

  notifyCard: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: Colors.card, borderRadius: 28, paddingHorizontal: 20, paddingVertical: 16, marginTop: 8, borderWidth: 1, borderColor: Colors.cardBorder },
  notifyText: { fontSize: 16, fontWeight: "700", color: Colors.title },
  toggle: { width: 56, height: 30, borderRadius: 15, flexDirection: "row", alignItems: "center", paddingHorizontal: 4 },
  toggleOn: { backgroundColor: Colors.brand, justifyContent: "flex-end" },
  toggleOff: { backgroundColor: "#C9C9D2", justifyContent: "flex-start" },
  toggleLabel: { position: "absolute", left: 9, color: "#FFFFFF", fontSize: 11, fontWeight: "800" },
  toggleLabelOff: { position: "absolute", right: 7, color: "#FFFFFF", fontSize: 11, fontWeight: "800" },
  knob: { width: 22, height: 22, borderRadius: 11, backgroundColor: "#FFFFFF" },

  followRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 22, marginBottom: 8 },
  followTitle: { fontSize: 16, fontWeight: "800", color: Colors.title },
  followSub: { fontSize: 12, color: Colors.body, marginTop: 2 },
  socials: { flexDirection: "row", gap: 10 },
  socialBtn: { width: 38, height: 38, borderRadius: 19, borderWidth: 1, borderColor: Colors.cardBorder, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" },

  bottomSafe: { backgroundColor: Colors.background, borderTopWidth: 1, borderTopColor: Colors.cardBorder },
  bottomBar: { flexDirection: "row", gap: 12, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 6 },
  chatBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 12, paddingVertical: 14, borderWidth: 1.5, borderColor: Colors.brand, backgroundColor: "#FFFFFF" },
  chatBtnText: { color: Colors.brand, fontWeight: "700", fontSize: 15 },
  callBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 12, paddingVertical: 14, backgroundColor: Colors.brand },
  callBtnText: { color: "#FFFFFF", fontWeight: "700", fontSize: 15 },
});
