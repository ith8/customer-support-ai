Code adapted from Bill Zhang

## Getting Started

First you need to obtain an API key at [openai](https://platform.openai.com/api-keys).

Then install the following dependencies:
* Create new [next app](npx create-next-app@latest)
```bash
npx create-next-app my-nextjs-app
```
Or install node:
```bash
brew install node
```
* To install [openai](https://platform.openai.com/docs/api-reference/introduction):
```bash
pip install openai
```
* To install [mui](https://mui.com/material-ui/getting-started/installation/):
```bash
npm install @mui/material @emotion/react @emotion/styled
```

## Add the API key
* Create .env.local, then add the following:
OPENA_API_KEY = replace-this-with-your-api-key


## Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
