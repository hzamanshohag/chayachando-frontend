import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Post {
  _id: number;
  category: string;
  title: string;
  des: string;
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

export default function BlogHighlights() {





 

  
  const [news, setNews] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [opinion, setOpinion] = useState<Post[]>([]);
  const [entertainment, setEntertainment] = useState<Post[]>([]);
  const [sports, setSports] = useState<Post[]>([]);
  const [interview, setInterview] = useState<Post[]>([]);
  const [others, setOthers] = useState<Post[]>([]);
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await fetch(
          "https://bd-news-backend.vercel.app/api/article?sortOrder=desc&search=সংবাদ"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        setNews(result.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch article"
        );
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await fetch(
          "https://bd-news-backend.vercel.app/api/article?sortOrder=desc&search=মতামত"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        setOpinion(result.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch article"
        );
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await fetch(
          "https://bd-news-backend.vercel.app/api/article?sortOrder=desc&search=বিনোদন"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        setEntertainment(result.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch article"
        );
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await fetch(
          "https://bd-news-backend.vercel.app/api/article?sortOrder=desc&search=খেলাধুলা"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        setSports(result.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch article"
        );
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await fetch(
          "https://bd-news-backend.vercel.app/api/article?sortOrder=desc&search=সাক্ষাৎকার"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        setInterview(result.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch article"
        );
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);
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

        setOthers(result.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch article"
        );
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  const trendingTopics = [
    { name: "সংবাদ", categoryUrl: "/news", count: `${news.length}` },
    { name: "মতামত", categoryUrl: "/opinion", count: `${opinion.length}` },
    {
      name: "বিনোদন",
      categoryUrl: "/entertainment",
      count: `${entertainment.length}`,
    },
    { name: "খেলাধুলা", categoryUrl: "/sports", count: `${sports.length}` },
    {
      name: "সাক্ষাৎকার",
      categoryUrl: "/interview",
      count: `${interview.length}`,
    },
    { name: "বিবিধ", categoryUrl: "/others", count: `${others.length}` },
  ];

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await fetch(
          "https://bd-news-backend.vercel.app/api/highlight"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (!Array.isArray(result.data)) {
          throw new Error("Invalid data format received from API");
        }

        setPosts(result.data);
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

  useEffect(() => {
    const fetchPopularArticles = async () => {
      try {
        const response = await fetch(
          "https://bd-news-backend.vercel.app/api/article?sortOrder=desc"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (!Array.isArray(result.data)) {
          throw new Error("Invalid data format from API");
        }

        const slicedData = result.data.slice(0, 20);

        // Shuffle and pick 4 random articles
        const shuffled = slicedData.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4);

        setPopularPosts(selected);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch articles"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPopularArticles();
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

  return (
    <section className="container mx-auto px-4 ">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-2/3 px-4">
          <div className="mb-8 col:mb-6">
            <h2
              className="text-3xl font-bold text-[#444444] relative capitalize pb-5 col:text-2xl
                                    before:absolute before:left-0 before:bottom-0 before:w-[100px] before:h-[5px] before:rounded-[6px]
                                    before:bg-[#3756f7]
                                    after:absolute after:left-[110px] after:bottom-0 after:w-7 after:h-[5px] after:rounded-[6px]
                                    after:bg-[#3756f7] "
            >
              Today's Top Highlights
            </h2>
          </div>
          <div className="mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-4 lg:p-5 border border-[#eef0fc]">
              {posts.map((card) => (
                <div key={card._id} className="rounded overflow-hidden">
                  <div className="relative">
                    <Link to={`/articles/${card.articleID}`}>
                      <img
                        className="w-full h-48 object-cover"
                        src={card.image}
                        alt={card.title}
                      />
                      <div className="hover:bg-transparent transition duration-300 absolute inset-0 bg-gray-900 opacity-25" />
                    </Link>

                    <p className="absolute bottom-0 left-0">
                      <div className="bg-indigo-600 px-4 py-2 text-white text-sm hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                        {card.category}
                      </div>
                    </p>

                    <p className="absolute top-0 right-0">
                      <div className="bg-indigo-600 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                        <span className="font-bold">{card.time.day}</span>
                        <small>{card.time.month}</small>
                      </div>
                    </p>
                  </div>

                  <div className="px-6 py-4">
                    <Link
                      to={`/articles/${card.articleID}`}
                      className="font-semibold text-lg hover:text-indigo-600 transition duration-500 ease-in-out block"
                    >
                      {card.title}
                    </Link>
                    <Link to={`/articles/${card.articleID}`}>
                      <p className="text-gray-500 text-sm mt-2">{card.des}</p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 px-4 my-8 lg:my-0">
          <div className="pl-2 md:pl-0 md:mt-[80px] max-w-[550px] mx-auto">
            {/* Trending Topics */}
            <div className="mb-7 p-7 border border-[#eef0fc] rounded-lg">
              <h3
                className="text-2xl text-[#232f4b] relative capitalize pb-5 mb-5
        before:absolute before:left-0 before:bottom-0 before:w-[55px] before:h-1
        before:bg-[#3756f7] before:rounded
        after:absolute after:left-[65px] after:bottom-0 after:w-[80%] after:h-1
        after:bg-[#f2f2f2] after:rounded"
              >
                Trending Topics
              </h3>
              <ul className="space-y-4">
                {trendingTopics.map((topic, index) => (
                  <li
                    key={index}
                    className={`text-lg font-normal relative 
            ${index !== 0 && "mt-5 pt-5 border-t border-[#eef0fc]"}`}
                  >
                    <Link
                      to={`${topic.categoryUrl}`}
                      className="block text-[#474f62] relative pl-7 
              hover:text-[#3756f7] transition-all group
              before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2
              before:content-['➔'] before:font-bold before:text-base
              before:transition-all before:text-[#212121] group-hover:before:text-[#3756f7]"
                    >
                      {topic.name}
                      <span className="absolute right-0">({topic.count})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Posts */}
            <div className="mb-7 p-7 border border-[#eef0fc] rounded-lg">
              <h3
                className="text-2xl text-[#232f4b] relative capitalize pb-5 mb-5
        before:absolute before:left-0 before:bottom-0 before:w-[55px] before:h-1
        before:bg-[#3756f7] before:rounded
        after:absolute after:left-[65px] after:bottom-0 after:w-[80%] after:h-1
        after:bg-[#f2f2f2] after:rounded"
              >
                Popular Post
              </h3>
              <div className="space-y-4">
                {popularPosts.slice(0, 4).map((post, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-[100px] h-[70px] rounded-[5px] object-cover"
                    />
                    <div className="flex-1">
                      <span className="text-sm text-[#444444] block mb-1">
                        {post.time.day} {post.time.month}
                      </span>
                      <h4 className="text-lg font-medium hover:text-[#3756f7] transition-colors">
                        <Link to={`/articles/${post?._id}`} title={post.title}>
                          {post.title.length > 35
                            ? post.title.slice(0, 35) + "..."
                            : post.title}
                        </Link>
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advertisement */}
            <div className="hidden lg:block overflow-hidden">
              <a href="#">
                <img
                  src="https://wpolive.com/html/bloggar-tailwind/assets/images/add.jpg"
                  alt="Advertisement"
                  className="w-full h-96 object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
