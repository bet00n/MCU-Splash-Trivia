const root = document.querySelector(':root');
const splash = document.querySelector('.splash-element');
const optionButtons = document.querySelectorAll('.answers button');
const totalPointsDisplay = document.querySelector('.points span');

let MAX_CLIP_PERCENTAGE = 80;
let totalPoints = 0;

const generateNumber = (max) => {
    const num = Math.floor(Math.random()*max);  
    return num;  
}

const generateMovieIndex = () => {
    const idx = generateNumber(movies.length);
    return idx;
}

const generateSplash = (idx) => {
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

const generateAnswers = (validAnswer) => {
    const optionsPool = [validAnswer];
    const tempMovieArr = [...movies];
    tempMovieArr.sort(() => 0.5 - Math.random());
    for (i = 0 ; i < 3 ; i++) {
        optionsPool.push(tempMovieArr.shift());
    }
    optionsPool.sort(() => 0.5 - Math.random());
    optionButtons.forEach((btn) => {
        btn.innerHTML = optionsPool.shift().title;
    })
}

const validateAnswer = (validAnswer) => {
    const validTitle = validAnswer.title;
    console.log(validTitle);
    optionButtons.forEach((btn) => {
        btn.addEventListener('click',(validTitle) => {
            if (btn.innerHTML == validAnswer.title) {
                console.log('good answer');
                //add bonus points
                setPoints(10);
            } else {
                console.log('wrong answer');
            }
            //show image
            playRound();
        })
    })
}

const setPoints = (points) => {
    totalPoints += points;
    totalPointsDisplay.innerHTML = totalPoints;
}

const playRound = () => {
    const idx = generateMovieIndex();
    const validAnswer = {title: movies[idx].title,
                         image: movies[idx].image,
                         hints: movies[idx].hints};
    console.log(validAnswer);
    generateSplash(idx);
    movies.splice(idx,1);
    generateAnswers(validAnswer);
    validateAnswer(validAnswer);
}

playRound();