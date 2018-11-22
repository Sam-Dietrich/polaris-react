import * as React from 'react';

import {Example} from '../components';

export interface Props {
  components: any;
}

export default function AllComponents({components}: Props) {
  return (
    <React.Fragment>
      {components.map((component) =>
        component.examples.map((example) => (
          <div
            style={{marginTop: '3rem', marginBottom: '3rem'}}
            key={`${component.name}/${example.name}`}
          >
            <Example code={example.code} name={example.name} />
          </div>
        )),
      )}
    </React.Fragment>
  );
}
