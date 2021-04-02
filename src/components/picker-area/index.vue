<template>
    <div>
        <van-popup v-model="popupShow" position="bottom">
            <van-picker show-toolbar 
                :columns="columns2" value-key="areaname" 
                @cancel="handleCancel"
                @confirm="handleConfirm" 
                @change="onPickerChange"
            />
        </van-popup>
    </div>
</template>

<script>
    import {getArea} from "@/api/advMine"
    export default {
        name: "index",
        data(){
            return {
                popupShow : false,
                provinceList:[],
                cityList:[],
                countryList:[],
                columns2:[],
                formItem:{}
            }
        },
        created(){
            this.getAreaList('-1','provinceList')
        },
        methods:{
            getAreaList(pcode,name){
                let params = {
                    pcode:pcode || '-1'
                }
                getArea(params).then(res=>{
                    if(name == 'provinceList'){
                        this[name] = res.data;
                        this.getAreaList(res.data[0].areacode,'cityList');
                    }else if(name == 'cityList'){
                        this[name] = res.data;
                        this.getAreaList(res.data[0].areacode,'countryList');
                    }else{
                        this[name] = res.data;
                        this.columns2 = [
                            {
                                values: this.provinceList,  // 设置的页面初始值
                            },
                            {
                                values: this.cityList,
                            },
                            {
                                values: this.countryList,
                            }
                        ];
                    }
                })
            },

            handleConfirm(e){
                this.formItem.areaname = e.map(item=>{
                    return item.areaname
                }).join(",")
                this.formItem.provinceId = e[0].areacode;
                this.formItem.cityId = e[1].areacode;
                this.formItem.countyId = e[2].areacode;
                this.handleCancel()
                this.$emit('change', this.formItem)
            },
            handleCancel(){
                this.popupShow = false;
            },
            onPickerChange(picker, values, index){
                if(index == 0){
                    this.getAreaList(values[0].areacode,'cityList')
                }else if(index == 1){
                    this.getAreaList(values[1].areacode,'countryList')
                }
            },
        }
    }
</script>

<style scoped>

</style>
