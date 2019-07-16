import { combineReducers } from 'redux-immutable';
import carouselManager from './carouselManager';
import groupManager from './groupManager';
// import bulletinManager from './bulletinManager';
import recomBrandManager from './recomBrandManager';
// import homeActivityManager from './homeActivityManager';
import icbcEFastEntrance from './icbcEFastEntrance';
import icbcECarouselManager from './icbcECarouselManager';
import icbcEGroupManager from './icbcEGroupManager';
import icbcEExclusiveSer from './icbcEExclusiveSer';
import sccarouselManager from './sccarouselManager';
import screcomBrandManager from './screcomBrandManager';
import ticketManager from './ticketManager';
import orderAnalysis from './orderAnalysis';
import reservationAnalysis from './reservationAnalysis';

export default combineReducers({
  carouselManager,
  groupManager,
  // bulletinManager,
  recomBrandManager,
  // homeActivityManager,
  icbcEFastEntrance,
  icbcECarouselManager,
  icbcEGroupManager,
  icbcEExclusiveSer,
  sccarouselManager,
  screcomBrandManager,
  ticketManager,
  orderAnalysis,
  reservationAnalysis,
});
