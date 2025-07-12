import { useState } from 'react';

export default function Nav({ onFilter, onSearch }) {
  const [dropdown, setDropdown] = useState(false);

  const handleFilter = (filter) => {
    onFilter(filter);
    setDropdown(false);
  };

  return (
    <nav className="nav-section">
      <div className="nav-left">
        <button className="ask-btn" onClick={() => alert('Navigate to ask page')}>Ask New Question</button>
        <div className="filter-section">
          <button className="filter-btn active" onClick={() => handleFilter('newest')}>Newest</button>
          <button className="filter-btn" onClick={() => handleFilter('unanswered')}>Unanswered</button>
          <div className="dropdown">
            <button className="dropdown-btn" onClick={() => setDropdown(!dropdown)}>
              <span>More</span> <span>▼</span>
            </button>
            {dropdown && (
              <div className="dropdown-content">
                <div className="dropdown-item" onClick={() => handleFilter('hot')}>Hot</div>
                <div className="dropdown-item" onClick={() => handleFilter('votes')}>Most Votes</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search questions..."
          onChange={e => onSearch(e.target.value)}
        />
        <button className="search-btn">🔍</button>
      </div>
    </nav>
  );
}
