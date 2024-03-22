
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import ListUsers from './pages/ListUsers'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/signup' element={<Signup/>}> </Route>
        <Route path='/list-user' element={<ListUsers/>}> </Route>
        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
