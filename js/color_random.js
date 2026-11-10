const ran=Math.floor(Math.random()*4)

const r=(ran==0)?1:(ran==1)?1:(ran==2)?0:0;
const g=(ran==0)?0:(ran==1)?1:(ran==2)?1:0;
const b=(ran==0)?0:(ran==1)?0:(ran==2)?0:1;

document.write('<style>\n:root {')
document.write('--color_light:')
document.write(`rgb(${186+70*r},${186+70*g},${186+70*b});`)
document.write('--color_medium:')
document.write(`rgb(${160*r},${160*g},${160*b});`)
document.write('--color_dark:')
document.write(`rgb(${90*r},${90*g},${90*b});`)
document.write('}\n</style')