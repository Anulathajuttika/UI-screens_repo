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
import { Ionicons } from "@expo/vector-icons";

/** Search results screen — reverse-engineered from REF_search-1.png. Self-contained, white theme. */

const Colors = {
  brand: "#5B3CC4",
  background: "#FFFFFF",
  pageTint: "#F4F4F7",
  card: "#FFFFFF",
  cardBorder: "#ECECF2",
  inputBg: "#F2F1F7",
  title: "#1C1B2E",
  body: "#6E6E7A",
  meta: "#9A9AA5",
  star: "#F5A623",
  green: "#2AA457",
  lavender: "#EFEBFA",
  chipBorder: "#E2E2EA",
};

type Business = {
  id: string;
  name: string;
  logo: any;
  verified: boolean;
  rating: number;
  reviews: number;
  services: string;
  hours: string;
  online: boolean;
  distance: string;
};

const BUSINESSES: Business[] = [
  {
    id: "1",
    name: "Cool Breeze AC Services",
    logo: require("../assets/images/logos/coolbreeze.png"),
    verified: true,
    rating: 4.2,
    reviews: 128,
    services: "AC Repair & Installation, Gas Filling, Maintenance, AMC",
    hours: "10:00 AM - 9:00 PM (Mon-Sun)",
    online: true,
    distance: "1 km",
  },
  {
    id: "2",
    name: "AC Technicians Hyderabad",
    logo: require("../assets/images/logos/actech.png"),
    verified: true,
    rating: 3.6,
    reviews: 161,
    services: "AC Repair & Installation, Maintenance, Duct Cleaning, AMC",
    hours: "9:00 AM - 10:00 PM (Mon-Sat)",
    online: true,
    distance: "1.2 km",
  },
  {
    id: "3",
    name: "Doctor AC",
    logo: require("../assets/images/logos/doctorac.png"),
    verified: true,
    rating: 3.8,
    reviews: 151,
    services: "AC Repair & Installation, Gas Filling, Maintenance, AMC",
    hours: "9:00 AM - 10:00 PM (Mon-Sat)",
    online: true,
    distance: "1.2 km",
  },
  {
    id: "4",
    name: "Fresh Cool AC Solutions",
    logo: require("../assets/images/logos/freshcool.png"),
    verified: false,
    rating: 4.0,
    reviews: 98,
    services: "Installation, Uninstallation, Gas Filling, AMC, Jet Service",
    hours: "8:00 AM - 8:00 PM (Mon-Sun)",
    online: false,
    distance: "1.8 km",
  },
  {
    id: "5",
    name: "AR AC Care",
    logo: require("../assets/images/logos/arcare.png"),
    verified: false,
    rating: 4.1,
    reviews: 76,
    services: "AC Repair, Maintenance, Gas Filling, AMC, Duct Cleaning",
    hours: "10:00 AM - 8:00 PM (Mon-Sat)",
    online: true,
    distance: "2.1 km",
  },
];

function Chip({
  label,
  icon,
  selected,
  faded,
  testID,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  selected?: boolean;
  faded?: boolean;
  testID: string;
}) {
  const tint = selected ? Colors.brand : faded ? Colors.meta : Colors.body;
  return (
    <Pressable
      testID={testID}
      onPress={() => {}}
      style={[styles.chip, selected ? styles.chipSelected : null]}
    >
      <Ionicons name={icon} size={15} color={tint} />
      <Text style={[styles.chipText, { color: tint }]}>{label}</Text>
    </Pressable>
  );
}

