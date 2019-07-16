const path = require('path');
const { generateTheme } = require('antd-theme-generator');

const options = {
  stylesDir: path.join(__dirname, './src/styles'),    //对应具体位置
  antDir: path.join(__dirname, './node_modules/antd'), //对应具体位置
  varFile: path.join(__dirname, './src/styles/variables.less'), //对应具体位置
  mainLessFile: path.join(__dirname, './src/styles/index.less'), //对应具体位置
  themeVariables: ['@primary-color'],
  indexFileName: 'index.html',
  outputFilePath: path.join(__dirname, './public/color.less'),
};

generateTheme(options).then(less => {
  console.log('Theme generated successfully');
})
  .catch(error => {
    console.log('Error', error);
  });