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
import { Ionicons } from "@expo/vector-icons";

/** Work Completed / My Tickets timeline screen. Self-contained, no external assets. */

const Colors = {
  headerTop: "#7C5FCC",
  headerBottom: "#6A4DBB",
  brand: "#6A4DBB",
  background: "#FFFFFF",
  cardBorder: "#ECECF2",
  title: "#1C1B2E",
  body: "#6E6E7A",
  meta: "#9A9AA5",
  green: "#2AA457",
  greenSoftBg: "#E5F6EE",
  greenBorder: "#BFE6CF",
  star: "#F5A623",
  red: "#E5484D",
  redSoftBg: "#FBE6E7",
  lavender: "#EFEBFA",
  lavenderBorder: "#D9D2F2",
  pillBorder: "#D9D2F2",
  lineGreen: "#2AA457",
};

type Step = {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  time: string;
  highlight?: boolean;
  showContactPills?: boolean;
};

const STEPS: Step[] = [
  {
    id: "ticket-created",
    title: "Ticket Created",
    date: "May 24, 2025",
    time: "10:33 AM",
  },
  {
    id: "assigned",
    title: "Assigned to Technician",
    subtitle: "Ramesh Kumar",
    date: "May 24, 2025",
    time: "10:34 AM",
    showContactPills: true,
  },
  {
    id: "accepted",
    title: "Technician Accepted",
    date: "May 24, 2025",
    time: "10:35 AM",
  },
  {
    id: "on-the-way",
    title: "On The Way",
    date: "May 24, 2025",
    time: "10:50 AM",
  },
  {
    id: "reached",
    title: "Reached",
    date: "May 24, 2025",
    time: "11:05 AM",
  },
  {
    id: "work-in-progress",
    title: "Work In Progress",
    date: "May 24, 2025",
    time: "11:10 AM",
  },
  {
    id: "work-completed",
    title: "Work Completed",
    date: "May 24, 2025",
    time: "11:45 AM",
    highlight: true,
  },
];

const SERVICE_STATS: { id: string; label: string; value: string; stars?: boolean }[] = [
  { id: "issue-resolved", label: "Issue Resolved", value: "Yes" },
  { id: "service-quality", label: "Service Quality", value: "5.0", stars: true },
  { id: "total-time", label: "Total Time Taken", value: "1h 12m" },
];

function TimelineNode({
  highlight,
  isLast,
}: {
  highlight: boolean;
  isLast: boolean;
}) {
  return (
    <View style={styles.nodeColumn}>
      <View style={[styles.node, highlight && styles.nodeHighlight]}>
        <Ionicons
          name={highlight ? "checkmark-done" : "checkmark"}
          size={highlight ? 18 : 16}
          color="#FFFFFF"
        />
      </View>
      {!isLast && <View style={styles.connector} />}
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

function Stars({ size = 13 }: { size?: number }) {
  return (
    <View style={styles.starsRow} testID="service-quality-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <Ionicons key={i} name="star" size={size} color={Colors.star} />
      ))}
    </View>
  );
}

function CompletionCard() {
  return (
    <View style={styles.completionCard} testID="completion-card">
      <View style={styles.completionHeaderRow}>
        <View style={styles.completionCheck}>
          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
        </View>
        <View style={styles.completionHeaderText}>
          <Text style={styles.completionTitle}>
            Great! Your AC service is completed.
          </Text>
          <Text style={styles.completionBody}>
            Our technician has completed the service successfully.
          </Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        {SERVICE_STATS.map((s) => (
          <View key={s.id} style={styles.statItem} testID={`stat-${s.id}`}>
            <Text style={styles.statLabel}>{s.label}</Text>
            {s.stars ? (
              <View style={styles.statValueRow}>
                <Stars />
                <Text style={styles.statValue}>{s.value}</Text>
              </View>
            ) : (
              <Text style={styles.statValue}>{s.value}</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

function OtpCard() {
  return (
    <View style={styles.otpCard} testID="otp-card">
      <View style={styles.otpMessageRow}>
        <View style={styles.otpLockWrap}>
          <Ionicons name="lock-closed" size={16} color={Colors.brand} />
        </View>
        <Text style={styles.otpMessage}>
          To close this ticket, please share the OTP with the technician.
        </Text>
      </View>
      <Pressable
        testID="view-otp-button"
        onPress={() => {}}
        style={({ pressed }) => [styles.otpButton, pressed && styles.pressed]}
      >
        <Ionicons name="lock-closed" size={16} color="#FFFFFF" />
        <Text style={styles.otpButtonText}>View OTP</Text>
      </Pressable>
    </View>
  );
}

function TimelineStep({ step, isLast }: { step: Step; isLast: boolean }) {
  return (
    <View style={styles.stepRow} testID={`timeline-step-${step.id}`}>
      <TimelineNode highlight={!!step.highlight} isLast={isLast} />
      <View style={styles.stepContent}>
        <View style={styles.stepTitleRow}>
          <View style={styles.stepTitleText}>
            <Text
              style={[styles.stepTitle, step.highlight && styles.stepTitleHighlight]}
            >
              {step.title}
            </Text>
            {step.subtitle ? (
              <Text style={styles.stepTitle}>{step.subtitle}</Text>
            ) : null}
          </View>
          {step.showContactPills ? <ContactPills /> : null}
        </View>
        <Text style={styles.stepMeta}>
          {step.date} • {step.time}
        </Text>
        {step.highlight ? <CompletionCard /> : null}
        {step.highlight ? <OtpCard /> : null}
      </View>
    </View>
  );
}

export default function WorkCompletedScreen() {
  return (
    <View style={styles.root} testID="work-completed-screen">
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
        testID="work-completed-scroll"
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
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "700" },

  scroll: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 28 },

  ticketRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
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
    backgroundColor: Colors.green,
  },
  nodeHighlight: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: Colors.greenBorder,
  },
  connector: {
    width: 2,
    flex: 1,
    marginTop: 2,
    marginBottom: 2,
    backgroundColor: Colors.lineGreen,
  },

  stepContent: { flex: 1, paddingLeft: 12, paddingBottom: 22 },
  stepTitleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  stepTitleText: { flexShrink: 1 },
  stepTitle: { fontSize: 15.5, fontWeight: "700", color: Colors.title, lineHeight: 21 },
  stepTitleHighlight: { color: Colors.green },
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

  completionCard: {
    marginTop: 14,
    backgroundColor: Colors.greenSoftBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.greenBorder,
    padding: 14,
  },
  completionHeaderRow: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  completionCheck: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.green,
    alignItems: "center",
    justifyContent: "center",
  },
  completionHeaderText: { flex: 1 },
  completionTitle: { fontSize: 14.5, fontWeight: "800", color: Colors.green, lineHeight: 20 },
  completionBody: { fontSize: 12.5, color: Colors.body, marginTop: 4, lineHeight: 18 },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 8,
  },
  statItem: { flex: 1 },
  statLabel: { fontSize: 11, color: Colors.body, marginBottom: 4 },
  statValue: { fontSize: 13, fontWeight: "700", color: Colors.title },
  statValueRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  starsRow: { flexDirection: "row" },

  otpCard: {
    marginTop: 14,
    backgroundColor: Colors.lavender,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.lavenderBorder,
    padding: 14,
  },
  otpMessageRow: { flexDirection: "row", gap: 10, alignItems: "center" },
  otpLockWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  otpMessage: { flex: 1, fontSize: 12.5, color: Colors.body, lineHeight: 18 },
  otpButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.brand,
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 14,
  },
  otpButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },

  pressed: { opacity: 0.85 },
});
