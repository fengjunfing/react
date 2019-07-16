import React, { Component } from 'react';
import CommonFormModal from '@/components/common/FormModal';
import ThisNameSearchFormLeft from '@/containers/operation/ICBCEGroupManager/name-searchForm-left';
import ThisNameTableLeft from '@/containers/operation/ICBCEGroupManager/name-table-left';
import ThisNameSearchFormRight from '@/containers/operation/ICBCEGroupManager/name-searchForm-right';
import ThisNameTableRight from '@/containers/operation/ICBCEGroupManager/name-table-right';

class ComponentsICBCEGroupManagerNameForm extends Component {
  get visible () {
    return !!this.props.leftData.get('id');
  }
  render() {
    return (
      <CommonFormModal {...this.props} notFooter handleSubmit={() => false} width={800}>
        <div style={{ display: this.visible ? 'none' : 'block' }}>
          <ThisNameSearchFormLeft />
          <ThisNameTableLeft />
        </div>
        {this.visible && <React.Fragment>
          <ThisNameSearchFormRight />
          <ThisNameTableRight />
        </React.Fragment>}
      </CommonFormModal>
    );
  }
}

export default ComponentsICBCEGroupManagerNameForm;
