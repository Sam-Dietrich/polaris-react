import * as React from 'react';

import {Example} from '../components';
import {ExtractedExample} from '../types';

export interface Props {
  example: ExtractedExample;
}

export default function ComponentSingleExample({example}: Props) {
  return <Example code={example.code} name={example.name} />;
}
