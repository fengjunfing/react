import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { Map, Marker } from 'react-amap';

class MapApp extends Component {
  static proptTypes = {
    data: PropTypes.array.isRequired,
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    hide: PropTypes.func.isRequired,
  }
  render() {
    const mapCenter = { longitude: this.props.data.longitude || 120, latitude: this.props.data.latitude || 30 };
    return (
      <Modal
        width={600}
        title={this.props.title}
        visible={this.props.visible}
        onCancel={this.props.hide}
        footer={false}
        bodyStyle={{ height: 500 }}
      >
        <Map zoom={15} center={mapCenter}>
          <Marker position={mapCenter} />
        </Map>
      </Modal>
    );
  }
}

export default MapApp;