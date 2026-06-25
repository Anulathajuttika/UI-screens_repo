import React, { useMemo, useState } from "react";
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

/** My Tickets — tickets & orders dashboard. Self-contained, no external src imports. */

const Colors = {
  headerTop: "#7C5FCC",
  headerBottom: "#6A4DBB",
  brand: "#6A4DBB",
  page: "#F6F5FB",
  card: "#FFFFFF",
  border: "#ECECF2",
  title: "#1C1B2E",
  body: "#6E6E7A",
  meta: "#9A9AA5",
  green: "#2AA457",
  greenBg: "#E7F7EA",
  orange: "#E8890C",
  orangeBg: "#FDEFD9",
  red: "#E5484D",
  redBg: "#FCE9E9",
  utility: "#6A4DBB",
  utilityBg: "#EEEAFB",
  retail: "#0E9F9A",
  retailBg: "#E1F4F3",
  inputBg: "#F4F3FA",
};

type IconFamily = "ion" | "mci";
type StatusTone = "green" | "orange" | "red";
type CategoryKey = "all" | "utility" | "retail";
type StatusKey = "all" | "active" | "completed" | "cancelled";
type TicketCategory = "utility" | "retail";

type TicketAction = {
  label: string;
  icon: string;
  family: IconFamily;
};

type Ticket = {
  id: string;
  category: TicketCategory;
  icon: string;
  iconFamily: IconFamily;
  title: string;
  sub: string;
  status: string;
  statusTone: StatusTone;
  bucket: StatusKey;
  group: "Today" | "Yesterday";
  idLabel: string;
  idValue: string;
  personLabel?: string;
  personValue?: string;
  metaLabel?: string;
  metaValue?: string;
  reasonLabel?: string;
  reasonValue?: string;
  cancelledBy?: string;
  actions: TicketAction[];
};

const CATEGORIES: {
  key: CategoryKey;
  label: string;
  count: number;
  icon: string;
  family: IconFamily;
}[] = [
  { key: "all", label: "All", count: 18, icon: "grid", family: "ion" },
  { key: "utility", label: "Utility", count: 8, icon: "tools", family: "mci" },
  {
    key: "retail",
    label: "Retail",
    count: 10,
    icon: "bag-handle",
    family: "ion",
  },
];

const STATUS_TABS: { key: StatusKey; label: string; count?: number }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active", count: 3 },
  { key: "completed", label: "Completed", count: 12 },
  { key: "cancelled", label: "Cancelled", count: 3 },
];

