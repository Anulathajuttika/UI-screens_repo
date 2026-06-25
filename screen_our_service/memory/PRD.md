# Thank You Screen — PRD

## Overview
Pixel-perfect reverse-engineered React Native screen recreating the uploaded "Thank You" confirmation UI. Single-screen Expo Router app.

## Source of Truth
The provided screenshot is the visual contract. No redesign, no improvements.

## Brand
- Primary brand color normalized to `#6A4DBB` across header, accents, and primary CTA.

## Components (reusable)
- `src/components/ThankYouHeader.tsx` — gradient purple header with back + overflow icons, safe-area aware.
- `src/components/SuccessCheckmark.tsx` — green circle with animated check + radiating ring pulse.
- `src/components/ConfettiBurst.tsx` — Reanimated, seeded confetti burst (rects/circles/streamers).
- `src/components/PrimaryButton.tsx` — rounded purple CTA with pressed state and shadow.

## Screen
- `src/screens/ThankYouScreen.tsx` mounted at route `app/index.tsx`.
- Staggered entrance animations: checkmark spring + ring → title → subtitle → CTA.

## Constants
- `src/constants/colors.ts` — palette including confetti colors and brand purple.
- `src/constants/typography.ts` — H1 / body / button label tokens.
- `src/constants/mockData.ts` — exact text from screenshot.

## Tech Stack
- Expo SDK 54, React Native 0.81, TypeScript
- `expo-linear-gradient`, `@expo/vector-icons`, `react-native-reanimated`, `react-native-safe-area-context`

## Test IDs (kebab-case, by role)
- `thank-you-screen`, `thank-you-header`, `thank-you-back-button`,
  `thank-you-menu-button`, `success-checkmark`, `confetti-burst`,
  `thank-you-title`, `thank-you-subtitle`, `thank-you-back-home-button`,
  `thank-you-content`.

## Out of Scope
- No backend, no navigation flow (single screen per user choice).
- No auth, storage, or external integrations.
