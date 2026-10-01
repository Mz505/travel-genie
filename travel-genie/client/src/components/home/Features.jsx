import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, Wallet, Map, Camera, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const features = [
  {
    icon: Sparkles,
    title: "AI Trip Planning",
    path: "/dashboard/trips/create",
    description:
      "Create personalized travel itineraries with artificial intelligence based on your destination, style, and preferences.",
  },
  {
    icon: Wallet,
    title: "Smart Budget Management",
    path: "/dashboard/budget",
    description:
      "Plan your expenses, estimate costs, and keep your journey within your ideal budget.",
  },
  {
    icon: Map,
    title: "Smart Recommendations",
    path: "/dashboard/recommendations",
    description:
      "Discover hidden places, activities, and experiences recommended specially for you.",
  },
  {
    icon: Camera,
    title: "Travel Memories",
    path: "/dashboard/memory",
    description:
      "Save your favorite moments, photos, and experiences to remember every adventure.",
  },
];

function Features() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFeatureClick = (path) => {
    if (user) {
      navigate(path);
    } else {
      navigate(`/signup?redirect=${encodeURIComponent(path)}`);
    }
  };
  return (
    <section
      id="features"
      className="
relative

py-20

sm:py-28

px-5

sm:px-10

lg:px-20

bg-white

dark:bg-[#07111F]

transition-colors

duration-500

overflow-hidden
"
    >
      {/* Background Glow */}

      <motion.div
        animate={{
          x: [0, 40, 0],

          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,

          repeat: Infinity,

          ease: "easeInOut",
        }}
        className="
absolute

top-20

left-0

h-72

w-72

rounded-full

bg-cyan-300/20

blur-3xl
"
      />

      <div
        className="
relative

max-w-7xl

mx-auto
"
      >
        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,

            y: 40,
          }}
          whileInView={{
            opacity: 1,

            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
text-center

max-w-3xl

mx-auto
"
        >
          <div
            className="
inline-flex

items-center

gap-2

rounded-full

bg-cyan-100

dark:bg-cyan-500/10

px-5

py-2

text-sm

font-semibold

text-cyan-600

dark:text-cyan-300
"
          >
            <Sparkles size={16} />
            Powerful Travel Features
          </div>

          <h2
            className="
mt-6

text-3xl

sm:text-4xl

lg:text-5xl

font-bold

text-gray-900

dark:text-white

"
          >
            Everything you need for a
            <span
              className="
text-cyan-500

"
            >
              smarter journey
            </span>
          </h2>

          <p
            className="
mt-5

text-lg

text-gray-600

dark:text-gray-300
"
          >
            TravelGenie combines AI technology with travel planning to create
            unforgettable experiences.
          </p>
        </motion.div>

        {/* Cards */}

        <div
          className="
mt-14

grid

grid-cols-1

sm:grid-cols-2

lg:grid-cols-4

gap-6

"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,

                  y: 50,
                }}
                whileInView={{
                  opacity: 1,

                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,

                  delay: index * 0.15,
                }}
                whileHover={{
                  y: -10,
                }}
                onClick={() => handleFeatureClick(feature.path)}
                className="
                  group
                  cursor-pointer
                  rounded-3xl
                  border
                  border-gray-100
                  dark:border-white/10
                  bg-white
                  dark:bg-[#111827]
                  p-7
                  shadow-lg
                  hover:shadow-2xl
                  transition-all
                  duration-300
                  flex
                  flex-col
                  justify-between
                "
              >
                <div>
                  <div
                    className="
                      h-14
                      w-14
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      bg-cyan-100
                      dark:bg-cyan-500/10
                      text-cyan-600
                      dark:text-cyan-300
                      group-hover:scale-110
                      transition
                    "
                  >
                    <Icon size={28} />
                  </div>

                  <h3
                    className="
                      mt-6
                      text-xl
                      font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      leading-7
                      text-gray-600
                      dark:text-gray-300
                    "
                  >
                    {feature.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore feature</span>
                  <ArrowRight size={14} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
