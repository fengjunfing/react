/**
 * 生成中国省市区（县）三级联动末尾值对应数组表
 * @use generateChinaAreaCascadeValueMap(areaData);
 * @param areaData 中国省市区（县）数据
 * @param result 默认结果
 * @param parents 默认父节点
 * @return result
 */
export const generateChinaAreaCascadeValueMap = (areaData = [], result = {}, parents = []) => {
  for (const i of areaData) {
    result[i.value] = [...parents, i.value];
    if (i.children && i.children.length > 0) {
      generateChinaAreaCascadeValueMap(i.children, result, [...parents, i.value]);
    }
  }
  return result;
};
