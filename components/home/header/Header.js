import React from 'react'

//components
import Logo from './components/Logo'
import Filters from './components/Filters'
import Roadmap from './components/Roadmap'

export default function Header() {
  return (
    <div>
      <Logo />
      <Filters />
      <Roadmap />
    </div>
  )
}
