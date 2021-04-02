<template>
    <div class="statusHeight" :style="{height:statusHeight + 'rem'}"></div>
</template>

<script>
    export default {
        name: "index",
        props:{
            statusHeight:{
                type:Number,
                default:  ()=>{
                    return 0
                }
            },
        },
        data(){
            return{

            }
        }
    }
</script>

<style scoped>
    .statusHeight{
        position: sticky;
        position: -webkit-sticky;
        top: 0;
        z-index: 200;
        background: #fff;
    }
</style>
