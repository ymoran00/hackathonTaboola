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
  name(publisherName,isInclude) {
    var convertedOubName = publisherName.replace(/[ \-]/g, '_') + '_publisher',
        itemsToHide = document.getElementsByClassName(convertedOubName);
    for (var i=0; i < itemsToHide.length; i++){
        if ((itemsToHide[i].getAttribute('style')).indexOf('display: none') > -1 ){
          itemsToHide[i].setAttribute('style','display: block; background-color: #FFF;');
          console.log("reverted ->", convertedOubName);
        }
        else {
          itemsToHide[i].setAttribute('style','display: none');
          console.log("hided ->", convertedOubName);
        }
    }
  }

  render() {
      return (
        <div>
          {this.props.items.map(function(item) {
            return <ArticleCard key={item._id} data={item['_source']}/>
          })}
          <FilterList onChange={this.name} />
      </div>
    );
  }
}
