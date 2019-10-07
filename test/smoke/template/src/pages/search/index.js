/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import logo from 'assets/img/logo.png';
import add from '@monkeyzz/large-number';

class Search extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      Text: null,
    };
  }

  handleUpdate() {
    import('./func.js').then((Text) => {
      this.setState({
        Text: Text.default,
      });
    });
  }

  render() {
    const { Text } = this.state;
    const addResult = add('999', '1');
    return (
      <div onClick={this.handleUpdate.bind(this)} className="search-text" role="presentation">
        Search Text 22 7777
        {Text ? <Text /> : null}
        {addResult}
        <img alt="logo" src={logo} />
      </div>
    );
  }
}

ReactDOM.render(<Search />,
  document.getElementById('root'));
