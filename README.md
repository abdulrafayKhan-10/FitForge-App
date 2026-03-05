# FitForge — AI-Powered Fitness Tracker

FitForge is a mobile fitness app built with React Native & Expo that helps you build, track, and optimize your workouts with the help of AI coaching, smart gym discovery, and calendar scheduling. It features a full **dark / light / system theme** toggle and a polished branded UI throughout.

## Screenshots

| Sign In | Sign Up | Home |
|:---:|:---:|:---:|
| ![Sign In](docs/screenshots/sign-in.png) | ![Sign Up](docs/screenshots/sign-up.png) | ![Home](docs/screenshots/home.png) |

| Exercises | Exercise Detail | Active Workout |
|:---:|:---:|:---:|
| ![Exercises](docs/screenshots/exercises.png) | ![Exercise Detail](docs/screenshots/exercise-detail.png) | ![Active Workout](docs/screenshots/active-workout.png) |

| Schedule Workout | Profile |
|:---:|:---:|
| ![Schedule](docs/screenshots/schedule-workout.png) | ![Profile](docs/screenshots/profile.png) |

## Features

- **Authentication** — Secure sign-in / sign-up with Clerk (email + Google OAuth), custom branded hero on auth screens
- **Custom Workouts** — Create fully custom workouts, log sets & reps in real time, and track your active session with a built-in timer
- **Workout History** — Browse completed and scheduled workouts with full session breakdowns; tab-filtered view with scheduled / completed tabs
- **AI Exercise Guidance** — Tap any exercise to get tailored coaching tips powered by Groq AI
- **Nearby Gym Finder** — Detects your location and surfaces the 5 closest fitness centers on an interactive map (Google Places API)
- **Calendar Scheduling** — Schedule upcoming workouts directly into your device's native calendar via a bottom-sheet modal
- **Profile & Photo Upload** — Personalize your profile with a photo from your camera roll; view aggregated fitness stats
- **Dark / Light / System Theme** — Full dark mode support across every screen and component; toggle between Light, System, and Dark in Profile → Appearance; preference persisted via AsyncStorage
- **Push Notifications** — Stay on top of scheduled workouts with native push alerts

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native + Expo SDK 54 |
| Navigation | Expo Router v6 (file-based) |
| Styling | NativeWind 4 (Tailwind CSS for RN) + dark mode |
| Auth | Clerk (`@clerk/clerk-expo`) |
| Content / DB | Sanity CMS |
| Server State | TanStack Query v5 |
| Client State | Zustand |
| AI | Groq API |
| Maps | Google Maps + Google Places API |
| Modals | @gorhom/bottom-sheet v5 |
| Error Tracking | Sentry |
| APIs | Expo API Routes (edge-style serverless) |

## Architecture

FitForge follows **Domain-Driven Design (DDD)** — each feature domain (`auth`, `workouts`, `exercises`, `fitness-centers`, `profile`) owns its own components, hooks, and services under `src/modules/`. Shared UI, utilities, and contexts live in `src/shared/`.

### Theme System

A `ThemeProvider` (in `src/shared/contexts/ThemeContext.tsx`) wraps the app and exposes `useTheme()`. It uses NativeWind's `useColorScheme` under the hood and persists the user's preference (`light | dark | system`) to AsyncStorage under the key `@fitforge_theme`. The Profile screen renders a 3-button Appearance row to switch modes at any time.

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npx expo start
```

Scan the QR code with **Expo Go** (SDK 54) on iOS or Android.

> **Note:** Push notifications require a development build on Android. Use `npx expo run:android` to build locally.

## Environment Variables

Create a `.env` file in the project root:

```
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
EXPO_PUBLIC_SANITY_API_TOKEN=your_sanity_token
EXPO_PUBLIC_GOOGLE_API_KEY=your_google_api_key
GOOGLE_PLACES_API_KEY=your_google_places_key
APP_VARIANT=development
```
