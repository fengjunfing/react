export default function arrToTree (tree, data, parent, parentUrl, parentLevel, breadCrumb) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].parentId === parent) {
      data[i].icon = data[i].icon || '';
      data[i].children = [];
      data[i].parentLevel = parentLevel || 0;
      data[i].customLevel = data[i].parentLevel + 1;
      data[i].url = parentUrl + '/' + data[i].menuUrl;
      data[i].isLeaf = data[i].menuType === 'leaf' ? true : false;
      breadCrumb.push({
        path: data[i].url,
        icon: data[i].icon,
        isLeaf: data[i].isLeaf,
        breadcrumbName: data[i].name
      });
      var json = Object.assign({}, data[i]);
      tree.push(json);
      data.splice(i, 1);
      i--;
      arrToTree(json.children, data, json.id, json.url, json.customLevel, breadCrumb);
    }
  }
}