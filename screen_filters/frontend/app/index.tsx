import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

/** Filters — a filter sheet screen. Self-contained, no external src imports. */

const Colors = {
  headerTop: "#7C5FCC",
  headerBottom: "#6A4DBB",
  brand: "#6A4DBB",
  card: "#FFFFFF",
  pageTint: "#F6F5FB",
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
  retail: "#0E9F9A",
  chipSelectedText: "#FFFFFF",
};

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];
type MciName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

type IconRef =
  | { family: "ion"; name: IoniconName }
  | { family: "mci"; name: MciName };

function GlyphIcon({
  icon,
  size,
  color,
}: {
  icon: IconRef;
  size: number;
  color: string;
}) {
  if (icon.family === "ion") {
    return <Ionicons name={icon.name} size={size} color={color} />;
  }
  return <MaterialCommunityIcons name={icon.name} size={size} color={color} />;
}

type CategoryChip = {
  key: string;
  label: string;
  icon: IconRef;
};

const CATEGORY_CHIPS: CategoryChip[] = [
  { key: "all", label: "All", icon: { family: "ion", name: "apps-outline" } },
  {
    key: "utility",
    label: "Utility Services",
    icon: { family: "mci", name: "tools" },
  },
  {
    key: "retail",
    label: "Retail Orders",
    icon: { family: "ion", name: "bag-handle-outline" },
  },
];

type StatusChip = {
  key: string;
  label: string;
  icon: IconRef;
  color: string;
};

const STATUS_CHIPS: StatusChip[] = [
  {
    key: "all",
    label: "All",
    icon: { family: "ion", name: "ellipse" },
    color: Colors.meta,
  },
  {
    key: "active",
    label: "Active",
    icon: { family: "ion", name: "pulse" },
    color: Colors.green,
  },
  {
    key: "ontheway",
    label: "On The Way",
    icon: { family: "ion", name: "navigate" },
    color: Colors.orange,
  },
  {
    key: "outfordelivery",
    label: "Out for Delivery",
    icon: { family: "mci", name: "truck-delivery-outline" },
    color: Colors.orange,
  },
  {
    key: "completed",
    label: "Completed",
    icon: { family: "ion", name: "checkmark-circle" },
    color: Colors.green,
  },
  {
    key: "cancelled",
    label: "Cancelled",
    icon: { family: "ion", name: "close-circle" },
    color: Colors.red,
  },
];

type FilterRow = {
  key: string;
  icon: IconRef;
  label: string;
  sublabel?: string;
  value?: string;
};

const FILTER_ROWS: FilterRow[] = [
  {
    key: "date",
    icon: { family: "ion", name: "calendar-outline" },
    label: "Select Date Range",
    value: "24 Jun – 24 Jul 2026",
  },
  {
    key: "service",
    icon: { family: "mci", name: "tools" },
    label: "Service Type (Utility)",
    sublabel: "Select Service Type",
    value: "All",
  },
  {
    key: "store",
    icon: { family: "ion", name: "storefront-outline" },
    label: "Store / Business (Retail)",
    sublabel: "Select Store or Business",
    value: "All",
  },
  {
    key: "sort",
    icon: { family: "ion", name: "swap-vertical" },
    label: "Sort By",
    sublabel: "Select Sorting Option",
    value: "Newest First",
  },
  {
    key: "ticket",
    icon: { family: "mci", name: "ticket-outline" },
    label: "Ticket / Order ID",
    sublabel: "Enter Ticket ID or Order ID",
  },
];

function CategoryChipView({
  chip,
  selected,
  onPress,
}: {
  chip: CategoryChip;
  selected: boolean;
  onPress: () => void;
}) {
  const fg = selected ? Colors.chipSelectedText : Colors.title;
  return (
    <Pressable
      testID={`category-chip-${chip.key}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.catChip,
        selected && styles.catChipSelected,
        pressed && styles.pressed,
      ]}
    >
      <GlyphIcon icon={chip.icon} size={16} color={fg} />
      <Text
        style={[styles.catChipText, selected && styles.catChipTextSelected]}
        numberOfLines={1}
      >
        {chip.label}
      </Text>
    </Pressable>
  );
}

function StatusChipView({
  chip,
  selected,
  onPress,
}: {
  chip: StatusChip;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      testID={`status-chip-${chip.key}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.statusChip,
        selected && styles.statusChipSelected,
        pressed && styles.pressed,
      ]}
    >
      <GlyphIcon icon={chip.icon} size={15} color={chip.color} />
      <Text
        style={[styles.statusChipText, selected && styles.statusChipTextSelected]}
        numberOfLines={1}
      >
        {chip.label}
      </Text>
    </Pressable>
  );
}

