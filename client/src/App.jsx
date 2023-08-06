import Home from "./components/Home.jsx"
import Todo from "./components/Todo.jsx"
import Navbar from "./components/Navbar.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="router-container">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
