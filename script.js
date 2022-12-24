const root = document.querySelector(':root');
const playBtn = document.querySelector('#play-btn');
const chooseDifficulty = document.querySelector('.choose-difficulty');
const easyBtn = document.querySelector('#easy-difficulty');
const mediumBtn = document.querySelector('#medium-difficulty');
const expertBtn = document.querySelector('#expert-difficulty');
const splash = document.querySelector('.splash-element');
const optionButtons = document.querySelectorAll('.answers button');
const totalPointsDisplay = document.querySelector('.points span');
const activeRoundDisplay = document.querySelector('.round span');
const backdrop = document.querySelector('.backdrop');
const lightBackdrop = document.querySelector('.light-backdrop');
const zoomBtn = document.querySelector('#zoom');
const fiftyFiftyBtn = document.querySelector('#fifty-fifty');
const hintsBtn = document.querySelector('#hints');
const hintsDisplay = document.querySelector('.hints-display');


//global variables
let MAX_CLIP_PERCENTAGE = 90;
let ZOOM_CLIP_PERCENTAGE = 5;
let totalPoints = 0;
let activeRound = 1;
let validAnswer = '';
let hints = [];

playBtn.addEventListener('click', () => {
    playBtn.classList.add('hidden');
    chooseDifficulty.classList.remove('hidden');
})

const setDifficulty = (max,zoom) => {
    chooseDifficulty.classList.add('hidden');
    MAX_CLIP_PERCENTAGE = max;
    ZOOM_CLIP_PERCENTAGE = zoom;
    toggleBackdrop();
    playRound();
}

easyBtn.addEventListener('click', () => {
    setDifficulty(70,15);
})

mediumBtn.addEventListener('click', () => {
    setDifficulty(80,10);
})

expertBtn.addEventListener('click', () => {
    setDifficulty(90,5);
})

const generateNumber = (max) => {
    const num = Math.floor(Math.random()*max);  
    return num;  
}

const generateMovieIndex = () => {
    const idx = generateNumber(movies.length);
    return idx;
}

const toggleBackdrop = () => {
    backdrop.classList.toggle('hidden');
}

const toggleLightBackdrop = () => {
    lightBackdrop.classList.toggle('hidden');
}

const generateSplash = (idx) => {
    const randomTopClipValue = generateNumber(MAX_CLIP_PERCENTAGE);
    const randomRightClipValue = generateNumber(MAX_CLIP_PERCENTAGE);
    const randomBottomClipValue = (MAX_CLIP_PERCENTAGE - randomTopClipValue);
    const randomLeftClipValue = (MAX_CLIP_PERCENTAGE - randomRightClipValue);
    splash.innerHTML = `<img class="cropped" src=${movies[idx].image} alt="movie poster">`;
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
        optionsPool.push(tempMovieArr.shift().title);
    }
    optionsPool.sort(() => 0.5 - Math.random());
    optionButtons.forEach((btn) => {
        btn.innerHTML = optionsPool.shift();
        if (btn.innerHTML == validAnswer) {
            btn.classList.add('valid');
        } else {
            btn.classList.add('invalid');
        }
    })
}

const setPoints = (points) => {
    totalPoints += points;
    totalPointsDisplay.innerHTML = totalPoints;
}

const clearScene = () => {
    optionButtons.forEach((btn) => {
        btn.classList.remove('correct-answer', 'incorrect-answer', 'valid', 'invalid', 'cut');
        hintsDisplay.style.display = 'none';
    })
}

const setRound = () => {
    clearScene();
    if (activeRound == 10){
        //end view
        console.log('koniec gry');
        toggleBackdrop();
    } else {
        activeRound++;
        activeRoundDisplay.innerHTML = activeRound;
        playRound();
    }    
}

const playRound = () => {
    const idx = generateMovieIndex();
    validAnswer =  movies[idx].title;
    console.log('Nowa odpowiedz: ' + validAnswer);
    hints = movies[idx].hints;
    generateSplash(idx);
    movies.splice(idx,1);
    generateAnswers(validAnswer);
}

optionButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.innerHTML == validAnswer) {
            btn.classList.add('correct-answer');
            //add bonus points
            setPoints(10);
        } else {
            btn.classList.add('incorrect-answer');
            document.querySelector('.valid').classList.add('correct-answer');
        }
        toggleLightBackdrop();
        document.querySelector('img').classList.remove('cropped');
        document.querySelector('img').classList.add('animated');
    })
})

lightBackdrop.addEventListener('click', () => {
    toggleLightBackdrop();
    setRound();
})

zoomBtn.addEventListener('click', () => {
    const zoomedTopClipValue = parseInt(root.style.getPropertyValue('--topClipValue')) - ZOOM_CLIP_PERCENTAGE;
    const zoomedRightClipValue = parseInt(root.style.getPropertyValue('--rightClipValue')) - ZOOM_CLIP_PERCENTAGE;
    const zoomedBottomClipValue = parseInt(root.style.getPropertyValue('--bottomClipValue')) - ZOOM_CLIP_PERCENTAGE;
    const zoomedLeftClipValue = parseInt(root.style.getPropertyValue('--leftClipValue')) - ZOOM_CLIP_PERCENTAGE;
    root.style.setProperty('--topClipValue', `${zoomedTopClipValue}` + '%');
    root.style.setProperty('--rightClipValue', `${zoomedRightClipValue}` + '%');
    root.style.setProperty('--bottomClipValue', `${zoomedBottomClipValue}` + '%');
    root.style.setProperty('--leftClipValue', `${zoomedLeftClipValue}` + '%');
    zoomBtn.classList.remove('available');
})

fiftyFiftyBtn.addEventListener('click',() => {
    const invalidButtons = document.querySelectorAll('.invalid');
    const tempBtnIndexArr = [0,1,2];
    tempBtnIndexArr.sort(() => 0.5 - Math.random());
    for (i=0;i<2;i++){
        invalidButtons[tempBtnIndexArr.shift()].classList.add('cut');
    }
    fiftyFiftyBtn.classList.remove('available');
})

hintsBtn.addEventListener('click', () => {
    hintsDisplay.style.display = 'block';
    hintsDisplay.innerHTML = hints[generateNumber(3)];
    hintsBtn.classList.remove('available');
})


