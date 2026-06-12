import { useState } from 'react';
import CommentSection from './CommentSection';

const PostCard = ({ post, onToggleLike, onDeletePost, onAddComment, onDeleteComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(false);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  const handleImageDoubleClick = () => {
    setAnimateHeart(true);
    if (!post.isLiked) {
      onToggleLike(post.id);
    }
    setTimeout(() => {
      setAnimateHeart(false);
    }, 800);
  };

  return (
    <div className="card social-card mb-4 post-fade-in">
      {/* Card Header */}
      <div className="card-header bg-white border-0 d-flex align-items-center justify-content-between py-3">
        <div className="d-flex align-items-center">
          {post.profileImage ? (
            <img
              src={post.profileImage}
              alt={post.userName}
              className="avatar-img me-3"
              onError={(e) => {
                // If the user's profile image fails to load, replace it with initials
                e.target.style.display = 'none';
                const sibling = e.target.nextSibling;
                if (sibling) sibling.style.display = 'flex';
              }}
            />
          ) : null}
          
          {/* Avatar Fallback Badge if image URL is invalid or empty */}
          <div
            className="avatar-placeholder me-3"
            style={{
              display: post.profileImage ? 'none' : 'flex',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)'
            }}
          >
            {getInitials(post.userName)}
          </div>

          <div>
            <h6 className="fw-bold mb-0 text-dark">{post.userName}</h6>
            <small className="text-muted" style={{ fontSize: '0.75rem' }}>
              <i className="bi bi-clock me-1"></i>
              {post.createdAt}
            </small>
          </div>
        </div>

        {/* Delete Post Button */}
        <button
          className="btn btn-action-delete border-0"
          title="Delete Post"
          onClick={() => onDeletePost(post.id)}
        >
          <i className="bi bi-trash3 fs-5"></i>
        </button>
      </div>

      {/* Card Body - Post Image */}
      <div
        className="post-image-container"
        onDoubleClick={handleImageDoubleClick}
        style={{ cursor: 'pointer' }}
      >
        {/* Heart Overlay for Double-Tap Action */}
        <div className={`like-heart-overlay ${animateHeart ? 'animate' : ''}`}>
          <i className="bi bi-heart-fill text-danger"></i>
        </div>

        <img
          src={post.postImage}
          alt="Post Content"
          className="post-image"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?auto=format&fit=crop&w=800&q=80'; // fallback placeholder image
          }}
        />
      </div>

      {/* Card Footer */}
      <div className="card-body py-3">
        {/* Post Actions */}
        <div className="d-flex align-items-center gap-2 mb-2">
          {/* Like Action */}
          <button
            className={`btn-action ${post.isLiked ? 'liked' : ''}`}
            onClick={() => onToggleLike(post.id)}
            title={post.isLiked ? "Unlike" : "Like"}
          >
            <i className={`bi ${post.isLiked ? 'bi-heart-fill' : 'bi-heart'} fs-5`}></i>
          </button>

          {/* Comment Trigger */}
          <button
            className="btn-action"
            onClick={() => setShowComments(!showComments)}
            title="Comments"
          >
            <i className="bi bi-chat fs-5"></i>
          </button>
        </div>

        {/* Likes Count Indicator */}
        <div className="fw-bold text-dark mb-2" style={{ fontSize: '0.95rem' }}>
          {post.likes} {post.likes === 1 ? 'like' : 'likes'}
        </div>

        {/* Caption */}
        <p className="card-text text-dark mb-2">
          <span className="fw-bold me-2">{post.userName}</span>
          {post.caption}
        </p>

        {/* Comments Toggle Link */}
        <button
          className="btn btn-link p-0 text-decoration-none text-muted small mb-2"
          onClick={() => setShowComments(!showComments)}
        >
          {post.comments.length > 0
            ? `${showComments ? 'Hide' : 'View all'} ${post.comments.length} comment${post.comments.length === 1 ? '' : 's'}`
            : 'Add a comment'}
        </button>

        {/* Comments Section Dropdown */}
        {showComments && (
          <CommentSection
            comments={post.comments}
            onAddComment={(comment) => onAddComment(post.id, comment)}
            onDeleteComment={(commentId) => onDeleteComment(post.id, commentId)}
          />
        )}
      </div>
    </div>
  );
};

export default PostCard;
