# User Profile Sample

A small React application that demonstrates a user profile component by fetching data from randomuser.me and using that TanStack Query all the kids are talking about for data fetching and state management. And, its in TypeScript because everyone likes that too.

## Features

- User profile display with avatar, name, and email
- Data fetching from Random User API
- Loading and error states

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd user-profile-sample
```

2. Install dependencies:
```bash
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Project Structure

```
user-profile-sample/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── UserProfile.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
└── README.md
```

## Technologies Used

- React 18
- TypeScript
- TanStack Query
- CSS

## API Used

The application uses the [Random User API](https://randomuser.me/) to fetch user data.