> beta-release: [taksedap](https://taksedap.vercel.app)

# Tak Sedap

"Tak Sedap" means not delicious. We simplify the hassle of alerting users to buying from a store that is not just expensive but also not delicious. This use case or problem statement is popular among Malaysians because food stores are everywhere in Klang Valley, but users always get caught up with stores that are not delicacies and expensive.

## Getting started

```bash
# clone project
git clone https://github.com/zulfiqarlaili/taksedap.git

# change directory
cd taksedap

# Install dependency
npm install

```

## Setup

You need to add `.env` file to get all the necessary before running the app. You can get this from [supabase](https://supabase.com/) when you create a project

```
PUBLIC_TABLE_NAME = ''
PUBLIC_BUCKET_NAME = ''
PUBLIC_SUPABASE_STORE_URL = ''
PUBLIC_SUPABASE_PROJECT_URL  = ''
PUBLIC_ANON_KEY = ''
```

## Developing

Start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open

# to start the server and also view it on your mobile
npm run dev -- --host
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Planing features

- [x] adding bullet point for description of store
- [x] setting up `supabase`
- [x] Upload image
- [x] Display list of store
- [x] Display description
- [x] User identifier
- [x] Like and dislike function
- [x] Implementing geofencing
- [x] Feedback submission

## Contribution

I encourage your help to make the application better. Feel free to make a `pull request` for adding new `features` or fixing `bugs`.
