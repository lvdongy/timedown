<h3 align="center">Timedown.js</h3>
<p align="center">简单，易用倒计时小工具 ⏰</p>

- - -
<br>

# 预览

地址：https://lvdongy.github.io/timedown/

<br>

# 引入

配合打包工具
```
npm i @lvdongy/timedown
```

或者使用script标签引入时，可直接拷贝dist文件夹下的 `timedown.min.js` 到你的项目里引入即可

```javascript
<script src="./path/timedown.min.js"></script>
<script>
  let timer = new Timedown(options);
</script>
```

<br>

# 配置
```javascript
let timer = new Timedown(options);
```
属性 | 说明 | 类型 | 默认值
|  ----  | ----  | ----  | ----  |
id | 倒计时实例标识 | any | - |
endTime | 结束时间（必填）, 传入时间戳或者代表时间的数组，如2021-05-16 16:19:20转换为[2021, 5, 16, 16, 19, 20] | number, array | - |
endText | 结束时显示的文本 | string | '已结束' |
selector | 将时间值挂载到指定的元素上显示 | string, object（想控制每个单位值可传入对象配置信息，详见下面例子） | - |
isNotFormatNode | 是否去除默认时间格式（小于10在前面补充'0'） | boolean | false |
format | 时间格式 | string | '{d}天 {hh}:{mm}:{ss}' |
endCallback | 倒计时结束时的回调（回调函数接收该倒计时实例的id） | function | - |


<br>


# 用法

### 1. 配置`selector`字段挂载到对应的元素显示
```html
<div class="time"></div>
```
```javascript
let timer = new Timedown({
    id: 1,
    endTime: Date.now() + 1000 * 60 * 1,
    endText: 'ok',
    selector: '.time',
    endCallback: handleTimeEnd
})
```

<br>

### 2. 使用一个对象配置`selector`
```html
<span class="time-d"></span>
<span>日</span>
<span class="time-h"></span>
<span>:</span>
<span class="time-m"></span>
<span>:</span>
<span class="time-s"></span>
```
```javascript
let timer = new Timedown({
    id: 2,
    endTime: Date.now() + 1000 * 60 * 60 * 24 * 10,
    selector: {
      value: '.time', // 完整的倒计时字符串
      day: '.time-d', // 天数
      h: '.time-h', // 小时
      m: '.time-m', // 分钟
      s: '.time-s' // 秒钟
    },
    // 默认情况下，h，m，s在小于10时会自动在前面补上‘0’
    // 如果不需要则将 isNotFormatNode 设为 true
    isNotFormatNode: true,
})
```

<br>

### 3. 对于响应式系统，可直接使用实例的属性（例如Vue）
```html
<div>{{timer.value}}</div>
```
```javascript
data(){
  return {
    timer: null,
  }
}

mounted(){
  this.timer = new Timerdown({
    id: 2,
    // 2023-06-06 12:12:12
    endTime: [2030, 6, 6, 12, 12, 12], 
    format: '⏰: {d}个日落与日出，{h}个小时，{mm}分{ss}秒',
  })
}
```
想要更细致的控制，还可以直接使用实例的其他属性：day（天数），h（小时）， m（分钟）， s（秒钟）, 这些属性的值都会保持更新。
```html
<p>{{timer.day}}</p>
<p>{{timer.h}}</p>
<p>{{timer.m}}</p>
<p>{{timer.s}}</p>
```


