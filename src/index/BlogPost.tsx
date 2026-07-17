import { Link, useParams } from "react-router-dom";

import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";

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

// export default BlogPost;
const BlogPost = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState<Post>();
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await fetch(
          `https://bd-news-backend.vercel.app/api/article/${id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        setPosts(result.data);
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
          `https://bd-news-backend.vercel.app/api/article?sortOrder=desc`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        setRecentPosts(result.data.slice(0, 4));
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
 
  const categories = [
    { categoryName: "সংবাদ", categoryUrl: "/news" },
    { categoryName: "মতামত", categoryUrl: "/opinion" },
    { categoryName: "বিনোদন", categoryUrl: "/entertainment" },
    { categoryName: "খেলাধুলা", categoryUrl: "/sports" },
    { categoryName: "সাক্ষাৎকার", categoryUrl: "/interview" },
    { categoryName: "বিবিধ", categoryUrl: "/others" },
    { categoryName: "ব্যক্তিত্ব", categoryUrl: "/personality" },
  ];

  return (
    <>
      <Navbar
        navLight={false}
        playBtn={false}
        bgLight={false}
        navCenter={false}
      />

      <div className=" mx-auto container md:pt-10 pt-6">
        <div className="flex flex-col">
          {/* Blog Header */}
          <div className="py-8">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {posts?.title}
              </h1>
              <p className="text-gray-600">
                Published on {posts?.time.day} {posts?.time.month}{" "}
                {posts?.time.year}
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white py-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row">
              {/* Main Article */}
              <div className="w-full md:w-3/4 px-4 mb-8 md:mb-0">
                <img
                  src={posts?.image}
                  alt={posts?.title}
                  className="w-full h-96 object-cover mb-8 rounded-lg"
                />
                <div className="prose max-w-none">
                  <p className="mb-4 text-gray-700">{posts?.sortDes}</p>
                </div>
                <div className="prose max-w-none">
                  <p className="mb-4 text-gray-700">{posts?.longDes}</p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-full md:w-1/4 px-4">
                {/* Recent Posts */}
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Recent Posts
                  </h2>
                  <ul className="space-y-2">
                    {recentPosts.map((post, index) => (
                      <li key={index}>
                        <a
                          href={`/articles/${post._id}`}
                          title={post.title}
                          className="text-gray-700 hover:text-gray-900 transition-colors hover:"
                        >
                          {post.title.length > 40
                            ? post.title.slice(0, 40) + "..."
                            : post.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Categories */}
                <div className="bg-gray-100 p-4 rounded-lg mt-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Categories
                  </h2>
                  <ul className="space-y-2">
                    {categories.map((category, index) => (
                      <li key={index}>
                        <Link
                          to={`${category.categoryUrl}`}
                          className="text-gray-700 hover:text-gray-900 transition-colors"
                        >
                          {category.categoryName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BlogPost;
