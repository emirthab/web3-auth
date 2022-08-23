import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav" style={{ paddingTop: "15px" }}>
        <Navitem icon={process.env.PUBLIC_URL + "/img/icons/play-icon.png"} header="Play" active={true} />
        <Navitem icon={process.env.PUBLIC_URL + "/img/icons/market-icon.png"} header="Market" active={false} />
        <Navitem icon={process.env.PUBLIC_URL + "/img/icons/create-icon.png"} header="Create" active={false} />
        <Navitem icon={process.env.PUBLIC_URL + "/img/icons/map-icon.png"} header="Map" active={false} />
      </ul>
    </nav>
  )
}

const Navitem = ({ header, icon, active }) => {
  return (
    <li className="navitem" href="index.html" style={active ? { background: "#373f4a" } : {}}>
      <img src={icon} />
      <span style={{ fontSize: "15px" }}>{header}</span>
    </li>
  )
}

export default Navbar;