const TICKETS: Ticket[] = [
  {
    id: "AC-25874",
    category: "utility",
    icon: "snowflake",
    iconFamily: "mci",
    title: "AC Not Cooling",
    sub: "AC Repair · Cool Breeze AC Services",
    status: "On The Way",
    statusTone: "orange",
    bucket: "active",
    group: "Today",
    idLabel: "Ticket ID",
    idValue: "AC-25874",
    personLabel: "Technician",
    personValue: "Ramesh Kumar",
    metaLabel: "ETA",
    metaValue: "15 min",
    actions: [
      { label: "Track Live", icon: "navigate-outline", family: "ion" },
      { label: "Chat", icon: "chatbubble-outline", family: "ion" },
      { label: "Call", icon: "call-outline", family: "ion" },
    ],
  },
  {
    id: "ORD-78451",
    category: "retail",
    icon: "food-apple-outline",
    iconFamily: "mci",
    title: "Fresh Vegetables Order",
    sub: "5 items · ₹520 · Fresh Mart",
    status: "Out for Delivery",
    statusTone: "orange",
    bucket: "active",
    group: "Today",
    idLabel: "Order ID",
    idValue: "ORD-78451",
    personLabel: "Delivery Partner",
    personValue: "Suresh",
    metaLabel: "ETA",
    metaValue: "20 min",
    actions: [
      { label: "Track Order", icon: "navigate-outline", family: "ion" },
      { label: "Chat Store", icon: "chatbubble-outline", family: "ion" },
      { label: "Call Store", icon: "call-outline", family: "ion" },
    ],
  },
  {
    id: "WP-14586",
    category: "utility",
    icon: "water-pump",
    iconFamily: "mci",
    title: "Water Purifier Service",
    sub: "RO Service · Aqua Pro Solutions",
    status: "Technician Assigned",
    statusTone: "orange",
    bucket: "active",
    group: "Today",
    idLabel: "Ticket ID",
    idValue: "WP-14586",
    metaLabel: "ETA",
    metaValue: "1 hr 10 min",
    actions: [
      { label: "Track Live", icon: "navigate-outline", family: "ion" },
      { label: "Chat", icon: "chatbubble-outline", family: "ion" },
      { label: "Call", icon: "call-outline", family: "ion" },
    ],
  },
  {
    id: "AC-25811",
    category: "utility",
    icon: "snowflake",
    iconFamily: "mci",
    title: "AC Repair Service",
    sub: "Cool Breeze AC Services",
    status: "Completed",
    statusTone: "green",
    bucket: "completed",
    group: "Yesterday",
    idLabel: "Ticket ID",
    idValue: "AC-25811",
    metaLabel: "Completed On",
    metaValue: "23 Jun 2026",
    actions: [
      { label: "View Details", icon: "eye-outline", family: "ion" },
      { label: "Invoice", icon: "document-text-outline", family: "ion" },
      { label: "Rate Service", icon: "star-outline", family: "ion" },
    ],
  },
  {
    id: "ORD-78233",
    category: "retail",
    icon: "cart-outline",
    iconFamily: "mci",
    title: "Grocery Order",
    sub: "Fresh Mart",
    status: "Delivered",
    statusTone: "green",
    bucket: "completed",
    group: "Yesterday",
    idLabel: "Order ID",
    idValue: "ORD-78233",
    metaLabel: "Delivered On",
    metaValue: "22 Jun 2026",
    actions: [
      { label: "View Order", icon: "eye-outline", family: "ion" },
      { label: "Invoice", icon: "document-text-outline", family: "ion" },
      { label: "Reorder", icon: "refresh-outline", family: "ion" },
    ],
  },
  {
    id: "EL-15983",
    category: "utility",
    icon: "lightbulb-outline",
    iconFamily: "mci",
    title: "Tube Light Installation",
    sub: "Electrician · Power Fix Electricals",
    status: "Completed",
    statusTone: "green",
    bucket: "completed",
    group: "Yesterday",
    idLabel: "Ticket ID",
    idValue: "EL-15983",
    personLabel: "Technician",
    personValue: "Kiran Reddy",
    metaLabel: "Completed On",
    metaValue: "23 Jun 2026",
    actions: [
      { label: "View Details", icon: "eye-outline", family: "ion" },
      { label: "Invoice", icon: "document-text-outline", family: "ion" },
      { label: "Rate Service", icon: "star-outline", family: "ion" },
    ],
  },
  {
    id: "AC-25621",
    category: "utility",
    icon: "snowflake",
    iconFamily: "mci",
    title: "AC Gas Filling",
    sub: "Cool Breeze AC Services",
    status: "Cancelled",
    statusTone: "red",
    bucket: "cancelled",
    group: "Yesterday",
    idLabel: "Ticket ID",
    idValue: "AC-25621",
    cancelledBy: "Customer",
    reasonLabel: "Reason",
    reasonValue: "Issue resolved",
    actions: [{ label: "Book Again", icon: "reload", family: "ion" }],
  },
  {
    id: "ORD-78112",
    category: "retail",
    icon: "cart-outline",
    iconFamily: "mci",
    title: "Milk & Dairy Order",
    sub: "Daily Needs Store",
    status: "Cancelled",
    statusTone: "red",
    bucket: "cancelled",
    group: "Yesterday",
    idLabel: "Order ID",
    idValue: "ORD-78112",
    cancelledBy: "Store",
    reasonLabel: "Reason",
    reasonValue: "Item unavailable",
    actions: [{ label: "Book Again", icon: "reload", family: "ion" }],
  },
  {
    id: "PL-12547",
    category: "utility",
    icon: "pipe-wrench",
    iconFamily: "mci",
    title: "Plumbing Service",
    sub: "FlowFix Plumbers",
    status: "Cancelled",
    statusTone: "red",
    bucket: "cancelled",
    group: "Yesterday",
    idLabel: "Ticket ID",
    idValue: "PL-12547",
    cancelledBy: "Customer",
    reasonLabel: "Reason",
    reasonValue: "Not needed now",
    actions: [{ label: "Book Again", icon: "reload", family: "ion" }],
  },
];

const TONE_BG: Record<StatusTone, string> = {
  green: Colors.greenBg,
  orange: Colors.orangeBg,
  red: Colors.redBg,
};
const TONE_FG: Record<StatusTone, string> = {
  green: Colors.green,
  orange: Colors.orange,
  red: Colors.red,
};
const TONE_ICON: Record<StatusTone, string> = {
  green: "checkmark-circle",
  orange: "time-outline",
  red: "close-circle",
};

