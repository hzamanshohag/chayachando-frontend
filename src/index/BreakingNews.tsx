import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
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

const BreakingNews = () => {
  // const newsItems = [
  //   {
  //     id: 1,
  //     date: "22 Sep 2022",
  //     title: "5 unbelievable secret about choosing right furniture",
  //     image:
  //       "https://wpolive.com/html/bloggar-tailwind/assets/images/breaking-news/img-3.jpg",
  //   },
  //   {
  //     id: 2,
  //     date: "22 Sep 2022",
  //     title: "Healthy routine for your healthy lifestyle",
  //     image:
  //       "https://wpolive.com/html/bloggar-tailwind/assets/images/breaking-news/img-3.jpg",
  //   },
  //   {
  //     id: 3,
  //     date: "22 Sep 2022",
  //     title: "Best tourism site all over the world",
  //     image:
  //       "https://wpolive.com/html/bloggar-tailwind/assets/images/breaking-news/img-3.jpg",
  //   },
  // ];

  const [posts, setPosts] = useState<Post[]>([]);
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

        if (!Array.isArray(result.data)) {
          throw new Error("Invalid data format received from API");
        }

        setPosts(result.data.slice(0, 10));
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

  return (
    <div className="">
      <div className="mx-auto max-w-[1170px] xl:max-w-[1140px] lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px] col:max-w-full xl:px-[12px] lg:px-[12px] md:px-[15px] sm:px-[10px]">
        <div className="pl-0">
          <span className="text-base p-[5px_10px] bg-[#3756f7] inline-block rounded-t-[10px] text-white">
            Breaking News
          </span>
        </div>

        <Marquee className="bg-[#f9faff] border-y border-y-[#e9edff]">
          {posts.map((item) => (
            <div key={item._id} className="p-5 border-x border-x-[#e9edff]">
              <div className="flex items-center gap-4">
                {/* Added gap here */}
                <div className="w-[30%] min-w-[100px] rounded-[6px] overflow-hidden">
                  <Link to={`/articles/${item._id}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="rounded-[6px] w-24 h-20 object-cover"
                    />
                  </Link>
                </div>
                <div className="w-[70%]">
                  <span className="text-[#777777] text-sm block mb-1">
                    {item.time.day} {item.time.month} {item.time.year}
                  </span>
                  <h3 className="text-[18px] font-semibold">
                    <Link
                      to={`/articles/${item._id}`}
                      className="text-[#444444] hover:text-[#3756f7] transition-colors duration-300"
                    >
                      {item.title}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default BreakingNews;
