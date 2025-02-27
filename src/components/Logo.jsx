import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div>
      <svg
        width={width}
      
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm2.92-2.92L14.06 6.19l1.41 1.41-8.14 8.14H5.92v-1.41zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}

export default Logo