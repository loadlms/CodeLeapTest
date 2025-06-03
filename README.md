# CodeLeap Network

This is a test project for CodeLeap, developed with React and TypeScript. It's a simple social network where users can create, edit, and delete posts.

## Features

- Simple authentication with username
- Create posts with title and content
- Edit existing posts
- Delete posts
- Real-time post viewing
- Responsive and modern interface
- Automatic date/time formatting for posts

## Requirements

- Node.js (version 14 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Running the project

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The project will be available at `http://localhost:5173`

## Technologies used

- React 18
- TypeScript
- Tailwind CSS for styling
- Axios for HTTP requests
- React Router DOM for routing
- React Query for state management and caching
- Vite as bundler and development server

## Project Structure

```
src/
  ├── components/         # Reusable components
  │   ├── CreatePost.tsx  # Post creation form
  │   ├── EditPostModal.tsx    # Edit modal
  │   └── DeleteConfirmationModal.tsx  # Confirmation modal
  ├── pages/             # Application pages
  │   └── Home.tsx       # Main page
  ├── App.tsx            # Root component
  └── main.tsx           # Entry point
```

## API

The project uses the CodeLeap API available at:
- Base URL: `https://dev.codeleap.co.uk/careers/`

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request 