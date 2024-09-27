import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchAcademicPapers = ({ setPapers, setLoadingAcademicPapers, academicSearchTerm, setAcademicSearchTerm }) => {

  const handleSearchAcademicPapers = async () => {
    setLoadingAcademicPapers(true)
    try {
      // Fetching academic papers from PubMed
      const academicResponse = await axios.get(
        `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi`,
        {
          params: {
            db: 'pubmed',
            term: academicSearchTerm,
            retmode: 'json',
            retmax: 5, // Number of results to retrieve
            sort: 'relevance',
            api_key: process.env.REACT_APP_PUBMED_API_KEY,
          },
        }
      );

      // Get the paper IDs from the search response
      const paperIds = academicResponse?.data?.esearchresult?.idlist;
      console.log('academicResponse.data.esearchresult', academicResponse.data.esearchresult)

      // Fetch details for the academic papers
      const paperDetailsPromises = paperIds?.map((id) =>
        axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi`, {
          params: {
            db: 'pubmed',
            id: id,
            retmode: 'json',
            api_key: process.env.REACT_APP_PUBMED_API_KEY,
          },
        })
      );

      const paperDetailsResponses = await Promise.all(paperDetailsPromises);

      // Extract relevant details from each paper response
      const academicPapers = paperDetailsResponses?.map((response) => {
        const paper = response.data.result;
        const id = paper.uids[0]
        console.log('hello', paper[id].title)
        console.log('paperp', paper)
        return {
          title: paper[id].title,
          link: `https://pubmed.ncbi.nlm.nih.gov/${paper.uids[0]}`, // Link to the PubMed article
          pubDate: paper[id].pubdate, // Publication date
          epubDate: paper[id].epubdate,
          sortTitle: paper[id].sorttitle
        };
      });

      // Set the fetched papers
      setPapers(academicPapers);
    } catch (error) {
      console.error(error);
    } finally{
      setLoadingAcademicPapers(false)
    }
  };

  useEffect(() => {
    // Set a timeout to handle debouncing
    const handler = setTimeout(() => {
      if (academicSearchTerm) {
        handleSearchAcademicPapers(); 
      }
    }, 700); // 700ms delay

    // Cleanup function to clear the previous timeout if the search term changes
    return () => {
      clearTimeout(handler);
    };
  }, [academicSearchTerm]);

  return (
    <div className="searchBox">
      <input
        type="search"
        placeholder="Search for academic papers"
        value={academicSearchTerm}
        onChange={(e) => setAcademicSearchTerm(e.target.value)}
      />
      <button onClick={handleSearchAcademicPapers}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      
    </div>
  );
};

export default SearchAcademicPapers;
