
import { Toast } from 'vant'	//引入Toast
import request from '@/service/imgService'

function upLoaderImg (file,btype) {	//file为读取成功的回调文件信息
    //new 一个FormData格式的参数
    let params = new FormData()
    params.append('file', file)
    params.append('btype', btype)
    let config = {
        headers: { //添加请求头
            'Content-Type': 'multipart/form-data',
        }
    }
    return new Promise((resolve, reject) => {
        request.post( '/file/fileInfo/upload', params, config).then(res => {
            console.log(res);
            if (res && res.code == 0) {
                resolve(res.data)
            } else {
                //否则 Toast 提示
                Toast.fail(res.message)
                reject(res.data)
            }
        }).catch(err => {
            Toast.fail('系统异常')
            reject(err)
        });
    })
}
export default upLoaderImg
