import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout/Layout";
import Loading from "./components/Loading/Loading";
import ScrollToTop from "./components/Scroll/ScrollToTop";

const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Programs = lazy(() => import("./pages/Programs/Programs"));
const Faculty = lazy(() => import("./pages/Faculty/Faculty"));
const Research = lazy(() => import("./pages/Research/Research"));
const Students = lazy(() => import("./pages/Students/Students"));
const News = lazy(() => import("./pages/News/News"));
const Admissions = lazy(() => import("./pages/Admissions/Admissions"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/research" element={<Research />} />
            <Route path="/students" element={<Students />} />
            <Route path="/news" element={<News />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
