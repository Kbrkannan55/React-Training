import React, { useState, useEffect } from 'react'
import './Navbar.css';
import { faBars, faChevronDown, faChevronUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from './assests/logo-s.png'
import L_Logo from './assests/Logo-l.png'
import Kanini from './assests/kanini-c.png'
import Dashboard_V from './assests/DashboardVector.png'
import Questions_V from './assests/QuestionsVector.png'
import Jobseeker_V from './assests/JobseekerVector.png'
import Employee_V from './assests/EmployeeVector.png'
import Settings_V from './assests/SettingsVector.png'
import Logout_V from './assests/LogoutVector.png'
import Bell_V from './assests/Bell.png'




const Navbars = (props) => {

  // State variables
  const [click, setClick] = useState(true); // Toggle for Questions section
  const [empClick, setEmpClick] = useState(true); // Toggle for Employee section
  const [menu, setMenu] = useState(false); // Toggle for sidebar menu
  const [activePara, setActivePara] = useState(null); // Track the active paragraph
  // Toggle Questions section and set active paragraph
  const questionToggle = () => {
    setEmpClick(true); // Hide Employee section
    setClick(!click); // Toggle Questions section
    setActivePara(click ? 'assessmentData' : null); // Set active paragraph to 'assessmentData' if click is true, otherwise reset to null
  };
  // Toggle Employee section and set active paragraph
  const toggle = () => {
    setEmpClick(!empClick); // Toggle Employee section
    setClick(true); // Hide Questions section
    setActivePara(click ? 'addQuestions' : null); // Set active paragraph to 'addQuestions' if click is true, otherwise reset to null
  };
  // Toggle sidebar menu
  const sideBar = () => {
    setMenu(!menu);
  };
  // Handle click on a paragraph to set it as active
  const handleParaClick = (paraId) => {
    setActivePara(paraId); // Set the active paragraph
  };
  // Handle click outside of sidebar to deactivate active paragraph
  const handleOutsideClick = (event) => {
    if (!event.target.closest('.sidebar p')) {
      setActivePara(null); // Deactivate the active paragraph
    }
  };
  // Add event listener for outside click and remove it on component unmount
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);




  return (

    <div>
      {/* Main container */}
      <div className="container">
        {/* Sidebar with dynamic class assignment based on 'menu' state */}
        <div className={menu ? "sidebar" : "sidebar hidden-2"} id="nav-links">
          {/* Logo section */}
          <div className="logo-2">
            <img src={Logo} alt="Logo" className="logo-img" width="47px" height="47px" />
            <h3 id="kaniniletter">
              Kanini
              <br />
              <span id="letter">Assessment</span>
            </h3>
            {/* Menu icon with click event to trigger sidebar function */}
            <div className="menu" onClick={sideBar}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
          {/* Dashboard link with click event to handle dashboard selection */}
          <p onClick={() => handleParaClick("dashboard")}
            className={activePara === "dashboard" ? "active" : ""}>
            <img src={Dashboard_V} />
            &emsp;Dashboard
          </p>

          {/* Questions link with toggle function */}
          <p onClick={toggle} >
            <img src={Questions_V} />
            &emsp;Questions &emsp;&emsp;&emsp;
            <FontAwesomeIcon icon={empClick ? faChevronDown : faChevronUp} />
          </p>
          {/* Questions dropdown */}
          <div className={empClick ? "ques hidden" : "ques"} id="ques">
            {/* Add Questions link */}
            <p onClick={() => setActivePara('addQuestions')}
              className={activePara === 'addQuestions' ? 'active' : ''}>Add Questions</p>
            {/* Question bank link */}
            <p onClick={() => handleParaClick("questionbank")}
              className={activePara === "questionbank" ? "active" : ""}>Question bank</p>
          </div>
          {/* Jobseeker link */}
          <p onClick={() => handleParaClick("jobseeker")}
            className={activePara === "jobseeker" ? "active" : ""}>
            <img src={Jobseeker_V} />
            &emsp;Jobseeker
          </p>
          {/* Employee link with toggle function */}
          <p onClick={questionToggle}>
            <img src={Employee_V} />
            &emsp;Employee&emsp;&emsp;&emsp;&nbsp;
            <FontAwesomeIcon icon={click ? faChevronDown : faChevronUp} />
          </p>
          {/* Employee dropdown */}
          <div className={click ? "emp hidden" : "emp"} id="emp">
            {/* Assessment Data link */}
            <p onClick={() => setActivePara('assessmentData')}
              className={activePara === 'assessmentData' ? 'active' : ''}>Assessment Data</p>
            {/* Manage Employee link */}
            <p onClick={() => handleParaClick("manageemployee")}
              className={activePara === "manageemployee" ? "active" : ""}>Manage Employee</p>
          </div>
          {/* Settings link */}
          <p onClick={() => handleParaClick("settings")}
            className={activePara === "settings" ? "active" : ""}>
            <img src={Settings_V} />
            &emsp;Settings
          </p>
          {/* Logo and logout section */}
          <div className="l-logo">
            <img src={L_Logo} className="logo-L" alt="Kanini Logo" width="180px" height="230px" />
            {/* Logout link */}
            <p onClick={() => handleParaClick("logout")}
              className={activePara === "logout" ? "active" : ""}>
              <img src={Logout_V} />
              &emsp;Logout
            </p>
          </div>
        </div>
      </div>


      {/* navbar */}
      <div>
        <div className="navbar">
          <div>
            <p style={{fontWeight:'600',fontSize:'24px'}}>Employee Assessment Data</p>
            <p style={{fontWeight:'400',fontSize:'15px',color:'#A8B0B9',marginTop:'-10px'}}>View complete details of all assessed and its corresponding details of employee</p>
          </div>
          {/* Menu Icon */}
          <div className="menu" onClick={sideBar}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          {/* Heading */}
          <div className='heading'>
            <h3 id='title'>{props.title}<br /><br /><span id='desc'>{props.desc}</span></h3>
          </div>
          {/* Admin Section */}
          <div className="inline">
            <div className="hide-icon" id="hr">
              {/* Bell icon */}
              <img src={Bell_V} id='bell' height='22px' width='22px' />
              {/* Kanini Logo */}
              <span><img className='kanini-c' src={Kanini} alt='kanini' height='48px' width='48px' /></span>
              <span id='admintext'>HR Admin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )

}


export default Navbars;