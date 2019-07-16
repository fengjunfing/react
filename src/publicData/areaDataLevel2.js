import { generateChinaAreaDataLevel2 } from '@/util/generateChinaAreaDataLevel2';
import areaData from './areaData';

const areaDataLevel2 = generateChinaAreaDataLevel2(areaData);

export const areaDataLevel2BaseChina = [{
  label: '全国',
  value: '0',
  children: areaDataLevel2,
}];

export default areaDataLevel2;
