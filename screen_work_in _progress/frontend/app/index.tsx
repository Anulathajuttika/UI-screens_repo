import React from "react";
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

/** Work In Progress / My Tickets timeline screen. Self-contained, no external assets. */

const Colors = {
  headerTop: "#6B4CD6",
  headerBottom: "#5B3CC4",
  brand: "#5B3CC4",
  background: "#FFFFFF",
  cardBorder: "#ECECF2",
  title: "#1C1B2E",
  body: "#6E6E7A",
  meta: "#9A9AA5",
  green: "#2AA457",
  greenSoftBg: "#E5F6EE",
  red: "#E5484D",
  redSoftBg: "#FBE6E7",
  lavender: "#EFEBFA",
  detailBg: "#F8F6FE",
  pillBorder: "#D9D2F2",
  nodeGray: "#C8C8D2",
  lineGray: "#E2E2EA",
};

type StepStatus = "completed" | "active" | "pending";

type Step = {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  time: string;
  status: StepStatus;
  showContactPills?: boolean;
  expanded?: boolean;
};

const STEPS: Step[] = [
  { id: "ticket-created", title: "Ticket Created", date: "May 24, 2025", time: "10:33 AM", status: "completed" },
  {
    id: "assigned",
    title: "Assigned to Technician",
    subtitle: "Ramesh Kumar",
    date: "May 24, 2025",
    time: "10:34 AM",
    status: "completed",
    showContactPills: true,
  },
  { id: "accepted", title: "Technician Accepted", date: "May 24, 2025", time: "10:35 AM", status: "completed" },
  { id: "on-the-way", title: "On The Way", date: "May 24, 2025", time: "10:50 AM", status: "completed" },
  { id: "reached", title: "Reached", date: "May 24, 2025", time: "11:05 AM", status: "completed" },
  {
    id: "work-in-progress",
    title: "Work In Progress",
    date: "May 24, 2025",
    time: "11:10 AM",
    status: "active",
    expanded: true,
  },
  { id: "completed", title: "Completed", date: "May 24, 2025", time: "11:45 AM", status: "pending" },
];

type ActivityStatus = "Completed" | "In Progress" | "Pending";

const CURRENT_ACTIVITY: { id: string; label: string; status: ActivityStatus }[] = [
  { id: "indoor-unit-inspection", label: "Indoor Unit Inspection", status: "Completed" },
  { id: "filter-cleaning", label: "Filter Cleaning", status: "Completed" },
  { id: "gas-pressure-check", label: "Gas Pressure Check", status: "In Progress" },
  { id: "cooling-performance-test", label: "Cooling Performance Test", status: "Pending" },
];

function TimelineNode({
  status,
  isLast,
}: {
  status: StepStatus;
  isLast: boolean;
}) {
  const lineColor = status === "completed" ? Colors.green : Colors.lineGray;
  return (
    <View style={styles.nodeColumn}>
      {status === "completed" ? (
        <View style={[styles.node, styles.nodeGreen]}>
          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
        </View>
      ) : status === "active" ? (
        <View style={[styles.node, styles.nodePurple]}>
          <MaterialCommunityIcons name="wrench" size={15} color="#FFFFFF" />
        </View>
      ) : (
        <View style={[styles.node, styles.nodePending]} />
      )}
      {!isLast && <View style={[styles.connector, { backgroundColor: lineColor }]} />}
    </View>
  );
}

function ContactPills() {
  return (
    <View style={styles.pillRow}>
      <Pressable
        testID="chat-pill"
        onPress={() => {}}
        style={({ pressed }) => [styles.contactPill, pressed && styles.pressed]}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={14} color={Colors.brand} />
        <Text style={styles.contactPillText}>chat</Text>
      </Pressable>
      <Pressable
        testID="call-pill"
        onPress={() => {}}
        style={({ pressed }) => [styles.contactPill, pressed && styles.pressed]}
      >
        <Ionicons name="call" size={14} color={Colors.brand} />
        <Text style={styles.contactPillText}>call</Text>
      </Pressable>
    </View>
  );
}

function ActivityRow({ label, status }: { label: string; status: ActivityStatus }) {
  const isCompleted = status === "Completed";
  const isInProgress = status === "In Progress";
  const statusColor = isCompleted ? Colors.green : isInProgress ? Colors.brand : Colors.meta;
  return (
    <View style={styles.activityRow}>
      <View style={styles.activityLeft}>
        {isCompleted ? (
          <Ionicons name="checkmark-circle" size={18} color={Colors.green} />
        ) : (
          <Ionicons name="time-outline" size={18} color={isInProgress ? Colors.brand : Colors.meta} />
        )}
        <Text style={styles.activityLabel}>{label}</Text>
      </View>
      <Text style={[styles.activityStatus, { color: statusColor }]}>{status}</Text>
    </View>
  );
}

