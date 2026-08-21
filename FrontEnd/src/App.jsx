import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
export const serverUrl="http://localhost:3501"
function App(){
  return(
   <>
      <Navbar/>
      <Home/>
      <Footer/>
   </>
  )
}

export default App;
