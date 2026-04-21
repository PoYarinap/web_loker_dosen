'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Avoid hydration mismatch by only rendering after mount
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="p-2 h-10 w-10" /> // Placeholder
    }

    return (
        <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="btn-ghost group"
            aria-label="Toggle theme"
        >
            {resolvedTheme === 'dark' ? (
                <Sun size={20} className="text-yellow-500 transition-transform group-hover:rotate-45" />
            ) : (
                <Moon size={20} className="text-blue-600 transition-transform group-hover:-rotate-12" />
            )}
        </button>
    )
}
