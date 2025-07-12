import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Nav from '../components/Nav';
import QuestionCard from '../components/QuestionCard';
import Pagination from '../components/Pagination';
import '../App.css';

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [questions, currentFilter, searchQuery]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/questions/');
      setQuestions(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filteredList = [...questions];

    if (searchQuery) {
      filteredList = filteredList.filter(q =>
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (currentFilter === 'unanswered') {
      filteredList = filteredList.filter(q => q.answers_count === 0);
    }

    if (currentFilter === 'hot') {
      filteredList.sort((a, b) => b.answers_count - a.answers_count);
    }

    setFiltered(filteredList);
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLast = currentPage * questionsPerPage;
  const indexOfFirst = indexOfLast - questionsPerPage;
  const currentQuestions = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / questionsPerPage);

  return (
    <div className="container">
      <Header />
      <Nav 
        onFilter={setCurrentFilter}
        onSearch={setSearchQuery}
      />

      <main className="main-content">
        {loading ? (
          <div className="loading show">
            <div className="spinner"></div>
            <p>Loading questions...</p>
          </div>
        ) : currentQuestions.length ? (
          currentQuestions.map(q => (
            <QuestionCard key={q.id} question={q} />
          ))
        ) : (
          <div className="empty-state show">
            <h3>No questions found</h3>
            <p>Try adjusting your search or filters, or be the first to ask a question!</p>
            <button className="ask-btn" onClick={() => alert('Navigate to ask page')}>Ask the First Question</button>
          </div>
        )}

        <Pagination 
          totalPages={totalPages}
          currentPage={currentPage}
          setPage={setCurrentPage}
        />
      </main>
    </div>
  );
}
