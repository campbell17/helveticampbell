# Substack Integration Guide

This document explains how to set up the Substack API integration for the portfolio website.

## Overview

The portfolio website uses the [Substack API](https://substackapi.dev) to fetch and display your recent Substack posts in the "Recent Writing" section of the homepage. This integration allows you to keep your portfolio website updated with your latest writing without manual updates.

## Configuration

### 1. Environment Variables

You need to set the following environment variables:

- `NEXT_PUBLIC_SUBSTACK_URL`: Your Substack publication URL (e.g., `yourdomain.substack.com`)
- `SUBSTACK_API_KEY`: Your Substack API key (secured on the server-side)

### 2. Get a Substack API Key

1. Visit [Substack API Developer Portal](https://auth.substackapi.dev/)
2. Sign in and generate an API key
3. Copy the API key and add it to your environment variables

### 3. Setting Environment Variables

#### For Development

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_SUBSTACK_URL=yourdomain.substack.com
SUBSTACK_API_KEY=your_api_key_here
```

#### For Production

Add these environment variables to your hosting platform (Vercel, Netlify, etc.).

## How It Works

1. The website makes a request to your server-side API endpoint `/api/substack-posts`
2. The server-side endpoint securely adds your API key and makes a request to the Substack API
3. The Substack posts are returned to the client and displayed in the "Recent Writing" section

## Customization

### Changing the Number of Posts

You can modify the number of posts displayed by changing the `limit` parameter in `app/page.tsx`:

```typescript
const { posts, isLoading, error } = useSubstackPosts({
  publicationUrl: config.substackUrl,
  limit: 5  // Change this number to display more or fewer posts
});
```

### Styling

The Substack posts are displayed using the `SubstackPostItem` component in `app/components/SubstackPostItem.tsx`. You can modify this component to change how posts are displayed.

## Fallback Behavior

If the Substack API is unavailable or returns an error, the website will automatically fall back to displaying the local essays defined in `app/data/essays.ts`. 