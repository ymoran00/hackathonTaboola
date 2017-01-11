import SearchBar from './search-bar';
import React from 'react';
import ReactDOM from 'react-dom';
//import Infinite  from 'react-infinite';
import InfiniteList from './infinite-list';
import $ from 'jquery';

const ELASTIC_SERVER = 'http://qa-backstage022.taboola.com:9200';

const ELASTIC_SEARCH_API = ELASTIC_SERVER + '/videos/_search';

export class App extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
        items: []
      };
      this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(text) {
    var that = this;
    $.post(ELASTIC_SEARCH_API,
        JSON.stringify({
          'query': {
            'multi_match': {
              'query': '' + text,
              'fields': ['title', 'text']
            }
          }
        }),$.proxy(function(data) {
          console.log (`got ${data}!`);
          this.setState({
              items: data.hits.hits
          });
        },this
    )).fail(() => {
      alert ('FAILED...')
    });
  }

  render() {
    return (
      <div className="root">
        <img className="title" src="dist/res/title.gif"/>
        <SearchBar onSearch={this.handleSearch} />
        <InfiniteList items={this.state.items} />
      </div>
    );
  }
}

ReactDOM.render(
    <App/>,
    document.querySelector('.root')
);
