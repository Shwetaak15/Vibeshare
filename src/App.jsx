import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [toastMessage, setToastMessage] = useState('');

  // Show inline notification/toast
  const triggerToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Fetch initial posts on mount from local JSON file
  useEffect(() => {
    const savedPosts = localStorage.getItem('vibe_share_posts');
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
        setIsLoading(false);
        return;
      } catch (e) {
        console.error('Failed to parse saved posts:', e);
      }
    }

    fetch('/posts.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        localStorage.setItem('vibe_share_posts', JSON.stringify(data));
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
        triggerToast('Failed to load posts from dummyjson.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Persist post updates to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('vibe_share_posts', JSON.stringify(posts));
    }
  }, [posts, isLoading]);

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
    triggerToast('Post created successfully!');
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter((post) => post.id !== postId));
      triggerToast('Post deleted.');
    }
  };

  const handleToggleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const isLikedNow = !post.isLiked;
          return {
            ...post,
            likes: isLikedNow ? post.likes + 1 : post.likes - 1,
            isLiked: isLikedNow
          };
        }
        return post;
      })
    );
  };

  const handleAddComment = (postId, newComment) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      })
    );
    triggerToast('Comment added!');
  };

  const handleDeleteComment = (postId, commentId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.filter((comment) => comment.id !== commentId)
          };
        }
        return post;
      })
    );
    triggerToast('Comment deleted.');
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--bg-app)', display: 'flex', flexDirection: 'row' }}>
      {/* Desktop Left Sidebar */}
      <aside 
        className="d-none d-md-flex flex-column p-4 sticky-top border-end" 
        style={{ 
          height: '100vh', 
          width: '245px', 
          backgroundColor: '#ffffff', 
          borderColor: 'var(--border-color)',
          zIndex: 100 
        }}
      >
        <div className="mb-4 mt-2 px-2 d-flex align-items-center">
          <i className="bi bi-share-fill me-2 fs-5" style={{ color: 'var(--primary)' }}></i>
          <span className="brand-logo-text fs-4">VibeShare</span>
        </div>
        
        <ul className="nav nav-pills flex-column mb-auto gap-2">
          <li className="nav-item">
            <button
              onClick={() => setActiveTab('home')}
              className={`nav-link w-100 text-start d-flex align-items-center gap-3 py-2.5 px-3 rounded-3 border-0 ${activeTab === 'home' ? 'active-sidebar-btn' : 'sidebar-btn'}`}
            >
              <i className={`bi ${activeTab === 'home' ? 'bi-house-door-fill' : 'bi-house-door'} fs-5`}></i>
              <span className="fw-semibold" style={{ fontSize: '0.95rem' }}>Home</span>
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => setActiveTab('create')}
              className={`nav-link w-100 text-start d-flex align-items-center gap-3 py-2.5 px-3 rounded-3 border-0 ${activeTab === 'create' ? 'active-sidebar-btn' : 'sidebar-btn'}`}
            >
              <i className={`bi ${activeTab === 'create' ? 'bi-plus-square-fill' : 'bi-plus-square'} fs-5`}></i>
              <span className="fw-semibold" style={{ fontSize: '0.95rem' }}>Create Post</span>
            </button>
          </li>
        </ul>

        {/* Desktop User Section */}
        <div className="mt-auto border-top pt-3 d-flex align-items-center gap-2.5 px-2">
          <div className="navbar-user-avatar shadow-sm">U</div>
          <div>
            <div className="fw-semibold lh-1" style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>Current User</div>
            <span className="text-muted" style={{ fontSize: '0.72rem' }}>@user</span>
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
        {/* Mobile top header */}
        <header className="d-flex d-md-none justify-content-between align-items-center px-4 py-2.5 bg-white border-bottom sticky-top" style={{ zIndex: 1030 }}>
          <div className="d-flex align-items-center">
            <i className="bi bi-share-fill me-2 fs-5 text-indigo" style={{ color: 'var(--primary)' }}></i>
            <span className="brand-logo-text fs-4">VibeShare</span>
          </div>
          <div className="navbar-user-avatar" style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>U</div>
        </header>

        {/* Content Container */}
        <main className="container mt-4 pt-1 px-3 px-md-4 pb-5 flex-grow-1">
          {/* Floating Toast Notification */}
          {toastMessage && (
            <div className="toast-corner-container">
              <div className="toast-corner-box">
                <span className="small d-flex align-items-center">
                  <i className="bi bi-info-circle-fill me-2" style={{ color: '#818cf8' }}></i>
                  {toastMessage}
                </span>
                <button
                  type="button"
                  className="btn-close btn-close-white ms-3"
                  onClick={() => setToastMessage('')}
                  aria-label="Close"
                  style={{ fontSize: '0.75rem' }}
                ></button>
              </div>
            </div>
          )}

          {/* Active View Router */}
          <div className="feed-container">
            {isLoading ? (
              <div className="d-flex flex-column align-items-center justify-content-center py-5">
                <div className="spinner-border text-indigo mb-3 animate-spin" role="status" style={{ color: 'var(--primary)', width: '2.5rem', height: '2.5rem' }}>
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span className="text-muted small fw-medium">Fetching vibrations...</span>
              </div>
            ) : activeTab === 'home' ? (
              <>
                {/* Feed Header */}
                <div className="d-flex align-items-center justify-content-between mb-3 px-1">
                  <span className="fw-semibold text-muted text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.5px' }}>
                    Recent Vibrations
                  </span>
                  <span className="text-muted small">
                    {posts.length} {posts.length === 1 ? 'post' : 'posts'}
                  </span>
                </div>

                <PostList
                  posts={posts}
                  onToggleLike={handleToggleLike}
                  onDeletePost={handleDeletePost}
                  onAddComment={handleAddComment}
                  onDeleteComment={handleDeleteComment}
                />
              </>
            ) : (
              <div className="post-fade-in">
                <CreatePost onAddPost={(newPost) => {
                  handleAddPost(newPost);
                  setActiveTab('home'); // Go back to feed on success
                }} />
              </div>
            )}
          </div>
        </main>

        {/* Mobile Bottom Tab Navigation */}
        <nav className="d-flex d-md-none fixed-bottom bg-white border-top justify-content-around py-2" style={{ zIndex: 1030, boxShadow: '0 -2px 10px rgba(0,0,0,0.03)' }}>
          <button
            onClick={() => setActiveTab('home')}
            className="btn border-0 d-flex flex-column align-items-center gap-1"
            style={{ color: activeTab === 'home' ? 'var(--primary)' : 'var(--text-muted)' }}
          >
            <i className={`bi ${activeTab === 'home' ? 'bi-house-door-fill' : 'bi-house-door'} fs-5`}></i>
            <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>Home</span>
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className="btn border-0 d-flex flex-column align-items-center gap-1"
            style={{ color: activeTab === 'create' ? 'var(--primary)' : 'var(--text-muted)' }}
          >
            <i className={`bi ${activeTab === 'create' ? 'bi-plus-square-fill' : 'bi-plus-square'} fs-5`}></i>
            <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>Create Post</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default App;
