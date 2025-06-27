# HelloAgain Rewards App (Android)

This is a React Native application built with TypeScript for browsing and collecting rewards from the HelloAgain API. The app uses Redux Toolkit for state management and is optimized for Android using React Native CLI.

## Features

- React Native CLI (TypeScript)
- Redux Toolkit integration (`COLLECT_REWARD` action)
- Infinite scroll pagination with FlatList
- Memoized reward cards to avoid unnecessary re-renders
- SafeAreaView used for layout safety
- Error state handling with retry mechanism
- Android-only support

## Screens

### Rewards Catalog

- Displays a list of available rewards fetched from a paginated API.
- Shows reward image, title, and required points.
- If a reward is not collected, a "COLLECT" button is shown.
- If a reward is already collected, it is visually marked and the CTA is hidden.
- Infinite scroll fetches more rewards automatically.
- Safe area boundaries are handled using `SafeAreaView`.

### Collected Rewards

- Displays all rewards that have been collected.
- No need for pagination or scroll optimization.
- Uses Redux store to retrieve collected rewards.


## Tech Stack

- React Native - CLI
- TypeScript
- Redux Toolkit
- React Navigation
- Fetch API for network requests
