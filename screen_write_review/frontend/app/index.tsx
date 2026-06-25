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

/** Write Review — self-contained screen. No external src imports. */

const Colors = {
  headerTop: "#7C5FCC",
  headerBottom: "#6A4DBB",
  primary: "#6A4DBB",
  star: "#6A4DBB",
  starEmpty: "#D8D3EA",
  banner: "#F1ECFB",
  page: "#FFFFFF",
  cardBorder: "#ECECF2",
  title: "#1C1B2E",
  body: "#5A5A6A",
  meta: "#9A9AA5",
  green: "#2AA457",
  greenBg: "#E7F7EA",
  indigoTint: "#F1ECFB",
};

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

type QuickTag = {
  id: string;
  label: string;
  icon: IoniconName;
};

const QUICK_TAGS: QuickTag[] = [
  { id: "on-time", label: "On Time", icon: "time-outline" },
  { id: "professional", label: "Professional", icon: "ribbon-outline" },
  { id: "friendly", label: "Friendly", icon: "happy-outline" },
  { id: "good-quality", label: "Good Quality", icon: "star-outline" },
  { id: "affordable", label: "Affordable", icon: "cash-outline" },
  { id: "recommended", label: "Recommended", icon: "thumbs-up-outline" },
  { id: "clean-work", label: "Clean Work", icon: "sparkles-outline" },
  { id: "fast-service", label: "Fast Service", icon: "flash-outline" },
];

function InfoBanner() {
  return (
    <View style={styles.banner} testID="info-banner">
      <View style={styles.bannerIcon}>
        <Ionicons name="chatbubbles-outline" size={22} color={Colors.primary} />
      </View>
      <View style={styles.bannerTextWrap}>
        <Text style={styles.bannerTitle}>
          Help others by sharing your experience
        </Text>
        <Text style={styles.bannerBody}>
          Your feedback helps us improve and helps others to choose better.
        </Text>
      </View>
    </View>
  );
}

function TicketCard() {
  return (
    <View style={styles.card} testID="ticket-card">
      <View style={styles.iconTile}>
        <MaterialCommunityIcons
          name="air-conditioner"
          size={26}
          color={Colors.primary}
        />
      </View>
      <View style={styles.ticketInfo}>
        <Text style={styles.ticketTitle}>AC Not Cooling</Text>
        <Text style={styles.ticketLine}>Ticket ID: AC-25874</Text>
        <Text style={styles.ticketLine}>Technician: Ramesh Kumar</Text>
        <Text style={styles.ticketLine}>Company: Cool Breeze AC Services</Text>
      </View>
      <View style={styles.utilityTag}>
        <Text style={styles.utilityTagText}>UTILITY</Text>
      </View>
    </View>
  );
}

