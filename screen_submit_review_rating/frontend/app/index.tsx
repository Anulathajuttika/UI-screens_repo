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
import { Ionicons } from "@expo/vector-icons";

/** Rate Experience screen — reverse-engineered from REF_submitrating-1.png. Self-contained. */

const Colors = {
  headerTop: "#6B4CD6",
  headerBottom: "#5B3CC4",
  brand: "#5B3CC4",
  background: "#FFFFFF",
  cardBorder: "#ECECF2",
  title: "#1C1B2E",
  body: "#6E6E7A",
  meta: "#9A9AA5",
  star: "#F5A623",
};

const MAX = 200;

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

const TAGS = [
  "On-time Service",
  "Good Behavior",
  "Expertise",
  "Reasonable Price",
  "Clean Work",
  "Other",
];

function StarRow({
  rating,
  onRate,
  size,
  testIDPrefix,
}: {
  rating: number;
  onRate: (n: number) => void;
  size: number;
  testIDPrefix: string;
}) {
  return (
    <View style={styles.starsRow}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Pressable
          key={i}
          testID={`${testIDPrefix}-${i}`}
          hitSlop={6}
          onPress={() => onRate(i)}
        >
          <Ionicons
            name={rating >= i ? "star" : "star-outline"}
            size={size}
            color={Colors.star}
          />
        </Pressable>
      ))}
    </View>
  );
}

export default function RateExperienceScreen() {
  const [experienceRating, setExperienceRating] = useState(5);
  const [technicianRating, setTechnicianRating] = useState(5);
  const [review, setReview] = useState(
    "Technician was very professional and fixed the issue quickly."
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(["On-time Service"]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <View style={styles.root} testID="rate-experience-screen">
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
            <Pressable testID="menu-button" hitSlop={12} onPress={() => {}}>
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
        {/* Experience */}
        <Text style={styles.experienceTitle}>How was your experience?</Text>
        <View style={styles.centerBlock}>
          <StarRow
            rating={experienceRating}
            onRate={setExperienceRating}
            size={40}
            testIDPrefix="experience-star"
          />
          <Text style={styles.ratingLabel}>
            {RATING_LABELS[experienceRating]}
          </Text>
        </View>

        <Text style={styles.subPrompt}>
          Tell us more about your experience (Optional)
        </Text>

        {/* Textarea */}
        <View style={styles.textAreaWrap}>
          <TextInput
            testID="review-input"
            value={review}
            onChangeText={(t) => t.length <= MAX && setReview(t)}
            multiline
            placeholder="Share your experience..."
            placeholderTextColor={Colors.meta}
            style={styles.textArea}
          />
          <Text style={styles.counter}>
            {review.length}/{MAX}
          </Text>
        </View>

        {/* Rate Technician */}
        <Text style={styles.technicianTitle}>
          Rate Technician (Ramesh Kumar)
        </Text>
        <View style={styles.centerBlock}>
          <StarRow
            rating={technicianRating}
            onRate={setTechnicianRating}
            size={40}
            testIDPrefix="technician-star"
          />
          <Text style={styles.ratingLabel}>
            {RATING_LABELS[technicianRating]}
          </Text>
        </View>

        {/* Tags */}
        <View style={styles.tagsWrap}>
          {TAGS.map((tag) => {
            const selected = selectedTags.includes(tag);
            return (
              <Pressable
                key={tag}
                testID={`tag-${tag.toLowerCase().replace(/\s+/g, "-")}`}
                onPress={() => toggleTag(tag)}
                style={[styles.chip, selected ? styles.chipOn : styles.chipOff]}
              >
                {selected && (
                  <Ionicons
                    name="checkmark"
                    size={14}
                    color={Colors.brand}
                    style={styles.chipIcon}
                  />
                )}
                <Text
                  style={[
                    styles.chipText,
                    selected ? styles.chipTextOn : styles.chipTextOff,
                  ]}
                >
                  {tag}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Submit */}
      <SafeAreaView edges={["bottom"]} style={styles.bottomSafe}>
        <Pressable
          testID="submit-review-button"
          style={({ pressed }) => [styles.submitBtn, pressed && { opacity: 0.9 }]}
          onPress={() => {}}
        >
          <Text style={styles.submitText}>Submit Review</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  scroll: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { padding: 20, paddingBottom: 24 },

  experienceTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.title,
    textAlign: "center",
    marginTop: 6,
  },
  centerBlock: { alignItems: "center", marginTop: 16 },
  starsRow: { flexDirection: "row", gap: 10 },
  ratingLabel: {
    fontSize: 17,
    fontWeight: "800",
    color: Colors.brand,
    marginTop: 12,
  },

  subPrompt: {
    fontSize: 14,
    color: Colors.body,
    textAlign: "center",
    marginTop: 22,
  },

  textAreaWrap: {
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: 20,
    padding: 16,
    marginTop: 12,
    minHeight: 120,
  },
  textArea: {
    fontSize: 15,
    color: Colors.body,
    lineHeight: 24,
    textAlignVertical: "top",
    flex: 1,
    padding: 0,
  },
  counter: { alignSelf: "flex-end", fontSize: 13, color: Colors.meta, marginTop: 8 },

  technicianTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: Colors.title,
    marginTop: 28,
  },

  tagsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 22,
    rowGap: 12,
  },
  chip: {
    width: "31.5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1.5,
    paddingVertical: 11,
    paddingHorizontal: 6,
  },
  chipOn: { borderColor: Colors.brand, backgroundColor: "#FFFFFF" },
  chipOff: { borderColor: Colors.cardBorder, backgroundColor: "#FFFFFF" },
  chipIcon: { marginRight: 4 },
  chipText: { fontSize: 12, fontWeight: "600" },
  chipTextOn: { color: Colors.brand },
  chipTextOff: { color: Colors.body },

  bottomSafe: {
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  submitBtn: {
    backgroundColor: Colors.brand,
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: "center",
    marginBottom: 6,
  },
  submitText: { color: "#FFFFFF", fontWeight: "800", fontSize: 16 },
});
