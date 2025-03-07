import React from 'react'

type Props = {
  className?: string
}

const ChatIcon = ({ className }: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 3.5C6.75 3.5 2.5 7.25 2.5 12C2.5 13.75 3 15.25 4 16.5L3 20.5L7 19.5C8.5 20.5 10.25 21 12 21C17.25 21 21.5 17.25 21.5 12.5C21.5 7.75 17.25 3.5 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 11C8.55228 11 9 10.5523 9 10C9 9.44772 8.55228 9 8 9C7.44772 9 7 9.44772 7 10C7 10.5523 7.44772 11 8 11Z"
        fill="currentColor"
      />
      <path
        d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z"
        fill="currentColor"
      />
      <path
        d="M16 11C16.5523 11 17 10.5523 17 10C17 9.44772 16.5523 9 16 9C15.4477 9 15 9.44772 15 10C15 10.5523 15.4477 11 16 11Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default ChatIcon
