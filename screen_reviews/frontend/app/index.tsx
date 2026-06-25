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

/** Reviews screen — reverse-engineered from reviews.pdf. Self-contained. */

const Colors = {
  headerTop: "#7C5FCC",
  headerBottom: "#6A4DBB",
  brand: "#6A4DBB",
  brandText: "#6A4DBB",
  background: "#FFFFFF",
  card: "#FFFFFF",
  cardBorder: "#ECECF2",
  panel: "#F4F3FB",
  title: "#1C1B2E",
  body: "#444452",
  meta: "#9A9AA5",
  star: "#F5A623",
  starEmpty: "#D8D8E0",
  barTrack: "#E3E1F0",
  tabActiveBg: "#EFEBFA",
  tabInactive: "#3A3A45",
  green: "#2BB673",
  greenSoft: "#E5F6EE",
  yellow: "#E8A02E",
  yellowSoft: "#FCF0DA",
  red: "#E5484D",
  redSoft: "#FBE6E7",
};

const TABS = ["Our Services", "Offers & Updates", "Reviews"];

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((i) => {
        const name = rating >= i ? "star" : rating >= i - 0.5 ? "star-half" : "star-outline";
        return <Ionicons key={i} name={name as any} size={size} color={Colors.star} />;
      })}
    </View>
  );
}

function PurpleStars({ rating, size = 18 }: { rating: number; size?: number }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((i) => {
        const name = rating >= i ? "star" : rating >= i - 0.5 ? "star-half" : "star-outline";
        return <Ionicons key={i} name={name as any} size={size} color={rating >= i - 0.5 ? Colors.brand : Colors.starEmpty} />;
      })}
    </View>
  );
}

const BARS = [
  { star: 5, pct: 78 },
  { star: 4, pct: 15 },
  { star: 3, pct: 4 },
  { star: 2, pct: 2 },
  { star: 1, pct: 1 },
];

type Sentiment = "Positive" | "Neutral" | "Negative";

const STATS: { id: string; count: string; label: string; icon: string; color: string; bg: string }[] = [
  { id: "pos", count: "1,120", label: "Positive", icon: "emoticon-happy-outline", color: Colors.green, bg: Colors.greenSoft },
  { id: "neu", count: "95", label: "Neutral", icon: "emoticon-neutral-outline", color: Colors.yellow, bg: Colors.yellowSoft },
  { id: "neg", count: "33", label: "Negative", icon: "emoticon-sad-outline", color: Colors.red, bg: Colors.redSoft },
  { id: "tot", count: "1,248", label: "Total Reviews", icon: "message-text-outline", color: Colors.brand, bg: Colors.panel },
];

type Review = {
  id: string;
  name: string;
  avatar: any;
  rating: number;
  ago: string;
  sentiment: Sentiment;
  text: string;
  likes: number;
  comments: number;
};

const REVIEWS: Review[] = [
  { id: "1", name: "Suresh Yadav", avatar: require("../assets/images/avatars/suresh.png"), rating: 4.5, ago: "2 days ago", sentiment: "Positive", text: "Technician was on time and fixed the AC quickly. Very professional service!", likes: 12, comments: 2 },
  { id: "2", name: "Anita Sharma", avatar: require("../assets/images/avatars/anita.png"), rating: 4, ago: "3 days ago", sentiment: "Neutral", text: "Service was good but a little delay in response. Overall satisfied.", likes: 7, comments: 1 },
  { id: "3", name: "Ravi Teja", avatar: require("../assets/images/avatars/ravi.png"), rating: 2, ago: "5 days ago", sentiment: "Negative", text: "Technician came late and didn't have proper tools. Took more time to complete the job.", likes: 3, comments: 3 },
  { id: "4", name: "Anita Sharma", avatar: require("../assets/images/avatars/anita.png"), rating: 4, ago: "3 days ago", sentiment: "Neutral", text: "Service was good but a little delay in response. Overall satisfied.", likes: 7, comments: 1 },
];

const SENTIMENT_STYLE: Record<Sentiment, { bg: string; color: string }> = {
  Positive: { bg: Colors.greenSoft, color: Colors.green },
  Neutral: { bg: Colors.yellowSoft, color: Colors.yellow },
  Negative: { bg: Colors.redSoft, color: Colors.red },
};

