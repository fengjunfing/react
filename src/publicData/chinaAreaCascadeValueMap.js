import { generateChinaAreaCascadeValueMap } from '@/util/generateChinaAreaCascadeValueMap';
import areaData from '@/publicData/areaData';

let chinaAreaCascadeValueMap = chinaAreaCascadeValueMap || generateChinaAreaCascadeValueMap(areaData);

export const chinaAreaCascadeValueMapBaseChina = (() => {
  const datas = {
    '0': ['0'],
  };
  for (const [k, v] of Object.entries(chinaAreaCascadeValueMap)) {
    datas[k] = ['0', ...v];
  }
  return datas;
})();

export default chinaAreaCascadeValueMap;
