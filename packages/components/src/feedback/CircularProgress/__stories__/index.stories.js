import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import README from './README.md';
import Demo from './Demo';

storiesOf('Feedback', module)
  .addDecorator(withKnobs)
  .addParameters({
    notes: README,
  })
  .add('CircularProgress', () => <Demo />);