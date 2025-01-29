import { useEffect, useState, useCallback } from 'react';
import './App.css';

const fakeApi = [
  { id: 1, title: 'First Post', content: 'This is my first post.', category: 'General', favorite: false },
  { id: 2, title: 'React Hooks', content: 'All about React Hooks.', category: 'Tech', favorite: false },
  { id: 3, title: 'JavaScript Basics', content: 'Understanding JavaScript concepts.', category: 'Tech', favorite: false },
  { id: 4, title: 'The Art of Coding', content: 'Why coding is an art.', category: 'Lifestyle', favorite: false },
  { id: 5, title: 'Food and Health', content: 'Healthy food tips.', category: 'Lifestyle', favorite: true },
];

function App() {
  const [addblog, setAdd] = useState(false);
  const [blog, setBlog] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: '' });
  const [show, setShow] = useState(false);

  useEffect(() => {
    setBlog(fakeApi);
  }, []);

  const handleAdd = () => {
    setAdd(!addblog);
  };

  const handleshow = () => {
    setShow(!show); // Toggling the visibility of posts
    console.log('Show:', !show); // Debugging log
  };

  const dele = useCallback((id) => {
    setBlog((prevPosts) => {
      const updatedPosts = prevPosts.filter((post) => post.id !== id);
      localStorage.setItem('posts', JSON.stringify(updatedPosts)); // Persist updated list to localStorage
      return updatedPosts;
    });
  }, []);

  const handleAddPost = useCallback(() => {
    if (newPost.title && newPost.content && newPost.category) {
      const newPostData = { ...newPost, id: blog.length + 1, favorite: false };
      setBlog((prevPosts) => [...prevPosts, newPostData]);
      setNewPost({ title: '', content: '', category: '' });
    }
  }, [newPost, blog]);

  // Debugging the blog state and show toggle
  console.log('Blog:', blog);

  const handlefav = useCallback((id,value) => {
    setBlog((prevPosts) => {
      const updatedPosts = prevPosts.map((post) =>
        post.id === id ? { ...post, favorite: value } : post
      );
    
    localStorage.setItem('posts', JSON.stringify(updatedPosts)); // Persist updated list to localStorage
    return updatedPosts;
    })

  }, []);

  return (
    <div className="app-container">
      <div className="btns">
        <button onClick={handleAdd}>ADD NEW VLOG</button>
      </div>

      {addblog && (
        <div className="op">
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={newPost.category}
            onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
          />
          <button onClick={handleAddPost}>Add Post</button>
        </div>
      )}

      <button onClick={handleshow}>Show POST</button>

      {show && blog.length > 0 && (
        <div className="sho">
          <table border="2px">
            <caption>LIST OF VLOGS</caption>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Category</th>
                <th>Favorite</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {blog.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.title}</td>
                  <td>{data.content}</td>
                  <td>{data.category}</td>
                  <td>
                    <input type="checkbox" checked={data.favorite} onChange={(e)=> handlefav(data.id,e.target.checked)} />
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => dele(data.id)}>
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* If no posts, show a message */}
      {show && blog.length === 0 && <p>No posts available.</p>}
    </div>
  );
}

export default App;
