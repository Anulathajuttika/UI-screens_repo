import React from "react";
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
import { Ionicons } from "@expo/vector-icons";

/** Review Details screen — reverse-engineered from view_details.pdf. Self-contained. */

const Colors = {
  headerTop: "#7C5FCC",
  headerBottom: "#6A4DBB",
  brand: "#6A4DBB",
  brandText: "#6A4DBB",
  background: "#FFFFFF",
  cardBorder: "#ECECF2",
  divider: "#EDEDF3",
  title: "#1C1B2E",
  body: "#3A3A45",
  meta: "#8A8A95",
  star: "#F5A623",
  photoBg: "#E9E7F5",
  photoTile: "#EDEAFB",
};

function BigStars({ rating, size = 30 }: { rating: number; size?: number }) {
  return (
    <View style={{ flexDirection: "row", gap: 6 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Ionicons key={i} name={rating >= i ? "star" : "star-outline"} size={size} color={Colors.star} />
      ))}
    </View>
  );
}

function RowStars({ rating, size = 18 }: { rating: number; size?: number }) {
  return (
    <View style={{ flexDirection: "row", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Ionicons key={i} name={rating >= i ? "star" : "star-outline"} size={size} color={Colors.star} />
      ))}
    </View>
  );
}

const RATINGS = [
  { label: "Punctuality", value: 5 },
  { label: "Quality of Work", value: 5 },
  { label: "Behaviour", value: 5 },
  { label: "Cleanliness", value: 5 },
  { label: "Value for Money", value: 5 },
];

const VD_PHOTOS = [
  require("../assets/images/vd1.png"),
  require("../assets/images/vd2.png"),
];

export default function ReviewDetailsScreen() {
  return (
    <View style={styles.root} testID="review-details-screen">
      <StatusBar barStyle="light-content" backgroundColor={Colors.headerTop} />

      {/* Header */}
      <LinearGradient colors={[Colors.headerTop, Colors.headerBottom]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
        <SafeAreaView edges={["top"]}>
          <View style={styles.header}>
            <Pressable hitSlop={12} onPress={() => {}}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.headerTitle}>Review Details</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile */}
        <View style={styles.profileRow}>
          <Image source={require("../assets/images/avatars/suresh.png")} style={styles.avatar} resizeMode="cover" />
          <View style={styles.profileText}>
            <Text style={styles.name}>Suresh Yadav</Text>
            <Text style={styles.meta}>AC-25874 • AC Not Cooling</Text>
            <Text style={styles.meta}>24 May, 2025 • 12:05 PM</Text>
          </View>
        </View>

        <View style={styles.starsWrap}>
          <BigStars rating={5} />
        </View>

        <Text style={styles.reviewText}>
          Excellent service! Technician was very professional and fixed the issue
          quickly. Explained the problem clearly.
        </Text>

        <View style={styles.divider} />

        {/* Service Rating */}
        <Text style={styles.sectionTitle}>Service Rating</Text>
        {RATINGS.map((r) => (
          <View key={r.label} style={styles.ratingRow}>
            <Text style={styles.ratingLabel}>{r.label}</Text>
            <RowStars rating={r.value} />
          </View>
        ))}

        <View style={styles.divider} />

        {/* Photos */}
        <Text style={styles.sectionTitle}>Photos</Text>
        <View style={styles.photoRow}>
          {VD_PHOTOS.map((src, i) => (
            <View key={i} style={styles.photo}>
              <Image source={src} style={styles.photoImg} resizeMode="cover" />
            </View>
          ))}
          <View style={styles.photoMore}>
            <Text style={styles.photoMoreText}>+2</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom actions */}
      <SafeAreaView edges={["bottom"]} style={styles.bottomSafe}>
        <View style={styles.bottomBar}>
          <Pressable style={({ pressed }) => [styles.outlineBtn, pressed && { opacity: 0.85 }]} onPress={() => {}}>
            <Ionicons name="thumbs-up-outline" size={18} color={Colors.brand} />
            <Text style={styles.outlineBtnText}>Helpful (12)</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.outlineBtn, pressed && { opacity: 0.85 }]} onPress={() => {}}>
            <Ionicons name="chatbubble-outline" size={18} color={Colors.brand} />
            <Text style={styles.outlineBtnText}>Reply</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },

  header: { flexDirection: "row", alignItems: "center", gap: 16, paddingHorizontal: 16, paddingVertical: 14 },
  headerTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "700" },

  scroll: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { padding: 20, paddingBottom: 24 },

  profileRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#3D7DE0", alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#FFFFFF", fontWeight: "800", fontSize: 20 },
  profileText: { flex: 1 },
  name: { fontSize: 20, fontWeight: "800", color: Colors.title },
  meta: { fontSize: 13.5, color: Colors.meta, marginTop: 4 },

  starsWrap: { marginTop: 20 },
  reviewText: { fontSize: 17, color: Colors.body, lineHeight: 28, marginTop: 18 },

  divider: { height: 1, backgroundColor: Colors.divider, marginVertical: 22 },

  sectionTitle: { fontSize: 17, fontWeight: "800", color: Colors.title, marginBottom: 10 },
  ratingRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 11 },
  ratingLabel: { fontSize: 15.5, color: Colors.body },

  photoRow: { flexDirection: "row", gap: 14, marginTop: 6 },
  photo: { width: 96, height: 96, borderRadius: 12, backgroundColor: Colors.photoBg, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  photoImg: { width: "100%", height: "100%" },
  photoMore: { width: 96, height: 96, borderRadius: 12, backgroundColor: Colors.photoTile, alignItems: "center", justifyContent: "center" },
  photoMoreText: { color: Colors.brand, fontSize: 22, fontWeight: "800" },

  bottomSafe: { backgroundColor: Colors.background, paddingHorizontal: 20, paddingTop: 10 },
  bottomBar: { flexDirection: "row", gap: 14, paddingBottom: 6 },
  outlineBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 12, paddingVertical: 15, borderWidth: 1.5, borderColor: "#D9D2F2", backgroundColor: "#FFFFFF" },
  outlineBtnText: { color: Colors.brand, fontWeight: "700", fontSize: 15 },
});
