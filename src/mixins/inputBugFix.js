
//处理在app上运行 弹出软键盘后会挡住输入框的bug，一般情况下可采用以下方法 直接引用
/*
* 特殊情况：如 有带有条件判断，后续按钮新增输入框的情况
*  则需要给输入框添加方法
*
*  */
export default {
    mounted () {
        var inputs = document.getElementsByTagName("input");
        Array.from(inputs).forEach(b => {
            b.addEventListener("focus", function() {
                window.setTimeout(function() {
                    b.scrollIntoView({block :"center"})
                }, 20);
            });
        });
        var textareas = document.getElementsByTagName("textarea");
        Array.from(textareas).forEach(b => {
            b.addEventListener("focus", function() {
                window.setTimeout(function() {
                    b.scrollIntoView({block :"center"})
                }, 20);
            });
        });
    },
    methods:{
        inputClick(){
            window.setTimeout(function() {
                document.activeElement.scrollIntoView({block :"center"})
            }, 200);
        },
    }
}
