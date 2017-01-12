import React from 'react';
import ReactDOM from 'react-dom';
import Chip from 'material-ui/Chip';

export default class FilterList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      excludedChipData: [],
      includedChipData: []
    }
    document.addEventListener('filterListUpdate', function(e) {
      this.setState({
        includedChipData: e.detail
      })
    }.bind(this));
  }


  handleRequestDelete(key, isInclude) {
    if (isInclude) {
      this.fromChipData = this.state.includedChipData;
      this.toChipData = this.state.excludedChipData;
    } else {
      this.fromChipData = this.state.excludedChipData;
      this.toChipData = this.state.includedChipData;
    }

    const chipIndexToDelete = this.fromChipData.indexOf(key);
    this.fromChipData.splice(chipIndexToDelete, 1);
    this.toChipData.push(key);

    if (isInclude) {
      this.setState({
        includedChipData: this.fromChipData,
        excludedChipData: this.toChipData
      });
    } else {
      this.setState({
        includedChipData: this.toChipData,
        excludedChipData: this.fromChipData
      });
    }

  }

  normalizePublisher(publisher) {
    if (publisher) {
      return publisher.replace(/[ \-]/g, '_') + '_publisher';
    }
  }

  renderChipInclude(data) {
    return (
      <Chip
        key={data} className={this.normalizePublisher(data)}
        onRequestDelete={() => this.handleRequestDelete(data, true)}
      >
        {data}
      </Chip>
    );
  }

  renderChipExclude(data) {
    return (
      <Chip
        key={data} className={this.normalizePublisher(data)}
        onRequestDelete={() => this.handleRequestDelete(data, false)}
      >
        {data}
      </Chip>
    );
  }

  render() {
      return (
        <div className="publisher-filters">
          <div className="include">
            {this.state.includedChipData.map(this.renderChipInclude, this)}
          </div>
          <div className="exclude">
            {this.state.excludedChipData.map(this.renderChipExclude, this)}
          </div>
      </div>

    );
  }
}
