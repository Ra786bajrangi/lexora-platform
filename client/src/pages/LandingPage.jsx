import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaTwitter, FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import TrendingSection from "../components/TrendingSection";
import FeaturedWriter from '../components/FeaturedWriter';

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
    quote: 'Lexora made publishing my ideas a breeze. It\'s beautiful and simple!',
    image: '/images/user1.webp',
  },
  {
    name: 'Meera Kapoor',
    quote: 'As a reader, I enjoy discovering quality blogs every day.',
    image: '/images/user2.webp',
  },
];





const recentComments = [
  {
    id: 1,
    user: 'Sanjay Kumar',
    avatar: '/images/user3.jpg',
    postTitle: 'Apple intelligence',
    text: 'it is very worthreading'
  },
  {
    id: 2,
    user: 'Ananya Joshi',
    avatar: '/images/user4.jpeg',
    postTitle: 'wellness Blog',
    text: 'Doing yoga according to this blog and stay healthy'
  }
];

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Set based on auth status

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100'} font-sans`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto py-5 px-6 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-400">Lexora</h1>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search blogs..." 
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <FaSearch className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <Link to="/login" className="text-indigo-700 dark:text-indigo-300 font-medium hover:text-indigo-900 dark:hover:text-indigo-100 transition">
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
        <h2 className="text-5xl font-extrabold text-gray-800 dark:text-white leading-tight mb-6">
          Discover. Write. Inspire.
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
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
            className="px-8 py-3 rounded-full bg-white dark:bg-gray-700 text-indigo-700 dark:text-white border border-indigo-600 dark:border-gray-600 text-lg font-medium hover:bg-indigo-50 dark:hover:bg-gray-600 transition"
          >
            View Blogs
          </Link>
        </div>
      </main>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold text-center text-indigo-800 dark:text-indigo-400 mb-12">Why Choose Lexora?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="h-48 w-full object-cover rounded-t-xl"
              />
              <div className="p-5">
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Posts */}
      <TrendingSection />


      {/* Category Tags */}
      <section className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h3 className="text-3xl font-bold text-indigo-800 dark:text-indigo-400 mb-8">Explore Topics</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {['Technology', 'Travel', 'Food', 'Lifestyle', 'Health', 'Finance'].map(tag => (
            <Link 
              key={tag} 
              to={`/category/${tag.toLowerCase()}`}
              className="px-4 py-2 bg-indigo-100 dark:bg-gray-700 text-indigo-700 dark:text-white rounded-full hover:bg-indigo-200 dark:hover:bg-gray-600 transition"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      {/* Author Spotlight */}
      <FeaturedWriter />

      {/* Stats Counter */}
      <section className="bg-indigo-700 dark:bg-indigo-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">10K+</div>
            <div>Active Readers</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">500+</div>
            <div>Blog Posts</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">100+</div>
            <div>Writers</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">1M+</div>
            <div>Monthly Views</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <h3 className="text-3xl font-bold text-center text-purple-800 dark:text-purple-400 mb-12">What People Say</h3>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 px-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 p-6 rounded-xl shadow hover:shadow-lg transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">{t.name}</h4>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">"{t.quote}"</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Comments */}
        <div className="max-w-5xl mx-auto mt-8 px-6">
          <h4 className="text-xl font-semibold text-center mb-6 text-gray-700 dark:text-gray-300">Recent Discussions</h4>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            {recentComments.map(comment => (
              <div key={comment.id} className="border-b border-gray-100 dark:border-gray-700 py-4 last:border-0">
                <div className="flex items-center space-x-3 mb-2">
                  <img src={comment.avatar} alt={comment.user} className="w-8 h-8 rounded-full" />
                  <span className="font-medium dark:text-white">{comment.user}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">on {comment.postTitle}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 pl-11">"{comment.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reading List (conditional) */}
      {isAuthenticated && (
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-indigo-800 dark:text-indigo-400">Your Reading List</h3>
            <Link to="/reading-list" className="text-indigo-600 dark:text-indigo-400 hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {trendingPosts.slice(0, 2).map(post => (
              <div key={post.id} className="flex gap-4 items-start">
                <img src={post.image} alt={post.title} className="w-20 h-20 object-cover rounded" />
                <div>
                  <h4 className="font-medium dark:text-white">{post.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Writing?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join our community of passionate writers today.</p>
          <Link 
            to="/register" 
            className="inline-block px-8 py-3 bg-white text-indigo-600 rounded-full font-bold hover:bg-gray-100 transition"
          >
            Create Your Account
          </Link>
        </div>
      </section>

      {/* Mobile App Banner */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h3 className="text-3xl font-bold mb-4">Get the Lexora App</h3>
            <p className="text-gray-300 mb-6">Read and write on the go with our mobile application.</p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">
                <img src="/images/App-Store.png" className="h-6" alt="App Store" />
                <span>App Store</span>
              </button>
              <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">
                <img src="/images/app-store.webp" className="h-6" alt="Play Store" />
                <span>Google Play</span>
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src="/images/app-mockup.png" className="max-w-xs" alt="Mobile App" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-4">
            <Link to="/" className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-400">Lexora</Link>
          </div>
          <div className="flex justify-center space-x-6 text-indigo-600 dark:text-indigo-300 text-lg mb-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="hover:text-indigo-900 dark:hover:text-indigo-100 transition" />
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
            <h4 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Subscribe to our Newsletter</h4>
            <form className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-sm">© {new Date().getFullYear()} Lexora — All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;