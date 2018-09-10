import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Table from '../components/table';
import appStyles from '../App.css';

const onSubmit = (data) => {
  console.log('MAIN XX onSubmit formData', JSON.stringify(data, undefined, 2));
};


storiesOf('Volleto Table', module)
.addDecorator(story => <div className="root" style={{ width: 'auto' }}>{story()}</div>)
.addDecorator(story => <div className="main-wrapper" >{story()}</div>)
.addDecorator(story => <div className="container">{story()}</div>)
.add('table', () => <Table />);

