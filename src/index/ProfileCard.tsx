interface ProfileCardProps {
  name: string;
  role: string;
  tags: string[];
  imageSrc: string;
  profileUrl?: string;
}

const ProfileCard = ({
  name,
  role,
  tags,
  imageSrc,
  profileUrl = "#",
}: ProfileCardProps) => {
  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "web":
        return { text: "text-teal-900", bg: "bg-teal-200" };
      case "ui/ux":
        return { text: "text-indigo-900", bg: "bg-indigo-200" };
      case "design":
        return { text: "text-purple-900", bg: "bg-purple-200" };
      default:
        return { text: "text-gray-900", bg: "bg-gray-200" };
    }
  };

  return (
    <div className=" mx-auto overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-blue-400">
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={imageSrc}
          alt={`${name}'s profile`}
        />
      </div>
      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600">{role}</p>
      </div>
      <div className="px-6 py-4 flex flex-wrap gap-2">
        {tags.map((tag) => {
          const color = getTagColor(tag);
          return (
            <span
              key={tag}
              className={`px-2 py-1 font-semibold rounded-full ${color.text} ${color.bg}`}
            >
              {tag}
            </span>
          );
        })}
      </div>
      <div className="px-6 py-4">
        <a
          href={profileUrl}
          className="text-blue-500 hover:underline transition-colors"
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;
