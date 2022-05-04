export function randomStr(length: number): string{
    const seeder = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz2345678'
    let randomStr = '';
    for(let i = 0; i < length; i++){
        randomStr += seeder.charAt(Math.floor(Math.random() * seeder.length));
    }
    return randomStr;
}

export function randomCaptcha(length: number = 6): string{
    const seeder = '0123456789';
    let randomStr = '';
    for(let i = 0; i < length; i++){
        randomStr += seeder.charAt(Math.floor(Math.random() * seeder.length));
    }
    return randomStr;
}