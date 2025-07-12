export default function QuestionCard({ question }) {
  return (
    <div className="question-card" onClick={() => alert(`View question ${question.id}`)}>
      <div className="question-header">
        <h3 className="question-title">{question.title}</h3>
        <div className="answers-badge">{question.answers_count || 0} ans</div>
      </div>
      <p className="question-preview">{question.description.slice(0, 120)}...</p>
      <div className="question-footer">
        <div className="question-tags">
          {(question.tags || []).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <div className="question-meta">
          <div>Asked by <span className="username">{question.author || 'Unknown'}</span></div>
          <div>{question.timeAgo || ''}</div>
        </div>
      </div>
    </div>
  );
}
