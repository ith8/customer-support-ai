# Customer Support AI

**Code adapted from Bill Zhang**

---

## Getting Started

Follow these steps to set up the project:

### 1. Obtain an OpenAI API Key
First, you need to obtain an API key from [OpenAI](https://platform.openai.com/).

### 2. Install Dependencies

#### Option 1: Create a New Next.js App
```bash
npx create-next-app@latest my-nextjs-app
```

#### Option 2: Install Node.js (If you don't have it already)
```bash
brew install node
```

### 3. Install Required Packages

- **OpenAI:**
  ```bash
  pip install openai
  ```

- **Material-UI (MUI):**
  ```bash
  npm install @mui/material @emotion/react @emotion/styled
  ```

### 4. Add the API Key

Create a `.env.local` file in the root directory of your project and add the following:

```env
OPENAI_API_KEY=replace-this-with-your-api-key
```

### 5. Run the Development Server

You can start the server using one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then, open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Editing the Project

You can start editing the page by modifying `app/page.js`. The page auto-updates as you make changes.

This project uses `next/font` to automatically optimize and load Inter, a custom Google Font.

---

## Learn More

To learn more about Next.js, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial.
- [Next.js GitHub Repository](https://github.com/vercel/next.js) - Your feedback and contributions are welcome!

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
