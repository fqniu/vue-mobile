import { getStringByteArray } from "@/utils/tools"
import { batchGetPrintOrder } from "@/api/order"
import config from "@/config"
export default {
    data() {
        return {
            aliasName:this.$store.state.aliasName || config.projectName
        }
    },
    methods: {
        getPurchaseInfo(data){
            let purchaseArray = [
                {"content": [], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": ["采购信息"], "alin": 1, "size": 1, "style": 0,"another": 1, "type": "text"},
                {"content": [`采购店铺：${data.subTitle}`], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [`订单号：${data.orderNo}`], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [], "alin": 0, "size": 0, "style": 0,"another": 0, "type": "line"},
                {"content": ["商品名称","数量","小计"], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [], "alin": 0, "size": 0, "style": 0,"another": 0, "type": "line"},
                {"content": ["苹果","1","9.00"], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [], "alin": 0, "size": 0, "style": 0,"another": 0, "type": "line"},
                {"content": [`总计：${data.totalPrice}`], "alin": 2, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [], "alin": 0, "size": 0, "style": 0,"another": 0, "type": "line"},
            ];
            let printArray = []
            for(var i =0;i<12;i++){
                if(i == 8){
                    data.printOrderProductVos.forEach(prod=>{
                        // let productName = prod.productName + (prod.specName?' ('+prod.specName + ')':'');
                        // let printItem = {"content": [productName,prod.productQty,Number(prod.costPrice) * prod.productQty], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"};
                        // printArray.push(printItem)

                        let productName = prod.productName + (prod.specName?' ('+prod.specName + ')':'');
                        getStringByteArray(productName,16).forEach((strItem,index)=>{
                            if(strItem && index == 0){
                                let printItem = {"content": [strItem,'x'+prod.productQty,Number(Number(prod.costPrice) * prod.productQty).toFixed(2)], "alin": 0,  "style": 0,"another": 1, "type": "text","fontWith":0,"fontHeight":1};
                                printArray.push(printItem)
                            }else if(strItem && index != 0){
                                let printItem = {"content": [strItem], "alin": 0,  "style": 0,"another": 1, "type": "text","fontWith":0,"fontHeight":1};
                                printArray.push(printItem)
                            }
                        })

                    })
                }else{
                    printArray.push(purchaseArray[i]);
                }
            }
            return printArray
        },

        //单个打印订单(和微购、小鲜柜打印模板)
        printOrder(order){
            let projectName = this.aliasName;
            let name = '';
            switch (projectName) {
                case "xiaoxiangui":
                    name = '小鲜柜商城'
                    break;
                case  "hewego":
                    name = '和WeGo商城'
                    break;
            }
            let array = [
                {"content": [name], "alin": 1, "size": 1, "style": 0,"another": 1, "type": "text"},
                {"content": ["在线支付订单"], "alin": 1, "size": 0, "style": 0,"another": 1, "type": "textWithLine"},
                {"content": [`订单号：${order.orderNo}`], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [`付款时间：${order.payTime}`], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [`备注：${order.remark}`], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [], "alin": 0, "size": 0, "style": 0,"another": 0, "type": "line"},
                {"content": ["商品名称","数量","小计"], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [], "alin": 0, "size": 0, "style": 0,"another": 0, "type": "line"},
                {"content": ["苹果","1","9.00"], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [], "alin": 0, "size": 0, "style": 0,"another": 0, "type": "line"},
                {"content": ['运费',order.transportCosts], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": ['优惠',order.useCouponAmount], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [`总计：${order.receivable}`], "alin": 2, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [], "alin": 0, "size": 0, "style": 0,"another": 0, "type": "line"},
                {"content": [`收货人：${order.userName}`], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [`电话：${order.userMobile}`], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [`地址：${order.userAddress}`], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": ["请当面清点所购商品，如有问题请当日内联系客服，为您及时处理"], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
            ]
            let printArray = []
            for(var i =0;i<19;i++){
                if(i == 8){
                    order.productList.forEach(prod=>{
                        getStringByteArray(prod.productName,16).forEach((strItem,index)=>{
                            if(strItem && index == 0){
                                let printItem = {"content": [strItem,prod.productQty,Number(prod.productTotalPrice).toFixed(2)], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"};
                                printArray.push(printItem)
                            }else if(strItem && index == 1){
                                let printItem = {"content": [strItem], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"};
                                printArray.push(printItem)
                            }
                        })
                    })
                }else if(i == 0 && projectName == 'xiaoxiangui') {
                    printArray.push(array[i]);
                    printArray.push({
                        "content": ["爱上小鲜柜，餐餐好滋味"], "alin": 1, "size": 0, "style": 0,"another": 1, "type": "text"
                    })
                    printArray.push({
                        "content": [], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"
                    })
                }else if(i == 18 && projectName == 'xiaoxiangui'){
                    printArray.push({
                        "content": ["客服电话：0756-8888131"], "alin": 1, "size": 0, "style": 1,"another": 1, "type": "text"
                    })
                    printArray.push(array[i]);
                }
                else{
                    printArray.push(array[i]);
                }
            }
            try {
                u.native.printReceipt(JSON.stringify(printArray))
            }catch (e) {
                this.$toast('请在App上操作');
            }
        },

        printOrderByUdian(order){
            let array = [
                {"content": ["友生鲜"], "alin": 1, "size": 1, "style": 0,"another": 1, "type": "text"},
                {"content": ["在线支付订单"], "alin": 1, "size": 0, "style": 0,"another": 1, "type": "textWithLine"},
                {"content": [`订单号：${order.orderNo}`], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [`付款时间：${order.payTime}`], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [`送达时间：${order.transportTime}`], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [`备注：${order.remark}`], "alin": 0, "size": 1, "style": 0,"another": 1, "type": "text"},
                {"content": [], "alin": 0, "size": 0, "style": 0,"another": 0, "type": "line"},
                {"content": ["商品名称","数量"], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [], "alin": 0, "size": 0, "style": 0,"another": 0, "type": "line"},
                {"content": ["苹果","1"], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [], "alin": 0, "size": 0, "style": 0,"another": 0, "type": "line"},
                {"content": ['运费',order.transportCosts], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": ['优惠',order.useCouponAmount], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [`总计：${order.receivable}`], "alin": 2, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [], "alin": 0, "size": 0, "style": 0,"another": 0, "type": "line"},
                {"content": [`收货人：${order.userName}`], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [`电话：${order.userMobile}`], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [`地址：${order.userAddress}`], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
                {"content": [], "alin": 0, "size": 0, "style": 0,"another": 1, "type": "text"},
            ]


            let printArray = []
            for(var i =0;i<19;i++){
                if(i == 9){

                    order.orderProductVos.forEach(prod=>{
                        let productName = prod.productName + (prod.specName?' ('+prod.specName + ')':'');
                        getStringByteArray(productName,16).forEach((strItem,index)=>{
                            if(strItem && index == 0){
                            // Number(prod.productTotalPrice).toFixed(2)
                                let printItem = {"content": [strItem,'x'+prod.productQty], "alin": 0, "style": 0,"another": 1, "type": "text",'fontWith':0,'fontHeight':1};
                                printArray.push(printItem)
                            }else if(strItem && index != 0){
                                let printItem = {"content": [strItem], "alin": 0, "style": 0,"another": 1, "type": "text","fontWith":0,"fontHeight":1};
                                printArray.push(printItem)
                            }
                        })
                    })
                }else{
                    printArray.push(array[i]);
                }
            }
            order.purchaseInfoVOS.forEach(purchase=>{
                this.getPurchaseInfo(purchase).forEach(purchaseItem=>{
                    printArray.push(purchaseItem)
                })

            })
            try {
                u.native.printReceipt(JSON.stringify(printArray))
            }catch (e) {
                this.$toast('请在App上操作');
            }
        },

        //打印订单
        print(){
            let array = [];
            this.data.forEach(item=>{
                if(item.selected){
                    array.push(item);
                }
            })
            if(array.length == 0){
                this.$toast('请选择订单');
                return
            }else{
                let projectName = this.aliasName;
                let _this = this;
                switch (projectName) {
                    case "hewego":
                        let ids = []
                        array.forEach(item=>{
                            ids.push(item.orderId);
                        })
                        batchGetPrintOrder({orderIds:ids.join(",")}).then(res=>{
                            _this.handleQuery();
                            array.forEach(item=>{
                                _this.printOrder(item);
                            })
                        })
                        break;
                    case "xiaoxiangui":
                        let ids2 = []
                        array.forEach(item=>{
                            ids2.push(item.orderId);
                        })
                        batchGetPrintOrder({orderIds:ids2.join(",")}).then(res=>{
                            _this.handleQuery();
                            array.forEach(item=>{
                                _this.printOrder(item);
                            })
                        })
                        break;
                    case "udian":
                        let ids3 = []
                        array.forEach(item=>{
                            ids3.push(item.orderId);
                        })
                        batchGetPrintOrder({orderIds:ids3.join(",")}).then(res=>{
                            let printOrderList = res.data;
                            _this.handleQuery();
                            printOrderList.forEach(order=>{
                                this.printOrderByUdian(order);
                            })
                        })
                        break
                }

            }
        },

    }
}
