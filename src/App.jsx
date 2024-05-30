import { useState } from 'react'
import './App.css'
import AddStock from './pages/AddStock'
import ViewStock from './pages/ViewStock'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <ViewStock/>
     {/* <AddStock/> */}
    </>
  )
}

export default App
