import * as React from 'react';
import {DisplayText} from '@shopify/polaris';

import {Example, ExampleContainer} from '../components';

export interface Props {
  component: any;
}

export default function ComponentSingleExample({component}: Props) {
  return (
    <React.Fragment>
      <DisplayText>{component.name}</DisplayText>
      {component.examples.map((example) => (
        <React.Fragment key={example.name}>
          <ExampleContainer>
            <Example code={example.code} name={example.name} />
          </ExampleContainer>
          <hr />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}
