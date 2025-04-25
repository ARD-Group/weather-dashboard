# Weather Dashboard

A modern weather dashboard built with React, TypeScript, and Tailwind CSS. This project provides a beautiful and responsive interface for viewing weather information.

## 🚀 Features

- Modern UI with Tailwind CSS
- TypeScript for type safety
- Storybook for component documentation
- Husky for git hooks
- Commitlint for conventional commits
- Responsive design
- Component-based architecture

## 📋 Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm

## 🛠️ Installation

1. Clone the repository:

```bash
git clone [your-repo-url]
cd weather-dashboard
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Create a `.env` file based on `example.env`:

```bash
cp example.env .env
```

## 🏃‍♂️ Running the Project

### Development Server

```bash
pnpm start
# or
npm start
```

This will start the development server at `http://localhost:3000`

### Storybook

```bash
pnpm storybook
# or
npm run storybook
```

This will start Storybook at `http://localhost:6006`

### Building for Production

```bash
pnpm build
# or
npm run build
```

### Running Tests

```bash
pnpm test
# or
npm test
```

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
├── web-building-blocks/ # Core UI components
├── styles/            # Global styles and Tailwind configuration
├── App.tsx            # Main application component
├── index.tsx          # Application entry point
└── setupTests.ts      # Test configuration

.storybook/            # Storybook configuration
public/                # Static assets
```

## 🧪 Testing

The project uses Jest and React Testing Library for testing. Run tests with:

```bash
pnpm test
# or
npm test
```

## 🔧 Git Hooks

This project uses Husky and Commitlint to enforce commit message conventions. Make sure your commit messages follow the conventional commit format:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for code style changes
- `refactor:` for code refactoring
- `test:` for test-related changes
- `chore:` for maintenance tasks

## 📚 Tech Stack

- React 19
- TypeScript
- Tailwind CSS
- Storybook
- Jest
- React Testing Library
- Husky
- Commitlint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
