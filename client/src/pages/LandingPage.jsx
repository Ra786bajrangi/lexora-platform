import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const features = [
  {
    title: 'Write Freely',
    desc: 'Express your thoughts and ideas with ease using our clean editor.',
    image: '/images/write.jpg',
  },
  {
    title: 'Explore Blogs',
    desc: 'Discover insightful posts from fellow creators across topics.',
    image: '/images/explore.jpg',
  },
  {
    title: 'Share Anywhere',
    desc: 'Easily share your stories on all platforms with one click.',
    image: '/images/share.webp',
  },
];

const testimonials = [
  {
    name: 'Aarav Sharma',
    quote: 'Lexora made publishing my ideas a breeze. It’s beautiful and simple!',
    image: '/images/user1.jpg',
  },
  {
    name: 'Meera Kapoor',
    quote: 'As a reader, I enjoy discovering quality blogs every day.',
    image: '/images/user2.jpg',
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 font-sans">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto py-5 px-6 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-indigo-700">Lexora</h1>
          <div className="space-x-4">
            <Link to="/login" className="text-indigo-700 font-medium hover:text-indigo-900 transition">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:shadow-lg transition"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="text-center py-20 px-4">
        <h2 className="text-5xl font-extrabold text-gray-800 leading-tight mb-6">
          Discover. Write. Inspire.
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          A beautifully crafted blogging platform connecting creators and readers.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/register"
            className="px-8 py-3 rounded-full bg-indigo-600 text-white text-lg font-medium hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/blogs"
            className="px-8 py-3 rounded-full bg-white text-indigo-700 border border-indigo-600 text-lg font-medium hover:bg-indigo-50 transition"
          >
            View Blogs
          </Link>
        </div>
      </main>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold text-center text-indigo-800 mb-12">Why Choose Lexora?</h3>
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

      {/* Testimonials */}
      <section className="bg-white py-16">
        <h3 className="text-3xl font-bold text-center text-purple-800 mb-12">What People Say</h3>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 px-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-xl shadow hover:shadow-lg transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold text-gray-800">{t.name}</h4>
                </div>
              </div>
              <p className="text-gray-700 italic">“{t.quote}”</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-4">
            <Link to="/" className="text-2xl font-extrabold text-indigo-700">Lexora</Link>
          </div>
          <div className="flex justify-center space-x-6 text-indigo-600 text-lg mb-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="hover:text-indigo-900 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-pink-600 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-blue-500 transition" />
            </a>
          </div>
          {/* Newsletter Signup */}
<div className="max-w-xl mx-auto mb-8">
  <h4 className="text-xl font-semibold mb-4 text-gray-700">Subscribe to our Newsletter</h4>
  <form className="flex flex-col sm:flex-row gap-3 justify-center">
    <input
      type="email"
      placeholder="Your email address"
      className="px-4 py-2 rounded-lg border border-gray-300 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
    <button
      type="submit"
      className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
    >
      Subscribe
    </button>
  </form>
</div>

          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Lexora — All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
