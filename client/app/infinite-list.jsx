import React from 'react';
import ReactDOM from 'react-dom';
import Infinite  from 'react-infinite';
import ArticleCard from './article-card';
import FilterList from './filter-list';

const cardHeight = 800;

export default class InfiniteList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cardHeight: 800
    }
  }

  render() {
      return (
        <div>
          {this.props.items.map(function(item) {
            return <ArticleCard key={item._id} data={item['_source']}/>
          })}
          <FilterList />
      </div>
    );
  }
}
