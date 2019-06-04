// ----------------- SNARE AUDIO -----------------

let samples = [];
let lastSample = 0;

for(let i=1; i<7; i++){
    const str = `audio[data-index='${i}']`;
    let sample = document.querySelector(str);
    
    sample.volume = 0.4;
    
    samples.push(sample);
}

const getRandomSample = () =>{
    return Math.floor( Math.random()*6 );
}

// ----------------- SNARE SVG -----------------

let AnimationIsLeftStick = true;
const snare = document.querySelector('div.snare');

const snareStickLeft = document.querySelector('div.snare g.sticks g.stickLeft');
const snareStickRight = document.querySelector('div.snare g.sticks path.stickRight');

const snareShadowLeft = document.querySelector('div.snare g.sticks path.shadowLeft');
const snareShadowRight = document.querySelector('div.snare g.sticks path.shadowRight');

// ----------------- SNARE ONCLICK -----------------

snare.addEventListener('click', (e)=>{
    
    let n = getRandomSample();    
    while(n === lastSample){ // prevent playing last sample
        n = getRandomSample();
    }
    
    snare.classList.add('active');
    samples[n].play();

    if (AnimationIsLeftStick) {
        snareStickLeft.classList.add('snareAnimationStickLeft');
        snareShadowLeft.classList.add('snareAnimationShadowLeft');

        setTimeout( ()=>{
            snareStickLeft.classList.remove('snareAnimationStickLeft');
            snareShadowLeft.classList.remove('snareAnimationShadowLeft');
        },1000);

        AnimationIsLeftStick = false;


    }else{
        snareStickRight.classList.add('snareAnimationStickRight');
        snareShadowRight.classList.add('snareAnimationShadowRight');

        setTimeout( ()=>{
            snareStickRight.classList.remove('snareAnimationStickRight');
            snareShadowRight.classList.remove('snareAnimationShadowRight');
        },1000);

        AnimationIsLeftStick = true;
    }

    setTimeout( ()=>{
        snare.classList.remove('active');
    },1000);

    lastSample = n;

});

// ----------------- BOX ANIMATIONS -----------------

const boxes = document.querySelectorAll('div.bg > .box');

setTimeout( ()=>{
    for(const box of boxes){
        box.classList.add('loop');
    }
},1000);

// ----------------- PAUSE ALL ANIMATIONS -----------------

const toggle = document.querySelector(`.toggle input[type='checkbox']`);

toggle.addEventListener('change', (e)=>{

    if (e.target.checked) {

        for(const box of boxes){
            box.style.animationPlayState= 'running';
        }

    } else {

        for(const box of boxes){
            box.style.animationPlayState= 'paused';
        }

    }
})