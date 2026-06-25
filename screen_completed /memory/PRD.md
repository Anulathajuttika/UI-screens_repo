# PRD — Work Completed Ticket Detail Screen

## Goal
Reverse-engineer a single mobile UI screenshot ("Work Completed" service-ticket detail) into a pixel-perfect React Native (Expo SDK 54 + TypeScript) screen. The screenshot is the single source of truth.

## Scope (this iteration)
- A single screen at `/` rendering the ticket detail.
- No backend integration, no auth — pure UI reverse-engineering.

## Screen anatomy
1. Purple sticky header
   - Back arrow, "My Tickets" title, share icon
   - Ticket ID label + `AC-25874`
   - "High Priority" red pill chip
2. Scrollable content
   - Vertical timeline card with 7 checkmark statuses + timestamps; "Work Completed" highlighted
   - Light-green completion banner with Chat + Call actions
   - Service Summary card (Issue Resolved / Service Quality stars / Total Time Taken)
   - OTP card with lock icon, message, and "View OTP" indigo button

## File structure
```
frontend/
├── app/
│   └── index.tsx                 # main screen
└── src/
    ├── constants/
    │   ├── colors.ts             # design tokens
    │   └── mockData.ts           # verbatim content from screenshot
    └── components/
        ├── TicketHeader.tsx
        ├── StatusTimelineItem.tsx
        ├── CompletionCard.tsx
        ├── ServiceSummary.tsx
        ├── StarRating.tsx
        └── OTPCard.tsx
```

## Tech Stack
- Expo SDK 54, React Native 0.81, TypeScript
- expo-router (file-based routing)
- @expo/vector-icons (Ionicons, MaterialCommunityIcons)
- react-native-safe-area-context

## Design tokens
- Primary purple `#5B3FBF`, Indigo accent `#3F51B5`
- Success green `#22C55E`, completion soft `#E8F5E9`
- Background `#F4F5F9`, Surface `#FFFFFF`
- Border `#ECEDF2`

## Testability
Every interactive element has a `testID` (`back-button`, `share-button`, `ticket-id`, `priority-chip`, `timeline-item-*`, `completion-chat-button`, `completion-call-button`, `view-otp-button`, `service-summary`, `star-rating`).

## Out of scope
- Real OTP retrieval, real chat/call actions (handlers are no-ops)
- Backend, persistence, navigation to other routes
