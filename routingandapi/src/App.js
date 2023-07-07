
import {
  Routes,Route,Link,BrowserRouter, HashRouter
} from 'react-router-dom';


import Home from './Navigation/home';
import About
 from './Navigation/about';
import Contact from './Navigation/contact';

function App() {
  return (
<>
<BrowserRouter>
         <div>
         <nav>
             <ul>
               <li>
                <Link to="/">Home</Link>
               </li>
               <li>
                 <Link to="/About">About</Link>
               </li>
               <li>
                 <Link to="/Contact">Contact</Link>
               </li>
             </ul>
           </nav>

           <hr />
            <Routes>
               {/* <Route exact path="/" element={<Home />} />
               <Route path="/about" element={<About />} />
               <Route path="/contact" element={<Contact />} />
               <Route path="/user/:id" element={<User/>} /> */}
           </Routes> 
          
         </div>
    </BrowserRouter>


</>
  );
}

export default App;