function ResultCard({ b }: { b: Business }) {
  return (
    <View style={styles.card} testID={`result-${b.id}`}>
      <View style={styles.cardTop}>
        <Image source={b.logo} style={styles.logo} resizeMode="cover" />

        <View style={styles.cardMain}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {b.name}
            </Text>
            {b.verified ? (
              <Ionicons name="checkmark-circle" size={15} color={Colors.brand} />
            ) : null}
          </View>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={13} color={Colors.star} />
            <Text style={styles.ratingText}>{b.rating.toFixed(1)}</Text>
            <Text style={styles.reviewsText}>({b.reviews} reviews)</Text>
          </View>

          <Text style={styles.services} numberOfLines={2}>
            {b.services}
          </Text>

          <View style={styles.hoursRow}>
            <Ionicons name="time-outline" size={13} color={Colors.meta} />
            <Text style={styles.hoursText}>{b.hours}</Text>
          </View>
        </View>

        <View style={styles.cardRight}>
          <Text style={[styles.status, { color: b.online ? Colors.green : Colors.meta }]}>
            {b.online ? "Online" : "Offline"}
          </Text>
          <Text style={styles.distance}>{b.distance}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable testID={`chat-${b.id}`} onPress={() => {}} style={styles.chatBtn}>
          <Ionicons name="chatbubble-outline" size={15} color={Colors.brand} />
          <Text style={styles.chatText}>Chat</Text>
        </Pressable>
        <Pressable testID={`call-${b.id}`} onPress={() => {}} style={styles.callBtn}>
          <Ionicons name="call" size={15} color="#FFFFFF" />
          <Text style={styles.callText}>Call</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function SearchScreen() {
  const [query, setQuery] = useState("AC Repair services near me");

  return (
    <View style={styles.root} testID="search-screen">
      <StatusBar barStyle="dark-content" backgroundColor={Colors.pageTint} />

      <SafeAreaView edges={["top"]} style={styles.topSafe}>

        {/* Header: back + search bar */}
        <View style={styles.header}>
          <Pressable testID="back-button" hitSlop={12} onPress={() => {}}>
            <Ionicons name="arrow-back" size={24} color={Colors.title} />
          </Pressable>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={Colors.meta} />
            <TextInput
              testID="search-input"
              value={query}
              onChangeText={setQuery}
              placeholder="Search"
              placeholderTextColor={Colors.meta}
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Filter chips */}
        <View style={styles.chipsRow}>
          <Chip testID="chip-videos" label="Videos" icon="videocam-outline" />
          <Chip testID="chip-services" label="Services" icon="settings-outline" selected />
          <Chip testID="chip-links" label="Links" icon="link-outline" faded />
          <View style={styles.chipsSpacer} />
          <Pressable testID="calendar-button" onPress={() => {}} style={styles.calendarBtn}>
            <Ionicons name="calendar-outline" size={18} color={Colors.body} />
          </Pressable>
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleRow}>
          <Text style={styles.title}>AC Services Near You</Text>
          <Text style={styles.location}>Hyderabad, telangana</Text>
        </View>
        <Text style={styles.resultsCount}>25 results found</Text>

        {BUSINESSES.map((b) => (
          <ResultCard key={b.id} b={b} />
        ))}
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={styles.bottomSafe}>
        <Pressable
          testID="view-map-button"
          style={({ pressed }) => [styles.mapBtn, pressed && { opacity: 0.9 }]}
          onPress={() => {}}
        >
          <Ionicons name="location-outline" size={18} color="#FFFFFF" />
          <Text style={styles.mapBtnText}>View on Map</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.pageTint },
  topSafe: { backgroundColor: Colors.pageTint },


  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 6,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 44,
  },
  searchInput: { flex: 1, fontSize: 14, color: Colors.title, padding: 0 },

  chipsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 10,
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: Colors.chipBorder,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  chipSelected: { borderColor: Colors.brand, backgroundColor: Colors.lavender },
  chipText: { fontSize: 13, fontWeight: "600" },
  chipsSpacer: { flex: 1 },
  calendarBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.chipBorder,
    alignItems: "center",
    justifyContent: "center",
  },

  scroll: { flex: 1, backgroundColor: Colors.pageTint },
  scrollContent: { paddingHorizontal: 14, paddingBottom: 24, paddingTop: 6 },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  title: { fontSize: 17, fontWeight: "800", color: Colors.title, flexShrink: 1 },
  location: { fontSize: 12.5, color: Colors.meta, marginLeft: 8 },
  resultsCount: { fontSize: 12, color: Colors.meta, marginTop: 3, marginBottom: 6 },

  card: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: 18,
    padding: 12,
    marginTop: 10,
    shadowColor: "#1C1B2E",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardTop: { flexDirection: "row", alignItems: "flex-start" },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
    backgroundColor: "#FFFFFF",
  },
  cardMain: { flex: 1 },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  name: { fontSize: 14.5, fontWeight: "800", color: Colors.title, flexShrink: 1 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 3 },
  ratingText: { fontSize: 12.5, fontWeight: "700", color: Colors.title },
  reviewsText: { fontSize: 12, color: Colors.meta },
  services: { fontSize: 12, color: Colors.body, marginTop: 5, lineHeight: 17 },
  hoursRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 6 },
  hoursText: { fontSize: 11.5, color: Colors.meta },
  cardRight: { alignItems: "flex-end", marginLeft: 6 },
  status: { fontSize: 11.5, fontWeight: "700" },
  distance: { fontSize: 11.5, color: Colors.meta, marginTop: 4 },

  actions: { flexDirection: "row", justifyContent: "flex-end", gap: 8, marginTop: 10 },
  chatBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: Colors.brand,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  chatText: { color: Colors.brand, fontWeight: "700", fontSize: 12.5 },
  callBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: Colors.brand,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  callText: { color: "#FFFFFF", fontWeight: "700", fontSize: 12.5 },

  bottomSafe: {
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  mapBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.brand,
    borderRadius: 16,
    paddingVertical: 15,
    marginBottom: 6,
  },
  mapBtnText: { color: "#FFFFFF", fontWeight: "800", fontSize: 16 },
});
