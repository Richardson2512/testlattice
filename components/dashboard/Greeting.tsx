'use client'

import React from 'react'

interface GreetingProps {
    name: string
}

export function Greeting({ name }: GreetingProps) {
    // Get time of day
    const hour = new Date().getHours()
    const timeGreeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                Hello {name || 'Indie Hacker'}! <span className="animate-wave">👋</span>
            </h1>
            <p className="text-[var(--text-muted)] text-base">
                Quickly scan your projects, search for what you need, and jump back in.
            </p>
            <style jsx>{`
        .animate-wave {
          animation: wave 2.5s infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }
        @keyframes wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
        </div>
    )
}
