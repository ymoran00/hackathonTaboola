import React from 'react';
import ReactDOM from 'react-dom';
import Infinite  from 'react-infinite';
import ArticleCard from './article-card';

const cardHeight = 800;

export default class InfiniteList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cardHeight: 800,
      elements: this.buildElements(this.props.items),
      isInfiniteLoading: false
    }
  }

  buildElements(items) {
      var elements = [];
      items.forEach(function(item) {
        elements.push(<ArticleCard data={item['_source']}/>)
      });
      return elements;
  }

  handleInfiniteLoad() {
      var that = this;
      this.setState({
          isInfiniteLoading: true
      });
      setTimeout(function() {
          var elemLength = that.state.elements.length,
              newElements = that.buildElements(elemLength);
          that.setState({
              isInfiniteLoading: false,
              elements: that.state.elements.concat(newElements)
          });
      }, 2500);
  }

  elementInfiniteLoad() {
      return <div className="infinite-list-item">
          Loading...
      </div>;
  }

  render() {
      return (
        <Infinite elementHeight={cardHeight}
             containerHeight={1000}
             infiniteLoadBeginEdgeOffset={200}
             onInfiniteLoad={this.handleInfiniteLoad}
             loadingSpinnerDelegate={this.elementInfiniteLoad()}
             isInfiniteLoading={this.state.isInfiniteLoading}
             >
          {this.state.elements}
      </Infinite>
    );
  }
}
