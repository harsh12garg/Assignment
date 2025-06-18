# Form Builder Application

A modern, dynamic form builder application built with React, TypeScript, and Vite. This application allows users to create, preview, and manage various types of forms with a beautiful and responsive user interface.

## Features

- **Dynamic Form Building**: Create and customize forms using different templates
- **Multiple Form Templates**:
  - Basic Details Form
  - Document Collection Form
  - Interview Availability Form
  - Statement of Purpose Form
- **Modern UI Components**: Built using Shadcn UI library
- **Responsive Design**: Mobile-friendly interface with custom hooks for device detection
- **Type-Safe**: Built with TypeScript for better development experience

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI Components
- Bun Package Manager

## Project Structure

```
src/
├── components/          # React components
│   ├── forms/          # Form template components
│   └── ui/             # UI components from Shadcn
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and API
├── pages/              # Page components
└── types/              # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- Bun package manager

### Installation

1. Clone the repository
2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

The application will be available at `http://localhost:5173`

## Development

### Available Scripts

- `bun run dev`: Start development server
- `bun run build`: Build for production
- `bun run preview`: Preview production build
- `bun run lint`: Run ESLint

### Project Configuration

- `vite.config.ts` - Vite configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `components.json` - Shadcn UI components configuration

## Features Breakdown

### Form Builder
The core functionality that allows users to create and customize forms. Located in `src/components/FormBuilder.tsx`.

### Form Preview
Preview functionality for created forms, showing how they will appear to end users. Found in `src/components/FormPreview.tsx`.

### Form Templates
Pre-built form templates for different use cases:
- Basic Details Collection
- Document Upload
- Interview Scheduling
- Statement of Purpose

### UI Components
A comprehensive set of UI components built with Shadcn UI, including:
- Forms and Input fields
- Dialog boxes and Modals
- Navigation components
- Interactive elements (Buttons, Dropdowns, etc.)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
