
import './App.css'
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import ListUsers from './pages/ListUsers'
import PrivateRoutes from './utils/PrivateRoute'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={'/signin'}/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/signup' element={<Signup/>}> </Route>
        <Route element={<PrivateRoutes/>}>
          <Route path='/list-user' element={<ListUsers/>}> </Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
