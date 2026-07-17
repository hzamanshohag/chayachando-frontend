
import Navbar from "../components/navbar";


import Footer from "../components/footer";
import BlogHero from "./BlogHero";
import BreakingNews from "./BreakingNews";
import BlogHighlights from "./BlogHighlights";

import PersonalityNews from "./PersonalityNews";
import News from "./News";
import Opinion from "./Opinion";
import EntertainmentHome from "./EntertainmentHome";
import SportsHome from "./SportsHome";
import InterviewHome from "./InterviewHome";
import OtherHome from "./OtherHome";



export default function IndexOne() {

  

  return (
    <>
      
      <Navbar
        navLight={false}
        playBtn={false}
        bgLight={false}
        navCenter={false}
      />

      <div className="pt-4 md:pt-8  mx-auto">
        <BlogHero />
      </div>

      <section className="relative">
        <div className="container relative my-8 lg:my-0">
          <BreakingNews />
        </div>

        <div className="container relative md:mt-24 mt-16">
          <BlogHighlights />
        </div>
      </section>

      <section className="relative md:pt-14 pt-12 bg-slate-50/50 dark:bg-slate-800/20">
        <div className="container relative">
          <News />
        </div>
      </section>

      <section className="relative md:pt-14 pt-12 bg-slate-50/50 dark:bg-slate-800/20">
        <div className="container relative">
          <Opinion />
        </div>
      </section>
      <section className="relative md:pt-14 pt-12 bg-slate-50/50 dark:bg-slate-800/20">
        <div className="container relative">
          <EntertainmentHome />
        </div>
      </section>

      {/* খেলাধুলা */}
      <section className="relative md:pt-14 pt-12 bg-slate-50/50 dark:bg-slate-800/20">
        <div className="container relative">
          <SportsHome />
        </div>
      </section>

      {/* সাক্ষাৎকার */}
      <section className="relative md:pt-14 pt-12 bg-slate-50/50 dark:bg-slate-800/20">
        <div className="container relative">
          <InterviewHome />
        </div>
      </section>

      {/* বিবিধ  */}
      <section className="relative md:pt-14 pt-12 bg-slate-50/50 dark:bg-slate-800/20">
        <div className="container relative">
          <OtherHome />
        </div>
      </section>

      <section className="relative md:py-14 py-12 bg-slate-50/50 dark:bg-slate-800/20">
        <div className="container relative">
          <PersonalityNews />
        </div>
      </section>

      <Footer />
    </>
  );
}