function ReviewCard({ r }: { r: Review }) {
  const s = SENTIMENT_STYLE[r.sentiment];
  return (
    <View style={styles.reviewCard} testID={`review-${r.id}`}>
      <View style={styles.reviewTop}>
        <Image source={r.avatar} style={styles.avatar} resizeMode="cover" />
        <View style={styles.reviewHeadText}>
          <View style={styles.nameRow}>
            <Text style={styles.reviewName}>{r.name}</Text>
            <View style={styles.verifiedChip}>
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>
          <View style={styles.starsRow}>
            <Stars rating={r.rating} />
            <Text style={styles.ago}> • {r.ago}</Text>
          </View>
        </View>
        <View style={[styles.sentimentChip, { backgroundColor: s.bg }]}>
          <Text style={[styles.sentimentText, { color: s.color }]}>{r.sentiment}</Text>
        </View>
      </View>

      <Text style={styles.reviewText}>{r.text}</Text>

      <View style={styles.reviewActions}>
        <View style={styles.actionItem}>
          <Ionicons name="thumbs-up-outline" size={16} color={Colors.meta} />
          <Text style={styles.actionCount}>{r.likes}</Text>
        </View>
        <View style={styles.actionItem}>
          <Ionicons name="chatbubble-outline" size={15} color={Colors.meta} />
          <Text style={styles.actionCount}>{r.comments}</Text>
        </View>
      </View>
    </View>
  );
}

