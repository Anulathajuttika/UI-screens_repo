import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Pressable,
  Image,
  type ImageSourcePropType,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

/** ChatBucket — Account / navigation drawer with the chats screen peeking on the right. Self-contained. */

const Colors = {
  gradTop: "#7C5FCC",
  gradBottom: "#6A4DBB",
  white: "#FFFFFF",
  rowBg: "rgba(255,255,255,0.06)",
  rowBorder: "rgba(255,255,255,0.10)",
  premiumBg: "rgba(255,255,255,0.16)",
  premiumBorder: "rgba(255,255,255,0.28)",
  footerMuted: "rgba(255,255,255,0.85)",
  peekShadow: "#1C1B2E",
  // chat panel
  panelHeader: "#EFEBFB",
  chatPillBg: "#E7E0FA",
  brand: "#6A4DBB",
  searchBg: "#F1F1F4",
  chatName: "#1C1B2E",
  chatMsg: "#8A8A95",
  unread: "#4B2FD6",
  readCheck: "#34B7F1",
  grayCheck: "#A6A6B0",
  online: "#2AA457",
  panelBorder: "#E3E3EB",
  divider: "#EFEFF3",
  statusDark: "#1C1B2E",
};

type IconFamily = "ion" | "mci";

type MenuItem = {
  id: string;
  label: string;
  family: IconFamily;
  icon: string;
  highlighted?: boolean;
};

const MENU_ITEMS: MenuItem[] = [
  { id: "profile", label: "Profile", family: "ion", icon: "person-outline" },
  { id: "tickets", label: "My Tickets", family: "mci", icon: "ticket-outline" },
  { id: "wallet", label: "Wallet", family: "ion", icon: "wallet-outline" },
  { id: "stickers", label: "Stickers", family: "ion", icon: "happy-outline" },
  { id: "todo", label: "To do list", family: "ion", icon: "checkbox-outline" },
  { id: "weather", label: "Weather", family: "ion", icon: "partly-sunny-outline" },
  { id: "saved", label: "Saved messages", family: "ion", icon: "bookmark-outline" },
  {
    id: "languages",
    label: "Preferred languages",
    family: "ion",
    icon: "language-outline",
  },
  { id: "refer", label: "Refer & earn", family: "ion", icon: "gift-outline" },
  { id: "family", label: "Family mode", family: "ion", icon: "people-outline" },
  {
    id: "emergency",
    label: "Emergency contacts",
    family: "ion",
    icon: "call-outline",
  },
  { id: "devices", label: "Devices", family: "ion", icon: "phone-portrait-outline" },
  { id: "settings", label: "Settings", family: "ion", icon: "settings-outline" },
  { id: "help", label: "Help", family: "ion", icon: "help-circle-outline" },
  {
    id: "premium",
    label: "Premium",
    family: "mci",
    icon: "crown",
    highlighted: true,
  },
];

type Receipt = "none" | "single" | "double";

type Chat = {
  id: string;
  name: string;
  msg: string;
  avatar: ImageSourcePropType;
  receipt: Receipt;
  online?: boolean;
  unread?: boolean;
  photo?: boolean;
};

const CHATS: Chat[] = [
  {
    id: "gyllinton",
    name: "Gyllinton",
    msg: "I don't know how to do",
    avatar: require("../assets/images/chat/gyllinton.png"),
    receipt: "single",
  },
  {
    id: "sports",
    name: "Sports Club",
    msg: "Alright 👍",
    avatar: require("../assets/images/chat/sports.png"),
    receipt: "double",
  },
  {
    id: "alice",
    name: "Alice",
    msg: "Okay, I'll check it now",
    avatar: require("../assets/images/chat/alice.png"),
    receipt: "double",
    online: true,
  },
  {
    id: "abras",
    name: "Abras",
    msg: "Is that done?",
    avatar: require("../assets/images/chat/abras.png"),
    receipt: "none",
    unread: true,
  },
  {
    id: "emily",
    name: "Emily",
    msg: "Photo",
    avatar: require("../assets/images/chat/emily.png"),
    receipt: "double",
    photo: true,
  },
  {
    id: "jasmine",
    name: "Jasmine shorter",
    msg: "How is this?",
    avatar: require("../assets/images/chat/jasmine.png"),
    receipt: "none",
  },
  {
    id: "mark",
    name: "Mark Dusik",
    msg: "I don't know what to do",
    avatar: require("../assets/images/chat/mark.png"),
    receipt: "none",
  },
];

function RowIcon({ item }: { item: MenuItem }) {
  if (item.family === "mci") {
    return (
      <MaterialCommunityIcons
        name={item.icon as React.ComponentProps<typeof MaterialCommunityIcons>["name"]}
        size={21}
        color={Colors.white}
      />
    );
  }
  return (
    <Ionicons
      name={item.icon as React.ComponentProps<typeof Ionicons>["name"]}
      size={21}
      color={Colors.white}
    />
  );
}

