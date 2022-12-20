const root = document.querySelector(':root');
const splash = document.querySelector('.splash-element');
const optionButtons = document.querySelectorAll('.answers button');
const totalPointsDisplay = document.querySelector('.points span');
const activeRoundDisplay = document.querySelector('.round span');
const backdrop = document.querySelector('.backdrop');
const lightBackdrop = document.querySelector('.light-backdrop');
const zoom = document.querySelector('#zoom');
const fiftyFifty = document.querySelector('#fifty-fifty');
const hints = document.querySelector('#hints');

let MAX_CLIP_PERCENTAGE = 90;
let totalPoints = 0;
let activeRound = 1;
let validAnswer = '';

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
        }
    })
}

const setPoints = (points) => {
    totalPoints += points;
    totalPointsDisplay.innerHTML = totalPoints;
}

const clearScene = () => {
    optionButtons.forEach((btn) => {
        btn.classList.remove('correct-answer', 'incorrect-answer', 'valid');
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

zoom.addEventListener('click', () => {
    //zoom 
})

fiftyFifty.addEventListener('click',() => {
    while (i<2) {
        const rand = Math.floor(Math.random()*4 +1)
        if (document.querySelector('section :nth-child(rand)').innerHTML == validAnswer) break;
        else {
            
        }
    }
})


playRound();