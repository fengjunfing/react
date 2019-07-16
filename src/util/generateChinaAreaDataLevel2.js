export const generateChinaAreaDataLevel2 = areaData => {
  const Level2 = [];
  for (const topLevel of areaData) {
    const resultTopLevelChildren = [];
    const { children = [], label, value } = topLevel;
    for (const level2 of children) {
      const { label, value } = level2;
      resultTopLevelChildren.push({
        label,
        value,
      });
    }
    Level2.push({
      label,
      value,
      children: resultTopLevelChildren,
    });
  }
  return Level2;
};
