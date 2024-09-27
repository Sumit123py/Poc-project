import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export default function AccordionUsage({data}) {
  return (
    <div>
      {data?.map((paper, index) => (
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {paper.title || paper.sortTitle}
        </AccordionSummary>
        <AccordionDetails>
          <p><b>Published Date:</b> {paper.pubDate || paper.epubDate}</p>
          <b>Paper Link:</b> <a target='_blank' href={`${paper.link}`}> {paper.title || paper.sortTitle}</a>
        </AccordionDetails>
      </Accordion>
      ) )}
      
      
    </div>
  );
}
