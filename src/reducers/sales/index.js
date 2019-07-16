import { combineReducers } from 'redux-immutable';
import activityAuditManager from './activityAuditManager';
import activityManager from './activityManager';
import icbcEOrderQuery from './icbcEOrderQuery';
import refundQuery from './refundQuery';
import reservationQuery from './reservationQuery';
import goodsOrderQuery from './goodsOrderQuery';
import autoOrderQuery from './autoOrderQuery';
import ticketUseQuery from './ticketUseQuery';
import finProjectManager from './finProjectManager';

export default combineReducers({
  activityAuditManager,
  activityManager,
  icbcEOrderQuery,
  refundQuery,
  reservationQuery,
  goodsOrderQuery,
  autoOrderQuery,
  ticketUseQuery,
  finProjectManager,
});
