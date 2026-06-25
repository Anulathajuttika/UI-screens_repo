# PRD — Mobile UI Reverse Engineering: AC Ticket Tracking Screen

## Overview
A pixel-perfect React Native recreation of a single mobile UI screen — a service ticket
tracking timeline for an AC service request (Ticket `AC-25874`).

The uploaded screenshot is the single source of truth. The implementation is a static
UI replica only (no backend, no real integrations). All button taps show an in-app toast.

## Core Functionality
- Single screen at route `/` (Expo Router file-based routing → `app/index.tsx`)
- Purple gradient header with back chevron and title "My Tickets"
- Ticket header row: `AC-25874` + `High Priority` pill
- Vertical timeline with 7 sequential steps:
  1. Ticket Created — May 24, 2025, 10:33 AM
  2. Assigned to Technician — Ramesh Kumar — inline Call/Chat — May 24, 2025, 10:34 AM
  3. Technician Accepted — May 24, 2025, 10:35 AM
  4. On The Way — inline `View on map` pill — May 24, 2025, 10:50 AM
  5. Reached — May 24, 2025, 11:05 AM
  6. Work In Progress (active, with glow) — expanded content card — May 24, 2025, 11:10 AM
  7. Completed — May 24, 2025, 11:45 AM
- The active step (Work In Progress) expands into a rich card:
  - Snowflake badge + "AC Service In Progress" title
  - Description: "Our technician is currently diagnosing and servicing your AC unit:"
  - Current Activity panel with 4 rows
    (Indoor Unit Inspection — Completed, Filter Cleaning — Completed,
     Gas Pressure Check — in-progress dot only, Cooling Performance Test — Pending)
  - Estimated Completion box: "35 Minutes Remaining"
  - Bottom action row: Call Technician (primary), Chat, View Photos
- Animated toast component for any tap

## Architecture
```
app/
  _layout.tsx          (Stack root, SafeAreaProvider, icon-font prewarm — preserved)
  index.tsx            (MyTicketsScreen)
src/
  constants/
    colors.ts          (palette sampled from reference)
    typography.ts      (font size/weight scale)
    mockData.ts        (verbatim ticket + timeline data)
  components/tickets/
    ScreenHeader.tsx          (purple LinearGradient header)
    Pill.tsx                  (priority/completed/pending/in-progress)
    TimelineStep.tsx          (circle + rail + content row)
    WorkInProgressContent.tsx (expanded card for active step)
```

## Tech
- Expo SDK 54, React Native 0.81, TypeScript
- `expo-linear-gradient`, `@expo/vector-icons` (Feather + MaterialCommunityIcons)
- `react-native-safe-area-context`

## Out of Scope
- No backend/API calls
- No real Call/Chat/Map/Photos navigation — toast notifications only
- No additional screens, tabs, or stack navigation

## Future (not requested)
- Multiple tickets list + detail navigation
- Real-time status updates from a backend
- Real `tel:` / `sms:` / map deep links
