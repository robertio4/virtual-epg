# Virtual EPG

This is a sample Electronic Program Guide (EPG) application built using Vite, React, TypeScript and Vitest for testing and coverage.

## Features

- View TV programming with a new redesign
- Updating every minute and back to now button
- Configuration panel for changing view details (React Context)
- Optimization of EPG data processing through virtualization (TanStack Virtual v3)
- Asynchronous loading and caching of loaded data (SWR)
- Image loading error control
- Generation and packaging of the production build ready for deployment
- Execution of configuration scripts in parallel

PD: It is possible to change the display ratio of the slots by changing the constant SIZE_RATIO, this constant is located in the folder 'src/constants'.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (v14 or higher)
- npm (or yarn)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/robertio4/virtual-epg.git
```

2. Navigate to the project directory:

```bash
cd virtual-epg
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run start
```

This will start the Vite development server on [localhost:3000](http://localhost:3000/)

6. Build for Production:

```bash
npm run build
```

This will create a production-ready build of the application in the `dist` directory.
