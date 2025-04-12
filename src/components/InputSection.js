// src/components/InputSection.js
import React, { useState } from 'react';
import './InputSection.css'; // Create this CSS file

function InputSection({ providerId, setProviderId, onGenerate, leftLoading, rightLoading }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission refresh
    onGenerate();
  };

  return (
    <form className="input-section" onSubmit={handleSubmit}>
      <div className={`input-container ${isFocused ? 'focused' : ''}`}>
        <input 
          type="text" 
          id="provider-id" 
          placeholder=" "
          value={providerId}
          onChange={(e) => setProviderId(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required
        />
        <label htmlFor="provider-id">Provider ID</label>
        <div className="input-border"></div>
      </div>

      <button 
        type="submit" 
        className="generate-button"
        disabled={!providerId.trim() || leftLoading || rightLoading }
      >
        Generate
        <span className="button-arrow"></span>
      </button>
      {/* <div className="example-ids">
        Try these: <span className="example-id" onClick={() => setProviderId('660ed20c3a313a002445d58c')}>660ed20c3a313a002445d58c</span>, 
        <span className="example-id" onClick={() => setProviderId('66a863ac0714440024be9e18')}>66a863ac0714440024be9e18</span>, 
        <span className="example-id" onClick={() => setProviderId('demo789')}>demo789</span>
      </div> */}
    </form>
  );
}

export default InputSection;
