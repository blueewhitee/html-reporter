import React from 'react';
import { ITrace } from '../SpecMetaData/types';
import { ElapsedTime, Wrapper, Text, PassedIcon } from './style';

type TestStepProps = {
  testStepKey: number;
  $tracePresent: boolean;
  time: number;
  $active: boolean;
  set$activeTestStep: React.Dispatch<React.SetStateAction<number | undefined>>;
  children: React.ReactNode;
  traceData: ITrace['domSnapshot'];
  setTrace: React.Dispatch<
    React.SetStateAction<
      | {
          url?: string;
          snapshotPath?: string;
        }
      | undefined
    >
  >;
};

const PassTestStep: React.FC<TestStepProps> = ({
  testStepKey,
  $active,
  set$activeTestStep,
  time,
  children,
  $tracePresent,
  traceData: { snapshotUrl, snapshotFilePath },
  setTrace
}) => {
  return (
    <Wrapper
      $tracePresent={$tracePresent}
      $active={$active}
      onClick={() => {
        set$activeTestStep(testStepKey);
        setTrace(
          snapshotFilePath
            ? {
                ...(snapshotUrl && { url: snapshotUrl }),
                snapshotPath: snapshotFilePath
              }
            : {
                ...(snapshotUrl && { url: snapshotUrl })
              }
        );
      }}>
      <PassedIcon />
      <Text>{children}</Text>
      <ElapsedTime>{time < 1000 ? `${time} ms` : `${Math.round(time / 1000)} sec`}</ElapsedTime>
    </Wrapper>
  );
};

export default PassTestStep;
