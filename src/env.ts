import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const nodeEnv = z.enum(['development', 'production', 'test'])

function requiredOnEnv(env: z.infer<typeof nodeEnv>) {
  return (value: any) => {
    if (env === 'production' && !value) {
      return false
    }

    return true
  }
}

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    CLOUDFLARE_ACCOUNT_ID: z.string(),
    CLOUDFLARE_ACCESS_KEY: z.string(),
    CLOUDFLARE_SECRET_KEY: z.string(),
    CLOUDFLARE_BUCKET_NAME: z.string(),
    OPENAI_API_KEY: z.string(),
    PANDAVIDEO_API_KEY: z.string(),
    NEXTAUTH_URL: z.string().optional(),
    NEXTAUTH_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    // QSTASH_TOKEN: z.string().refine(requiredOnEnv('production')),
    // QSTASH_CURRENT_SIGNING_KEY: z.string().refine(requiredOnEnv('production')),
    // QSTASH_NEXT_SIGNING_KEY: z.string().refine(requiredOnEnv('production')),
  },
  client: {
    NEXT_PUBLIC_VERCEL_URL: z.string().url().min(1),
  },
  shared: {
    NODE_ENV: nodeEnv,
    VERCEL_ENV: z
      .enum(['production', 'preview', 'development'])
      .default('development'),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
  },
})
