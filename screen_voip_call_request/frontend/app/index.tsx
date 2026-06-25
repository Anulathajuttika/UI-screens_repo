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

/** VoIP Call Request — Cool Breeze AC Services chat screen. Self-contained, no external src imports. */

const Colors = {
  headerTop: "#6B4CD6",
  headerBottom: "#5B3CC4",
  brand: "#5B3CC4",
  background: "#FFFFFF",
  chatBg: "#F6F5FB",
  botBubble: "#FFFFFF",
  cardBorder: "#ECECF2",
  title: "#1C1B2E",
  body: "#6E6E7A",
  meta: "#9A9AA5",
  green: "#2AA457",
  inputBg: "#F2F1F8",
  logoBg: "#1B1530",
  iconCircle: "#EFEBFA",
};

type ChatMessage = {
  id: string;
  from: "bot" | "user";
  text: string;
  time: string;
};

const MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    from: "bot",
    text: "Please enter your mobile number to receive a call.",
    time: "10:33 AM",
  },
  {
    id: "m2",
    from: "user",
    text: "9123456789",
    time: "10:33 AM",
  },
  {
    id: "m3",
    from: "bot",
    text: "Thank you! Our team will call you shortly.",
    time: "10:33 AM",
  },
];

function BotBubble({ item }: { item: ChatMessage }) {
  return (
    <View style={styles.rowLeft} testID={`message-${item.id}`}>
      <View style={[styles.bubble, styles.botBubble]}>
        <Text style={styles.botText}>{item.text}</Text>
        <Text style={styles.botTime}>{item.time}</Text>
      </View>
    </View>
  );
}

function UserBubble({ item }: { item: ChatMessage }) {
  return (
    <View style={styles.rowRight} testID={`message-${item.id}`}>
      <View style={[styles.bubble, styles.userBubble]}>
        <Text style={styles.userText}>{item.text}</Text>
        <View style={styles.userMetaRow}>
          <Text style={styles.userTime}>{item.time}</Text>
          <Ionicons name="checkmark-done" size={15} color="rgba(255,255,255,0.85)" />
        </View>
      </View>
    </View>
  );
}

function CallbackCard() {
  return (
    <View style={styles.rowLeft} testID="callback-card">
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.cardIconCircle}>
            <Ionicons name="call" size={22} color={Colors.brand} />
          </View>
          <Text style={styles.cardTitle}>Calling You Soon</Text>
        </View>

        <View style={styles.cardDivider} />

        <Text style={styles.cardCaption}>We will call you on</Text>
        <Text style={styles.cardPhone}>+91 91234 56789</Text>

        <View style={styles.cardCheckRow}>
          <Ionicons name="checkmark-circle" size={18} color={Colors.green} />
          <Text style={styles.cardCheckText}>Ticket ID: AC-25874</Text>
        </View>

        <View style={styles.cardCheckRow}>
          <Ionicons name="checkmark-circle" size={18} color={Colors.green} />
          <Text style={styles.cardCheckText}>Expected Callback: Within 15 Minutes</Text>
        </View>

        <Text style={styles.cardNote}>You will receive a call from our executive.</Text>

        <Text style={styles.cardTime}>10:33 AM</Text>
      </View>
    </View>
  );
}

