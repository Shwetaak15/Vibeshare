import { useState } from 'react';

const CommentSection = ({ comments, onAddComment, onDeleteComment }) => {
  const [userName, setUserName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userName.trim() || !commentText.trim()) {
      setValidated(true);
      return;
    }

    const newComment = {
      id: Date.now(),
      userName: userName.trim(),
      text: commentText.trim(),
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    onAddComment(newComment);
    setUserName('');
    setCommentText('');
    setValidated(false);
  };

  return (
    <div className="mt-3 pt-3 border-top">
      <h6 className="fw-bold mb-3 d-flex align-items-center">
        <i className="bi bi-chat-left-text text-primary me-2"></i>
        Comments ({comments.length})
      </h6>

      {/* List of Comments */}
      {comments.length > 0 ? (
        <div className="comments-list mb-3">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item post-fade-in">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="fw-bold text-dark">{comment.userName}</span>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted text-xs" style={{ fontSize: '0.75rem' }}>{comment.createdAt}</span>
                  <button
                    type="button"
                    className="btn p-0 border-0 text-secondary"
                    style={{ fontSize: '0.75rem', cursor: 'pointer' }}
                    title="Delete Comment"
                    onClick={() => onDeleteComment(comment.id)}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#6c757d'; }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
              <p className="text-muted mb-0" style={{ fontSize: '0.88rem' }}>{comment.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted text-xs mb-3 italic" style={{ fontSize: '0.85rem' }}>No comments yet. Be the first to share your thoughts!</p>
      )}

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} noValidate className={validated ? 'was-validated' : ''}>
        <div className="row g-2 align-items-stretch">
          <div className="col-4">
            <input
              type="text"
              className="form-control form-control-sm custom-input h-100"
              placeholder="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}
            />
            <div className="invalid-feedback text-xs">Name required.</div>
          </div>
          <div className="col-8">
            <div className="input-group input-group-sm has-validation h-100">
              <input
                type="text"
                className="form-control custom-input border-end-0 h-100"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
                style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem', borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              />
              <button 
                className="btn btn-grad px-3 rounded-end-3 d-flex align-items-center justify-content-center h-100" 
                type="submit"
                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              >
                <i className="bi bi-send-fill" style={{ fontSize: '0.8rem' }}></i>
              </button>
              <div className="invalid-feedback text-xs">Comment empty.</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
