import React from 'react';
import { Modal, Row, Col, List } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const empty = '暂无';

const UserCenter = ({ visible, hide, userCenterData }) => (
  <Modal
    title="用户详情"
    width={460}
    visible={visible}
    onCancel={hide}
    footer={false}
  >
    <Row>
      <Col span={14}>
        <List
          size="small"
          dataSource={[
            `帐号: ${userCenterData.get('loginName') || empty}`,
            `姓名: ${userCenterData.get('name') || empty}`,
            `手机: ${userCenterData.get('phone') || empty}`,
            `是否使用: ${userCenterData.get('status') === 'y' ? '是' : '否' || empty}`,
            '',
          ]}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
      </Col>
      <Col span={9} offset={1}>
        <a href={userCenterData.get('headPortrait')} rel="noopener noreferrer" target="_blank">
          <img
            style={{ border: '1px dashed #dedddd', borderRadius: 6, padding: 8, width: 152, height: 152, display: 'block', margin: '0 auto' }}
            src={`${userCenterData.get('headPortrait')}/w/134/h/134`}
            alt="头像"
          />
        </a>
      </Col>
    </Row>
  </Modal>
);

UserCenter.propTypes = {
  visible: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  userCenterData: ImmutablePropTypes.map.isRequired,
};

export default UserCenter;