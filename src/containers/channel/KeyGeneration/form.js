import React from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisForm from '@/components/channel/KeyGeneration/form';

class ContainersKeyGenerationForm extends BaseComponent {
  static propTypes = {
    dictData: ImmutablePropTypes.map.isRequired,
  }
  handleSubmit() {
    this.form.validateFields((err, values) => {
      if (!err) {
        delete values.mprivateKey;
        delete values.mpublicKey;
        const formData = {
          ...values,
        };
        for (var v in formData) {
          formData[v] = formData[v] === undefined ? '' : formData[v];
        }
        this.props.generationKey(formData);
      }
    });
  }
  render() {
    return <ThisForm ref={c => { this.form = c; }} wrappedComponentRef={c => { this.formBackup = c; }} {...this.props} formBackup={this.formBackup} handleSubmit={this.handleSubmit.bind(this)} />;
  }
}

const mapStateToProps = state => {
  const dict = state.getIn(['basic', 'dict']);
  const data = state.getIn(['channel', 'keyGeneration']);
  return {
    dictData: dict.get('data'),
    formData: data.getIn(['form', 'data']),
    loading: data.getIn(['form', 'loading']),
  };
};

const methods = Actions.KEY_GENERATION;

const mapDispatchToProps = {
  generationKey: methods.generationKey,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersKeyGenerationForm);
