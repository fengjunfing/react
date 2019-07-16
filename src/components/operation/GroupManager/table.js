import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GroupDetailCard from '@/components/common/GroupDetailCard';
import Pagination from '@/components/common/Pagination';

export default class ComponentsGroupManagerTable extends Component {
  static propTypes  = {
    table: ImmutablePropTypes.list.isRequired,
    get: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }
  render() {
    return <React.Fragment>
      <Pagination {...this.props} />
      <div style={{
        overflowY: 'auto',
        height: 'calc(100vh - 250px - var(--extraPx))',
      }} className="ant-table-body">
        {this.props.table.map((v, i) => <GroupDetailCard key={i} {...this.props} data={v.toJS()} context={this} />)}
      </div>
    </React.Fragment>;
  }
}
