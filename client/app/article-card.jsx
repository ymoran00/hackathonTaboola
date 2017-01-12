import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ExpandedArticle from './expanded-article';
import {red500, grey100, blue500} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';

export default class ArticleCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      expandClass: '',
      frameUrl: '#'
    };

    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
  }

  fixThumbnailUrl(url) {
    if (url) {
      var newUrl = url.split('!-#');
      if (newUrl && newUrl[0]) {
        return newUrl[0];
      }
    } else {
      return '/dist/res/oops-image.gif';
    }
    return url;
  }

  handleExpandChange(expanded) {
    let newClass = '';
    let frameUrl = '#';
    if (expanded) {
      newClass = 'expanded';
      frameUrl = this.props.data.url;
    }
    this.setState({expanded: expanded, expandClass: newClass, frameUrl: frameUrl});
  }

  handleCollapse() {
    this.handleExpandChange(false);
  }

  normalizePublisher(publisher) {
    if (publisher) {
      return publisher.replace(/[ \-]/g, '_') + '_publisher';
    }
  }

  render() {
      return (
        <Card className={"card-container " + this.state.expandClass + " " + this.normalizePublisher(this.props.data.publisher)}
          onExpandChange={this.handleExpandChange}>
          <CardMedia className="hide-on-expand"
            overlay={<CardTitle
                  style={{padding: 0+"px"}}
                  titleStyle={{fontSize: 14 + "px", lineHeight: 17+"px", padding: 5+"px", width: 85+"%"}}
                  subtitleStyle={{fontSize: 14 + "px", lineHeight: 17+"px", padding: 5+"px"}}
                  title={this.props.data.title} subtitle={this.props.data.publisher}/>}
            >
              <img src={this.fixThumbnailUrl(this.props.data.thumbnailUrl)}/>
          </CardMedia>
          <CardText className="abstract hide-on-expand"
            actAsExpander >{this.props.data.text}</CardText>
          <div className="people-icon hide-on-expand">
              {this.props.data.views}<FontIcon className="material-icons" color={grey100}><i className="material-icons">people</i></FontIcon>
          </div>
          <ExpandedArticle frameUrl={this.state.frameUrl} publisher={this.props.data.publisher}
              onCollapse={this.handleCollapse}/>
        </Card>

    );
  }
}
