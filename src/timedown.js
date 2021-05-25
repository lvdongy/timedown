export default class Timedown {
    constructor({
        id,
        endTime,
        endText = '已结束',
        interval = 1000,
        selector,
        format = '{d}天 {hh}:{mm}:{ss}',
        isNotFormatNode = false,
        endCallback,
    }){
        if(!endTime){
            console.error('endTime cannot be empty');
            return
        }
        if(Array.isArray(endTime)){
            endTime = new Date(
                endTime[0],
                endTime[1] - 1,
                endTime[2] || 1,
                endTime[4] || 0,
                endTime[3] || 0,
                endTime[5] || 0,
            ).getTime();
        }else if(typeof endTime === 'number'){
            endTime = endTime;
        }else{
            console.error('Parameter type error: endTime');
            return
        }

        this.config = {};
        this.config.id = id;
        this.config.endTime = endTime;
        this.config.endText = endText;
        this.config.interval = interval;
        this.config.format = format;
        this.config.endCallback = endCallback;
        this.config.selector = selector;
        this.config.isNotFormatNode = isNotFormatNode;
        this.isOver = false;
        this.value = '';
        this.day = 0;
        this.h = 0;
        this.m = 0;
        this.s = 0;

        this._handleSelector();
        this.start();
    }

    start(){
        const result = this._handleTime();

        if(!result){
            this._handleEnd();
            return
        }
        setTimeout(() => {
            this.start();
        }, this.config.interval);

        this.value = result.value;
        this.day = result.day;
        this.h = result.h;
        this.m = result.m;
        this.s = result.s;
        if(this.hasNode) this._upateNode();
    }

    _upateNode(){
        if(!this.targetNodes){
            return
        }
        for (const key in this.targetNodes) {
            if (Object.hasOwnProperty.call(this.targetNodes, key)) {
                const nodes = this.targetNodes[key];
                for (let i = 0; i < nodes.length; i++) {
                    if(this[key] != null) {
                        if(key === 'value' || this.config.isNotFormatNode){
                            nodes[i].innerText = this[key];
                        }else{
                            nodes[i].innerText = +this[key] < 10 ? `0${this[key]}` : this[key];
                        }
                    }
                }
            }
        }
    }

    _handleTime(){
        let end = this.config.endTime;

        if(end < Date.now()){
            return null
        }
    
        let temp = Math.floor((end - Date.now()) / 1000); // s
        let d = Math.floor(temp / (60 * 60 * 24));
        let h = Math.floor((temp % (60 * 60 * 24)) / (60 * 60));
        let m = Math.floor((temp % (60 * 60)) / 60);
        let s = temp % 60;

        return {
            value: this._handleFormat(d, h, m, s),
            day: d,
            h,
            m,
            s
        }
    }
    
    _handleEnd(){
        this.isOver = true;
        this.value = this.config.endText;
        this.day = this.h = this.m = this.s = 0;
        if(this.hasNode) this._upateNode();
        
        let fn = this.config.endCallback;
        if(fn && typeof fn === 'function') fn(this.config.id);
    }

    _handleFormat(d, h, m, s){
        let format = this.config.format;
        let temp = {
            '{d}': d,
            '{h+}': h,
            '{m+}': m,
            '{s+}': s
        }

        for (const key in temp) {
            if (Object.hasOwnProperty.call(temp, key)) {
                const val = temp[key];
                if(new RegExp('(' + key + ')').test(format)){
                    format = format.replace(RegExp.$1, RegExp.$1.length === 3 ? val : (val < 10 ? `0${val}` : val));
                }
            }
        }

        return format
    }

    _handleSelector(){
        const selector = this.config.selector;
        this.targetNodes = {};

        if(!selector){
            this.hasNode = false;
            this.targetNodes = null;
            return
        }

        // 单个选择器
        if(
            typeof selector === 'string'
            && (this.targetNodes.value = document.querySelectorAll(selector)).length === 0
        ){
            this.targetNodes = null;
            console.error('The node cannot be found: ' + selector);
        }

        // 多个选择器
        if(Object.prototype.toString.call(selector) === '[object Object]'){
            // 空对象
            if(isEmptyObject(selector)){
                this.hasNode = false;
                this.targetNodes = null;
                return
            }

            for (const key in selector) {
                if (Object.hasOwnProperty.call(selector, key)) {
                    const str = selector[key];
                    if((this.targetNodes[key] = document.querySelectorAll(str)).length === 0){
                        delete this.targetNodes[key];
                        console.error('The node cannot be found: ' + str);
                    }
                }
            }
        }

        if(!this.targetNodes || isEmptyObject(this.targetNodes)){
            this.hasNode = false;
            this.targetNodes = null;
        }else{
            this.hasNode = true;
        }
    }
}

function isEmptyObject( obj ) {
    let name;

    for ( name in obj ) {
        return false;
    }
    return true;
}

