import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

interface Post {
  _id: number;
  category: string;
  title: string;
  sortDes: string;
  longDes: string;
  articleID: string;
  image: string;
  time: {
    day: number;
    month: string;
    year: number;
  };
  createdAt: string;
  updatedAt: string;
}

export default function OthersPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 30;
  const offset = currentPage * postsPerPage;
  const currentPosts = posts.slice(offset, offset + postsPerPage);
  const pageCount = Math.ceil(posts.length / postsPerPage);
  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await fetch(
          "https://bd-news-backend.vercel.app/api/article?sortOrder=desc&search=বিবিধ"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (!Array.isArray(result.data)) {
          throw new Error("Invalid data format received from API");
        }

        setPosts(result.data); // remove slice(0, 3)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch hero post"
        );
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex space-x-2 justify-center items-center bg-white h-screen dark:invert">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-[#7E22CE] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-[#7E22CE] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-[#7E22CE] rounded-full animate-bounce"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-16 text-red-500">Error: {error}</div>;
  }
  const TimeIcon = () => (
    <svg
      height="13px"
      width="13px"
      viewBox="0 0 512 512"
      className="fill-current"
    >
      <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z" />
    </svg>
  );

  return (
    <>
      <Navbar
        navLight={false}
        playBtn={false}
        bgLight={false}
        navCenter={false}
      />
      <>
        <div className="mx-auto px-4 py-8">
          <section className="container mx-auto bg-slate-50/50">
            <h4 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-bold">
              বিবিধ
            </h4>
          </section>
          <section className="relative md:pb-24 pb-16 ">
            <div className="container relative">
              <div className="mx-auto">
                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                  {currentPosts.map((card) => (
                    <div
                      key={card._id}
                      className="rounded overflow-hidden shadow-lg flex flex-col"
                    >
                      <div className="relative">
                        <Link to={`/articles/${card._id}`}>
                          <img
                            className="w-full h-48 object-cover"
                            src={card.image}
                            alt={card.title}
                          />
                          <div className="hover:bg-transparent transition duration-300 absolute inset-0 bg-gray-900 opacity-25" />
                        </Link>
                      </div>

                      <div className="px-6 py-4 mb-auto">
                        <Link
                          to={`/articles/${card._id}`}
                          className="font-medium text-lg hover:text-indigo-600 transition duration-500 ease-in-out block mb-2"
                        >
                          {card.title}
                        </Link>
                        <p className="text-gray-500 text-sm">{card.sortDes}</p>
                      </div>

                      <div className="px-6 py-3 flex items-center justify-between bg-purple-300">
                        <span className="flex items-center text-xs text-gray-900">
                          <TimeIcon />
                          <span className="ml-1">
                            {card.time.day} {card.time.month} {card.time.year}
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Pagination */}
            <ReactPaginate
              previousLabel={"←"}
              nextLabel={"→"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName="flex justify-center items-center mt-8 space-x-2"
              pageClassName="px-3 py-1 border rounded"
              activeClassName="bg-purple-700 text-white"
              previousClassName="px-3 py-1 border rounded"
              nextClassName="px-3 py-1 border rounded"
              disabledClassName="opacity-50 cursor-not-allowed"
              breakClassName="px-3 py-1"
            />
          </section>
        </div>
      </>

      <Footer />
    </>
  );
}
