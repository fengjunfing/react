import THISACTION from './name';
import { transToThunk } from '@/util';

const thunk = {
  generationKey: transToThunk(THISACTION + 'GENERATION_KEY'),
};

const generationKey = params => dispatch => dispatch({
  [THISACTION + 'GENERATION_KEY']: {
    types: Object.values(thunk.generationKey),
    url: 'appConfig/generationKey',
    params,
  }
});

export default {
  thunk,
  generationKey,
};
