/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const React = require('react');
const logo = require('assets/img/logo.png');
const add = require('@monkeyzz/large-number');
require('./index.less');

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
      <div
        onClick={this.handleUpdate.bind(this)}
        className="search-text"
        role="presentation"
      >
        Search Text 22 7777
        {Text ? <Text /> : null}
        {addResult}
        <img alt="logo" src={logo} />
      </div>
    );
  }
}

module.exports = <Search />;
