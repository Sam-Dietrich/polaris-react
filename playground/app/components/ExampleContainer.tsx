import * as React from 'react';

export interface ExampleContainerProps {
  children?: any;
}

/* This is to prevent false positives in visual regression testing.
   Set a minimum height so that examples don't shift and triger
   a failure if an example above them changes height */
const containerStyle = {
  minHeight: '720px',
  margin: '0 10px',
};

export default function ExampleContainer({children}: ExampleContainerProps) {
  return <div style={containerStyle}>{children}</div>;
}
