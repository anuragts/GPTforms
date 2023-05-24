## GPT Forms

#### Create forms with AI.

It helps to make forms using a prompt.

#### How to install

```bash

git clone <url>

cd gpt-forms

pnpm i

pnpm dev

pnpm prisma studio

```

Add <b> .env </b> file with the following content:

```
DATABASE_URL=''
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=''
CLERK_SECRET_KEY=''
OPENAI_API_KEY=''
```

#### Important files to contibute 

```

@/pages/form/AI.tsx

@/pages/api/AI/get.ts

@/pages/api/FORM




```