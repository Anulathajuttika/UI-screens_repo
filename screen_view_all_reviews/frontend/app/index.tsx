import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

/** View All Reviews screen — reverse-engineered from view_all_reviews.pdf. Self-contained. */

const Colors = {
  headerTop: "#6E52C7",
  headerBottom: "#5B3FB5",
  brand: "#5B3FB5",
  brandText: "#4B2FA8",
  background: "#FFFFFF",
  card: "#FFFFFF",
  cardBorder: "#ECECF2",
  inputBg: "#FFFFFF",
  title: "#1C1B2E",
  body: "#444452",
  meta: "#9A9AA5",
  star: "#F5A623",
  starEmpty: "#D8D8E0",
};

function Stars({ rating, size = 15 }: { rating: number; size?: number }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((i) => {
        const name = rating >= i ? "star" : rating >= i - 0.5 ? "star-half" : "star-outline";
        return <Ionicons key={i} name={name as any} size={size} color={rating >= i - 0.5 ? Colors.star : Colors.starEmpty} />;
      })}
    </View>
  );
}

type Review = {
  id: string;
  name: string;
  avatar: any;
  rating: number;
  text: string;
  date: string;
  likes: number;
};

const REVIEWS: Review[] = [
  { id: "1", name: "Suresh Yadav", avatar: require("../assets/images/avatars/suresh.png"), rating: 5, text: "Excellent service! Technician was very professional and fixed the issue quickly.", date: "24 May, 2025", likes: 12 },
  { id: "2", name: "Anita Sharma", avatar: require("../assets/images/avatars/anita.png"), rating: 5, text: "Good experience. On-time service and polite behaviour.", date: "23 May, 2025", likes: 8 },
  { id: "3", name: "Rohit Mehta", avatar: require("../assets/images/avatars/rohit.png"), rating: 5, text: "Very professional team. Clean installation and good support.", date: "22 May, 2025", likes: 7 },
  { id: "4", name: "Priya Verma", avatar: require("../assets/images/avatars/priya.png"), rating: 4.5, text: "Quick response and affordable pricing. Highly recommended!", date: "21 May, 2025", likes: 5 },
  { id: "5", name: "Vikram Singh", avatar: require("../assets/images/avatars/vikram.png"), rating: 4, text: "Technician was knowledgeable and explained everything clearly. Great service!", date: "20 May, 2025", likes: 4 },
  { id: "6", name: "Neha Kapoor", avatar: require("../assets/images/avatars/neha.png"), rating: 5, text: "Very satisfied with the AC repair. Cooling is working perfectly now.", date: "19 May, 2025", likes: 3 },
  { id: "7", name: "Arjun Patel", avatar: require("../assets/images/avatars/arjun.png"), rating: 4, text: "Service was good but the technician arrived a bit late.", date: "18 May, 2025", likes: 2 },
  { id: "8", name: "Ritika Arora", avatar: require("../assets/images/avatars/ritika.png"), rating: 5, text: "Amazing experience! Very polite staff and great service.", date: "17 May, 2025", likes: 3 },
];

function ReviewCard({ r }: { r: Review }) {
  return (
    <View style={styles.card} testID={`review-${r.id}`}>
      <View style={styles.cardTop}>
        <Image source={r.avatar} style={styles.avatar} resizeMode="cover" />
        <View style={styles.cardHeadText}>
          <Text style={styles.name}>{r.name}</Text>
          <View style={styles.starsRow}>
            <Stars rating={r.rating} />
          </View>
          <Text style={styles.reviewText}>{r.text}</Text>
        </View>
        <View style={styles.cardHeadRight}>
          <Text style={styles.date}>{r.date}</Text>
          <Ionicons name="ellipsis-vertical" size={16} color={Colors.meta} />
        </View>
      </View>
      <View style={styles.cardBottom}>
        <View style={styles.likeRow}>
          <Ionicons name="thumbs-up-outline" size={16} color={Colors.brand} />
          <Text style={styles.likeCount}>{r.likes}</Text>
        </View>
        <Pressable onPress={() => {}}>
          <Text style={styles.reply}>Reply</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function ViewAllReviewsScreen() {
  const [query, setQuery] = useState("");

  return (
    <View style={styles.root} testID="view-all-reviews-screen">
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

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>All Reviews (128)</Text>
        <Text style={styles.subtitle}>Ratings and reviews from our customers</Text>

        {/* Search */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={Colors.meta} />
          <TextInput
            testID="search-reviews"
            value={query}
            onChangeText={setQuery}
            placeholder="Search reviews"
            placeholderTextColor={Colors.meta}
            style={styles.searchInput}
          />
        </View>

        {/* Filter row */}
        <View style={styles.filterRow}>
          <Pressable style={styles.filterBtn} onPress={() => {}}>
            <Ionicons name="filter" size={16} color={Colors.brand} />
            <Text style={styles.filterText}>Filter</Text>
          </Pressable>
          <Pressable style={styles.sortBtn} onPress={() => {}}>
            <Text style={styles.sortText}>Latest</Text>
            <Ionicons name="chevron-down" size={16} color={Colors.body} />
          </Pressable>
        </View>

        {REVIEWS.map((r) => (
          <ReviewCard key={r.id} r={r} />
        ))}
      </ScrollView>

      {/* Add Review */}
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

  scroll: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { padding: 16, paddingBottom: 24 },

  title: { fontSize: 22, fontWeight: "900", color: Colors.title },
  subtitle: { fontSize: 13, color: Colors.body, marginTop: 4 },

  searchBar: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: Colors.inputBg, borderWidth: 1, borderColor: Colors.cardBorder, borderRadius: 12, paddingHorizontal: 14, height: 48, marginTop: 16 },
  searchInput: { flex: 1, fontSize: 14, color: Colors.title, padding: 0 },

  filterRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 14, marginBottom: 6 },
  filterBtn: { flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1, borderColor: Colors.cardBorder, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 9 },
  filterText: { color: Colors.brand, fontWeight: "700", fontSize: 13 },
  sortBtn: { flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1, borderColor: Colors.cardBorder, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 9 },
  sortText: { color: Colors.body, fontWeight: "700", fontSize: 13 },

  card: { backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.cardBorder, borderRadius: 14, padding: 14, marginTop: 12 },
  cardTop: { flexDirection: "row", alignItems: "flex-start" },
  avatar: { width: 42, height: 42, borderRadius: 21, alignItems: "center", justifyContent: "center", marginRight: 12 },
  avatarText: { color: "#FFFFFF", fontWeight: "800", fontSize: 14 },
  cardHeadText: { flex: 1 },
  name: { fontSize: 15, fontWeight: "800", color: Colors.title },
  starsRow: { marginTop: 3 },
  reviewText: { fontSize: 13, color: Colors.body, marginTop: 6, lineHeight: 19 },
  cardHeadRight: { alignItems: "flex-end", gap: 8, marginLeft: 6 },
  date: { fontSize: 11.5, color: Colors.meta },
  cardBottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 },
  likeRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  likeCount: { fontSize: 12.5, color: Colors.brand, fontWeight: "700" },
  reply: { fontSize: 13, color: Colors.brandText, fontWeight: "700" },

  bottomSafe: { backgroundColor: Colors.background, borderTopWidth: 1, borderTopColor: Colors.cardBorder, paddingHorizontal: 16, paddingTop: 10 },
  addBtn: { backgroundColor: Colors.brand, borderRadius: 14, paddingVertical: 16, alignItems: "center", marginBottom: 6 },
  addBtnText: { color: "#FFFFFF", fontWeight: "800", fontSize: 16 },
});