export default function VoipCallRequestScreen() {
  const [draft, setDraft] = useState("");

  return (
    <View style={styles.root} testID="voip-call-request-screen">
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

            <View style={styles.avatarWrap} testID="brand-avatar">
              <View style={styles.avatar}>
                <MaterialCommunityIcons name="snowflake" size={22} color="#FFFFFF" />
              </View>
              <View style={styles.onlineDot} />
            </View>

            <View style={styles.headerTitleWrap}>
              <View style={styles.titleRow}>
                <Text style={styles.headerTitle} numberOfLines={1}>
                  Cool Breeze AC Services
                </Text>
                <Ionicons name="checkmark-circle" size={16} color={Colors.green} />
              </View>
              <Text style={styles.headerSubtitle}>Online</Text>
            </View>

            <Pressable testID="menu-button" hitSlop={12} onPress={() => {}}>
              <Ionicons name="ellipsis-vertical" size={20} color="#FFFFFF" />
            </Pressable>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Chat body */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="chat-scroll"
      >
        {MESSAGES.map((m) =>
          m.from === "bot" ? (
            <BotBubble key={m.id} item={m} />
          ) : (
            <UserBubble key={m.id} item={m} />
          )
        )}

        <CallbackCard />
      </ScrollView>

      {/* Bottom input bar */}
      <SafeAreaView edges={["bottom"]} style={styles.bottomSafe}>
        <View style={styles.inputBar}>
          <Pressable testID="add-button" hitSlop={8} onPress={() => {}}>
            <Ionicons name="add-circle-outline" size={28} color={Colors.brand} />
          </Pressable>

          <View style={styles.inputWrap}>
            <TextInput
              testID="message-input"
              style={styles.input}
              value={draft}
              onChangeText={setDraft}
              placeholder="Write your message"
              placeholderTextColor={Colors.meta}
            />
            <Pressable testID="attach-button" hitSlop={8} onPress={() => {}}>
              <Ionicons name="attach" size={22} color={Colors.meta} />
            </Pressable>
          </View>

          <Pressable
            testID="voice-button"
            style={({ pressed }) => [styles.micBtn, pressed && styles.pressed]}
            onPress={() => {}}
          >
            <Ionicons name="mic" size={22} color="#FFFFFF" />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.chatBg },
  pressed: { opacity: 0.85 },

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
    backgroundColor: Colors.logoBg,
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
    backgroundColor: Colors.green,
    borderWidth: 2,
    borderColor: Colors.headerTop,
  },
  headerTitleWrap: { flex: 1 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  headerTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "700", flexShrink: 1 },
  headerSubtitle: { color: "rgba(255,255,255,0.85)", fontSize: 12, marginTop: 1 },

  scroll: { flex: 1, backgroundColor: Colors.chatBg },
  scrollContent: { padding: 14, paddingBottom: 18 },

  rowLeft: { flexDirection: "row", justifyContent: "flex-start", marginBottom: 12 },
  rowRight: { flexDirection: "row", justifyContent: "flex-end", marginBottom: 12 },

  bubble: { maxWidth: "82%", borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10 },
  botBubble: {
    backgroundColor: Colors.botBubble,
    borderTopLeftRadius: 6,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  userBubble: { backgroundColor: Colors.brand, borderTopRightRadius: 6 },

  botText: { fontSize: 14.5, color: Colors.title, lineHeight: 20 },
  botTime: { fontSize: 11, color: Colors.meta, marginTop: 6, alignSelf: "flex-end" },

  userText: { fontSize: 14.5, color: "#FFFFFF", lineHeight: 20 },
  userMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
    alignSelf: "flex-end",
  },
  userTime: { fontSize: 11, color: "rgba(255,255,255,0.85)" },

  card: {
    width: "92%",
    backgroundColor: Colors.background,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardHeaderRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  cardIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.iconCircle,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: { fontSize: 16, fontWeight: "700", color: Colors.title, flexShrink: 1 },
  cardDivider: {
    height: 1,
    backgroundColor: Colors.cardBorder,
    marginTop: 12,
    marginBottom: 12,
  },
  cardCaption: { fontSize: 13, color: Colors.body },
  cardPhone: { fontSize: 16, fontWeight: "700", color: Colors.title, marginTop: 2 },
  cardCheckRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  cardCheckText: { fontSize: 14, color: Colors.title, flexShrink: 1 },
  cardNote: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.title,
    marginTop: 14,
    lineHeight: 20,
  },
  cardTime: { fontSize: 11, color: Colors.meta, marginTop: 8, alignSelf: "flex-end" },

  bottomSafe: {
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 6,
  },
  inputWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.inputBg,
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 4,
  },
  input: { flex: 1, fontSize: 14.5, color: Colors.title, paddingVertical: 8 },
  micBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.brand,
    alignItems: "center",
    justifyContent: "center",
  },
});