function FilterRowView({ row }: { row: FilterRow }) {
  return (
    <Pressable
      testID={`filter-row-${row.key}`}
      onPress={() => {}}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.rowIconWrap}>
        <GlyphIcon icon={row.icon} size={20} color={Colors.brand} />
      </View>
      <View style={styles.rowTextWrap}>
        <Text style={styles.rowLabel}>{row.label}</Text>
        {row.sublabel ? (
          <Text style={styles.rowSublabel}>{row.sublabel}</Text>
        ) : null}
      </View>
      {row.value ? (
        <Text style={styles.rowValue} numberOfLines={1}>
          {row.value}
        </Text>
      ) : null}
      <Ionicons name="chevron-forward" size={18} color={Colors.meta} />
    </Pressable>
  );
}

export default function FiltersScreen() {
  const [category, setCategory] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  const handleClearAll = () => {
    setCategory("all");
    setStatus("all");
  };

  return (
    <View style={styles.root} testID="filters-screen">
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

              <Text style={styles.headerTitle}>Filters</Text>
            </View>

            <Pressable
              testID="clear-all-button"
              hitSlop={12}
              onPress={handleClearAll}
            >
              <Text style={styles.clearAll}>Clear All</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Body */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="filters-scroll"
      >
        {/* Category */}
        <Text style={styles.sectionTitle}>Category</Text>
        <View style={styles.catRow}>
          {CATEGORY_CHIPS.map((chip) => (
            <CategoryChipView
              key={chip.key}
              chip={chip}
              selected={category === chip.key}
              onPress={() => setCategory(chip.key)}
            />
          ))}
        </View>

        {/* Status */}
        <Text style={styles.sectionTitle}>Status</Text>
        <View style={styles.statusWrap}>
          {STATUS_CHIPS.map((chip) => (
            <StatusChipView
              key={chip.key}
              chip={chip}
              selected={status === chip.key}
              onPress={() => setStatus(chip.key)}
            />
          ))}
        </View>

        {/* Date Range / rows */}
        <Text style={styles.sectionTitle}>Date Range</Text>
        <View style={styles.rowList}>
          {FILTER_ROWS.map((row) => (
            <FilterRowView key={row.key} row={row} />
          ))}
        </View>
      </ScrollView>

      {/* Bottom actions */}
      <SafeAreaView edges={["bottom"]} style={styles.bottomSafe}>
        <View style={styles.bottomBar}>
          <Pressable
            testID="apply-button"
            onPress={() => {}}
            style={({ pressed }) => [styles.applyBtn, pressed && styles.pressed]}
          >
            <Text style={styles.applyBtnText}>Apply Filters</Text>
          </Pressable>

          <Pressable
            testID="reset-button"
            onPress={handleClearAll}
            style={({ pressed }) => [styles.resetBtn, pressed && styles.pressed]}
          >
            <Text style={styles.resetBtnText}>Reset Filters</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const cardShadow = {
  shadowColor: "#1C1B2E",
  shadowOpacity: 0.06,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
  elevation: 3,
} as const;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.pageTint },
  pressed: { opacity: 0.85 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  headerTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  clearAll: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },

  scroll: { flex: 1, backgroundColor: Colors.card },
  scrollContent: { padding: 18, paddingBottom: 24 },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.title,
    marginBottom: 12,
    marginTop: 18,
  },

  // Category chips
  catRow: { flexDirection: "row", gap: 10 },
  catChip: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    ...cardShadow,
  },
  catChipSelected: {
    backgroundColor: Colors.brand,
    borderColor: Colors.brand,
  },
  catChipText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: Colors.title,
    flexShrink: 1,
  },
  catChipTextSelected: { color: Colors.chipSelectedText },

  // Status chips (wrap grid, 2 per row)
  statusWrap: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  statusChip: {
    width: "47%",
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    ...cardShadow,
  },
  statusChipSelected: {
    borderColor: Colors.brand,
    borderWidth: 1.5,
    backgroundColor: Colors.pageTint,
  },
  statusChipText: { fontSize: 13.5, fontWeight: "600", color: Colors.title },
  statusChipTextSelected: { color: Colors.brand },

  // Filter rows
  rowList: { gap: 12 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    ...cardShadow,
  },
  rowIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: Colors.pageTint,
    alignItems: "center",
    justifyContent: "center",
  },
  rowTextWrap: { flex: 1 },
  rowLabel: { fontSize: 14.5, fontWeight: "600", color: Colors.title },
  rowSublabel: { fontSize: 12, color: Colors.meta, marginTop: 2 },
  rowValue: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.body,
    maxWidth: 130,
  },

  // Bottom actions
  bottomSafe: {
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  bottomBar: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 8,
    gap: 12,
  },
  applyBtn: {
    backgroundColor: Colors.brand,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    ...cardShadow,
  },
  applyBtnText: { color: "#FFFFFF", fontSize: 15.5, fontWeight: "700" },
  resetBtn: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: Colors.brand,
  },
  resetBtnText: { color: Colors.brand, fontSize: 15.5, fontWeight: "700" },
});
