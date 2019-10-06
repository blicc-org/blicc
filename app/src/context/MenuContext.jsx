import React, { createContext, useState } from 'react'

export const INITIAL_MENU_STATE = {
  open: false,
}

export const MenuContext = createContext()
export const { Consumer: MenuConsumer } = MenuContext

export function MenuProvider({ children }) {
  const [menuState, setMenuState] = useState(INITIAL_MENU_STATE)

  return (
    <MenuContext.Provider value={[menuState, setMenuState]}>
      {children}
    </MenuContext.Provider>
  )
}
