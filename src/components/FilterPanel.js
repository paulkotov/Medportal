import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';

import * as Actions from '../redux/actions';

import 'antd/lib/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/input/style/index.css';

class FilterPanel extends React.Component {
  state = {
    filter: ''
  };
  
  renderCount = () => {
    const { count } = this.props;
    const itemWord = count === 1 ? 'doctor' : 'doctors';
    return (
      <span className="doctors-count">
        <strong>{count || 'No'}</strong> {itemWord} found
      </span>
    );
  }

  handleProperty = propertyName => event => {
    this.setState({ 
      [propertyName]: event.target.value 
    });
  };

  onBtnClickHandler = () => {
    const { filter } = this.state;
    const { setFilter } = this.props.actions;
    setFilter(filter);
  };

  render() {
    return (
      <div className="filter" style={{ backgroundColor: '#FFFFCC' }}>
        Filter: 
        <Input type="text" 
          onChange={this.handleProperty('filter')}
          placeholder="Enter specialization" />{' '}
        <div style={{ paddingTop: 10+'px' }}>
          <Button onClick={this.onBtnClickHandler}> Set </Button>
        </div>
        <div>
          {this.renderCount()}   
        </div>
      </div> 
    );
  }
}

FilterPanel.propTypes ={
  count: PropTypes.number,
  filter: PropTypes.string,
  actions: PropTypes.object
};

const mapStateToProps = state => ({ 
  count: state.doctors.doctors.length,
  filter: state.doctors.filteredSpec
});
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({
  setFilter: Actions.setFilter }, 
dispatch) });


export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel);