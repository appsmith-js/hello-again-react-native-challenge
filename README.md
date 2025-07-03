# HelloAgain Rewards App (Android & iOS)

This is a React Native application built with TypeScript for browsing and collecting rewards from the HelloAgain API. The app uses Redux Toolkit for state management and is optimized using React Native CLI.

## Features

- React Native CLI (TypeScript)
- Redux Toolkit integration (`COLLECT_REWARD` action)
- Infinite scroll pagination with FlatList
- Memoized reward cards to avoid unnecessary re-renders
- Safe area layout using `SafeAreaView`
- Loading and error state handling with retry mechanism
- Android and iOS support

## Screens

### 🎁 Rewards Catalog

- Displays a list of available rewards fetched from a paginated API.
- Shows reward image, title, and required points.
- If a reward is not collected, a `COLLECT` button is shown.
- If already collected, the CTA is hidden and item appearance is visually updated.
- Infinite scroll fetches more rewards on reaching the end.
- Safe area boundaries handled with `SafeAreaView`.

### ✅ Collected Rewards

- Displays a list of rewards that have already been collected.
- Data is fetched from Redux store.
- No pagination or scroll optimizations required.

## Tech Stack

- React Native CLI
- TypeScript
- Redux Toolkit
- React Navigation
- Fetch API

## 🚀 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/appsmith-js/hello-again-react-native-challenge.git
cd hello-again-react-native-challenge
npm install
