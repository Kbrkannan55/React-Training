import './App.css';
import * as React from 'react';
import AvailableAssessment from './AvailableAssessment'
import Navbars from './Navbar';
import EmpAssessment from './EmpAssessment';
import Settings from './Settings';
import SecretPage from './SecretPage'


function App() {
  return (
    <div>
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet"></link>
      <Navbars />
      {/* <AvailableAssessment/> */}
      <EmpAssessment/>
      {/* <Settings /> */}
      {/* <SecretPage/> */}
    </div>
  );
}

export default App;