function Glyph({
  family,
  name,
  size,
  color,
}: {
  family: IconFamily;
  name: string;
  size: number;
  color: string;
}) {
  if (family === "mci") {
    return (
      <MaterialCommunityIcons name={name as any} size={size} color={color} />
    );
  }
  return <Ionicons name={name as any} size={size} color={color} />;
}

function CategoryCard({
  item,
  selected,
  onPress,
}: {
  item: (typeof CATEGORIES)[number];
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      testID={`category-${item.key}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.catCard,
        selected && styles.catCardActive,
        pressed && styles.pressed,
      ]}
    >
      <Glyph
        family={item.family}
        name={item.icon}
        size={22}
        color={selected ? "#FFFFFF" : Colors.brand}
      />
      <Text style={[styles.catLabel, selected && styles.catTextActive]}>
        {item.label} ({item.count})
      </Text>
    </Pressable>
  );
}

function StatusPill({
  item,
  selected,
  onPress,
}: {
  item: (typeof STATUS_TABS)[number];
  selected: boolean;
  onPress: () => void;
}) {
  const danger = item.key === "cancelled";
  const activeBg = danger ? Colors.red : Colors.brand;
  return (
    <Pressable
      testID={`status-${item.key}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.pill,
        selected && { backgroundColor: activeBg, borderColor: activeBg },
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.pillText, selected && styles.pillTextActive]}>
        {item.label}
        {typeof item.count === "number" ? ` (${item.count})` : ""}
      </Text>
    </Pressable>
  );
}

function InfoCol({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoCol}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

function StarRating({ ticketId }: { ticketId: string }) {
  const [rating, setRating] = useState(0);
  return (
    <View style={styles.starRow} testID={`rating-${ticketId}`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Pressable
          key={n}
          hitSlop={4}
          testID={`star-${ticketId}-${n}`}
          onPress={() => setRating(n)}
        >
          <Ionicons
            name={n <= rating ? "star" : "star-outline"}
            size={16}
            color={n <= rating ? Colors.orange : Colors.meta}
          />
        </Pressable>
      ))}
    </View>
  );
}

