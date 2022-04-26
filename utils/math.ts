export function randomStr(length: number): string{
    const seeder = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz2345678'
    let randomStr = '';
    for(let i = 0; i < length; i++){
        randomStr += seeder.charAt(Math.floor(Math.random() * seeder.length));
    }
    return randomStr;
}