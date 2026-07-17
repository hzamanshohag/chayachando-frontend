import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
interface ProfileData {
  _id?: string; // Optional if the data doesn't include it yet
  name: string;
  role: string;
  bio: string;
  education: string;
  sortDes: string;
  longDes: string;
  portfolioUrl: string;
  coverImage: string;
  profileImage: string;
  createdAt?: string;
  updatedAt?: string;
}


const PersonalityDetails = () => {
  const { id } = useParams();
    const [posts, setPosts] = useState<ProfileData>();
    const [recentPosts, setRecentPosts] = useState<ProfileData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchHero = async () => {
        try {
          const response = await fetch(
            `https://bd-news-backend.vercel.app/api/profile/${id}`
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
    if (id) {
      // Fetch profile data based on ID here
      console.log("Loading profile for ID:", id);
      // You would typically make an API call here
    }
  }, [id]);

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
    <>
      <Navbar
        navLight={false}
        playBtn={false}
        bgLight={false}
        navCenter={false}
      />
      <div className=" mx-auto container md:py-12 py-8 transition-colors duration-200">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-200">
            <div className="relative h-48">
              <img
                src={posts?.coverImage}
                alt={posts?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-12 left-6">
                <img
                  src={posts?.profileImage}
                  alt="Not Founs"
                  className="w-24 h-24 rounded-xl object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                />
              </div>
            </div>

            <div className="pt-16 px-6 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {posts?.name}
                  </h1>
                  <p className="text-purple-600 dark:text-purple-400">
                    {posts?.role}
                  </p>
                </div>
                <a
                  href={posts?.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  View Portfolio
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>

              <p className="mt-6 text-gray-600 dark:text-gray-300">
                {posts?.bio}
              </p>
              <p className="mt-6 text-gray-600 dark:text-gray-300">
                {posts?.sortDes}
              </p>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Early life and education
                </h2>
                <p className=" text-gray-600 dark:text-gray-300">
                  {posts?.education}
                </p>
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Career
                </h2>
                <p className=" text-gray-600 dark:text-gray-300">
                  {posts?.longDes}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PersonalityDetails;
