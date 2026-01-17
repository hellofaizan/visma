# Visma - Prisma Schema Visualizer

> **Visualize your Prisma database schemas as beautiful, interactive diagrams**

Visma is a web-based tool that transforms your Prisma schema code into visual database diagrams. Write your Prisma schema on the left, and watch it come to life as an interactive diagram on the right. Perfect for understanding database relationships, sharing schemas with your team, or learning Prisma.

![Visma Preview](https://flavortown.hackclub.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsiZGF0YSI6Njc0NTYsInB1ciI6ImJsb2JfaWQifX0=--2721e7d956a5ab11f8a7bb08523d942ce836341a/ChatGPT%20Image%20Jan%2015,%202026,%2010_44_44%20PM.png)

## ✨ What is Visma?

Have you ever looked at a Prisma schema file and wished you could see how all your database tables connect? Visma does exactly that! It's like having a visual map of your database structure.

**For Developers:**
- Quickly understand complex database relationships
- Share visual schemas with your team
- Validate Prisma schemas in real-time
- Export diagrams for documentation

**For Everyone:**
- No database knowledge required to understand the visual diagrams
- See how data connects in an intuitive way
- Great for learning how databases work

## 🚀 Features

- **📝 Live Code Editor** - Write and edit Prisma schemas with syntax highlighting
- **🎨 Interactive Diagrams** - Beautiful, draggable node-based visualizations
- **🔗 Relationship Mapping** - See how your models connect with labeled relationships
- **📊 Automatic Layout** - Smart positioning of models and enums
- **🔄 Real-time Updates** - Click "Convert to Diagram" to see your changes instantly
- **📏 Resizable Panels** - Drag the divider to adjust editor and diagram sizes
- **✅ Schema Validation** - Get instant feedback on your Prisma schema syntax
- **🎯 Hover Highlights** - Hover over nodes to see their connections light up

## 🎯 Quick Start

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hellofaizan/visma.git
   cd visma
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

That's it! You should see Visma running with a sample Prisma schema already loaded.

## 📖 How to Use

1. **Edit the Schema** - The left panel contains a code editor with a sample Prisma schema. You can edit it directly.

2. **Convert to Diagram** - Click the "Convert to Diagram" button at the bottom of the editor panel.

3. **Explore the Diagram** - The right panel shows your database structure:
   - **Model Nodes** (white boxes) represent your database tables
   - **Enum Nodes** (green boxes) show your enum types
   - **Lines** connect related models and show relationship types (1-to-1, 1-to-many, etc.)

4. **Interact** - You can:
   - Drag nodes around to rearrange them
   - Hover over nodes to highlight their connections
   - Resize panels by dragging the divider between editor and diagram

5. **Fix Errors** - If your schema has errors, they'll be highlighted in the editor with helpful messages.

## 🛠️ Tech Stack

Visma is built with modern web technologies:

- **[Next.js 16](https://nextjs.org/)** - React framework for the web
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Monaco Editor](https://microsoft.github.io/monaco-editor/)** - The editor that powers VS Code
- **[React Flow](https://reactflow.dev/)** - Interactive node-based diagrams
- **[Dagre](https://github.com/dagrejs/dagre)** - Automatic graph layout
- **[Prisma Internals](https://www.prisma.io/)** - Prisma schema parsing
- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS

## 📁 Project Structure

```
visma/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── api/          # API routes (Prisma parsing)
│   │   └── page.tsx      # Main page with resizable layout
│   ├── components/       # React components
│   │   ├── EditorPanel.tsx    # Monaco editor component
│   │   ├── DIagramPanel.tsx   # React Flow diagram component
│   │   ├── nodes/        # Custom node components
│   │   └── layout/       # Graph layout utilities
│   ├── lib/              # Utility functions
│   │   └── prismalang.ts # Prisma syntax highlighting
│   └── store/            # State management
│       └── schema.ts     # Zustand store
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## 🎨 Example Schema

Here's a sample Prisma schema you can try:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  profile   Profile?
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String?
  user   User   @relation(fields: [userId], references: [id])
  userId Int    @unique
}
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

The easiest way to deploy Visma is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel will automatically detect Next.js and deploy

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## 🤝 Contributing

Contributions are welcome! Whether it's:
- 🐛 Bug reports
- 💡 Feature suggestions
- 📝 Documentation improvements
- 🔧 Code contributions

Please feel free to open an issue or submit a pull request.

## 📄 License

This project is open source. Check the repository for license details.

## 🙏 Acknowledgments

- Built with [Prisma](https://www.prisma.io/) - The modern database toolkit
- Inspired by the need for better schema visualization tools
- Thanks to all the amazing open-source libraries that make this possible

## 📞 Support

- 🐛 Found a bug? [Open an issue](https://github.com/hellofaizan/visma/issues)
- 💬 Have a question? [Start a discussion](https://github.com/hellofaizan/visma/discussions)
- ⭐ Like this project? Give it a star!

---

**Made with ❤️ by [Mohammad Faizan](https://mohammadfaizan.com)**
**Sponsor 💲 [Github Sponsor](https://github.com/sponsors/hellofaizan)**
