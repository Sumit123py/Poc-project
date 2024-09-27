import React, { useState } from "react";
import YoutubeVideosLinks from "../youtubeVideosLinks/YoutubeVideosLinks";
import AcademicPapers from "../academicPapers/AcademicPapers";
import SearchAcademicPapers from "./SearchAcademicPapers";
import SearchYoutubeLinksArticles from "./SearchYoutubeLinksArticles";
import Filters from "./Filters";

const Search = () => {
  const [results, setResults] = useState([]);
  const [papers, setPapers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(
    "Youtube Videos Links and Articles"
  );
  const [loadingAcademicPapers, setLoadingAcademicPapers] = useState(false)
  const [loadingYoutubeVideos, setLoadingYoutubeVideos] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const [academicSearchTerm, setAcademicSearchTerm] = useState('');

  return (
    <div className="searchContainer">
      <div className="topHead">
        <div className="searchInputs">
          {selectedOption === "Youtube Videos Links and Articles" && (
            <SearchYoutubeLinksArticles setLoadingYoutubeVideos={setLoadingYoutubeVideos} setResults={setResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          )}

          {selectedOption === "Academic Papers" && (
            <SearchAcademicPapers setLoadingAcademicPapers={setLoadingAcademicPapers} setPapers={setPapers} academicSearchTerm={academicSearchTerm} setAcademicSearchTerm={setAcademicSearchTerm}  />
          )} 
        </div>
        <Filters
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setAcademicSearchTerm={setAcademicSearchTerm}
          setSearchTerm={setSearchTerm}
          academicSearchTerm={academicSearchTerm}
          searchTerm={searchTerm}
        />
      </div>

      <div className="dataContainer">
        {selectedOption === "Youtube Videos Links and Articles" && <YoutubeVideosLinks loadingYoutubeVideos={loadingYoutubeVideos} data={results} />}
        {selectedOption === "Academic Papers" && <AcademicPapers loadingAcademicPapers={loadingAcademicPapers} data={papers} />}
      </div>
    </div>
  );
};

export default Search;
