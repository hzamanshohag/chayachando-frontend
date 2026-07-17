import { Routes, Route } from "react-router-dom";
import IndexOne from "./index/index-one";
import BlogPost from "./index/BlogPost";
import NotFound from "./index/NotFound";
import Entertainment from "./index/Entertainment";
import Personality from "./index/Personality";
import PersonalityDetils from "./index/PersonalityDetils";
import Sports2 from "./index/Sports2";
import Interview from "./index/Interview";
import NewsPage from "./index/NewsPage";
import ArticlesPage from "./index/ArticlesPage";
import OpinionPage from "./index/OpinionPage";
import EntertainmentPage from "./index/EntertainmentPage";
import SportsPage from "./index/SportsPage";
import InterviewPage from "./index/InterviewPage";
import OthersPage from "./index/OthersPage";


function App() {
  
  return (
    <>
      

      <Routes>
        <Route path="/" element={<IndexOne />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/entertainment" element={<EntertainmentPage />} />
        <Route path="/opinion" element={<OpinionPage />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/others" element={<OthersPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<BlogPost />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/sports" element={<Sports2 />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/personality" element={<Personality />} />
        <Route path="/personality/:id" element={<PersonalityDetils />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
