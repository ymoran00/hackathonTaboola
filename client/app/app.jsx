import SearchBar from './search-bar';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
//import Infinite  from 'react-infinite';
import InfiniteList from './infinite-list';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import $ from 'jquery';

const ELASTIC_SERVER = 'http://qa-backstage022.taboola.com:9200';

const ELASTIC_SEARCH_API = ELASTIC_SERVER + '/videos/_search';

export class App extends React.Component {
  constructor (props) {
      super(props);
      injectTapEventPlugin();
      this.state = {
        items: []
      };
      this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(text) {
    var that = this;
    $.post(ELASTIC_SEARCH_API,
        JSON.stringify({
              'query':
              {
                  'multi_match':
                  {
                      'query':'' + text,
                      'type':  'phrase',
                      'fields':['title','text']
                      // 'minimum_should_match': '80%'
                  }
              },
              "sort": [
                  { "_score": { "order": "desc" }},
                  { "ctr": { "order": "desc" }},
                  { "date": { "order": "desc" }}
              ]
          }
        ),$.proxy(function(data) {
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
        <div className="header">
          <img className="title" src="dist/res/title.gif"/>
          <SearchBar onSearch={this.handleSearch} />
        </div>
        <div className="wrapper">
          <InfiniteList items={this.state.items} />
      </div>
      </div>
    );
  }
}

ReactDOM.render(
    <MuiThemeProvider><App/></MuiThemeProvider>,
    document.querySelector('.root')
);
