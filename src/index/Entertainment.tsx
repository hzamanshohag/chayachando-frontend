import Navbar from "../components/navbar";

import Footer from "../components/footer";

export default function Entertainment() {
  const cards = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg",
      title: "Simplest Salad Recipe ever",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      time: { day: "27", month: "March", year: "2025" },
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg",
      title: "Simplest Salad Recipe ever",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      time: { day: "27", month: "March", year: "2025" },
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg",
      title: "Simplest Salad Recipe ever",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      time: { day: "27", month: "March", year: "2025" },
    },
  ];

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

      <section className="container pt-4 md:pt-8  mx-auto bg-slate-50/50">
        <h4 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-bold">
          বিনোদন
        </h4>
      </section>
      <section className="relative md:pb-24 pb-16 ">
        <div className="container relative">
          <div className="mx-auto">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="rounded overflow-hidden shadow-lg flex flex-col"
                >
                  <div className="relative">
                    <a href="#">
                      <img
                        className="w-full h-48 object-cover"
                        src={card.image}
                        alt={card.title}
                      />
                      <div className="hover:bg-transparent transition duration-300 absolute inset-0 bg-gray-900 opacity-25" />
                    </a>
                  </div>

                  <div className="px-6 py-4 mb-auto">
                    <a
                      href="#"
                      className="font-medium text-lg hover:text-indigo-600 transition duration-500 ease-in-out block mb-2"
                    >
                      {card.title}
                    </a>
                    <p className="text-gray-500 text-sm">{card.description}</p>
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
      </section>

      <Footer />
    </>
  );
}
