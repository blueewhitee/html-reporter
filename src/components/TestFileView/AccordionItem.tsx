import React from 'react';
import { useReportContext } from '../../hooks/ReportContext';
import { Status } from '../../transform';
import TestBlock from '../TestBlock';
import { AccordionContent } from './AccordionContent';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionItem } from './style';
import { AccordionItemsProps } from './types';

const AccordionItems: React.FC<AccordionItemsProps> = ({ expandedIds, setTabValue, file }) => {
  const { testId, setTestId, setFileId } = useReportContext();

  return (
    <AccordionItem
      key={file.key}
      value={file.key}
      disabled={file.status === 'skip'}
      skip={+(file.status === 'skip')}
    >
      <AccordionTrigger status={file.status as Status} value={file.key} expandedIds={expandedIds}>
        {file.fileName}
      </AccordionTrigger>
      <AccordionContent>
        {file.tests.map((test) => {
          return (
            <TestBlock
              key={test.key}
              status={test.status}
              $highlightBlock={test.key === testId}
              fileKey={file.key}
              testKey={test.key}
              setTestId={setTestId}
              setFileId={setFileId}
              setTabValue={setTabValue}
            >
              {test.testName}
            </TestBlock>
          );
        })}
      </AccordionContent>
    </AccordionItem>
  );
};

export default AccordionItems;
