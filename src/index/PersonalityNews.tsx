import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Define the ProfileData type
interface ProfileData {
  _id: string; // MongoDB ObjectId
  name: string;
  role: string;
  bio: string;
  education: string;
  dec: string;
  portfolioUrl: string;
  coverImage: string;
  profileImage: string;
  createdAt?: string;
  updatedAt?: string;
}




export const NewsCard = ({ _id, profileImage, bio, name }: ProfileData) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-blue-400">
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={profileImage}
          alt={name}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{bio}</p>
        <div className="flex items-center justify-between text-sm">
          <Link
            to={`/personality/${_id}`}
            className="text-indigo-600 hover:underline"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};


export default function PersonalityNews() {
  
  const [posts, setPosts] = useState<ProfileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await fetch(
          "https://bd-news-backend.vercel.app/api/profile?sortOrder=createdAt"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (!Array.isArray(result.data)) {
          throw new Error("Invalid data format received from API");
        }

        setPosts(result.data.slice(0, 3));
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
    <div className="mx-auto">
      {/* Header */}
      <div className="border-b mb-8 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800 pb-2 border-b-2 border-indigo-600">
          ব্যক্তিত্ব
        </h2>
        <Link
          to="/personality"
          className="text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          See All →
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((card) => (
          <div className="overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-blue-400">
            <div className="relative">
              <img
                className="w-full h-48 object-cover"
                src={card.profileImage}
                alt={card.name}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {card.name}
              </h3>
              <p className="text-gray-600 mb-4">{card.bio}</p>
              <div className="flex items-center justify-between text-sm">
                <Link
                  to={`/personality/${card._id}`}
                  className="text-indigo-600 hover:underline"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
