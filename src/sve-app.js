
import React from 'react';
import { render } from 'react-dom';
import Hello from './rc/hello';
import Main from './svelte/main.sve';

const App = () => {
  new Main({
    target: document.getElementById('app')
  });
}

App();

render(<Hello name={1} />, document.getElementById('react'));





