import React, { useState, useRef } from 'react';
function AskQuestion() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const editorRef = useRef(null);

  const handleCommand = (command, value) => {
    if (command === 'createLink') {
      const url = prompt('Enter URL:');
      if (url) {
        document.execCommand(command, false, url);
      }
    } else {
      document.execCommand(command, false, value || null);
    }
    editorRef.current.focus();
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag) && tags.length < 5) {
        setTags([...tags, newTag]);
        setTagInput('');
      }
    } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
      handleRemoveTag(tags.length - 1);
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const html = editorRef.current.innerHTML;
    if (title.trim() && html.trim()) {
      console.log('Question submitted:', { title, description: html, tags });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setTitle('');
      editorRef.current.innerHTML = '';
      setTags([]);
    }
  };

  return (
    <>
      <header className="header">
        <div className="logo">StackIt</div>
        <div className="nav-links">
          <button className="nav-btn">Home</button>
          <button className="nav-btn">Questions</button>
          <button className="nav-btn">Users</button>
          <div className="user-avatar">JD</div>
        </div>
      </header>

      <div className="form-container">
        <h1 className="form-title">Ask a Question</h1>
        {showSuccess && (
          <div className="success-message">Your question has been submitted successfully!</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="What's your programming question? Be specific."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <div className="mode-toggle">
              <button
                type="button"
                className={`mode-btn ${!isPreviewMode ? 'active' : ''}`}
                onClick={() => setIsPreviewMode(false)}
              >Edit</button>
              <button
                type="button"
                className={`mode-btn ${isPreviewMode ? 'active' : ''}`}
                onClick={() => {
                  setDescription(editorRef.current.innerHTML);
                  setIsPreviewMode(true);
                }}
              >Preview</button>
            </div>

            {!isPreviewMode && (
              <>
                <div className="toolbar">
                  <button type="button" className="toolbar-btn" onClick={() => handleCommand('bold')}><b>B</b></button>
                  <button type="button" className="toolbar-btn" onClick={() => handleCommand('italic')}><i>I</i></button>
                  <button type="button" className="toolbar-btn" onClick={() => handleCommand('underline')}><u>U</u></button>
                  <button type="button" className="toolbar-btn" onClick={() => handleCommand('strikeThrough')}><s>S</s></button>
                  <button type="button" className="toolbar-btn" onClick={() => handleCommand('insertUnorderedList')}>•</button>
                  <button type="button" className="toolbar-btn" onClick={() => handleCommand('insertOrderedList')}>1.</button>
                  <button type="button" className="toolbar-btn" onClick={() => handleCommand('formatBlock', 'blockquote')}>"</button>
                  <button type="button" className="toolbar-btn" onClick={() => handleCommand('formatBlock', 'h3')}>H</button>
                  <button type="button" className="toolbar-btn" onClick={() => handleCommand('insertHorizontalRule')}>―</button>
                  <button type="button" className="toolbar-btn" onClick={() => handleCommand('createLink')}>🔗</button>
                  <button type="button" className="toolbar-btn" onClick={() => handleCommand('removeFormat')}>⌫</button>
                </div>
                <div
                  ref={editorRef}
                  className="editor"
                  contentEditable
                  placeholder="Describe your problem in detail..."
                  onFocus={() => {
                    if (editorRef.current.innerHTML === '') {
                      editorRef.current.innerHTML = '<p><br></p>';
                    }
                  }}
                  onBlur={() => {
                    if (editorRef.current.innerHTML === '<p><br></p>') {
                      editorRef.current.innerHTML = '';
                    }
                  }}
                ></div>
              </>
            )}

            {isPreviewMode && (
              <div className="preview-mode" dangerouslySetInnerHTML={{ __html: description }} />
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Tags</label>
            <div className="tags-input">
              {tags.map((tag, index) => (
                <div className="tag" key={index}>
                  {tag}
                  <button type="button" className="tag-remove" onClick={() => handleRemoveTag(index)}>×</button>
                </div>
              ))}
              <input
                type="text"
                className="tag-input"
                placeholder="Add tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">Submit Question</button>
        </form>
      </div>
    </>
  );
}

export default AskQuestion;

