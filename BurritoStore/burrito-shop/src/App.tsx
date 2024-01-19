import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Customer } from "./pages/Customer"
import { Employee } from "./pages/Employee"
import { Navbar } from "./components/Navbar"
import "./App.css";
import { ShoppingCartProvider } from "./context/ShoppingCartContext"

function App(){
  return(
    <ShoppingCartProvider>
      <Navbar />
      <Container className ="App">
      <Routes>
        <Route path="/" element={<Customer />}/>
        <Route path="/employee" element={<Employee />}/>
      </Routes>
      </Container>
    </ShoppingCartProvider>
   )
}
export default App
