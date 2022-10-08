const controlPlay = document.querySelector('#play');
const controlStop = document.querySelector('#stop');
const controlAddFiveMinutes = document.querySelector('#addFiveMinutes');
const controlRemoveFiveMinutes = document.querySelector('#removeFiveMinutes');

const displayMinutes = document.querySelector('#displayMinutes');
const displaySeconds = document.querySelector('#displaySeconds');

const forestSoundButton = document.querySelector('#forestSound');
const rainSoundButton = document.querySelector('#rainSound');
const coffeeShopSoundButton = document.querySelector('#coffeeShopSound');
const firePlaceSoundButton = document.querySelector('#firePlaceSound');


let minuteRecord = displayMinutes.textContent;
let timerTimeOut;

let forestIsPlaying = false;
let rainIsPlaying = false;
let coffeeShopIsPlaying = false;
let firePlaceIsPlaying = false;

const display = {
    
    addFiveMinutes: () => {
        let newMinute = Number(displayMinutes.textContent);
        let itsAlreadyAtMaximum = newMinute === patterns.maximumMinute;

        if(itsAlreadyAtMaximum){
            return
        }

        newMinute += 5;
        display.updateMinuteDisplay(newMinute);
        patterns.registerCurrentMinute(displayMinutes);
    },

    removeFiveMinutes: () => {
        let newMinute = Number(displayMinutes.textContent);
        let itsAlreadyAtFive = newMinute === patterns.minumumMinute; 
        
        if(itsAlreadyAtFive) {
            return
        }
        
        newMinute -= 5;
        display.updateMinuteDisplay(newMinute);
        patterns.registerCurrentMinute(displayMinutes);
    },

    resetMinuteDisplay: () => {
        displayMinutes.textContent = minuteRecord;
    },

    updateMinuteDisplay: (string) => {
        displayMinutes.textContent = String(string).padStart(2, '0');
    },

    updateSecondDisplay: (string) => {
        displaySeconds.textContent = String(string).padStart(2, '0');
    },

    stopTimer: () => {
        
       clearTimeout(timerTimeOut);
       display.updateSecondDisplay(0);
       display.resetMinuteDisplay();
       patterns.enableAddAndRemove()
    
    },


}

