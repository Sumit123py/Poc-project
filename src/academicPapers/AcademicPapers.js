import React from 'react'
import Spinner from '../components/SpinLoader';
import AccordionUsage from '../components/Acordian';

const AcademicPapers = ({data, loadingAcademicPapers}) => {

  console.log('papers', data)
  return (
    <div className='academicPapersContainer'>
      
        {!loadingAcademicPapers && data.length <= 0 && <p style={{color: 'red'}}>No Papers Available For This Search Term</p> }
        {loadingAcademicPapers && <Spinner/>}

        <AccordionUsage data={data}/>
    </div>
  )
}

export default AcademicPapers;
