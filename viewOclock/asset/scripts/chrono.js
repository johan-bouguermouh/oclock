window.addEventListener("DOMContentLoaded", (event)=>
{
    let buttonPlay = document.querySelector("#play")
    let buttonPause = document.querySelector("#pause")
    let buttonEndo = document.querySelector("#endo")
    let circleTimer = document.querySelector('.circleTimer')
    let selectHour = document.querySelector('#heure')
    let selectMin = document.querySelector('#minutes')
    let selectSec = document.querySelector('#secondes')
    let buttonFlooz =  document.querySelector('#flooz')
    let FieldsetChrono = document.querySelector('.chrono')
    let decompteAlarme = document.querySelector('#decompteAlarme')
    let iconPlay = buttonPlay.querySelector('i')
    let timeMs = 1000
    let AnimationOnProgress = null
    let animationDuration = null
    let decrementation = null
    let stateChrono = false
    selectHour.value = "00"
    selectMin.value= "00"
    selectSec.value= "00"

    
    for (let index = 1; index <= 24; index++) {
        let option = document.createElement('option');
        let value = index < 10 ? `0${index}` : index
        option.value = value;
        option.innerHTML = value;
        selectHour.append(option);
    }

    for (let index = 1; index <= 59; index++) {
        let option = document.createElement('option');
        index < 10 ? option.innerHTML = `0${index}` : option.innerHTML = index
        selectMin.append(option);
    }
    for (let index = 1; index <= 59; index++) {
        let option = document.createElement('option');
        index < 10 ? option.innerHTML = `0${index}` : option.innerHTML = index
        selectSec.append(option);
    }

    function selectScroll(element){
        let optionSelect = element.querySelector('option')
        let SizeOption = optionSelect.offsetHeight
        element.value = Math.round(element.scrollTop/SizeOption)
    }

    var isScrolling;
    function selectScroll(element){

        let optionScroll = element.querySelector('option')
        let OffsetHOption = optionScroll.offsetHeight
        let ValueRounded = Math.round(element.scrollTop/OffsetHOption)
        let ValueSelected = ValueRounded<10 ? `0${ValueRounded}` : `${ValueRounded}`;
        let customRecursiv = document.querySelector('#customRecursiv');
        element.value = ValueSelected
    }

    selectHour.addEventListener('scroll', function ( event ) {

        window.clearTimeout( isScrolling );
        
        isScrolling = setTimeout(function() {          
        selectScroll(selectHour);
        }, 1000);

    }, false);

    selectMin.addEventListener('scroll', function ( event ) {

        window.clearTimeout( isScrolling );

        isScrolling = setTimeout(function() {          
        selectScroll(selectMin);
        }, 500);

    }, false);

    selectSec.addEventListener('scroll', function ( event ) {

        window.clearTimeout( isScrolling );

        isScrolling = setTimeout(function() {          
        selectScroll(selectSec);
        }, 500);

    }, false);

    function eventRunChrono()
    {
        if(stateChrono === false)
        {
            
            if(selectHour.value !=='00' || selectMin.value !=='00' || selectSec.value !=='00')
            {
                stateChrono = true
                iconPlay.classList.toggle('fa-play')
                iconPlay.classList.toggle('fa-pause')

                decompteAlarme.innerHTML = `${selectHour.value}:${selectMin.value}:${selectSec.value}`
                event.preventDefault()
                FieldsetChrono.classList.add('hidden')
                decompteAlarme.classList.remove('hidden')

                timeH = (parseInt(selectHour.value)*60)*60
                timeMin = parseInt(selectMin.value)*60
                timeSec = parseInt(selectSec.value)

                let addition = timeH+timeMin+timeSec
                let timeDuration = addition*1000
                
                decrementation = setInterval(()=>{

                    timeMs = timeMs-100
                    if(timeMs === 0)
                    {
                        timeMs = 1000
                        if(selectSec.value === '00' && (selectMin.value !== '00' || selectHour.value !== '00'))
                        {
                            selectSec.value = '59'

                            if(selectMin.value === '00' && selectHour.value !== '00')
                            {
                                selectMin.value = '59'
                                selectHour.value = parseInt(selectHour.value) <= 10 ? `0${parseInt(selectHour.value)-1}` : parseInt(selectHour.value)-1
                            }
                            else{
                                selectMin.value = parseInt(selectMin.value) <= 10 ? `0${parseInt(selectMin.value)-1}` : parseInt(selectMin.value)-1
                            }
                        }
                        else{
                            
                            selectSec.value = parseInt(selectSec.value) <= 10 ? `0${parseInt(selectSec.value)-1}` : parseInt(selectSec.value)-1
                        }
                        decompteAlarme.innerHTML = `${selectHour.value}:${selectMin.value}:${selectSec.value}`
                    }

                },100)
                // circleTimer.classList.add('animationcircle')
                animationProgress = new KeyframeEffect(circleTimer,
                    [
                    // étapes/keyframes
                    { strokeDashoffset: '942px' },
                    { strokeDashoffset: '0px' }
                    ], {
                    // temporisation
                    duration: timeDuration,
                    fill: 'forwards'
                    })

                if(AnimationOnProgress === null){
                    console.log('ok')
                    AnimationOnProgress = new Animation(animationProgress, document.timeline)
                    animationDuration = timeDuration
                    console.log(animationDuration)
                }
                
                
                AnimationOnProgress.play()

                Promise.all(
                    circleTimer.getAnimations().map(
                    function(animation) {
                        return AnimationOnProgress.finished
                    }
                    )
                ).then(
                    function() {
                        console.log(AnimationOnProgress)
                        setTimeout(() => {
                            clearInterval(decrementation)
                        }, 500);
                        decompteAlarme.classList.add('hidden')
                        buttonFlooz.classList.remove('hidden')
                        FieldsetChrono.classList.add('hidden')
                        audio = new Audio('./asset/mp3/zen.mp3')
                        audio.play(true)
                        // clearInterval(appearMasque)
                        return AnimationOnProgress = null;
                    }
                );
            }
        }
        else{
        iconPlay.classList.toggle('fa-play')
        iconPlay.classList.toggle('fa-pause')
        stateChrono = false

        clearInterval(decrementation)
        AnimationOnProgress.pause()
        }
    }
    buttonPlay.addEventListener('click', (event) => {
        event.preventDefault()
        eventRunChrono()
    })

    document.addEventListener('keyup', (event)=>{
        console.log(event.key)
        if(event.key == ' ')
        {
            eventRunChrono()   
        }
    })

    buttonEndo.addEventListener('click', (event)=>{
        window.location.reload()
    })

})