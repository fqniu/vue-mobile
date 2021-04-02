import Vue from "vue"
let $vue = new Vue
// 公共过滤器 某某币 ——> 人民币
const vFilter = {
    coinText:function (value){
        if($vue.$getUserAgent() == 1){
            if(value == "某某币"){
                return "人民币"
            }
        }else{
            if(value == "某某币"){
                return "某某币"
            }
        }
    }
}

export default vFilter