import React from 'react';
import Form from './Form';
import Tabela from './Tabela';


export default class App extends React.Component {
  render () {
    return (
      <div>
        <Form />
        <Tabela />
      </div>
    );
  }
}
