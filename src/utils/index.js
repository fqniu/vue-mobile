export default {
    currency: function (value, currency, decimals) {
        const digitsRE = '/(\d{3})(?=\d)/g'
        value = parseFloat(value)
        if (!isFinite(value) || (!value && value !== 0)) return ''
        currency = currency != null ? currency : '$'
        decimals = decimals != null ? decimals : 2
        var stringified = Math.abs(value).toFixed(decimals)
        var _int = decimals
            ? stringified.slice(0, -1 - decimals)
            : stringified
        var i = _int.length % 3
        var head = i > 0
            ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
            : ''
        var _float = decimals
            ? stringified.slice(-1 - decimals)
            : ''
        var sign = value < 0 ? '-' : ''
        return sign + currency + head +
            _int.slice(i).replace(digitsRE, '$1,') +
            _float
    },
    loginFun: function (user, that) {

        if (user && user.tokenid) {
            sessionStorage.setItem('user', JSON.stringify(user));
            that.$store.dispatch('login');
            that.$router.push('/home');
        } else {
            that.$store.dispatch('logout');
            that.$router.push('/');
        }
    },
    appLoginFun: function (user, that) {
        if (user.tokenid) {
            sessionStorage.setItem('user', JSON.stringify(user));
            that.$store.dispatch('login');
        } else {
            that.loginOut(that);
        }
    },
    loginOut: function (that) {
        try {
            JsCall.toLogin();
        } catch (e) {
            that.$store.dispatch('logout');
            that.$router.push('/');
        }
    },
    homeBottomView: function (type) {
        try {
            JsCall.homeBottomView(type);
        } catch (e) {
            // console.log(e);
        }
    },
    formatDate: function (date, fmt) {
        if(typeof date == 'string'){
            date = new Date(date)
        }
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
            }
        }
        return fmt;
    },
    //获取这周第一天-周日
    getFirstDayOfWeek: function (date) {
        var date = new Date();
        var day = date.getDay() || 7;
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() - day + 1);
    },
    //获取当月第一天
    getCurrentMonthFirst: function () {
        let date = new Date();
        date.setDate(1);
        return date;
    },
    //获取当年第一天
    getFirstDayOfYear: function () {
        let date = new Date();
        date.setDate(1);
        date.setMonth(0);
        return date;
    },
    //获取第n天
    getDay: function (day) {
        let today = new Date();

        let time = Date.parse(today) - day * 24 * 60 * 60 * 1000;
        return new Date(time);
    },
    getDayBefore: function (firstDay, day) {
        var today = new Date(firstDay);

        today.setDate(today.getDate() - day)
        return new Date(today);
    },
    doHandleMonth: function (month) {
        var m = month;
        if (month.toString().length == 1) {
            m = "0" + month;
        }
        return m;
    },
    //浏览器视口的高度
    getWindowHeight: function () {
        let windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    },
    //浏览器视口的宽度
    getWindowWidth: function () {
        let windowWidth = 0;
        if (document.compatMode == "CSS1Compat") {
            windowWidth = document.documentElement.clientWidth;
        } else {
            windowWidth = document.body.clientWidth;
        }
        return windowWidth;
    },
    iTouch: function (wheel, space, curClass, siblinsClass, scrollhead) {
        // var wheel=document.getElementById(wheel);
        // var space=document.getElementById(space);
        // var curClass=document.getElementById(curClass);
        // var siblinsClass=document.getElementById(siblinsClass);
        // var scrollhead=document.getElementById(scrollhead);
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        let moveEndX = 0;
        let moveEndY = 0;
        let X = 0;
        let Y = 0;
        let range = 0;
        let rangeCode = 0;

        if (wheel) {
            wheel.addEventListener('touchstart', function (e) {
                var touch = event.touches[0];
                startX = touch.pageX;
                startY = touch.pageY;
            });
            wheel.addEventListener('touchmove', function (e) {
                var touch = event.changedTouches[0];
                moveEndX = touch.pageX;
                moveEndY = touch.pageY;
                X = moveEndX - startX;
                Y = moveEndY - startY;
                if (Math.abs(X) > Math.abs(Y) && X > 0) {
                    //向右
                    e.preventDefault();
                    range = rangeCode + Math.abs(X);
                    if (range > 0) {
                        range = 0;
                    }
                }
                else if (Math.abs(X) > Math.abs(Y) && X < 0) {
                    //向左
                    e.preventDefault();

                    //var ofWidth=curClass.offsetWidth-space.offsetWidth;
                    range = rangeCode - Math.abs(X);

                    // if(range<-(ofWidth+500)){
                    //  range=-ofWidth;
                    // }
                }
                else if (Math.abs(X) < Math.abs(Y) && Y > 0) {
                    //向下
                }
                else if (Math.abs(X) < Math.abs(Y) && Y < 0) {
                    //向上
                } else {
                    //console.log('未滑动');
                }
                if (curClass) {
                    curClass.style.transform = 'translate3d(' + range + 'px, 0px, 0px)';
                }
                if (siblinsClass) {
                    siblinsClass.style.transform = 'translate3d(' + range + 'px, 0px, 0px)';
                }
                if (scrollhead) {
                    scrollhead.style.transform = 'translate3d(' + range + 'px, 0px, 0px)';
                }


            });
            wheel.addEventListener('touchend', function (e) {
                var touch = e.changedTouches[0];
                endX = touch.pageX;
                endY = touch.pageY;
                var ofWidth = curClass.offsetWidth - space.offsetWidth;
                if (curClass) {
                    curClass.style.transitionDuration = '300ms';
                }
                if (siblinsClass) {
                    siblinsClass.style.transitionDuration = '300ms';
                }
                if (scrollhead) {
                    scrollhead.style.transitionDuration = '300ms';
                }
                setTimeout(function () {
                    if (curClass) {
                        curClass.style.transitionDuration = '0ms';
                    }
                    if (siblinsClass) {
                        siblinsClass.style.transitionDuration = '0ms';
                    }
                    if (scrollhead) {
                        scrollhead.style.transitionDuration = '0ms';
                    }
                }, 300);
                if (Math.abs(X) > Math.abs(Y) && X > 0) {
                    //向右
                    if (rangeCode >= 0 || range >= 0) {
                        range = rangeCode = 0;
                        if (curClass) {
                            curClass.style.transform = 'translate3d(0px, 0px, 0px)';

                        }
                        if (siblinsClass) {
                            siblinsClass.style.transform = 'translate3d(0px, 0px, 0px)';
                        }
                        if (scrollhead) {
                            scrollhead.style.transform = 'translate3d(0px, 0px, 0px)';
                        }
                    }

                    else {
                        rangeCode = range;
                    }

                }
                else if (Math.abs(X) > Math.abs(Y) && X < 0) {
                    //向左
                    if (Math.abs(range) > ofWidth) {
                        range = rangeCode = -ofWidth;
                        if (curClass) {
                            curClass.style.transform = 'translate3d(' + -ofWidth + 'px, 0px, 0px)';
                        }
                        if (siblinsClass) {
                            siblinsClass.style.transform = 'translate3d(' + -ofWidth + 'px, 0px, 0px)';
                        }
                        if (scrollhead) {
                            scrollhead.style.transform = 'translate3d(' + -ofWidth + 'px, 0px, 0px)';
                        }
                    }
                    if (rangeCode > 0) {
                        rangeCode = 0;
                        if (curClass) {
                            curClass.style.transform = 'translate3d(0px, 0px, 0px)';
                        }
                        if (siblinsClass) {
                            siblinsClass.style.transform = 'translate3d(0px, 0px, 0px)';
                        }
                        if (scrollhead) {
                            scrollhead.style.transform = 'translate3d(0px, 0px, 0px)';
                        }
                    }
                    else {
                        rangeCode = range;
                    }
                }

            });
        }
        ;
    }, resetiTouch: function (curClass, siblinsClass, scrollhead) {
        if (curClass) {
            curClass.style.transform = 'translate3d(0px, 0px, 0px)';
        }
        if (siblinsClass) {
            siblinsClass.style.transform = 'translate3d(0px, 0px, 0px)';
        }
        if (scrollhead) {
            scrollhead.style.transform = 'translate3d(0px, 0px, 0px)';
        }
    },
    forMatPrice: function(num){
        num = Number(num);
        return num.toLocaleString('en-US')
    },
    validateMobile: function validateMobile(mobile) {
        var re = /^1\d{10}$/;
        return re.test(mobile);
    },
    validateIdCardNo:function validateIdCardNo(idNum){
        let re = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
        return re.test(idNum)
    },
    changeTwoDecimal : function (x) { 
        var f_x = parseFloat(x); 
        if (isNaN(f_x)) 
        { 
        　　return 0; 
        } 
        var f_x = Math.round(x*100)/100; 
        var s_x = f_x.toString(); 
        var pos_decimal = s_x.indexOf('.'); 
        if (pos_decimal < 0) 
        { 
        　　pos_decimal = s_x.length; 
        s_x += '.'; 
        } 
        while (s_x.length <= pos_decimal + 2) 
        { 
        　　s_x += '0'; 
        } 
        // 三位加一个逗号
        // s_x = Number(s_x).toLocaleString('en-US')
        return s_x; 
    },
    objUrlStr :function(obj) {
        // 定义一个空的字符串
        let newStr = ''
        // 遍历对象里面的数据
        for (let key in obj) {
          newStr += key + '=' + obj[key] + '&';
        }
        // 记得去掉最后一个 & 
        newStr = newStr.substr(0, newStr.length - 1)
        return newStr
    }
}

// function padLeftZero(str) {
//     return ('00' + str).substr(str.length);
// }
