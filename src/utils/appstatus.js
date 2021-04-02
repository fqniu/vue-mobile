//判断屏幕是否为全面屏
export function statusHeight() {
    function judgeBigScreen() {
        //这里根据返回值 true 或false ,返回true的话 则为全面屏
        var result = false;
        var rate = window.screen.height / window.screen.width;
        var limit = window.screen.height == window.screen.availHeight ? 1.8 : 1.65; // 临界判断值
        // window.screen.height为屏幕高度
        //  window.screen.availHeight 为浏览器 可用高度
        if (rate > limit) {
            result = true;
        }
        return result;
    }
    // console.log(navigator.userAgent.split('statusHeight/')[1])
    let statusBarHeight = navigator.userAgent.split('statusHeight/')[1] ? navigator.userAgent.split('statusHeight/')[1] : 60;
    //全面屏
    let judgeFullScreen = judgeBigScreen();
    if (judgeFullScreen) {
        statusBarHeight = navigator.userAgent.split('statusHeight/')[1] ? navigator.userAgent.split('statusHeight/')[1] - 25 : 60
    }
    // console.log(statusBarHeight);
    return statusBarHeight;
}