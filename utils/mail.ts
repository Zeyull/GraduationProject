import nodemailer from 'nodemailer';
import { addCaptcha } from './captcha';

//创建发送邮件的请求对象
let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',    //发送端邮箱类型（QQ邮箱）
    port: 465,      //端口号
    secure: true, 
    auth: {
        user: '834159744@qq.com', // 发送方的邮箱地址（自己的）
        pass: 'euvfvubtcbdgbbfd' // mtp 验证码
    }
});

export function sendCodeMail(mail:string,captcha:string):Promise<{msg:Object,code:number}>{
    const code = captcha;
    let mailObj = {
        from: '"验证码邮件" <834159744@qq.com>',   // 邮件名称和发件人邮箱地址
        to: mail,   //收件人邮箱地址（这里的mail是封装后方法的参数，代表收件人的邮箱地址）
        subject: '欧客 验证码',   //邮件标题
        text: `您的验证码信息是${code},请勿泄漏，5分钟内有效`, // 邮件内容，这里的code是这个方法的参数，代表要发送的验证码信息，这里的内容可以自定义
    }
    // 发送邮件(封装成一个promise对象)，方便后面调用该方法
    return new Promise((resolve, reject)=>{
        transporter.sendMail(mailObj, (err, data) => {
            if(err){
                reject({msg:err,code:400})    //出错
            }else{
                addCaptcha(mail,code);
                resolve({msg:data,code:200})    //成功
            }
        })     
    })    
}