const patterns = {
    minumumMinute: 5,
    maximumMinute: 995,

    registerCurrentMinute: (minutes) => {
        minuteRecord = minutes.textContent;
    },

    disableAddAndRemove: () => {
        controlAddFiveMinutes.setAttribute('disabled', 'true');
        controlRemoveFiveMinutes.setAttribute('disabled', 'true');
    },

    enableAddAndRemove: () => {
        controlAddFiveMinutes.removeAttribute('disabled');
        controlRemoveFiveMinutes.removeAttribute('disabled');
    },

    runForest: () => {

        if(forestIsPlaying) {
            forestSoundButton.classList.remove('isPlaying')
            forestSoundButton.classList.add('isPaused')

            sounds.forestSound.pause()
            
            forestIsPlaying = false
        } else {
            forestSoundButton.classList.add('isPlaying')
            forestSoundButton.classList.remove('isPaused')

            rainSoundButton.classList.remove('isPlaying')
            coffeeShopSoundButton.classList.remove('isPlaying')
            firePlaceSoundButton.classList.remove('isPlaying')

            rainSoundButton.classList.add('isPaused')
            coffeeShopSoundButton.classList.add('isPaused')
            firePlaceSoundButton.classList.add('isPaused')

            sounds.rainSound.pause()
            sounds.coffeeShopSound.pause()
            sounds.firePlaceSound.pause()

            sounds.forestSound.play()

            rainIsPlaying = false;
            coffeeShopIsPlaying = false;
            firePlaceIsPlaying = false;

            forestIsPlaying = true;
        }
    },

    runRain: () => {

        if(rainIsPlaying) {
            rainSoundButton.classList.remove('isPlaying')
            rainSoundButton.classList.add('isPaused')

            sounds.rainSound.pause()
            
            rainIsPlaying = false
        } else {
            rainSoundButton.classList.add('isPlaying')
            rainSoundButton.classList.remove('isPaused')

            forestSoundButton.classList.remove('isPlaying')
            coffeeShopSoundButton.classList.remove('isPlaying')
            firePlaceSoundButton.classList.remove('isPlaying')

            forestSoundButton.classList.add('isPaused')
            coffeeShopSoundButton.classList.add('isPaused')
            firePlaceSoundButton.classList.add('isPaused')

            sounds.forestSound.pause()
            sounds.coffeeShopSound.pause()
            sounds.firePlaceSound.pause()

            sounds.rainSound.play()

            forestIsPlaying = false;
            coffeeShopIsPlaying = false;
            firePlaceIsPlaying = false;
            
            rainIsPlaying = true;
        }
    },

    runCoffeeShop: () => {

        if(coffeeShopIsPlaying) {
            coffeeShopSoundButton.classList.remove('isPlaying')
            coffeeShopSoundButton.classList.add('isPaused')

            sounds.coffeeShopSound.pause()
            
            coffeeShopIsPlaying = false
        } else {
            coffeeShopSoundButton.classList.add('isPlaying')
            coffeeShopSoundButton.classList.remove('isPaused')

            forestSoundButton.classList.remove('isPlaying')
            rainSoundButton.classList.remove('isPlaying')
            firePlaceSoundButton.classList.remove('isPlaying')

            forestSoundButton.classList.add('isPaused')
            rainSoundButton.classList.add('isPaused')
            firePlaceSoundButton.classList.add('isPaused')

            sounds.forestSound.pause()
            sounds.rainSound.pause()
            sounds.firePlaceSound.pause()

            sounds.coffeeShopSound.play()

            forestIsPlaying = false;
            rainIsPlaying = false;
            firePlaceIsPlaying = false;
            
            coffeeShopIsPlaying = true;
        }
    },

    runFirePlace: () => {

        if(firePlaceIsPlaying) {
            firePlaceSoundButton.classList.remove('isPlaying')
            firePlaceSoundButton.classList.add('isPaused')

            sounds.firePlaceSound.pause()
            
            firePlaceIsPlaying = false
        } else {
            firePlaceSoundButton.classList.add('isPlaying')
            firePlaceSoundButton.classList.remove('isPaused')

            forestSoundButton.classList.remove('isPlaying')
            rainSoundButton.classList.remove('isPlaying')
            coffeeShopSoundButton.classList.remove('isPlaying')

            forestSoundButton.classList.add('isPaused')
            rainSoundButton.classList.add('isPaused')
            coffeeShopSoundButton.classList.add('isPaused')

            sounds.forestSound.pause()
            sounds.rainSound.pause()
            sounds.coffeeShopSound.pause()

            sounds.firePlaceSound.play()

            forestIsPlaying = false;
            rainIsPlaying = false;
            coffeeShopIsPlaying = false;
            
            firePlaceIsPlaying = true;
        }
    }

}

function timer() {

    patterns.disableAddAndRemove();

    timerTimeOut = setTimeout(() => {
            
            let minutesNow = Number(displayMinutes.textContent);
            let secondsNow = Number(displaySeconds.textContent);
            
            const minuteDone = secondsNow === 0;
            const timerDone = minutesNow === 0 && secondsNow === 0;

            secondsNow--

            if(minuteDone) {
                
                secondsNow = 59;
                minutesNow--

            }

            if(timerDone) {

                display.resetMinuteDisplay()
                return

            }

            display.updateSecondDisplay(secondsNow);
            display.updateMinuteDisplay(minutesNow);

            timer();

        }, 1000)

}

const sounds = {
    forestSound: new Audio("../assets/sounds/Floresta.wav"),
    rainSound: new Audio("../assets/sounds/Chuva.wav"),
    coffeeShopSound: new Audio("../assets/sounds/Cafeteria.wav"),
    firePlaceSound: new Audio("../assets/sounds/Lareira.wav"),
}

sounds.forestSound.loop = true;
sounds.rainSound.loop = true;
sounds.coffeeShopSound.loop = true;
sounds.firePlaceSound.loop = true;

controlAddFiveMinutes.addEventListener('click', display.addFiveMinutes);
controlRemoveFiveMinutes.addEventListener('click', display.removeFiveMinutes);
controlPlay.addEventListener('click', timer);
controlStop.addEventListener('click', display.stopTimer);

forestSoundButton.addEventListener('click', patterns.runForest);
rainSoundButton.addEventListener('click', patterns.runRain);
coffeeShopSoundButton.addEventListener('click', patterns.runCoffeeShop);
firePlaceSoundButton.addEventListener('click', patterns.runFirePlace);

