import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
export const serverUrl="https://portfolio-nzqe.onrender.com"
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
