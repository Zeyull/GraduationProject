import { captchaMap } from "../app";

export function addCaptcha(email: string,captcha:string) {
    captchaMap.set(email,captcha);
    // 五分钟后过期
    let time = setTimeout(() =>{
        captchaMap.set(email,null);
        clearTimeout(time);
    },300000);
}

export function validateCaptcha(email: string,captcha:string) {
    const tempCaptcha = captchaMap.get(email);
    if(captcha === tempCaptcha){
        return true;
    }else{
        return false;
    }
}
