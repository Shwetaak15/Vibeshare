import PostCard from './PostCard';

const PostList = ({ posts, onToggleLike, onDeletePost, onAddComment, onDeleteComment }) => {
  if (posts.length === 0) {
    return (
      <div className="empty-state text-center post-fade-in my-5 py-5">
        <div className="empty-icon">
          <i className="bi bi-camera2"></i>
        </div>
        <h3 className="fw-bold text-dark">No Posts Yet</h3>
        <p className="text-muted mb-4 max-w-md mx-auto" style={{ maxWidth: '400px' }}>
          Be the first to share a moment, a thought, or a beautiful photograph with the community.
        </p>
        <a href="#create-post-section" className="btn btn-grad rounded-pill px-4">
          <i className="bi bi-plus-lg me-1"></i>Share a Vibe
        </a>
      </div>
    );
  }

  return (
    <div className="row">
      {posts.map((post) => (
        <div key={post.id} className="col-12 mb-4">
          <PostCard
            post={post}
            onToggleLike={onToggleLike}
            onDeletePost={onDeletePost}
            onAddComment={onAddComment}
            onDeleteComment={onDeleteComment}
          />
        </div>
      ))}
    </div>
  );
};

export default PostList;
