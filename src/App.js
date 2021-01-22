import React, { useEffect, useState } from 'react';
import {FaAngleDoubleRight} from 'react-icons/fa';

const url = 'https://course-api.com/react-tabs-project';

function App() {
   const [loading, setLoading] = useState(true);
   const [jobs, setJobs] = useState([]);
   const [value, setValue] = useState(0);

   const fetchJobs = async () => {
      try {
         const response = await fetch(url);
         const newJobs = await response.json();
         setJobs(newJobs);
         setLoading(false);
         
      } catch (error) {
         setLoading(false);
         console.log(error);
      }
   }

   useEffect(() => {
      fetchJobs();
   }, []);

   if(loading){
      return (
         <section className="section">
            <div className="title">
               <h1>loading...</h1>
            </div>
         </section>
      );
   }

   const {company, title, dates, duties} = jobs[value];

   return (
      <section className="section">
         <div className="title">
            <h2>experience</h2>
            <div className="underline"></div>
         </div>
         <div className="jobs-center">
            <div className="btn-container">
               {
                  jobs.map((item, index) => {
                     return (
                        <button
                           key={index}
                           onClick={() => setValue(index)}
                           className={`job-btn ${index === value && 'active-btn'}`}
                        >
                           {item.company}
                        </button>
                     )
                  })
               }
            </div>
            <article className="job-info">
               <h3>{title}</h3>
               <h4>{company}</h4>
               <p className="job-date">{dates}</p>
               {
                  duties.map((duty, index) => {
                     return (
                        <div className="job-desc">
                           <FaAngleDoubleRight className='job-icon' />
                           <p>{duty}</p>
                        </div>
                     )
                  })
               }
            </article>
         </div>
         <button type="button" className="btn">more info</button>
      </section>
   )
}

export default App
