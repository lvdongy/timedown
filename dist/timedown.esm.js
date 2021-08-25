/*!
 * @lvdongy/timedown v1.1.3
 * Wed Aug 25 2021, lvdongy
 * Released under the MIT License.
 */
function e(e,t){for(var i=0;i<t.length;i++){var o=t[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var t=function(){function t(e){var i=e.id,o=e.endTime,n=e.endText,r=void 0===n?"已结束":n,a=e.interval,s=void 0===a?1e3:a,h=e.selector,l=e.format,d=void 0===l?"{d}天 {hh}:{mm}:{ss}":l,c=e.isNotFormatNode,f=void 0!==c&&c,u=e.endCallback;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o){if(Array.isArray(o))o=new Date(o[0],o[1]-1,o[2]||1,o[3]||0,o[4]||0,o[5]||0).getTime();else if("number"!=typeof o)return void console.error("Parameter type error: endTime");this.config={},this.config.id=i,this.config.endTime=o,this.config.endText=r,this.config.interval=s,this.config.format=d,this.config.endCallback=u,this.config.selector=h,this.config.isNotFormatNode=f,this.isOver=!1,this.value="",this.day=0,this.h=0,this.m=0,this.s=0,this._handleSelector(),this.start()}else console.error("endTime cannot be empty")}var o,n,r;return o=t,(n=[{key:"start",value:function(){var e=this,t=this._handleTime();t?(setTimeout((function(){e.start()}),this.config.interval),this.value=t.value,this.day=t.day,this.h=t.h,this.m=t.m,this.s=t.s,this.hasNode&&this._upateNode()):this._handleEnd()}},{key:"_upateNode",value:function(){if(this.targetNodes)for(var e in this.targetNodes)if(Object.hasOwnProperty.call(this.targetNodes,e))for(var t=this.targetNodes[e],i=0;i<t.length;i++)null!=this[e]&&("value"===e||this.config.isNotFormatNode?t[i].innerText=this[e]:t[i].innerText=+this[e]<10?"0".concat(this[e]):this[e])}},{key:"_handleTime",value:function(){var e=this.config.endTime;if(e<Date.now())return null;var t=Math.floor((e-Date.now())/1e3),i=Math.floor(t/86400),o=Math.floor(t%86400/3600),n=Math.floor(t%3600/60),r=t%60;return{value:this._handleFormat(i,o,n,r),day:i,h:o,m:n,s:r}}},{key:"_handleEnd",value:function(){this.isOver=!0,this.value=this.config.endText,this.day=this.h=this.m=this.s=0,this.hasNode&&this._upateNode();var e=this.config.endCallback;e&&"function"==typeof e&&e(this.config.id)}},{key:"_handleFormat",value:function(e,t,i,o){var n=this.config.format,r={"{d}":e,"{h+}":t,"{m+}":i,"{s+}":o};for(var a in r)if(Object.hasOwnProperty.call(r,a)){var s=r[a];new RegExp("("+a+")").test(n)&&(n=n.replace(RegExp.$1,3===RegExp.$1.length?s:s<10?"0".concat(s):s))}return n}},{key:"_handleSelector",value:function(){var e=this.config.selector;if(this.targetNodes={},!e)return this.hasNode=!1,void(this.targetNodes=null);if("string"==typeof e&&0===(this.targetNodes.value=document.querySelectorAll(e)).length&&(this.targetNodes=null,console.error("The node cannot be found: "+e)),"[object Object]"===Object.prototype.toString.call(e)){if(i(e))return this.hasNode=!1,void(this.targetNodes=null);for(var t in e)if(Object.hasOwnProperty.call(e,t)){var o=e[t];0===(this.targetNodes[t]=document.querySelectorAll(o)).length&&(delete this.targetNodes[t],console.error("The node cannot be found: "+o))}}!this.targetNodes||i(this.targetNodes)?(this.hasNode=!1,this.targetNodes=null):this.hasNode=!0}}])&&e(o.prototype,n),r&&e(o,r),t}();function i(e){var t;for(t in e)return!1;return!0}export default t;
