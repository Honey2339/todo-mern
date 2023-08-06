import React from "react"
import { Box, ChakraProvider, Text, theme } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import "./NavBar.css"

delete theme.styles.global

function Navbar() {
  return (
    <div>
      <div className="nav-component">
        <h3>
          <Link to="/" className="home-btn">
            Home
          </Link>
        </h3>
        <h3>
          <Link to="/todo" className="checker-btn">
            Todo
          </Link>
        </h3>
      </div>
    </div>
  )
}

export default Navbar
