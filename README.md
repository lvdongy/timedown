<h3 align="center">Timedown.js</h3>
<p align="center">简单，易用倒计时小工具 ⏰</p>

- - -
<br>

# 预览

地址：https://lvdongy.github.io/timedown/

<br>

# 引入

直接拷贝对应的js文件到你的项目里

<br>

# options
```javascript
import Timedown from 'timedown.js'

let timer = new Timedown(options);
```
属性 | 说明 | 类型 | 默认值
|  ----  | ----  | ----  | ----  |
id | 倒计时实例标识 | any | - |
endTime | 结束时间（必填）, 传入时间戳或者代表时间的数组，如2021-05-16 16:19:20转换为[2021, 5, 16, 19, 20] | number, array | - |
endText | 结束时显示的文本 | string | '已结束' |
selector | 将时间值挂载到指定的元素上显示 | string（元素选择表达式） | - |
format | 时间格式 | string | '{d}天 {hh}:{mm}:{ss}' |
endCallback | 倒计时结束时的回调（回调函数接收该倒计时实例的id） | function | - |


<br>


# 用法

### 直接使用selector字段挂载到对应的元素显示
```html
<div class="time"></div>
```
```javascript
import Timedown from 'timedown.js';

let timer = new Timedown({
    id: 1,
    endTime: Date.now() + 1000 * 60 * 1,
    endText: 'ok',
    selector: '.time',
    endCallback: handleTimeEnd
})
```

<br>

### 对于响应式系统，可直接使用实例的属性（例如Vue）
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
    endTime: [2030, 6, 6, 12, 12, 12], // 2023-06-06 12:12:12
    format: '⏰: {d}个日落与日出，{h}个小时，{mm}分{ss}秒',
  })
}
```
想要更细致的控制，还可以直接使用实例的其他属性：day（天数），h（小时）， m（分钟）， s（秒钟）, 这些属性的值都会保持更新的。
```html
<p>{{timer.day}}</p>
<p>{{timer.h}}</p>
<p>{{timer.m}}</p>
<p>{{timer.s}}</p>
```


