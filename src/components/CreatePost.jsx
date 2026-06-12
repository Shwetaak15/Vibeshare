import { useState } from 'react';

const CreatePost = ({ onAddPost }) => {
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [caption, setCaption] = useState('');
  const [postImage, setPostImage] = useState('');

  const [validated, setValidated] = useState(false);

  // Suggestions for quick paste to make testing easy and fun
  const samplePostImages = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80'
  ];

  const sampleProfileImages = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userName.trim() || !caption.trim() || !postImage.trim()) {
      setValidated(true);
      return;
    }

    const newPost = {
      id: Date.now(),
      userName: userName.trim(),
      profileImage: profileImage.trim(),
      caption: caption.trim(),
      postImage: postImage.trim(),
      likes: 0,
      isLiked: false,
      comments: [],
      createdAt: new Date().toLocaleString()
    };

    onAddPost(newPost);

    // Reset Form
    setUserName('');
    setProfileImage('');
    setCaption('');
    setPostImage('');
    setValidated(false);
  };

  const fillQuickData = () => {
    const randomUser = ['Alice Smith', 'John Doe', 'Elena Rostova', 'Marcus Brody'][Math.floor(Math.random() * 4)];
    const randomProfile = sampleProfileImages[Math.floor(Math.random() * sampleProfileImages.length)];
    const randomPost = samplePostImages[Math.floor(Math.random() * samplePostImages.length)];
    const randomCaption = [
      'Catching the perfect sunset! 🌅✨ #nature #peace',
      'Weekend vibes are here! Let the adventure begin! 🌲🎒',
      'Focus on the good and the good will find you. 🌸☀️',
      'Exploring hidden gems around the world. 🗺️✈️'
    ][Math.floor(Math.random() * 4)];

    setUserName(randomUser);
    setProfileImage(randomProfile);
    setCaption(randomCaption);
    setPostImage(randomPost);
  };

  return (
    <div id="create-post-section" className="create-post-card post-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold text-dark mb-0">
          <i className="bi bi-pencil-square text-indigo me-2" style={{ color: 'var(--primary)' }}></i>Share a Vibe
        </h5>
        <button
          type="button"
          onClick={fillQuickData}
          className="btn btn-sm btn-pill-subtle rounded-pill px-3 py-1 text-xs"
          style={{ fontSize: '0.75rem' }}
        >
          <i className="bi bi-magic me-1"></i> Auto-fill
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate className={validated ? 'was-validated' : ''}>
        <div className="row g-3">
          {/* User Name */}
          <div className="col-md-6">
            <label htmlFor="userName" className="form-label-custom">User Name</label>
            <div className="input-group has-validation">
              <span className="input-group-text bg-light border-end-0 rounded-start-3" style={{ borderColor: 'var(--border-color)' }}>
                <i className="bi bi-person text-secondary"></i>
              </span>
              <input
                type="text"
                id="userName"
                className="form-control custom-input rounded-end-3"
                placeholder="e.g. Jane Doe"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <div className="invalid-feedback">Please provide a user name.</div>
            </div>
          </div>

          {/* Profile Image URL */}
          <div className="col-md-6">
            <label htmlFor="profileImage" className="form-label-custom">Profile Image URL (Optional)</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 rounded-start-3" style={{ borderColor: 'var(--border-color)' }}>
                <i className="bi bi-image-alt text-secondary"></i>
              </span>
              <input
                type="url"
                id="profileImage"
                className="form-control custom-input rounded-end-3"
                placeholder="https://example.com/avatar.jpg"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
              />
            </div>
          </div>

          {/* Post Image URL */}
          <div className="col-12">
            <label htmlFor="postImage" className="form-label-custom">Post Image URL</label>
            <div className="input-group has-validation">
              <span className="input-group-text bg-light border-end-0 rounded-start-3" style={{ borderColor: 'var(--border-color)' }}>
                <i className="bi bi-card-image text-secondary"></i>
              </span>
              <input
                type="url"
                id="postImage"
                className="form-control custom-input rounded-end-3"
                placeholder="https://example.com/photo.jpg"
                value={postImage}
                onChange={(e) => setPostImage(e.target.value)}
                required
              />
              <div className="invalid-feedback">Please provide a post image URL.</div>
            </div>
          </div>

          {/* Caption */}
          <div className="col-12">
            <label htmlFor="caption" className="form-label-custom">Post Caption</label>
            <textarea
              id="caption"
              rows="3"
              className="form-control custom-input"
              placeholder="What's on your mind?"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
            ></textarea>
            <div className="invalid-feedback">Please add a caption for your post.</div>
          </div>

          {/* Image Preview Box */}
          {postImage.trim() && (
            <div className="col-12">
              <div className="form-label-custom mb-2">Post Image Preview</div>
              <div className="image-preview-box">
                <img
                  src={postImage}
                  alt="Post preview"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = '<span class="text-danger small"><i class="bi bi-exclamation-triangle me-1"></i> Failed to load image URL</span>';
                  }}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="col-12">
            <button type="submit" className="btn btn-grad w-100 py-2.5">
              <i className="bi bi-plus-circle me-2"></i>Publish Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
