import React, { Component } from 'react';
import { project_name } from '@/publicData/config';

class ComponentsHome extends Component {
  render() {
    return <div style={{ margin: 18 }}>欢迎使用{project_name}</div>;
  }
}

export default ComponentsHome;