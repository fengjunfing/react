import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Carousel, Icon } from 'antd';
import '@/style/carousel.module.css';

class CommmonCarousel extends Component {
  static proptTypes = {
    data: PropTypes.array.isRequired,
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    hide: PropTypes.func.isRequired,
  }
  prev = () => {
    this.carousel.prev();
  }
  next = () => {
    this.carousel.next();
  }
  render() {
    return (
      <Modal
        width={548}
        title={this.props.title}
        visible={this.props.visible}
        onCancel={this.props.hide}
        footer={false}
        bodyStyle={{ backgroundColor: '#364d79', position: 'relative' }}
      >
        <Carousel ref={ c => { this.carousel = c; }}>
          {
            this.props.data.map((t, i) => <div key={i}><a target="_blank" rel="noopener noreferrer" href={t} style={{ display: 'block', overflow: 'hidden', width: 500, height: 500, backgroundImage: `url(${t})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}> </a></div>)
          }
        </Carousel>
        {
          this.props.data.length && this.props.data.length > 1 ?
            <React.Fragment>
              <div className="carousel_to left " onClick={this.prev}><Icon type="left-circle-o" /></div>
              <div className="carousel_to right" onClick={this.next}><Icon type="right-circle-o" /></div>
            </React.Fragment> :
            ''
        }
      </Modal>
    );
  }
}

export default CommmonCarousel;