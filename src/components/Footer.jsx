import React from 'react'

const Footer = () => {
  return (
    <>
    {/* Footer */}
      <footer className="bg-indigo-700 py-6 text-center text-white">
        <p>
    © {new Date().getFullYear()} Resume Analyzer. All rights reserved.
  </p>
      </footer>
    </>
  )
}

export default Footer