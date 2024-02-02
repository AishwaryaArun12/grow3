import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts'; // Uncomment this line
import axios from '../axiosConfig';

const CanvasJSChart = CanvasJSReact.CanvasJSChart; // Uncomment this line

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getAllPosts() {
      const res = await axios.get('/post/getallposts/50/0');
      setPosts(res.data.posts);
    }
    getAllPosts();
  }, []);

  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  const currentYearPosts = posts.filter((post) => new Date(post.time).getFullYear() === currentYear);
  const previousYearPosts = posts.filter((post) => new Date(post.time).getFullYear() === previousYear);

  const options = {
    theme: localStorage.getItem('flowbite-theme-mode') === 'dark' ? 'dark2' : 'light2',
    animationEnabled: true,
    title: {
      text: 'Number of New Posts',
    },
    axisY: {
      title: 'Number of Posts',
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: 'spline',
        name: currentYear.toString(),
        showInLegend: true,
        dataPoints: generateDataPoints(currentYearPosts),
      },
      {
        type: 'spline',
        name: previousYear.toString(),
        showInLegend: true,
        dataPoints: generateDataPoints(previousYearPosts),
      },
    ],
  };

  function generateDataPoints(posts) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return months.map((month, index) => {
      return { y: getCountForMonth(posts, index + 1), label: month };
    });
  }

  // Helper function to get count for a specific month
  function getCountForMonth(posts, month) {
    return posts.filter((post) => new Date(post.time).getMonth() + 1 === month).length;
  }

  return (
    <div>
      <CanvasJSChart options={options} />
      {/* You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods */}
    </div>
  );
};

export default App;
