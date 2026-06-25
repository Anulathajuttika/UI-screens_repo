# PRD — Ticket Status Timeline Screen

## Goal
Pixel-perfect React Native recreation of the provided "Reached" mobile UI screenshot — a service ticket live status timeline.

## Screen
- Single screen at `/` (`app/index.tsx`) — `TicketStatusScreen`.

## Components (src/components)
- `TicketHeader` — purple gradient header (top `#5B2BD9` → bottom `#7A3CFF`), rounded bottom corners, back button, 3-dot menu, "AC-25874" ticket id, "AC Repair Service" + "Live tracking enabled", `PriorityBadge` ("High Priority").
- `PriorityBadge` — translucent pill with red dot.
- `TimelineItem` — circular icon (green for completed/active, light-gray ring for pending), connector line, title, optional technician name, date • time, optional Chat/Call chips, optional active green callout, "Now" pill on active step, check decoration on completed steps.
- `ActionChip` — pill with Ionicon + label (Chat, Call).
- `StatusCallout` — soft-green info box for the active step's contextual message.

## Constants
- `colors.ts` — full design token palette extracted from the screenshot.
- `mockData.ts` — full step list with exact strings: "Ticket Created", "Assigned to Technician" (Ramesh Kumar), "Technician Accepted", "On The Way", "Reached" (active with callout text), "Work In Progress", "Completed".

## Tech
- Expo SDK 54, Expo Router, TypeScript, `expo-linear-gradient`, `@expo/vector-icons` (Ionicons), `react-native-safe-area-context`.
- StyleSheet only; no CSS / className / web libs.

## Test IDs
- `ticket-status-screen`, `timeline-card`, `timeline-item-{id}`, `header-back-button`, `header-more-button`, `header-ticket-id`, `priority-badge`, `chip-chat`, `chip-call`, `status-callout`.

## Out of scope
- No backend, no integrations, no authentication. UI-only recreation per problem brief ("Do not redesign", "Do not ask questions").
