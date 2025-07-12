export default function Pagination({ totalPages, currentPage, setPage }) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button 
        className="pagination-btn" 
        onClick={() => setPage(currentPage - 1)} 
        disabled={currentPage === 1}>‹
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button 
          key={i} 
          className={`pagination-btn ${currentPage === i+1 ? 'active' : ''}`} 
          onClick={() => setPage(i+1)}>{i+1}
        </button>
      ))}
      <button 
        className="pagination-btn" 
        onClick={() => setPage(currentPage + 1)} 
        disabled={currentPage === totalPages}>›
      </button>
    </div>
  );
}
