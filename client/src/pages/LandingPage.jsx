import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Write Freely',
    desc: 'Express your thoughts and ideas easily.',
    image: '/images/write.jpg',
  },
  {
    title: 'Explore Blogs',
    desc: 'Discover content from fellow writers.',
    image: '/images/explore.jpg',
  },
  {
    title: 'Share Anywhere',
    desc: 'One-click share to your audience.',
    image: '/images/share.webp',
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 font-sans">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto py-5 px-6 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-blue-700">Lexora</h1>
          <div className="space-x-4">
            <Link
              to="/login"
              className="text-blue-700 font-medium hover:text-blue-900 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow hover:shadow-lg transition"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="text-center py-20 px-4">
        <h2 className="text-5xl font-extrabold text-gray-800 leading-tight mb-6">
          Share Your Thoughts with the World
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          A beautifully crafted blogging platform for creators and readers.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/register"
            className="px-8 py-3 rounded-full bg-blue-600 text-white text-lg font-medium hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/blogs"
            className="px-8 py-3 rounded-full bg-white text-blue-700 border border-blue-600 text-lg font-medium hover:bg-blue-50 transition"
          >
            View Blogs
          </Link>
        </div>
      </main>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold text-center text-blue-800 mb-12">
          Why Choose Lexora?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="h-48 w-full object-cover rounded-t-xl"
              />
              <div className="p-5">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BlogPlatform — All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
