// This file maintains compatibility for any remaining Supabase references
// but is no longer actively used since we switched to the custom API

export const createClient = () => {
  // Return a mock client to prevent errors
  return {
    auth: {
      signUp: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
      signInWithPassword: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
      update: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
      delete: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
    }),
  }
}
