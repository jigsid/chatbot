// This file forces all pages to be dynamically rendered
// It prevents static site generation errors with Clerk authentication

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0; 