# remove-unused-files-webpack-plugin

移除未使用的文件或文件夹。

## Install

* `npm`
```
npm install --save remove-unused-files-webpack-plugin
```

* `yarn`
```
yarn add remove-unused-files-webpack-plugin
```

* `pnpm`
```
pnpm add remove-unused-files-webpack-plugin
```

## Usage

* `webpack.config.js`
```js
import RemoveUnusedFilesWebpackPlugin from 'remove-unused-files-webpack-plugin';

{
    ...
    plugins: [
        // 清除无用文件
        new RemoveUnusedFilesWebpackPlugin({
            patterns: ['src/**'],
            removeUnused: true,// 是否删除，默认为: false
            removeInquiry: true// 找到未使用的文件，删除前是否提示，默认为: true
        })
    ]
    ...
}
```
参数[`patterns`](https://www.npmjs.com/package/glob-all)为`glob-all`的参数。还可以传入其他`glob-all`支持的参数。