function TicketCard({ ticket }: { ticket: Ticket }) {
  const tagBg = ticket.category === "utility" ? Colors.utilityBg : Colors.retailBg;
  const tagFg = ticket.category === "utility" ? Colors.utility : Colors.retail;
  const tagLabel = ticket.category === "utility" ? "UTILITY" : "RETAIL";
  const showRating =
    ticket.bucket === "completed" &&
    ticket.actions.some((a) => a.label === "Rate Service");

  return (
    <View style={styles.ticketCard} testID={`ticket-${ticket.id}`}>
      {/* Top row: tag + status badge */}
      <View style={styles.ticketTopRow}>
        <View style={[styles.tag, { backgroundColor: tagBg }]}>
          <Text style={[styles.tagText, { color: tagFg }]}>{tagLabel}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: TONE_BG[ticket.statusTone] }]}>
          <Ionicons
            name={TONE_ICON[ticket.statusTone] as any}
            size={13}
            color={TONE_FG[ticket.statusTone]}
          />
          <Text style={[styles.statusText, { color: TONE_FG[ticket.statusTone] }]}>
            {ticket.status}
          </Text>
        </View>
      </View>

      {/* Title row with icon tile */}
      <View style={styles.titleRow}>
        <View style={[styles.iconTile, { backgroundColor: tagBg }]}>
          <Glyph family={ticket.iconFamily} name={ticket.icon} size={22} color={tagFg} />
        </View>
        <View style={styles.titleTextWrap}>
          <Text style={styles.ticketTitle} numberOfLines={1}>
            {ticket.title}
          </Text>
          <Text style={styles.ticketSub} numberOfLines={1}>
            {ticket.sub}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={Colors.meta} />
      </View>

      <View style={styles.divider} />

      {/* Middle info section */}
      {ticket.bucket === "cancelled" ? (
        <View style={styles.cancelInfo}>
          <InfoCol label={ticket.idLabel} value={ticket.idValue} />
          {ticket.cancelledBy ? (
            <InfoCol label="Cancelled by" value={ticket.cancelledBy} />
          ) : null}
          {ticket.reasonValue ? (
            <InfoCol label={ticket.reasonLabel ?? "Reason"} value={ticket.reasonValue} />
          ) : null}
        </View>
      ) : (
        <View style={styles.infoRow}>
          <InfoCol label={ticket.idLabel} value={ticket.idValue} />
          {ticket.personValue ? (
            <InfoCol label={ticket.personLabel ?? "Person"} value={ticket.personValue} />
          ) : null}
          {ticket.metaValue ? (
            <InfoCol label={ticket.metaLabel ?? "ETA"} value={ticket.metaValue} />
          ) : null}
        </View>
      )}

      {showRating ? (
        <View style={styles.ratePrompt}>
          <Text style={styles.rateLabel}>Rate your experience</Text>
          <StarRating ticketId={ticket.id} />
        </View>
      ) : null}

      {/* Action buttons */}
      <View style={styles.actionsRow}>
        {ticket.actions.map((a) => {
          const isBookAgain = a.label === "Book Again";
          const isCompleted = ticket.statusTone === "green";
          const fg = isBookAgain
            ? Colors.red
            : isCompleted
              ? Colors.green
              : Colors.brand;
          return (
            <Pressable
              key={a.label}
              testID={`action-${ticket.id}-${a.label.replace(/\s+/g, "-").toLowerCase()}`}
              onPress={() => {}}
              style={({ pressed }) => [
                styles.actionBtn,
                isBookAgain
                  ? styles.bookAgainBtn
                  : isCompleted
                    ? styles.completedBtn
                    : ticket.actions.length === 1 && styles.actionBtnWide,
                pressed && styles.pressed,
              ]}
            >
              <Glyph family={a.family} name={a.icon} size={15} color={fg} />
              <Text style={[styles.actionText, { color: fg }]} numberOfLines={1}>
                {a.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function MyTicketsScreen() {
  const [category, setCategory] = useState<CategoryKey>("all");
  const [status, setStatus] = useState<StatusKey>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return TICKETS.filter((t) => {
      const catOk = category === "all" || t.category === category;
      const statusOk = status === "all" || t.bucket === status;
      const q = query.trim().toLowerCase();
      const queryOk =
        q.length === 0 ||
        t.title.toLowerCase().includes(q) ||
        t.sub.toLowerCase().includes(q) ||
        t.idValue.toLowerCase().includes(q);
      return catOk && statusOk && queryOk;
    });
  }, [category, status, query]);

  const grouped = useMemo(() => {
    if (status !== "all") {
      return [{ group: null as null | string, items: filtered }];
    }
    const today = filtered.filter((t) => t.group === "Today");
    const yesterday = filtered.filter((t) => t.group === "Yesterday");
    const out: { group: string | null; items: Ticket[] }[] = [];
    if (today.length) out.push({ group: "Today", items: today });
    if (yesterday.length) out.push({ group: "Yesterday", items: yesterday });
    return out;
  }, [filtered, status]);

  const activeTabLabel = STATUS_TABS.find((s) => s.key === status)?.label ?? "All";

  return (
    <View style={styles.root} testID="my-tickets-screen">
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
              <View style={styles.headerTextWrap}>
                <Text style={styles.headerTitle}>My Tickets</Text>
                <Text style={styles.headerSubtitle}>
                  All your services & orders in one place
                </Text>
              </View>
            </View>
            <Pressable testID="search-button" hitSlop={10} onPress={() => {}}>
              <Ionicons name="search" size={22} color="#FFFFFF" />
            </Pressable>
            <Pressable testID="notifications-button" hitSlop={10} onPress={() => {}}>
              <View>
                <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
                <View style={styles.bellDot} />
              </View>
            </Pressable>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="tickets-scroll"
      >
        {/* Category cards */}
        <View style={styles.catRow}>
          {CATEGORIES.map((c) => (
            <CategoryCard
              key={c.key}
              item={c}
              selected={category === c.key}
              onPress={() => setCategory(c.key)}
            />
          ))}
        </View>

        {/* Status tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillRow}
          testID="status-tabs"
        >
          {STATUS_TABS.map((s) => (
            <StatusPill
              key={s.key}
              item={s}
              selected={status === s.key}
              onPress={() => setStatus(s.key)}
            />
          ))}
        </ScrollView>

        {/* Search + filters */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color={Colors.meta} />
            <TextInput
              testID="search-input"
              style={styles.searchInput}
              value={query}
              onChangeText={setQuery}
              placeholder="Search by Ticket ID, Order ID, Service or Store"
              placeholderTextColor={Colors.meta}
            />
          </View>
          <Pressable
            testID="filters-button"
            onPress={() => {}}
            style={({ pressed }) => [styles.filterBtn, pressed && styles.pressed]}
          >
            <Ionicons name="funnel-outline" size={15} color={Colors.brand} />
            <Text style={styles.filterText}>Filters</Text>
          </Pressable>
        </View>

        {/* Section heading when a specific tab is selected */}
        {status !== "all" ? (
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>
              {activeTabLabel} ({filtered.length})
            </Text>
            <Pressable hitSlop={8} onPress={() => {}} testID="view-all">
              <Text style={styles.viewAll}>View All</Text>
            </Pressable>
          </View>
        ) : null}

        {/* Ticket list */}
        {filtered.length === 0 ? (
          <View style={styles.empty} testID="empty-state">
            <Ionicons name="receipt-outline" size={42} color={Colors.meta} />
            <Text style={styles.emptyText}>No tickets found</Text>
          </View>
        ) : (
          grouped.map((section, idx) => (
            <View key={section.group ?? `section-${idx}`}>
              {section.group ? (
                <Text style={styles.groupLabel}>{section.group}</Text>
              ) : null}
              {section.items.map((t) => (
                <TicketCard key={t.id} ticket={t} />
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const cardShadow = {
  shadowColor: "#1C1B2E",
  shadowOpacity: 0.06,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
  elevation: 3,
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.page },
  pressed: { opacity: 0.85 },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 28 },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 18,
    gap: 16,
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTextWrap: { flex: 1 },
  headerTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "700" },
  headerSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    marginTop: 3,
  },
  bellDot: {
    position: "absolute",
    top: -2,
    right: -1,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: Colors.red,
    borderWidth: 1.5,
    borderColor: Colors.headerBottom,
  },

  /* Category cards */
  catRow: { flexDirection: "row", gap: 10, marginBottom: 14 },
  catCard: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    ...cardShadow,
  },
  catCardActive: { backgroundColor: Colors.brand, borderColor: Colors.brand },
  catLabel: { fontSize: 13, fontWeight: "700", color: Colors.title },
  catCount: { fontSize: 12, fontWeight: "600", color: Colors.meta },
  catTextActive: { color: "#FFFFFF" },

  /* Status pills */
  pillRow: { gap: 9, paddingVertical: 2, paddingRight: 4 },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillText: { fontSize: 13, fontWeight: "600", color: Colors.body },
  pillTextActive: { color: "#FFFFFF" },

  /* Search + filters */
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 14,
    marginBottom: 16,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  searchInput: { flex: 1, fontSize: 13, color: Colors.title, padding: 0 },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  filterText: { fontSize: 13, fontWeight: "600", color: Colors.brand },

  /* Section heading */
  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 15, fontWeight: "700", color: Colors.title },
  viewAll: { fontSize: 13, fontWeight: "600", color: Colors.brand },

  /* Group labels */
  groupLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.title,
    marginBottom: 12,
    marginTop: 2,
  },

  /* Ticket card */
  ticketCard: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginBottom: 14,
    ...cardShadow,
  },
  ticketTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 7,
  },
  tagText: { fontSize: 10, fontWeight: "800", letterSpacing: 0.5 },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: { fontSize: 11.5, fontWeight: "700" },

  titleRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconTile: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  titleTextWrap: { flex: 1 },
  ticketTitle: { fontSize: 15.5, fontWeight: "700", color: Colors.title },
  ticketSub: { fontSize: 12.5, color: Colors.body, marginTop: 2 },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 13,
  },

  infoRow: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  cancelInfo: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  infoCol: { flex: 1 },
  infoLabel: { fontSize: 11, color: Colors.meta, marginBottom: 3 },
  infoValue: { fontSize: 13, fontWeight: "600", color: Colors.title },

  ratePrompt: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 13,
    backgroundColor: Colors.page,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  rateLabel: { fontSize: 12.5, fontWeight: "600", color: Colors.body },
  starRow: { flexDirection: "row", gap: 4 },

  actionsRow: { flexDirection: "row", gap: 9, marginTop: 14 },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 6,
    backgroundColor: Colors.card,
  },
  actionBtnWide: { flex: 0, paddingHorizontal: 18 },
  bookAgainBtn: { borderColor: Colors.red, backgroundColor: Colors.redBg },
  completedBtn: { borderColor: Colors.green, backgroundColor: Colors.greenBg },
  actionText: { fontSize: 12.5, fontWeight: "600", color: Colors.brand },
  bookAgainText: { color: Colors.red },

  /* Empty */
  empty: { alignItems: "center", paddingVertical: 60, gap: 12 },
  emptyText: { fontSize: 14, color: Colors.meta, fontWeight: "600" },
});
