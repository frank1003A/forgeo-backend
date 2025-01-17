export const configuration = () => ({
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    jwtSecret: process.env.SUPABASE_JWT_SECRET,
  },
});
