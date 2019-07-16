export default path => {
  let length = path.substring(1).split('/').length;
  let result = [path];
  let temp = path.substring(1).split('/');
  if (length > 1) {
    for (var i = 1; i < length; i++) {
      temp.splice(temp.length - 1, 1);
      result.push(temp.reduce((v1, v2) => v1 + '/' + v2, ''));
    }
  }
  return result;
};