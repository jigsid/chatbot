import React from 'react'

type MenuLogoProps = {
  onClick(): void
}

export const MenuLogo = ({ onClick }: MenuLogoProps) => {
  return (
    <div 
      onClick={onClick} 
      className="cursor-pointer p-2 hover:bg-magenta/10 rounded-lg transition-colors group"
    >
      <div className="w-8 h-8 bg-magenta rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-magenta/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-magenta/30">
        SR
      </div>
    </div>
  )
}
