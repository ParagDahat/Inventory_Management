import { useState } from 'react'
import './App.css'
import AddStock from './pages/AddStock'
import ViewStock from './pages/ViewStock'
import OrderPage from './pages/OrderPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <ViewStock/>
     <AddStock/>
     <OrderPage/>
    </>
  )
}

export default App