function StarRating({
  rating,
  onRate,
}: {
  rating: number;
  onRate: (value: number) => void;
}) {
  return (
    <View style={styles.starRow} testID="star-rating">
      {[1, 2, 3, 4, 5].map((value) => {
        const filled = value <= rating;
        return (
          <Pressable
            key={value}
            testID={`star-${value}`}
            hitSlop={6}
            onPress={() => onRate(value)}
            style={({ pressed }) => [styles.starHit, pressed && styles.pressed]}
          >
            <Ionicons
              name={filled ? "star" : "star-outline"}
              size={36}
              color={filled ? Colors.star : Colors.starEmpty}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

export default function WriteReviewScreen() {
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [comments, setComments] = useState("");

  const toggleTag = (id: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <View style={styles.root} testID="write-review-screen">
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
              <Text style={styles.headerTitle}>Write Review</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Body */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        testID="review-scroll"
      >
        <InfoBanner />

        <TicketCard />

        {/* Overall Rating */}
        <Text style={styles.sectionTitle}>Overall Rating</Text>
        <StarRating rating={rating} onRate={setRating} />
        <Text style={styles.rateCaption}>Tap to rate</Text>

        {/* Quick Tags */}
        <Text style={styles.sectionTitle}>
          Quick Tags{" "}
          <Text style={styles.sectionTitleHint}>(Select all that apply)</Text>
        </Text>
        <View style={styles.tagWrap} testID="quick-tags">
          {QUICK_TAGS.map((tag) => {
            const selected = selectedTags.has(tag.id);
            return (
              <Pressable
                key={tag.id}
                testID={`tag-${tag.id}`}
                onPress={() => toggleTag(tag.id)}
                style={({ pressed }) => [
                  styles.tag,
                  selected && styles.tagSelected,
                  pressed && styles.pressed,
                ]}
              >
                <Ionicons
                  name={tag.icon}
                  size={15}
                  color={selected ? Colors.primary : Colors.body}
                />
                <Text
                  style={[styles.tagText, selected && styles.tagTextSelected]}
                >
                  {tag.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Comments */}
        <Text style={styles.sectionTitle}>
          Comments{" "}
          <Text style={styles.sectionTitleHint}>(Optional)</Text>
        </Text>
        <TextInput
          testID="comments-input"
          style={styles.commentInput}
          value={comments}
          onChangeText={setComments}
          placeholder="Tell us about your experience…"
          placeholderTextColor={Colors.meta}
          multiline
          textAlignVertical="top"
        />

        {/* Add Photos */}
        <Text style={styles.sectionTitle}>
          Add Photos{" "}
          <Text style={styles.sectionTitleHint}>(Optional)</Text>
        </Text>
        <View style={styles.photoRow}>
          <Pressable
            testID="upload-photos"
            onPress={() => {}}
            style={({ pressed }) => [styles.uploadCard, pressed && styles.pressed]}
          >
            <Ionicons name="camera-outline" size={24} color={Colors.primary} />
            <View style={styles.uploadTextWrap}>
              <Text style={styles.uploadTitle}>Upload Photos</Text>
              <Text style={styles.uploadHint}>You can add up to 5 photos</Text>
            </View>
          </Pressable>
          <Pressable
            testID="add-photo"
            onPress={() => {}}
            style={({ pressed }) => [styles.addSquare, pressed && styles.pressed]}
          >
            <Ionicons name="add" size={28} color={Colors.meta} />
          </Pressable>
        </View>

        {/* Actions */}
        <Pressable
          testID="next-button"
          onPress={() => {}}
          style={({ pressed }) => [styles.nextBtn, pressed && styles.pressed]}
        >
          <Text style={styles.nextBtnText}>Next</Text>
        </Pressable>

        <Pressable
          testID="skip-button"
          hitSlop={8}
          onPress={() => {}}
          style={({ pressed }) => [styles.skipBtn, pressed && styles.pressed]}
        >
          <Text style={styles.skipBtnText}>Skip for Now</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

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
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  scroll: { flex: 1, backgroundColor: Colors.page },
  scrollContent: { padding: 16, paddingBottom: 36 },

  banner: {
    flexDirection: "row",
    backgroundColor: Colors.banner,
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },
  bannerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerTextWrap: { flex: 1 },
  bannerTitle: { fontSize: 14.5, fontWeight: "700", color: Colors.title },
  bannerBody: {
    fontSize: 12.5,
    color: Colors.body,
    lineHeight: 18,
    marginTop: 3,
  },

  card: {
    flexDirection: "row",
    backgroundColor: Colors.page,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 14,
    marginTop: 16,
    gap: 12,
    shadowColor: "#1C1B2E",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  iconTile: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.indigoTint,
    alignItems: "center",
    justifyContent: "center",
  },
  ticketInfo: { flex: 1 },
  ticketTitle: {
    fontSize: 15.5,
    fontWeight: "700",
    color: Colors.title,
    marginBottom: 4,
  },
  ticketLine: { fontSize: 12.5, color: Colors.body, lineHeight: 19 },
  utilityTag: {
    alignSelf: "flex-start",
    backgroundColor: Colors.greenBg,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  utilityTagText: {
    fontSize: 10.5,
    fontWeight: "700",
    color: Colors.green,
    letterSpacing: 0.5,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.title,
    marginTop: 22,
    marginBottom: 12,
  },
  sectionTitleHint: { fontSize: 12.5, fontWeight: "400", color: Colors.meta },

  starRow: { flexDirection: "row", gap: 10, alignSelf: "center" },
  starHit: { padding: 2 },
  rateCaption: {
    textAlign: "center",
    fontSize: 12.5,
    color: Colors.meta,
    marginTop: 8,
  },

  tagWrap: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: "#FFFFFF",
  },
  tagSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.indigoTint,
  },
  tagText: { fontSize: 13, fontWeight: "600", color: Colors.body },
  tagTextSelected: { color: Colors.primary },

  commentInput: {
    minHeight: 96,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: 14,
    padding: 14,
    fontSize: 14,
    color: Colors.title,
    backgroundColor: "#FFFFFF",
  },

  photoRow: { flexDirection: "row", gap: 12 },
  uploadCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    borderStyle: "dashed",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  uploadTextWrap: { flex: 1 },
  uploadTitle: { fontSize: 13.5, fontWeight: "700", color: Colors.title },
  uploadHint: { fontSize: 11.5, color: Colors.meta, marginTop: 2 },
  addSquare: {
    width: 72,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    borderStyle: "dashed",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  nextBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 26,
    shadowColor: "#1C1B2E",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  nextBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  skipBtn: { alignItems: "center", paddingVertical: 16, marginTop: 4 },
  skipBtnText: { color: Colors.primary, fontSize: 14.5, fontWeight: "600" },
});
