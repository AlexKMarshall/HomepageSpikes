import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Cluster, Box } from "./layout";

import RichTextPage from "./pages/rich-text-page";
import ScrollAnimation from "./pages/scroll-animation";
import ScrollGallery from "./features/scroll-gallery";
import PdfViewer from "./features/pdf-viewer";
import PageSwiper from "./features/page-swiper";

function App() {
  return (
    <Router>
      <Box className="App">
        <nav>
          <Box>
            <Cluster>
              <Link to="/scroll-gallery">Scroll Gallery</Link>
              <Link to="/rich-text-editor">Rich Text Editor</Link>
              <Link to="/scroll-animation">Scroll Animation</Link>
              <Link to="/pdf-viewer">PDF Viewer</Link>
              <Link to="/page-swiper">Page Swiper</Link>
            </Cluster>
          </Box>
        </nav>
        <Switch>
          <Route path="/scroll-gallery">
            <ScrollGallery />
          </Route>
          <Route path="/rich-text-editor">
            <RichTextPage />
          </Route>
          <Route path="/scroll-animation">
            <ScrollAnimation />
          </Route>
          <Route path="/pdf-viewer">
            <PdfViewer />
          </Route>
          <Route path="/page-swiper">
            <PageSwiper />
          </Route>
          <Route path="/">
            <div></div>
          </Route>
        </Switch>
      </Box>
    </Router>
  );
}

export default App;
