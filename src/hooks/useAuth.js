import { useEffect, useState } from 'react'
import { getSession, onAuthChange, signOut } from '../services/authService.js'

// Situação do login. status: 'loading' | 'authenticated' | 'unauthenticated'.
export function useAuth() {
  const [session, setSession] = useState(undefined) // undefined = ainda verificando

  useEffect(() => {
    let active = true
    getSession().then((current) => {
      if (active) setSession(current)
    })
    const stopListening = onAuthChange((current) => {
      if (active) setSession(current)
    })
    return () => {
      active = false
      stopListening()
    }
  }, [])

  const status = session === undefined ? 'loading' : session ? 'authenticated' : 'unauthenticated'

  return { status, user: session?.user ?? null, signOut }
}
