import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/** Inline palette (house convention: no external imports). */
const Colors = {
  primary: "#5B3CC4",
  successGreen: "#2AA457",
  pageTint: "#F6F5FB",
  cardBorder: "#ECECF2",
  title: "#1C1B2E",
  body: "#6E6E7A",
  meta: "#9A9AA5",
  // Call-screen specific
  bgTop: "#050E24",
  bgMid: "#2A2E3A",
  bgBottom: "#1C1226",
  white: "#FFFFFF",
  whiteSoft: "rgba(255,255,255,0.7)",
  whiteSofter: "rgba(255,255,255,0.65)",
  whiteBorder: "rgba(255,255,255,0.15)",
  declineRed: "#E5484D",
  acceptGreen: "#34C759",
} as const;

/** Mock data for the incoming call. */
const CALL = {
  status: "Incoming Call",
  name: "Alice Johnson",
  number: "+1 (555) 123-4567",
} as const;

type SecondaryActionProps = {
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  testID: string;
};

function SecondaryAction({ label, iconName, testID }: SecondaryActionProps) {
  return (
    <Pressable
      testID={testID}
      style={styles.secondaryItem}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Ionicons name={iconName} size={26} color={Colors.white} />
      <Text style={styles.secondaryLabel}>{label}</Text>
    </Pressable>
  );
}

type PrimaryActionProps = {
  label: string;
  circleColor: string;
  children: React.ReactNode;
  testID: string;
};

function PrimaryAction({
  label,
  circleColor,
  children,
  testID,
}: PrimaryActionProps) {
  return (
    <View style={styles.primaryItem}>
      <Pressable
        testID={testID}
        style={[styles.primaryCircle, { backgroundColor: circleColor }]}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        {children}
      </Pressable>
      <Text style={styles.primaryLabel}>{label}</Text>
    </View>
  );
}

export default function VoipCallScreen() {
  return (
    <View style={styles.root} testID="voip-call-screen">
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <LinearGradient
        colors={[Colors.bgTop, Colors.bgMid, Colors.bgBottom]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView edges={["top", "bottom"]} style={styles.safe}>
        {/* Upper section */}
        <View style={styles.upper}>
          <Text style={styles.statusText}>{CALL.status}</Text>
          <Text style={styles.nameText}>{CALL.name}</Text>
          <Text style={styles.numberText}>{CALL.number}</Text>
          <Image
            source={require("../assets/images/alice.png")}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>

        {/* Spacer pushes the action area toward the bottom third */}
        <View style={styles.spacer} />

        {/* Secondary actions */}
        <View style={styles.secondaryRow}>
          <SecondaryAction
            testID="action-remind"
            label="Remind Me"
            iconName="alarm-outline"
          />
          <SecondaryAction
            testID="action-message"
            label="Message"
            iconName="chatbubble"
          />
        </View>

        {/* Primary actions */}
        <View style={styles.primaryRow}>
          <PrimaryAction
            testID="action-decline"
            label="Decline"
            circleColor={Colors.declineRed}
          >
            <MaterialCommunityIcons
              name="phone-hangup"
              size={30}
              color={Colors.white}
            />
          </PrimaryAction>
          <PrimaryAction
            testID="action-accept"
            label="Accept"
            circleColor={Colors.acceptGreen}
          >
            <Ionicons name="call" size={30} color={Colors.white} />
          </PrimaryAction>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bgTop,
  },
  safe: {
    flex: 1,
    paddingHorizontal: 28,
  },
  upper: {
    alignItems: "center",
    marginTop: 56,
  },
  statusText: {
    fontSize: 15,
    color: Colors.whiteSoft,
    textAlign: "center",
  },
  nameText: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.white,
    textAlign: "center",
    marginTop: 8,
  },
  numberText: {
    fontSize: 16,
    color: Colors.whiteSofter,
    textAlign: "center",
    marginTop: 6,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginTop: 28,
    borderWidth: 2,
    borderColor: Colors.whiteBorder,
  },
  spacer: {
    flex: 1,
  },
  secondaryRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 48,
  },
  secondaryItem: {
    alignItems: "center",
    marginHorizontal: 44,
  },
  secondaryLabel: {
    fontSize: 13,
    color: Colors.white,
    marginTop: 8,
  },
  primaryRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 32,
  },
  primaryItem: {
    alignItems: "center",
    marginHorizontal: 36,
  },
  primaryCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryLabel: {
    fontSize: 14,
    color: Colors.white,
    marginTop: 12,
  },
});
