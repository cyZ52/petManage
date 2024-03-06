import QRCode from 'qrcodejs2'

const url = 'http://a132810.e1.luyouxia.net:25563/pay/wechatPay';
const data = {
    token: '1',
    shop_id: '1'
}
function go() {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(res => {
        return res.json();
    }).then(data => {
        console.log(data)
        new QRCode('qrinvitecode', {
            width: 70,  //宽度
            height: 70, // 高度  
            text: data,
            render: 'canvas',// 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
        })
    }).catch(err => {
        console.err(err)
    })
    // alert('1')
}