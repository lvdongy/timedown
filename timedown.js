export default class Timedown {
    constructor({
        id,
        endTime,
        endText = '已结束',
        interval = 1000,
        selector,
        endCallback
        // format = 'd天 hh:mm:ss',
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
        this.config.endCallback = endCallback;
        this.isOver = false;
        this.value = '';

        this.start();
    }

    start(){
        const result = this._handleTime();
        if(!result){
            this._handleEnd();
            return
        }
        this.value = result;
        if(this.hasNode) this._upateNode();

        setTimeout(() => {
            this.start();
        }, this.config.interval);
    }

    _upateNode(){
        for (let i = 0; i < this.targetNodes.length; i++) {
            this.targetNodes[i].innerText = this.value;
        }
    }

    _handleTime(){
        let end = this.config.endTime;

        if(end < Date.now()){
            return false
        }
    
        let temp = Math.floor((end - Date.now()) / 1000); // s
        let d = Math.floor(temp / (60 * 60 * 24));
        let h = Math.floor((temp % (60 * 60 * 24)) / (60 * 60));
        let m = Math.floor((temp % (60 * 60)) / 60);
        let s = temp % 60;
        return `${d}天 ${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
    }
    
    _handleEnd(){
        this.isOver = true;
        this.value = this.config.endText;
        if(this.hasNode) this._upateNode();
        
        let fn = this.config.endCallback;
        if(fn && typeof fn === 'function') fn(this.config.id);
    }
}

