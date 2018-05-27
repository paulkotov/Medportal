import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Icon, Divider, Button, Modal, Input } from 'antd';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';

import * as Actions from '../redux/actions';

import 'antd/lib/style/index.css';
import 'antd/lib/table/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/modal/style/index.css';


const columns = [{
  title: 'Имя',
  dataIndex: 'name',
  key: 'name',
  
}, {
  title: 'Специализация',
  dataIndex: 'spec',
  key: 'spec',
}, {
  title: 'Записи',
  dataIndex: 'records',
  key: 'records',
  render: (records) => (
    Object.keys(records).length
  )
}, {
  title: 'Action',
  key: 'action',
  render: () => (
    <span>
      <a href="#">Edit <Icon type="edit" /></a>
      <Divider type="vertical" />
      <a href="#">Delete <Icon type="delete" /></a>
      <Divider type="vertical" />
    </span>
  ),
}];
   
class DoctorsPanel extends React.Component{
  state = {
    loading: false,
    visible: false,
    name: '',
    spec: ''
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleProperty = propertyName => event => {
    this.setState({ 
      [propertyName]: event.target.value 
    });
  };

  handleOk = () => {
    const { addDoctor } = this.props.actions;
    const { name, spec } = this.state;
    addDoctor(name, spec);
    this.setState({
      visible: false,
      name: '',
      spec: ''
    });
  };

  handleCancel = () => {
    this.setState({ 
      visible: false,
      name: '',
      spec: '' });
  };

  componentWillReceiveProps(newProps){
    if (this.props.doctors.lenght !== newProps.doctors.lenght) this.forceUpdate();
  }

  render() {
    const { visible } = this.state;
    const data = this.props.doctors.doctors;
    const { setCurrent } = this.props.actions;

    return(
      <div>
        <div style={{ padding: 10+'px' }}>
          <Button type="primary" onClick={this.showModal}>Добавить врача</Button>
        </div>
        <Modal
          visible={visible}
          title="Add new doctor"
          wrapClassName="vertical-center-modal"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Save
            </Button>,
          ]}
        ><Input.Group>
            <Input placeholder="Doctor's name" defaultValue=" " onChange={this.handleProperty('name')}/>
            <Input placeholder="Doctor's specialization" defaultValue=" " onChange={this.handleProperty('spec')}/>
          </Input.Group>
        </Modal>
        <Table columns={columns} dataSource={data} onRow={(row) => { 
          return {
            onClick: () => { setCurrent(row.name); } 
          }; 
        }
        }/>
      </div>
    );
  }
}

DoctorsPanel.propTypes = {
  actions: PropTypes.object,
  doctors: PropTypes.object
};

const getFiltered = state => ({ doctors: state.doctors.doctors });
const getState = state => ({ state: state });
const doctorsSelector = createSelector(getFiltered, getState,
  (doctor, state) => {
    let filteredSpec = state.state.doctors.filteredSpec;
    const dc = doctor.doctors;
    if (filteredSpec == ''){
      return { doctors: dc };
    }
    return { doctors: dc.filter(doc => doc.spec == filteredSpec) };
  });

const mapStateToProps = state => ({ doctors: doctorsSelector(state) });
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({
  addDoctor: Actions.addDoctor, 
  setCurrent: Actions.setCurrent,
  deleteDoctor: Actions.deleteDoctor }, 
dispatch) });


export default connect(mapStateToProps, mapDispatchToProps)(DoctorsPanel);