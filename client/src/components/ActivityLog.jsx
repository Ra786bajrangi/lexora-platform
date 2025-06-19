import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSignInAlt, FaPenFancy } from 'react-icons/fa';

const icons = {
  login: <FaSignInAlt className="text-blue-600" />,
  create_blog: <FaPenFancy className="text-green-600" />,
};

const ActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/activities', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setActivities(res.data);
      } catch (error) {
        console.error('Error fetching activity log:', error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md mt-10 max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
        Recent User Activities
      </h3>
      {activities.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No recent activities.</p>
      ) : (
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li
              key={activity._id}
              className="flex items-center gap-4 p-3 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            >
              <div className="text-xl">{icons[activity.type]}</div>
              <div>
                <p className="text-gray-800 dark:text-white">
                  <strong>{activity.user?.username || 'Unknown'}</strong>{' '}
                  {activity.type === 'login' ? 'logged in' : 'posted a blog'}
                </p>
                <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityLog;
