import About from "../Components/About"
import Contact from "../Components/Contact";
import Hero from "../Components/Hero";
import Projects from "../Components/Projects";
import Skills from "../Components/Skills";
function Home(){
    return(
        <div>
              <Hero/>
             <About/>
             <Skills/>
             <Projects/>
             <Contact/>
        </div>
    )
}


export default Home;