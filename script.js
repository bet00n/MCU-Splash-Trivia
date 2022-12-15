const root = document.querySelector(':root');
const rootStyles = getComputedStyle(root);
const topClipValue = rootStyles.getPropertyValue('--topClipValue');
const rightClipValue = rootStyles.getPropertyValue('--rightClipValue');
const bottomClipValue = rootStyles.getPropertyValue('--bottomClipValue');
const leftClipValue = rootStyles.getPropertyValue('--leftClipValue');
const splash = document.querySelector('.splash-element');

const MAX_CLIP_PERCENTAGE = 80;

const generateNumber = (max) => {
    const num = Math.floor(Math.random()*max);  
    return num;  
}


const generateSplash = () => {
    const idx = generateNumber(movies.length);
    console.log(idx);
    const randomTopClipValue = generateNumber(MAX_CLIP_PERCENTAGE);
    const randomRightClipValue = generateNumber(MAX_CLIP_PERCENTAGE);
    const randomBottomClipValue = (MAX_CLIP_PERCENTAGE - randomTopClipValue);
    const randomLeftClipValue = (MAX_CLIP_PERCENTAGE - randomRightClipValue);
    splash.innerHTML = `<img src=${movies[idx].image} alt="movie poster">`;
    root.style.setProperty('--topClipValue', `${randomTopClipValue}` + '%');
    root.style.setProperty('--rightClipValue', `${randomRightClipValue}` + '%');
    root.style.setProperty('--bottomClipValue', `${randomBottomClipValue}` + '%');
    root.style.setProperty('--leftClipValue', `${randomLeftClipValue}` + '%');
}
generateSplash();