import THISACTION from './name';
import { transToThunk } from '@/util';

const thunk = {
  tableGet: transToThunk(THISACTION + 'TABLE_GET'),
  tableDelete: transToThunk(THISACTION + 'TABLE_DELETE'),
  tablePublish: transToThunk(THISACTION + 'TABLE_PUBLISH'),
  tableUnpublish: transToThunk(THISACTION + 'TABLE_UNPUBLISH'),
  formGet: transToThunk(THISACTION + 'FORM_GET'),
  formSubmit: transToThunk(THISACTION + 'FORM_SUBMIT'),
  getChannelNameList: transToThunk(THISACTION + 'GET_CHANNEL_NAME_LIST'),
  publishTicket: transToThunk(THISACTION + 'PUBLISH_TICKET'),
};

const getChannelNameList = () => dispatch => dispatch({
  [THISACTION + 'GET_CHANNEL_NAME_LIST']: {
    types: Object.values(thunk.getChannelNameList),
    url: 'channelInfo/channelInfoList',
  }
});

const tableGet = params => dispatch => dispatch({
  [THISACTION + 'TABLE_GET']: {
    types: Object.values(thunk.tableGet),
    url: 'sysTicketVolume/ticketListPage',
    params,
  }
});

const tableDelete = params => dispatch => dispatch({
  [THISACTION + 'TABLE_DELETE']: {
    types: Object.values(thunk.tableDelete),
    url: 'sysTicketVolume/deleteTicketByPrimaryKey',
    params,
  }
});

const tablePublish = params => dispatch => dispatch({
  [THISACTION + 'TABLE_PUBLISH']: {
    types: Object.values(thunk.tablePublish),
    url: 'sysTicketVolume/enableTicket',
    params,
  }
});

const tableUnpublish = params => dispatch => dispatch({
  [THISACTION + 'TABLE_UNPUBLISH']: {
    types: Object.values(thunk.tableUnpublish),
    url: 'sysTicketVolume/disableTicket',
    params,
  }
});

const formGet = params => dispatch => dispatch({
  [THISACTION + 'FORM_GET']: {
    types: Object.values(thunk.formGet),
    url: 'sysTicketVolume/selectByPrimaryKey',
    params,
  }
});

const formAddSubmit = params => ({
  [THISACTION + 'FORM_ADD_SUBMIT']: {
    types: Object.values(thunk.formSubmit),
    url: 'sysTicketVolume/addTicket',
    params,
  }
});

const formEditSubmit = params => ({
  [THISACTION + 'FORM_EDIT_SUBMIT']: {
    types: Object.values(thunk.formSubmit),
    url: 'sysTicketVolume/updateTicket',
    params,
  }
});

const publishTicket = params => ({
  [THISACTION + 'PUBLISH_TICKET']: {
    types: Object.values(thunk.publishTicket),
    url: 'sysTicketVolume/publishTicket',
    params,
  }
});

const formSubmit = params => dispatch => {
  if (params.id) {
    return dispatch(formEditSubmit(params));
  } else {
    return dispatch(formAddSubmit(params));
  }
};

export default {
  thunk,
  tableGet,
  tableDelete,
  tablePublish,
  tableUnpublish,
  formGet,
  formSubmit,
  getChannelNameList,
  publishTicket,
};
