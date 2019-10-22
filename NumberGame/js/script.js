/** 
 *  Data object
*/
const data = {
    currentInput: document.getElementById('currentInput'),
    btnGo: document.querySelector('.btnGo'),
    currentMessage: document.getElementById('currentMessage'),
    highestGuess: document.getElementById('highestValue'),
    lowestGuess: document.getElementById('lowestValue'),
    maxGuesses: document.getElementById('maxGuesses'),
    btnPlay: document.getElementById('btnPlay'),
    btnNo: document.querySelector('.btnNo'),
    btnYes: document.querySelector('.btnYes'),
    btnSetting: document.getElementById('btnSetting'),
    btnCancel: document.querySelector('.btnCancel'),
    btnSave: document.querySelector('.btnSave'),
    newGameWindow: document.querySelector('.play'),
    settingWindow: document.querySelector('.setting')
}

/**
 * Message Class
*/

class Message {
    constructor() {
    }

    startingMessage(minVal, maxVal) {
        return `Enter a number between ${minVal} and ${maxVal}.`;
    }

    mainMessage(minVal, maxVal) {
        return `Enter a number between ${minVal} and ${maxVal}, try again.`;
    }

    winningMessage(value) {
        return `Bingoo \n😊😊😊 \n${value} was the right number.`;
    }

    losingMessage(value) {
        return `Oooh No \n😒😒😒 \nYou did not guess it right. ${value} was the right number.`;
    }

    outOfBounceMessage(minVal, maxVal) {
        return `You did not enter a number between ${minVal} and ${maxVal}. Try again.`;
    }

    NaNMessage(minVal, maxVal) {
        return `Not a Number \n😒😒😒 \nEnter a number between ${minVal} and ${maxVal}. Try again.`;
    }
}

/**
 * Message View Controller
*/
const displayMessage = (minVal, maxVal, guessVal) => {
    if(isNaN(guessVal)) {
        data.currentMessage.textContent = new Message().NaNMessage(minVal, maxVal);
    } else if(guessVal < maxVal && guessVal > minVal) {
        if(guessVal < guessingNum) {
            data.currentMessage.textContent = new Message().mainMessage(guessVal, maxVal);
        } else if(guessVal > guessingNum) {
            data.currentMessage.textContent = new Message().mainMessage(minVal, guessVal);
        }
    } else if(minVal === parseInt(data.lowestGuess.value) && guessVal === minVal && guessingNum !== minVal) {
        data.currentMessage.textContent = new Message().mainMessage(minVal + 1, maxVal);
    } else if(maxVal === parseInt(data.highestGuess.value) && guessVal === maxVal && guessingNum !== maxVal) {
        data.currentMessage.textContent = new Message().mainMessage(minVal, maxVal - 1);
    } else if(guessVal > maxVal || guessVal < minVal) {
        data.currentMessage.textContent = new Message().outOfBounceMessage(minVal, maxVal);
    }
};

/**
 * Guess Class
*/
class Guess {
    constructor(userGuess) {
        this.userGuess = userGuess;
    }

    isLower(minVal, guess) {
        return (this.userGuess < guess && this.userGuess > minValue) || 
        (this.userGuess === parseInt(data.lowestGuess.value) && minVal === parseInt(data.lowestGuess.value)) ? true : false;
    }

    isHigher(maxVal, guess) {
        return (this.userGuess > guess && this.userGuess < maxVal) ||
        (this.userGuess === parseInt(data.highestGuess.value) && maxVal === parseInt(data.highestGuess.value)) ? true : false;
    }

    // Display the user input
    outputGuess(index) {
        document.querySelector(`.guesses li:nth-of-type(${index})`).textContent = this.userGuess;
    }
}

/**
 * Guess View Controller
*/
const displayGuess = (minVal, maxVal, curGuess, guess, index) => {
    const newGuess = new Guess(curGuess);
    if(newGuess.isLower(minVal, guess)) {
        if(curGuess < guess && curGuess > minValue) {
            minValue = curGuess;
            newGuess.outputGuess(index);
        } else {
            minValue++;
            newGuess.outputGuess(index);
        }
        
    } else if(newGuess.isHigher(maxVal, guess)) {
        if(curGuess > guess && curGuess < maxVal) {
            maxValue = curGuess;
            newGuess.outputGuess(index);
        } else {
            maxValue--;
            newGuess.outputGuess(index);
        }
    } else if(curGuess === guess || indexOfGuess >= maxGuesses) {
        newGuess.outputGuess(index);
    } 
};


/**
 * Variables 
 */
let indexOfGuess = 1;
let isPlaying = true;
let minValue = parseInt(data.lowestGuess.value);
let maxValue = parseInt(data.highestGuess.value);
let maxGuesses = parseInt(data.maxGuesses.value);
let guessingNum = Math.floor(Math.random()*(maxValue - minValue + 1)) + minValue;

