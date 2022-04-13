import './App.css';
import Employee from './pages/Employee/Employee';
import AddEmployee from './pages/Admin/AddEmployee';
import Comptable from './pages/Comptable/Comptable';
import Admin from './pages/Admin/Admin';
import SeeUsers from './pages/Admin/SeeUsers';
import Private from './pages/Employee/Protected';
import Home from './pages/Home';
import ProtectedComptable from './pages/Comptable/ProtectedComptable';
import ProtectedAdmin from './pages/Admin/ProtectedAdmin';
import {Routes,Route} from 'react-router-dom'




function App() {

  return (
        <>
        
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/private' element={<Private/>}>
                <Route path='/private/employee' element={<Employee/>}/>
            </Route>
            <Route path='/private-comptable' element={<ProtectedComptable/>}>
                <Route path='/private-comptable/comptable' element={<Comptable/>} />
            </Route>
            <Route path='/private-admin' element={<ProtectedAdmin/>} >
              <Route path='/private-admin/admin' element={<Admin/>}/>
              <Route path='/private-admin/users' element={<SeeUsers/>}/>
              <Route path='/private-admin/add-employee' element={<AddEmployee/>}/>
            </Route>
            <Route path="*" element={<h1>404 page not Found</h1>} />
          </Routes>
        </>
  );
}

export default App;