function ProgressDetailCard() {
  return (
    <View style={styles.detailCard} testID="work-progress-detail-card">
      <View style={styles.detailHeaderRow}>
        <View style={styles.detailIconWrap}>
          <MaterialCommunityIcons name="wrench" size={16} color={Colors.brand} />
        </View>
        <View style={styles.detailHeaderText}>
          <Text style={styles.detailTitle}>AC Service In Progress</Text>
          <Text style={styles.detailSubtitle}>
            Our technician is currently diagnosing and servicing your AC unit.
          </Text>
        </View>
      </View>

      <Text style={styles.detailSectionHeading}>Current Activity</Text>
      {CURRENT_ACTIVITY.map((a) => (
        <ActivityRow key={a.id} label={a.label} status={a.status} />
      ))}

      <Text style={[styles.detailSectionHeading, styles.detailSectionSpacer]}>
        Estimated Completion
      </Text>
      <View style={styles.estimateRow}>
        <Ionicons name="time-outline" size={18} color={Colors.brand} />
        <Text style={styles.estimateText}>35 Minutes Remaining</Text>
      </View>

      <View style={styles.detailActions}>
        <Pressable
          testID="call-technician-button"
          onPress={() => {}}
          style={({ pressed }) => [styles.detailActionBtn, pressed && styles.pressed]}
        >
          <Ionicons name="call" size={14} color={Colors.brand} />
          <Text style={styles.detailActionText}>Call Technician</Text>
        </Pressable>
        <Pressable
          testID="chat-button"
          onPress={() => {}}
          style={({ pressed }) => [styles.detailActionBtn, pressed && styles.pressed]}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={14} color={Colors.brand} />
          <Text style={styles.detailActionText}>Chat</Text>
        </Pressable>
        <Pressable
          testID="view-photos-button"
          onPress={() => {}}
          style={({ pressed }) => [styles.detailActionBtn, pressed && styles.pressed]}
        >
          <Ionicons name="camera-outline" size={14} color={Colors.brand} />
          <Text style={styles.detailActionText}>View Photos</Text>
        </Pressable>
      </View>
    </View>
  );
}

function TimelineStep({ step, isLast }: { step: Step; isLast: boolean }) {
  return (
    <View style={styles.stepRow} testID={`timeline-step-${step.id}`}>
      <TimelineNode status={step.status} isLast={isLast} />
      <View style={styles.stepContent}>
        <View style={styles.stepTitleRow}>
          <View style={styles.stepTitleText}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            {step.subtitle ? <Text style={styles.stepTitle}>{step.subtitle}</Text> : null}
          </View>
          {step.showContactPills ? <ContactPills /> : null}
        </View>
        <Text style={styles.stepMeta}>
          {step.date} • {step.time}
        </Text>
        {step.expanded ? <ProgressDetailCard /> : null}
      </View>
    </View>
  );
}

export default function WorkInProgressScreen() {
  return (
    <View style={styles.root} testID="work-in-progress-screen">
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
            <Text style={styles.headerTitle}>My Tickets</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Ticket id + priority */}
        <View style={styles.ticketRow}>
          <Text style={styles.ticketId} testID="ticket-id">
            AC-25874
          </Text>
          <View style={styles.priorityBadge} testID="priority-badge">
            <Text style={styles.priorityText}>High Priority</Text>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timeline}>
          {STEPS.map((step, idx) => (
            <TimelineStep key={step.id} step={step} isLast={idx === STEPS.length - 1} />
          ))}
        </View>
      </ScrollView>

      {/* Bottom action */}
      <SafeAreaView edges={["bottom"]} style={styles.bottomSafe}>
        <Pressable
          testID="track-live-button"
          onPress={() => {}}
          style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
        >
          <Text style={styles.primaryBtnText}>Track Live Status</Text>
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
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 24 },

  ticketRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 18 },
  ticketId: { fontSize: 24, fontWeight: "800", color: Colors.title },
  priorityBadge: {
    backgroundColor: Colors.redSoftBg,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  priorityText: { color: Colors.red, fontSize: 13, fontWeight: "700" },

  timeline: {},

  stepRow: { flexDirection: "row" },
  nodeColumn: { width: 40, alignItems: "center" },
  node: { width: 26, height: 26, borderRadius: 13, alignItems: "center", justifyContent: "center" },
  nodeGreen: { backgroundColor: Colors.green },
  nodePurple: { backgroundColor: Colors.brand },
  nodePending: { backgroundColor: "#FFFFFF", borderWidth: 2, borderColor: Colors.nodeGray },
  connector: { width: 2, flex: 1, marginTop: 2, marginBottom: 2 },

  stepContent: { flex: 1, paddingLeft: 12, paddingBottom: 22 },
  stepTitleRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 8 },
  stepTitleText: { flexShrink: 1 },
  stepTitle: { fontSize: 15.5, fontWeight: "700", color: Colors.title, lineHeight: 21 },
  stepMeta: { fontSize: 13, color: Colors.meta, marginTop: 4 },

  pillRow: { flexDirection: "row", gap: 8 },
  contactPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: Colors.pillBorder,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#FFFFFF",
  },
  contactPillText: { color: Colors.brand, fontSize: 12.5, fontWeight: "600" },

  detailCard: {
    marginTop: 14,
    backgroundColor: Colors.detailBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 14,
  },
  detailHeaderRow: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  detailIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.lavender,
    alignItems: "center",
    justifyContent: "center",
  },
  detailHeaderText: { flex: 1 },
  detailTitle: { fontSize: 15, fontWeight: "800", color: Colors.brand },
  detailSubtitle: { fontSize: 12.5, color: Colors.body, marginTop: 3, lineHeight: 18 },

  detailSectionHeading: { fontSize: 12.5, fontWeight: "700", color: Colors.brand, marginTop: 16, marginBottom: 8 },
  detailSectionSpacer: { marginTop: 18 },

  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  activityLeft: { flexDirection: "row", alignItems: "center", gap: 8, flexShrink: 1 },
  activityLabel: { fontSize: 13.5, color: Colors.title },
  activityStatus: { fontSize: 13, fontWeight: "600" },

  estimateRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  estimateText: { fontSize: 13.5, fontWeight: "700", color: Colors.title },

  detailActions: { flexDirection: "row", gap: 8, marginTop: 16 },
  detailActionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: Colors.pillBorder,
    borderRadius: 12,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  detailActionText: { color: Colors.brand, fontSize: 11.5, fontWeight: "600" },

  bottomSafe: { backgroundColor: Colors.background, paddingHorizontal: 20, paddingTop: 10 },
  primaryBtn: {
    backgroundColor: Colors.brand,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  primaryBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },

  pressed: { opacity: 0.85 },
});
