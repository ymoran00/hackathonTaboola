import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';
import {red500, grey900, blue500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';

export default class ExpandedArticle extends React.Component {
  constructor(props) {
    super(props);

    this.collapse = this.collapse.bind(this);

  }

  collapse() {
    this.props.onCollapse();
  }

  render() {
    return (
      <div className="article-frame show-on-expand">
        <Toolbar>
          <ToolbarGroup firstChild={true} style={{width: 100+"%"}}>
            <ToolbarTitle text={this.props.publisher} />
            <IconButton touch>
              <FontIcon className="material-icons" color={blue500}><i className="material-icons">open_in_browser</i></FontIcon>
            </IconButton>
            <IconButton touch>
              <FontIcon className="material-icons" color={blue500}><i className="material-icons">share</i></FontIcon>
          </IconButton>
          </ToolbarGroup>
          <ToolbarGroup>
            <IconButton touch onTouchTap={this.collapse}>
              <FontIcon className="material-icons" color={grey900}><i className="material-icons">clear</i></FontIcon>
          </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <iframe src={this.props.frameUrl} className=""/>
      </div>
    );
  }
}
