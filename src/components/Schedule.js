import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as Actions from '../redux/actions';
import Record from './Record';

import 'antd/lib/tabs/style/index.css';
import 'antd/lib/button/style/index.css';

const TabPane = Tabs.TabPane;
const Table = styled.table`
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

thead {
  background-color: #FFFFCC;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
const style = {
  table: {
    fontFamily: 'arial, sans-serif',
    borderCollapse: 'collapse',
    width: '100%'
  },
  td: {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px'
  }`;

class Schedule extends React.Component{
  state = {
    currentDoctor: '',
    currentMonth: '1',
    days: 31,
    date: '',
    time: '',
    currentRow: 1
  };

  setMonth = month => {
    this.setState({
      month: month
    });
    switch (month){
      case '1':
      case '3':
      case '5':
      case '7':
      case '8':
      case '10':
      case '12':
        this.setState({ days: 31 });
        break;
      case '2':
        this.setState({ days: 28 });
        break;
      default:
        this.setState({ days: 30 });
        break;  
    }
  }

  componentDidMount(){
    this.setState({
      currentDoctor: this.props.doctor,
    });
  }

  renderMonthTab = () => (
    <Tabs
      defaultActiveKey="1"
      tabPosition="top"
      style={{ height: 50+'px' }}
      onChange = {(tab) => this.setMonth(tab)}
    >
      <TabPane tab="Jan" key="1">Jan</TabPane>
      <TabPane tab="Feb" key="2">Feb</TabPane>
      <TabPane tab="Mar" key="3">March</TabPane>
      <TabPane tab="Apr" key="4">Apr</TabPane>
      <TabPane tab="May" key="5">May</TabPane>
      <TabPane tab="June" key="6">June</TabPane>
      <TabPane tab="July" key="7">July</TabPane>
      <TabPane tab="Aug" key="8">Aug</TabPane>
      <TabPane tab="Sep" key="9">Sept</TabPane>
      <TabPane tab="Oct" key="10">Oct</TabPane>
      <TabPane tab="Nov" key="11">Nov</TabPane>
      <TabPane tab="Dec" key="12">Dec</TabPane>
    </Tabs>
  );
  
  renderTableHeader = days => {
    const tds = [];
    tds.push(<td key={1}>Время</td>);
    for(let i=0;i<days;i++){
      let key=i+2;
      let index=i+1;
      tds.push(<td key={key}>{`${index}`}</td>);
    }
    return tds;
  };

  renderRows = days => {
    const row = [];
    row.push(<td key={1}>09:00</td>);
    for(let i=0;i<days;i++){
      let point=i+1;
      let key=i+2;
      row.push(
        <td className={`${this.state.currentRow}-${point}`} key={key} onClick={(e) => console.log(e.target.className)} style={{ cursor: 'pointer' }}>
          { '+' } 
        </td>
      );
    }

    return <tr>{row}</tr>;
  };

  render(){
    const { doctor } = this.props;
    const { days } = this.state;
    console.log(doctor);
    // const { records } = this.props.doctor;
    return (
      <div>
        <span>Врач: <strong>{doctor.name}</strong></span>
        {this.renderMonthTab()}
        <Table>
          <thead>
            <tr>
              { this.renderTableHeader(days) }
            </tr>
          </thead>
          <tbody>
            <Record records={doctor.records[0]} row="1" time="09:00"/>
          </tbody>
        </Table>
      </div>
    );
  }
}

Schedule.propTypes = {
  doctor: PropTypes.object,
  actions: PropTypes.object
};

const mapStateToProps = state => ({
  doctor: (() => {
    let current = state.doctors.currentDoc;
    let records = state.doctors.doctors.filter(item => item.name === current );
    return records[0];
  })()
});

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({
  addRecord: Actions.addRecord,
  editRecord: Actions.editRecord,
  deleteRecord: Actions.deleteRecord
}, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);