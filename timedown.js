export default class Timedown {
    constructor({
        id,
        endTime,
        endText = '已结束',
        interval = 1000,
        selector,
        format = '{d}天 {hh}:{mm}:{ss}',
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

        this.hasNode = false;
        if(selector){
            if((this.targetNodes = document.querySelectorAll(selector)).length === 0){
                console.error('The node cannot be found: ' + selector);
                return
            }
            this.hasNode = true;
        }

        this.config = {};
        this.config.id = id;
        this.config.endTime = endTime;
        this.config.endText = endText;
        this.config.interval = interval;
        this.config.format = format;
        this.config.endCallback = endCallback;
        this.isOver = false;
        this.value = '';
        this.day = 0;
        this.h = 0;
        this.m = 0;
        this.s = 0;

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
        for (let i = 0; i < this.targetNodes.length; i++) {
            this.targetNodes[i].innerText = this.value;
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
}

