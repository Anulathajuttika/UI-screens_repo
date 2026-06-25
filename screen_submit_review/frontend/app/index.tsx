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

/** Add Review screen — reverse-engineered from submit_review.pdf. Self-contained. */

const Colors = {
  headerTop: "#6E52C7",
  headerBottom: "#5B3FB5",
  brand: "#4B2FA8",
  background: "#FFFFFF",
  cardBorder: "#E2E2EA",
  title: "#1C1B2E",
  body: "#3A3A45",
  meta: "#9A9AA5",
  star: "#F5A623",
  dashed: "#C9C2E6",
  photoBg: "#EDEAF6",
};

const MAX = 500;

const PHOTOS = [
  require("../assets/images/photo1.png"),
  require("../assets/images/photo2.png"),
];

export default function AddReviewScreen() {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState(
    "Excellent service! Technician was very professional and fixed the issue quickly."
  );
  const [recommend, setRecommend] = useState<"yes" | "no">("yes");
  const [agree, setAgree] = useState(true);

  return (
    <View style={styles.root} testID="add-review-screen">
      <StatusBar barStyle="light-content" backgroundColor={Colors.headerTop} />

      {/* Header */}
      <LinearGradient colors={[Colors.headerTop, Colors.headerBottom]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
        <SafeAreaView edges={["top"]}>
          <View style={styles.header}>
            <Pressable hitSlop={12} onPress={() => {}}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.headerTitle}>Add Review</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Rate */}
        <Text style={styles.sectionTitle}>Rate your experience</Text>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Pressable key={i} testID={`star-${i}`} hitSlop={6} onPress={() => setRating(i)}>
              <Ionicons name={rating >= i ? "star" : "star-outline"} size={42} color={Colors.star} />
            </Pressable>
          ))}
        </View>

        {/* Write review */}
        <Text style={[styles.sectionTitle, { marginTop: 26 }]}>Write your review</Text>
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

        {/* Add photos */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
          Add Photos <Text style={styles.optional}>(Optional)</Text>
        </Text>
        <View style={styles.photoRow}>
          {PHOTOS.map((src, i) => (
            <View key={i} style={styles.photo}>
              <Image source={src} style={styles.photoImg} resizeMode="cover" />
              <Pressable style={styles.removeBtn} onPress={() => {}}>
                <Ionicons name="close" size={13} color="#FFFFFF" />
              </Pressable>
            </View>
          ))}
          <Pressable style={styles.addPhoto} onPress={() => {}}>
            <Ionicons name="add" size={30} color={Colors.brand} />
          </Pressable>
        </View>

        {/* Recommend */}
        <Text style={[styles.sectionTitle, { marginTop: 26 }]}>Would you recommend us?</Text>
        <View style={styles.recommendRow}>
          <Pressable
            testID="recommend-yes"
            onPress={() => setRecommend("yes")}
            style={[styles.recBtn, recommend === "yes" ? styles.recBtnActive : styles.recBtnInactive]}
          >
            <Text style={[styles.recText, recommend === "yes" ? styles.recTextActive : styles.recTextInactive]}>Yes</Text>
          </Pressable>
          <Pressable
            testID="recommend-no"
            onPress={() => setRecommend("no")}
            style={[styles.recBtn, recommend === "no" ? styles.recBtnActive : styles.recBtnInactive]}
          >
            <Text style={[styles.recText, recommend === "no" ? styles.recTextActive : styles.recTextInactive]}>No</Text>
          </Pressable>
        </View>

        {/* Agree */}
        <Pressable style={styles.agreeRow} onPress={() => setAgree((v) => !v)} testID="agree-checkbox">
          <View style={[styles.checkbox, agree && styles.checkboxOn]}>
            {agree && <Ionicons name="checkmark" size={15} color="#FFFFFF" />}
          </View>
          <Text style={styles.agreeText}>I agree that my review can be shared publicly</Text>
        </Pressable>
      </ScrollView>

      {/* Submit */}
      <SafeAreaView edges={["bottom"]} style={styles.bottomSafe}>
        <Pressable style={({ pressed }) => [styles.submitBtn, pressed && { opacity: 0.9 }]} onPress={() => {}}>
          <Text style={styles.submitText}>Submit Review</Text>
        </Pressable>
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

  sectionTitle: { fontSize: 17, fontWeight: "800", color: Colors.title },
  optional: { fontSize: 14, fontWeight: "600", color: Colors.meta },

  starsRow: { flexDirection: "row", gap: 14, marginTop: 16 },

  textAreaWrap: { borderWidth: 1, borderColor: Colors.cardBorder, borderRadius: 12, padding: 14, marginTop: 12, minHeight: 150 },
  textArea: { fontSize: 16, color: Colors.body, lineHeight: 24, textAlignVertical: "top", flex: 1, padding: 0 },
  counter: { alignSelf: "flex-end", fontSize: 13, color: Colors.meta, marginTop: 8 },

  photoRow: { flexDirection: "row", gap: 14, marginTop: 12 },
  photo: { width: 90, height: 90, borderRadius: 12, backgroundColor: Colors.photoBg, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  photoImg: { position: "absolute", width: "100%", height: "100%", borderRadius: 12 },
  removeBtn: { position: "absolute", top: 5, right: 5, width: 22, height: 22, borderRadius: 11, backgroundColor: "rgba(0,0,0,0.45)", alignItems: "center", justifyContent: "center" },
  addPhoto: { width: 90, height: 90, borderRadius: 12, borderWidth: 1.5, borderStyle: "dashed", borderColor: Colors.dashed, alignItems: "center", justifyContent: "center" },

  recommendRow: { flexDirection: "row", gap: 14, marginTop: 14 },
  recBtn: { flex: 1, borderRadius: 28, paddingVertical: 15, alignItems: "center" },
  recBtnActive: { backgroundColor: Colors.brand },
  recBtnInactive: { borderWidth: 1.5, borderColor: Colors.cardBorder, backgroundColor: "#FFFFFF" },
  recText: { fontSize: 16, fontWeight: "700" },
  recTextActive: { color: "#FFFFFF" },
  recTextInactive: { color: Colors.body },

  agreeRow: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 22 },
  checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 1.5, borderColor: Colors.cardBorder, alignItems: "center", justifyContent: "center" },
  checkboxOn: { backgroundColor: Colors.brand, borderColor: Colors.brand },
  agreeText: { flex: 1, fontSize: 15, color: Colors.body },

  bottomSafe: { backgroundColor: Colors.background, paddingHorizontal: 20, paddingTop: 10 },
  submitBtn: { backgroundColor: Colors.brand, borderRadius: 14, paddingVertical: 17, alignItems: "center", marginBottom: 6 },
  submitText: { color: "#FFFFFF", fontWeight: "800", fontSize: 16 },
});
