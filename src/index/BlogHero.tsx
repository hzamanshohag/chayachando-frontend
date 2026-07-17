import { useEffect, useState } from "react";
import bg from "../assets/images/bg1.png";
import { Link } from "react-router-dom";

interface Post {
  _id: number;
  category: string;
  title: string;
  sortDes?: string;
  articleID: string;
  image: string;
  colSpan: string;
}

const BlogHero = () => {
  // const posts = [
  //   {
  //     id: 1,
  //     category: "Fashion",
  //     title: "What’s In Trend In Women's Fashion Summer?",
  //     description:
  //       "You can customize the view Blog posts with a simple mouse click and immediately see the result of your changes.",
  //     author: "Robert",
  //     date: "20 Nov 2022",
  //     image:
  //       "https://wpolive.com/html/bloggar-tailwind/assets/images/hero/img-1.jpg",
  //     colSpan:
  //       "col-span-1 md:col-span-2 lg:col-span-3 row-span-3 md:row-span-3 lg:row-span-5",
  //   },
  //   {
  //     id: 2,
  //     category: "Travel",
  //     title: "Traveling Makes You More Interesting",
  //     author: "Robert",
  //     date: "20 Nov 2022",
  //     image:
  //       "https://wpolive.com/html/bloggar-tailwind/assets/images/hero/img-1.jpg",
  //     colSpan:
  //       "col-span-1 md:col-span-2 lg:col-span-2 row-span-2 md:row-span-3 lg:col-start-4",
  //   },
  //   {
  //     id: 3,
  //     category: "Food",
  //     title: "Top 10 Healthy Food",
  //     author: "Robert",
  //     date: "20 Nov 2022",
  //     image:
  //       "https://wpolive.com/html/bloggar-tailwind/assets/images/hero/img-3.jpg",
  //     colSpan:
  //       "col-span-1 md:col-span-1 lg:row-span-2 lg:col-start-4 lg:row-start-4",
  //   },
  //   {
  //     id: 4,
  //     category: "Business",
  //     title: "What Makes a Leader?",
  //     author: "Robert",
  //     date: "20 Nov 2022",
  //     image:
  //       "https://wpolive.com/html/bloggar-tailwind/assets/images/hero/img-4.jpg",
  //     colSpan:
  //       "col-span-1 md:col-span-1 lg:row-span-2 lg:col-start-5 lg:row-start-4",
  //   },
  // ];
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await fetch(
          "https://bd-news-backend.vercel.app/api/hero"
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

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //         const response = await fetch(
  //           "https://bd-news-backend.vercel.app/api/hero"
  //         );
  //      const result = await response.json();
  //      setPosts(result.data || result.items || []);
  //     } catch (error) {
  //       console.error("Error fetching hero posts", error);
  //     }
  //   };

  //   fetchPosts();
  // }, []);
  const today = new Date();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <section
      className="relative bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 grid-rows-auto lg:grid-rows-6 gap-4 h-auto lg:h-[800px]">
          {posts.map((post) => (
            <div key={post._id} className={`${post.colSpan}`}>
              <Link to={`/articles/${post.articleID}`}>
                <div className="relative h-full rounded-xl overflow-hidden group before:absolute before:inset-0 before:bg-[rgba(7,7,7,0.4)] before:z-20">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 p-4 md:p-6 z-20 text-white w-full">
                    <div className="px-2 py-1 text-sm md:text-base lg:text-lg font-bold text-[#003aae] bg-[rgba(255,255,255,0.9)] rounded-md inline-block mb-2">
                      {post.category}
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">
                      {post.title}
                    </h2>
                    {post.sortDes && (
                      <p className="text-xs md:text-sm lg:text-base mb-2 md:mb-3">
                        {post.sortDes}
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="relative pl-2 md:pl-3 lg:pl-4 text-xs md:text-sm lg:text-base before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 md:before:w-2 md:before:h-2 before:bg-white before:rounded-full">
                        {`${today.getDate()} ${
                          monthNames[today.getMonth()]
                        } ${today.getFullYear()}`}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
