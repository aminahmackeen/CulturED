import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

function ShareStory() {

  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [culture, setCulture] = useState('');
  const [tags, setTags] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();

  const handlePublicShare = async () => {
    const confirmed = window.confirm("Are you sure you want to share this story publicly?");
    if (confirmed) {
      const newStory = {
        title,
        story,
        anonymous,
        culture,
        tags: tags.split(',').map(tag => tag.trim()),
        year: parseInt(year),
      };

      try {
        await push(ref(db, 'stories'), newStory);
        console.log("Story saved successfully");
        navigate('/explorepage');
      } catch (error) {
        console.error("Error saving story:", error);
      }
    }
  };

  return (

    // <!-- level 1 main share story contianer -->
    <div className="share-story-container">
        <h1>Share Your Story</h1>
        
        {/* level 2 choose prompts */}
        <div className="theme-1 p-1">
            <p>prompts go here: iarasfiuhaeiufhaiuefpaeufhpaieuf</p>
        </div>
        {/* <!-- level 2 share story form (inputs and tag columns)  --> */}
        <div className="row theme-2p-1">

            {/* <!-- level 3 Text --> */}
            <div className="theme-2 col d-flex flex-column">
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Type story here" value={story} onChange={(e) => setStory(e.target.value)} />
            </div>

            {/* <!-- level 3 Media --> */}
            <div className="theme-2 col-sm-3 d-flex flex-column">
                <button className="btn btn-primary">Add File</button>
            </div>
            
            {/* <!-- level 3 Tags --> */}
            <div className="theme-3 col-md-3 ms-md-3 d-flex flex-column">
                <input type="text" placeholder="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
                <input
  type="text"
  placeholder="Type culture"
  value={culture}
  onChange={(e) => setCulture(e.target.value)}
/>

                <select value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="">Select Year</option>
                  {Array.from({ length: 500 }, (_, i) => {
                    const y = new Date().getFullYear() - i;
                    return <option key={y} value={y}>{y}</option>;
                  })}
                </select>
            </div>

        </div>

        {/* <!-- level 2 submit story buttons --> */}
        <div  className="d-flex flex-column">
            <label>
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
              />
              Post as Anonymous
            </label>
            <button className="share-btn" onClick={handlePublicShare}>Share Publicly</button>
            <button className="share-btn">Share to my Communities</button>
        </div>

    </div>


  );
}

export default ShareStory;








    // <div className="share-story-container">
    //   <h1>Share Your Story</h1>
    //   <div className="form-container">
    //     <div className="left-column">
    //       <input
    //         type="text"
    //         placeholder="Title"
    //         value={title}
    //         onChange={(e) => setTitle(e.target.value)}
    //       />
    //       <textarea
    //         placeholder="Type story here"
    //         value={story}
    //         onChange={(e) => setStory(e.target.value)}
    //       />
    //     </div>
    //     <div className="right-column">
    //       <input
    //         type="text"
    //         placeholder="Tags (comma-separated)"
    //         value={tags}
    //         onChange={(e) => setTags(e.target.value)}
    //       />
    //       <select value={culture} onChange={(e) => setCulture(e.target.value)}>
    //         <option value="">Add Culture</option>
    //         <option value="Hawaiian">Hawaiian</option>
    //         <option value="Native">Native</option>
    //         {/* Add more options here */}
    //       </select>
    //       <select value={year} onChange={(e) => setYear(e.target.value)}>
    //         <option value="">Select Year</option>
    //         {Array.from({ length: 500 }, (_, i) => {
    //           const y = new Date().getFullYear() - i;
    //           return <option key={y} value={y}>{y}</option>;
    //         })}
    //       </select>
    //       <label>
    //         <input
    //           type="checkbox"
    //           checked={anonymous}
    //           onChange={(e) => setAnonymous(e.target.checked)}
    //         />
    //         Post as Anonymous
    //       </label>
    //     </div>
    //   </div>
    //   <button onClick={handlePublicShare}>Share Publicly</button>
    // </div>