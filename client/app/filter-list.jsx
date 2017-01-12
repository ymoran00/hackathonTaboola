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


  handleRequestDelete(key) {
    this.includedChipData = this.state.includedChipData;
    this.excludedChipData = this.state.excludedChipData;
    const chipIndexToDelete = this.includedChipData.indexOf(key);
    this.includedChipData.splice(chipIndexToDelete, 1);
    this.excludedChipData.push(key);
    this.setState({
      includedChipData: this.includedChipData,
      excludedChipData: this.excludedChipData
    });
  }

  renderChip(data) {
    return (
      <Chip
        key={data}
        onRequestDelete={() => this.handleRequestDelete(data)}
      >
        {data}
      </Chip>
    );
  }

  render() {
      return (
        <div className="publisher-filters">
          <div className="include">
            {this.state.includedChipData.map(this.renderChip, this)}
          </div>
          <div className="exclude">
            {this.state.excludedChipData.map(this.renderChip, this)}
          </div>
      </div>

    );
  }
}