function MenuRow({
  item,
  active,
  onPress,
}: {
  item: MenuItem;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      testID={`menu-item-${item.id}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        item.highlighted && styles.rowHighlighted,
        active && styles.rowActive,
        pressed && styles.rowPressed,
      ]}
    >
      <View style={styles.rowIconWrap}>
        <RowIcon item={item} />
      </View>
      <Text style={styles.rowLabel} numberOfLines={1}>
        {item.label}
      </Text>
    </Pressable>
  );
}

function ChatRow({ chat }: { chat: Chat }) {
  return (
    <View style={styles.chatRow} testID={`chat-${chat.id}`}>
      <View style={styles.chatAvatarWrap}>
        <Image source={chat.avatar} style={styles.chatAvatar} resizeMode="cover" />
        {chat.online ? <View style={styles.onlineDot} /> : null}
      </View>
      <View style={styles.chatText}>
        <Text style={styles.chatName} numberOfLines={1}>
          {chat.name}
        </Text>
        <View style={styles.chatMsgRow}>
          {chat.receipt !== "none" ? (
            <Ionicons
              name={chat.receipt === "double" ? "checkmark-done" : "checkmark"}
              size={15}
              color={chat.receipt === "double" ? Colors.readCheck : Colors.grayCheck}
            />
          ) : null}
          {chat.photo ? (
            <Ionicons name="camera" size={14} color={Colors.chatMsg} />
          ) : null}
          <Text
            style={[styles.chatMsg, chat.unread && styles.chatMsgUnread]}
            numberOfLines={1}
          >
            {chat.msg}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function AccountDrawerScreen() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "chats">("all");

  return (
    <View style={styles.root} testID="account-drawer-screen">
      <StatusBar barStyle="light-content" backgroundColor={Colors.gradTop} />

      <LinearGradient
        colors={[Colors.gradTop, Colors.gradBottom]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.fill}
      >
        <SafeAreaView edges={["top", "bottom"]} style={styles.fill}>
          {/* Header — full width so the scan + menu icons sit in the screen corner */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Pressable testID="back-button" hitSlop={12} onPress={() => {}}>
                <Ionicons name="arrow-back" size={24} color={Colors.white} />
              </Pressable>
              <Text style={styles.headerTitle}>Account</Text>
            </View>

            <View style={styles.headerRight}>
              <Pressable testID="scan-button" hitSlop={12} onPress={() => {}}>
                <Ionicons name="scan-outline" size={22} color={Colors.white} />
              </Pressable>
              <Pressable testID="menu-button" hitSlop={12} onPress={() => {}}>
                <Ionicons name="ellipsis-vertical" size={22} color={Colors.white} />
              </Pressable>
            </View>
          </View>

          {/* Body: drawer menu + peeking chats panel side by side */}
          <View style={styles.body}>
            <View style={styles.drawerCol}>
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              testID="menu-scroll"
            >
              {MENU_ITEMS.map((item) => (
                <MenuRow
                  key={item.id}
                  item={item}
                  active={activeId === item.id}
                  onPress={() => setActiveId(item.id)}
                />
              ))}

              {/* Footer */}
              <View style={styles.footer} testID="footer">
                <Text style={styles.footerMuted}>Be a volunteer on</Text>
                <View style={styles.footerBrandRow}>
                  <Text style={styles.footerBrand}>ChatBucket</Text>
                  <View style={styles.footerEye}>
                    <Ionicons name="eye" size={13} color={Colors.gradBottom} />
                  </View>
                </View>
              </View>
            </ScrollView>
            </View>

            {/* Chats screen peeking from the right (drawer-open state) */}
            <View style={styles.panel} testID="chat-panel">
            {/* Panel's own status bar */}
            <View style={styles.panelStatusBar}>
              <Text style={styles.statusTime}>03:17</Text>
              <View style={styles.statusIcons}>
                <Ionicons name="cellular" size={13} color={Colors.statusDark} />
                <Ionicons name="wifi" size={13} color={Colors.statusDark} />
                <Ionicons name="battery-full" size={15} color={Colors.statusDark} />
              </View>
            </View>

            {/* Panel top tabs */}
            <View style={styles.panelHeaderRow}>
              <View style={styles.chatPill}>
                <Ionicons name="chatbubbles" size={16} color={Colors.brand} />
                <Text style={styles.chatPillText}>Chats</Text>
              </View>
              <Ionicons name="heart-outline" size={22} color={Colors.brand} />
            </View>

            {/* Search */}
            <View style={styles.search}>
              <Ionicons name="search" size={17} color={Colors.chatMsg} />
              <Text style={styles.searchText}>Search on ChatBucket</Text>
            </View>

            {/* Filter pills */}
            <View style={styles.filterRow}>
              <Pressable
                onPress={() => setFilter("all")}
                style={[styles.filterPill, filter === "all" && styles.filterPillActive]}
              >
                <Text
                  style={[
                    styles.filterText,
                    filter === "all" && styles.filterTextActive,
                  ]}
                >
                  All
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setFilter("chats")}
                style={[styles.filterPill, filter === "chats" && styles.filterPillActive]}
              >
                <Text
                  style={[
                    styles.filterText,
                    filter === "chats" && styles.filterTextActive,
                  ]}
                >
                  Chats
                </Text>
              </Pressable>
            </View>

            {/* Chat list */}
            <ScrollView
              style={styles.chatScroll}
              contentContainerStyle={styles.chatScrollContent}
              showsVerticalScrollIndicator={false}
            >
              {CHATS.map((c) => (
                <ChatRow key={c.id} chat={c} />
              ))}
            </ScrollView>

            {/* Bottom tabs */}
            <View style={styles.tabBar}>
              <View style={styles.tabItem}>
                <Ionicons name="home" size={22} color={Colors.brand} />
                <Text style={[styles.tabLabel, { color: Colors.brand }]}>Home</Text>
              </View>
              <View style={styles.tabItem}>
                <Ionicons name="people-outline" size={22} color={Colors.chatMsg} />
                <Text style={styles.tabLabel}>Contacts</Text>
              </View>
            </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.gradBottom },
  fill: { flex: 1 },

  body: { flex: 1, flexDirection: "row" },
  drawerCol: { width: "62%" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 14 },
  headerTitle: { color: Colors.white, fontSize: 20, fontWeight: "700" },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 14 },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 14, paddingBottom: 8 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: Colors.rowBorder,
    backgroundColor: Colors.rowBg,
  },
  rowHighlighted: {
    backgroundColor: Colors.premiumBg,
    borderColor: Colors.premiumBorder,
  },
  rowActive: {
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  rowPressed: { opacity: 0.7 },
  rowIconWrap: { width: 24, alignItems: "center" },
  rowLabel: { color: Colors.white, fontSize: 14.5, fontWeight: "500", flexShrink: 1 },

  footer: {
    alignItems: "center",
    paddingTop: 22,
    paddingBottom: 6,
  },
  footerMuted: { color: Colors.footerMuted, fontSize: 13, marginBottom: 4 },
  footerBrandRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  footerBrand: { color: Colors.white, fontSize: 17, fontWeight: "800" },
  footerEye: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Peeking chat panel (right column) */
  panel: {
    flex: 1,
    marginTop: 28,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 26,
    borderBottomLeftRadius: 26,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.panelBorder,
    shadowColor: Colors.peekShadow,
    shadowOffset: { width: -6, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 14,
  },

  panelStatusBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.panelHeader,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 2,
  },
  statusTime: { fontSize: 13, fontWeight: "700", color: Colors.statusDark },
  statusIcons: { flexDirection: "row", alignItems: "center", gap: 4 },

  panelHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.panelHeader,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
  },
  chatPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: Colors.chatPillBg,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  chatPillText: { color: Colors.brand, fontSize: 14, fontWeight: "700" },

  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.searchBg,
    borderRadius: 22,
    paddingHorizontal: 14,
    height: 42,
    marginHorizontal: 14,
    marginTop: 14,
  },
  searchText: { color: Colors.chatMsg, fontSize: 14 },

  filterRow: { flexDirection: "row", gap: 10, paddingHorizontal: 14, marginTop: 14 },
  filterPill: {
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.panelBorder,
  },
  filterPillActive: { backgroundColor: Colors.chatPillBg, borderColor: Colors.brand },
  filterText: { color: Colors.chatMsg, fontSize: 13, fontWeight: "600" },
  filterTextActive: { color: Colors.brand },

  chatScroll: { flex: 1, marginTop: 6 },
  chatScrollContent: { paddingHorizontal: 14, paddingTop: 8, paddingBottom: 8 },

  chatRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 9,
  },
  chatAvatarWrap: { width: 46, height: 46 },
  chatAvatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: "#EEE" },
  onlineDot: {
    position: "absolute",
    right: 0,
    bottom: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.online,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  chatText: { flex: 1 },
  chatName: { color: Colors.chatName, fontSize: 15, fontWeight: "700" },
  chatMsgRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 3 },
  chatMsg: { color: Colors.chatMsg, fontSize: 13, flexShrink: 1 },
  chatMsgUnread: { color: Colors.unread, fontWeight: "700" },

  tabBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    paddingTop: 8,
    paddingBottom: 4,
  },
  tabItem: { flex: 1, alignItems: "center", gap: 3 },
  tabLabel: { fontSize: 11, color: Colors.chatMsg, fontWeight: "600" },
});
