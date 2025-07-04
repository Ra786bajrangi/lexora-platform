import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import BlogDetailPage from './pages/BlogDetailPage';
import BlogListPage from './pages/BlogListPage';
import PrivateRoute from './components/PrivateRoute';
import BlogEditor from'./components/blogs/BlogEditor';
import UserDashboardPage from './pages/UserDashboardPage';
import AuthorProfile from './pages/AuthorProfile';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/blogs" element={<BlogListPage />} />
          <Route path="/blogs/:id" element={<BlogDetailPage />} />
           <Route path="/author/:username" element={<AuthorProfile />} />

          <Route path="/dashboard" element={<PrivateRoute />} />
<Route path="/user-dashboard" element={<UserDashboardPage />} />
<Route path="/admin-dashboard" element={<AdminDashboard />} />


          {/* Create Blog Page */}
          <Route
            path="/create-blog"
            element={
              <PrivateRoute>
                <BlogEditor mode="create" />
              </PrivateRoute>
            }
          />

          {/* Edit Blog Page */}
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <BlogEditor mode="edit" />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