export default function ReviewsScreen() {
  const [activeTab, setActiveTab] = useState(2);

  return (
    <View style={styles.root} testID="reviews-screen">
      <StatusBar barStyle="light-content" backgroundColor={Colors.headerTop} />

      {/* Header */}
      <LinearGradient colors={[Colors.headerTop, Colors.headerBottom]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
        <SafeAreaView edges={["top"]}>
          <View style={styles.header}>
            <Pressable hitSlop={12} onPress={() => {}}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </Pressable>
            <View style={styles.avatarWrap}>
              <Image source={require("../assets/images/logo.png")} style={styles.headerAvatar} resizeMode="cover" />
              <View style={styles.onlineDot} />
            </View>
            <View style={styles.headerTitleWrap}>
              <View style={styles.titleRow}>
                <Text style={styles.headerTitle} numberOfLines={1}>Cool Breeze AC Services</Text>
                <Ionicons name="checkmark-circle" size={16} color="#3DD17F" />
              </View>
              <View style={styles.onlineRow}>
                <View style={styles.onlineMini} />
                <Text style={styles.headerSubtitle}>Online</Text>
              </View>
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
        <Text style={styles.sectionTitle}>Overview</Text>

        {/* Rating summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryLeft}>
            <Text style={styles.overallLabel}>Overall Rating</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.ratingBig}>4.7</Text>
              <Ionicons name="star" size={26} color={Colors.star} />
            </View>
            <PurpleStars rating={4.5} />
            <Text style={styles.fromText}>from 1,248 reviews</Text>
          </View>
          <View style={styles.summaryRight}>
            {BARS.map((b) => (
              <View key={b.star} style={styles.barRow}>
                <Text style={styles.barStarNum}>{b.star}</Text>
                <Ionicons name="star" size={11} color={Colors.brand} />
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${b.pct}%` }]} />
                </View>
                <Text style={styles.barPct}>{b.pct}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Stat cards */}
        <View style={styles.statRow}>
          {STATS.map((s) => (
            <View key={s.id} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: s.bg }]}>
                <MaterialCommunityIcons name={s.icon as any} size={18} color={s.color} />
              </View>
              <Text style={styles.statCount}>{s.count}</Text>
              <Text style={[styles.statLabel, { color: s.color }]}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Recent reviews */}
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Recent Reviews</Text>
          <Pressable style={styles.linkRow} onPress={() => {}}>
            <Text style={styles.link}>View All Reviews</Text>
            <Ionicons name="chevron-forward" size={15} color={Colors.brandText} />
          </Pressable>
        </View>

        {REVIEWS.map((r) => (
          <ReviewCard key={r.id} r={r} />
        ))}
      </ScrollView>

      {/* Add review */}
      <SafeAreaView edges={["bottom"]} style={styles.bottomSafe}>
        <Pressable style={({ pressed }) => [styles.addBtn, pressed && { opacity: 0.9 }]} onPress={() => {}}>
          <Text style={styles.addBtnText}>Add Review</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },

  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 12, gap: 10 },
  avatarWrap: { width: 40, height: 40 },
  headerAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#1B1530", alignItems: "center", justifyContent: "center" },
  onlineDot: { position: "absolute", right: 0, bottom: 0, width: 11, height: 11, borderRadius: 6, backgroundColor: "#3DD17F", borderWidth: 2, borderColor: Colors.headerTop },
  headerTitleWrap: { flex: 1 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  headerTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", flexShrink: 1 },
  onlineRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 1 },
  onlineMini: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#3DD17F" },
  headerSubtitle: { color: "rgba(255,255,255,0.8)", fontSize: 12 },

  tabBar: { flexDirection: "row", backgroundColor: Colors.background, paddingHorizontal: 10, paddingVertical: 10, gap: 6, borderBottomWidth: 1, borderBottomColor: Colors.cardBorder },
  tab: { flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: "center" },
  tabActive: { backgroundColor: Colors.tabActiveBg },
  tabText: { fontSize: 13, color: Colors.tabInactive, fontWeight: "600" },
  tabTextActive: { color: Colors.brandText, fontWeight: "700" },

  scroll: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { padding: 16, paddingBottom: 24 },

  sectionTitle: { fontSize: 18, fontWeight: "800", color: Colors.title },
  sectionHead: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 22, marginBottom: 12 },
  linkRow: { flexDirection: "row", alignItems: "center", gap: 2 },
  link: { color: Colors.brandText, fontWeight: "700", fontSize: 13 },

  summaryCard: { flexDirection: "row", backgroundColor: Colors.panel, borderRadius: 16, padding: 18, marginTop: 12 },
  summaryLeft: { width: 130, justifyContent: "center" },
  overallLabel: { fontSize: 13, color: Colors.body },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 6, marginVertical: 4 },
  ratingBig: { fontSize: 44, fontWeight: "900", color: Colors.title },
  fromText: { fontSize: 12, color: Colors.meta, marginTop: 8 },
  summaryRight: { flex: 1, justifyContent: "center", paddingLeft: 8 },
  barRow: { flexDirection: "row", alignItems: "center", gap: 5, marginVertical: 3 },
  barStarNum: { fontSize: 12, color: Colors.body, width: 10, textAlign: "right" },
  barTrack: { flex: 1, height: 7, borderRadius: 4, backgroundColor: Colors.barTrack, overflow: "hidden", marginHorizontal: 4 },
  barFill: { height: 7, borderRadius: 4, backgroundColor: Colors.brand },
  barPct: { fontSize: 12, color: Colors.body, width: 34, textAlign: "right" },

  statRow: { flexDirection: "row", gap: 8, marginTop: 14 },
  statCard: { flex: 1, backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.cardBorder, borderRadius: 12, paddingVertical: 12, alignItems: "center" },
  statIcon: { width: 30, height: 30, borderRadius: 15, alignItems: "center", justifyContent: "center", marginBottom: 6 },
  statCount: { fontSize: 16, fontWeight: "800", color: Colors.title },
  statLabel: { fontSize: 11, fontWeight: "700", marginTop: 2 },

  reviewCard: { backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.cardBorder, borderRadius: 14, padding: 14, marginBottom: 12 },
  reviewTop: { flexDirection: "row", alignItems: "flex-start" },
  avatar: { width: 42, height: 42, borderRadius: 21, alignItems: "center", justifyContent: "center", marginRight: 12 },
  avatarText: { color: "#FFFFFF", fontWeight: "800", fontSize: 14 },
  reviewHeadText: { flex: 1 },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  reviewName: { fontSize: 15, fontWeight: "800", color: Colors.title },
  verifiedChip: { backgroundColor: "#EEEBFA", borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2 },
  verifiedText: { color: Colors.brandText, fontSize: 10.5, fontWeight: "700" },
  starsRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  ago: { fontSize: 12, color: Colors.meta },
  sentimentChip: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  sentimentText: { fontSize: 11.5, fontWeight: "700" },
  reviewText: { fontSize: 13.5, color: Colors.body, marginTop: 10, lineHeight: 19 },
  reviewActions: { flexDirection: "row", gap: 18, marginTop: 12 },
  actionItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  actionCount: { fontSize: 12.5, color: Colors.meta, fontWeight: "600" },

  bottomSafe: { backgroundColor: Colors.background, borderTopWidth: 1, borderTopColor: Colors.cardBorder, paddingHorizontal: 16, paddingTop: 10 },
  addBtn: { backgroundColor: Colors.brand, borderRadius: 14, paddingVertical: 16, alignItems: "center", marginBottom: 6 },
  addBtnText: { color: "#FFFFFF", fontWeight: "800", fontSize: 16 },
});
