import React from 'react'

export default function MainContent({ children }) {
  return (
    <section className="bg-base-100 p-6 rounded-lg shadow-md">
      {children}
    </section>
  )
}
