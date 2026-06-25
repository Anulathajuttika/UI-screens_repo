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

/** Ticket status timeline — "Reached" state. Self-contained, no external assets. */

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
  greenBorder: "#CDEBDA",
  red: "#E5484D",
  redSoftBg: "#FBE6E7",
  lavender: "#EFEBFA",
  pillBorder: "#D9D2F2",
  nodeGray: "#C8C8D2",
  lineGray: "#E2E2EA",
};

type StepStatus = "completed" | "active" | "pending";

type Step = {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  time?: string;
  status: StepStatus;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  showContactPills?: boolean;
  showReachedCard?: boolean;
};

const STEPS: Step[] = [
  {
    id: "ticket-created",
    title: "Ticket Created",
    date: "May 24, 2025",
    time: "10:33 AM",
    status: "completed",
    icon: "ticket-confirmation-outline",
  },
  {
    id: "assigned",
    title: "Assigned to Technician",
    subtitle: "Ramesh Kumar",
    date: "May 24, 2025",
    time: "10:34 AM",
    status: "completed",
    icon: "account",
    showContactPills: true,
  },
  {
    id: "accepted",
    title: "Technician Accepted",
    date: "May 24, 2025",
    time: "10:35 AM",
    status: "completed",
    icon: "cog",
  },
  {
    id: "on-the-way",
    title: "On The Way",
    date: "May 24, 2025",
    time: "10:50 AM",
    status: "completed",
    icon: "navigation-variant",
  },
  {
    id: "reached",
    title: "Reached",
    date: "May 24, 2025",
    time: "11:05 AM",
    status: "active",
    icon: "map-marker",
    showReachedCard: true,
  },
  {
    id: "work-in-progress",
    title: "Work In Progress",
    status: "pending",
    icon: "wrench",
  },
  {
    id: "completed",
    title: "Completed",
    status: "pending",
    icon: "check",
  },
];

function TimelineNode({
  step,
  isLast,
}: {
  step: Step;
  isLast: boolean;
}) {
  const lineColor =
    step.status === "completed" || step.status === "active"
      ? Colors.green
      : Colors.lineGray;
  return (
    <View style={styles.nodeColumn}>
      {step.status === "completed" ? (
        <View style={[styles.node, styles.nodeGreen]}>
          <MaterialCommunityIcons name={step.icon} size={15} color="#FFFFFF" />
        </View>
      ) : step.status === "active" ? (
        <View style={styles.nodeActiveWrap}>
          <View style={[styles.node, styles.nodeGreen]}>
            <Ionicons name="location" size={16} color="#FFFFFF" />
          </View>
        </View>
      ) : (
        <View style={[styles.node, styles.nodePending]}>
          <MaterialCommunityIcons
            name={step.icon}
            size={14}
            color={Colors.nodeGray}
          />
        </View>
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
        <Ionicons name="chatbubble-outline" size={13} color={Colors.brand} />
        <Text style={styles.contactPillText}>chat</Text>
      </Pressable>
      <Pressable
        testID="call-pill"
        onPress={() => {}}
        style={({ pressed }) => [styles.contactPill, pressed && styles.pressed]}
      >
        <Ionicons name="call" size={13} color={Colors.brand} />
        <Text style={styles.contactPillText}>call</Text>
      </Pressable>
    </View>
  );
}

function ReachedCard() {
  return (
    <View style={styles.reachedCard} testID="reached-card">
      <View style={styles.reachedIconWrap}>
        <Ionicons name="checkmark" size={14} color="#FFFFFF" />
      </View>
      <View style={styles.reachedText}>
        <Text style={styles.reachedTitle}>
          Technician has reached your location.
        </Text>
        <Text style={styles.reachedSubtitle}>
          Our technician will contact you shortly.
        </Text>
      </View>
    </View>
  );
}

function TimelineStep({ step, isLast }: { step: Step; isLast: boolean }) {
  return (
    <View style={styles.stepRow} testID={`timeline-step-${step.id}`}>
      <TimelineNode step={step} isLast={isLast} />
      <View style={styles.stepContent}>
        <View style={styles.stepTitleRow}>
          <View style={styles.stepTitleText}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            {step.subtitle ? (
              <Text style={styles.stepTitle}>{step.subtitle}</Text>
            ) : null}
          </View>
          {step.showContactPills ? <ContactPills /> : null}
        </View>
        {step.date && step.time ? (
          <Text style={styles.stepMeta}>
            {step.date} • {step.time}
          </Text>
        ) : null}
        {step.showReachedCard ? <ReachedCard /> : null}
      </View>
    </View>
  );
}

export default function ReachedScreen() {
  return (
    <View style={styles.root} testID="reached-screen">
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
        <View style={styles.timeline} testID="timeline">
          {STEPS.map((step, idx) => (
            <TimelineStep
              key={step.id}
              step={step}
              isLast={idx === STEPS.length - 1}
            />
          ))}
        </View>
      </ScrollView>
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
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 28 },

  ticketRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
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
  node: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  nodeGreen: { backgroundColor: Colors.green },
  nodeActiveWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.greenSoftBg,
    alignItems: "center",
    justifyContent: "center",
  },
  nodePending: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: Colors.nodeGray,
  },
  connector: { width: 2, flex: 1, marginTop: 2, marginBottom: 2 },

  stepContent: { flex: 1, paddingLeft: 12, paddingBottom: 24 },
  stepTitleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  stepTitleText: { flexShrink: 1 },
  stepTitle: {
    fontSize: 15.5,
    fontWeight: "700",
    color: Colors.title,
    lineHeight: 21,
  },
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
    backgroundColor: Colors.lavender,
  },
  contactPillText: { color: Colors.brand, fontSize: 12.5, fontWeight: "600" },

  reachedCard: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: Colors.greenSoftBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.greenBorder,
    padding: 14,
  },
  reachedIconWrap: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.green,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  reachedText: { flex: 1 },
  reachedTitle: {
    fontSize: 13.5,
    fontWeight: "700",
    color: Colors.green,
    lineHeight: 19,
  },
  reachedSubtitle: { fontSize: 12.5, color: Colors.body, marginTop: 3, lineHeight: 18 },

  pressed: { opacity: 0.85 },
});
