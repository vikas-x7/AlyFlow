# Aly Flow

**Aly Flow** is a visual thinking and brainstorming tool that allows users to create mind maps, draw ideas freely, and organize complex thoughts on an infinite canvas. It is designed for developers, students, and creators who want to plan ideas visually instead of writing long notes.

<img src="https://res.cloudinary.com/dyv9kenuj/image/upload/v1774117017/Screenshot_from_2026-03-21_23-45-42_sewfdi.png" alt="Dashboard" width="full"/>

## live demo

https://aly-six.vercel.app/

## Features

- Create mind maps
- Infinite canvas for complex ideas
- Freehand drawing with pen tool
- Connect nodes and ideas
- Export mind maps
- Drag, zoom, and navigate canvas
- Useful for brainstorming, system design, notes, and planning

## Goal of the Project

The goal of Aly Flow is to provide a simple and powerful visual workspace where users can think, plan, and organize ideas without limitations of fixed canvas size or rigid note structure.

## Tech Stack

### Frontend

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- React Flow (Mind map & canvas)
- React Icons
- Zustand (State management)
- TanStack React Query (Server state management)
- Axios
- zod

### Backend

- Next.js API Routes
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Bcrypt (Password hashing)

### Tools & Runtime

- Bun (Package manager & runtime)
- ESLint
- PostCSS
- Prisma Migrate

---

## 📦 Installation (Using Bun)

Clone the repository:

```bash
git clone https://github.com/your-username/aly-flow.git
cd aly-flow
```

Install dependencies:

```bash
bun install
```

Setup environment variables:

```bash
.env
```

Run database migrations:

```bash
bunx prisma migrate dev
bunx prisma generate
```

Start the development server:

```bash
bun run dev
```

Build for production:

```bash
bun run build
```

Start production server:

```bash
bun start
```

---

## 🤝 Contributing

Contributions are welcome!
If you want to contribute:

1. Fork the repository
2. Clone your fork
3. Create a new branch
4. Make your changes
5. Commit and push
6. Create a Pull Request

## 📄 License

This project is open-source and available under the MIT License.
