import React, {useState} from 'react';
import PatientsTable from './components/patientsTable/PatientsTable';
import AddPatient from './components/AddPatient/AddPatient';
import './App.less';


const App = () => {
  //Data
  const usersData = [
    { key : 1 , name:"Ramy" , age : 23 , gender:"Male"},
    { key : 2 , name:"Hoda" , age : 24 , gender:"Female"},
  ];
  
  //States setting
  const [users, setUsers] = useState(usersData);
  
  //Crud Operation 
  const addUser = user => {
		user.key = users.length + 1
    setUsers([ ...users, user ])
	}
  
  return (
    <main className="app">
    <AddPatient addUser={addUser}></AddPatient>
    <PatientsTable users={users}></PatientsTable>
  </main>
  )
}

export default App;