// For Testing
console.log(guessingNum);

/**
 *  Message Controller
 */
const messageController = (minVal, maxVal, guessVal) => {
    if(indexOfGuess < maxGuesses) {
        if(guessVal === guessingNum) {
            data.currentMessage.textContent = new Message().winningMessage(guessingNum);
            isPlaying = false;
        } else {
            displayMessage(minVal, maxVal, guessVal);
        }
    } else if(indexOfGuess === maxGuesses) {
        if(guessVal === guessingNum) {
            data.currentMessage.textContent = new Message().winningMessage(guessingNum);
            isPlaying = false;
        } else {
            data.currentMessage.textContent = new Message().losingMessage(guessingNum);
            isPlaying = false;
        }
    }
};

 /**
 *  Guess Controller
 */
const guessController = (curGuess) => {
    const newGuess = new Guess(curGuess);
    if(indexOfGuess < maxGuesses && !isNaN(curGuess) ) {
        if(newGuess.isLower(minValue, guessingNum) || newGuess.isHigher(maxValue, guessingNum) || curGuess === guessingNum) {
            displayGuess(minValue, maxValue, curGuess, guessingNum, indexOfGuess);
            indexOfGuess++;
        } 
    } else {
        displayGuess(minValue, maxValue, curGuess, guessingNum, indexOfGuess);
    }
}
// Playing Game
const play = (isPlaying) => {
    if(isPlaying) {
        const guess = parseInt(data.currentInput.value);
        data.currentInput.value = '';
        data.currentInput.style.autofocus = true;

        // Display next message
        messageController(minValue, maxValue, guess);
        
        // Display user previous inputs
        guessController(guess);
    }
};

 /**
 *  Main Controller
 */
const mainController = (() => {
    // Starting message
    window.addEventListener('load', () => {
        data.currentMessage.textContent = new Message().startingMessage(minValue, maxValue);
    });

    // Main button event listner
    data.btnGo.addEventListener('click', () => {
        play(isPlaying);
    });

    // Using enter to play
    document.addEventListener('keypress', e => {
        // console.log(e.keyCode);
        if(e.keyCode === 13 || e.which === 13) {
            play(isPlaying);
        }
    });
})(messageController, guessController);

/**
 *  New Game Controller
*/
const newGameController = (() => {
    data.btnPlay.addEventListener('click', () => {
        data.currentMessage.textContent = '';
        displayingWindow(data.newGameWindow);
    });

    data.btnNo.addEventListener('click', () => {hiddingWindow(data.newGameWindow)});

    data.btnYes.addEventListener('click', () => {
        init();
        hiddingWindow(data.newGameWindow);
    });
})();

// Hidding setting or play window
const hiddingWindow = (window) => {
    window.classList.toggle('zoomOut');
    window.classList.toggle('zoomIn');
    setTimeout(() => window.style.display = 'none', 1000);
};

// Displaying setting or play window
const displayingWindow = (window) => {
    window.classList.toggle('zoomOut');
    window.classList.toggle('zoomIn');
    window.style.display = 'block';
};

/**
 *  Setting Controller
*/
const settingController = (() => {
    data.btnSetting.addEventListener('click', () => {
        data.currentMessage.textContent = '';
        displayingWindow(data.settingWindow);
    });

    data.btnCancel.addEventListener('click', () => {
        hiddingWindow(data.settingWindow);
    });

    data.btnSave.addEventListener('click', () => {
        // Deleting all the user answer containers
        document.querySelector('.guesses').innerHTML = '';

        // Inserting the new user answer containers base on the maximum possible guesses
        for(let i = 1; i <= parseInt(data.maxGuesses.value); i++) {
            document.querySelector('.guesses').insertAdjacentHTML('beforeend', '<li>&nbsp;</li>');
        }
        indexOfGuess = 21;
        data.currentMessage.textContent = '😊😊😊 \nStart A new Game!';
        hiddingWindow(data.settingWindow);
    });
})();

// Reinitializing the game
const init = () => {
    guessingNum = Math.floor(Math.random()*(maxValue - minValue + 1)) + minValue;
    isPlaying = true;
    indexOfGuess = 1;
    minValue = parseInt(data.lowestGuess.value);
    maxValue = parseInt(data.highestGuess.value);
    maxGuesses = parseInt(data.maxGuesses.value);
    data.currentInput.value = '';
    data.currentMessage.textContent = new Message().startingMessage(minValue, maxValue); 

    // For testing
    console.log(guessingNum);

    // Cleaning up user outputs
    for(let i = 1; i <= maxGuesses; i++) {
        document.querySelector(`.guesses li:nth-of-type(${i})`).textContent = ' ';
    }

};
