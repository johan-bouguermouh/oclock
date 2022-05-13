window.addEventListener("DOMContentLoaded", (event)=>
{
    let sectionRoundUl = document.querySelector('.round ul')
    let buttonPLay = document.querySelector('#play')
    let buttonRegister = document.querySelector('#register')
    let buttonRedo = document.querySelector('#redo')
    let time = document.querySelector('.round > p')
    let iconPlay = buttonPLay.querySelector('i')
    let countTimer = null
    let numberRound = 1
    let numberH = 0
    let numberMin = 0
    let numberSec = 0
    let numberMs = 0
    stateTimer = false

    let comparison = 0
    let incrementLocalStorage = 0
    let numberCodeHexa = 0

    let codeHexa = ['#ec008c','#ed1b30','#f47521','#ffc709','#b7d433','#25b34b','#00a883','#00addb','#0079c1','#20419a','#602d91','#9c258f','#000000']
    console.log(codeHexa.length)

    

    function stringOn(element){
       let resultStringOn =  element < 10 ? `0${element}` : element
       return resultStringOn
    }

    function runButtonPlay(){
        if(stateTimer === false)
        {
            stateTimer = true
            iconPlay.classList.toggle('fa-play')
            iconPlay.classList.toggle('fa-pause')
            countTimer = setInterval(() => {
                numberMs = numberMs+10
                comparison = comparison+10
                if(numberMs === 1000)
                {
                    numberMs = 0;
                    numberSec++
                }
                if(numberSec === 60)
                {
                    numberSec=0
                    numberMin= 1
                }
                if(numberMin === 60)
                {
                    numberMin = 0
                    numberH = 1
                }
                
                time.innerHTML = `${stringOn(numberH)}:${stringOn(numberMin)}:${stringOn(numberSec)}:${numberMs}`
            }, 10);
        }
        else{
            stateTimer = false
            iconPlay.classList.toggle('fa-play')
            iconPlay.classList.toggle('fa-pause')
            clearInterval(countTimer)
        }
    }
    buttonPLay.addEventListener('click', (event)=>{
        runButtonPlay()
    })
    
    function RegisterTime(){
        if(stateTimer === true)
        {
            let diffRecord = document.createElement('p')
            diffRecord.innerHTML = null
            let lastLi = sectionRoundUl.firstChild
            if(lastLi !== null){

                lastTime = localStorage.getItem('LastRound');
                diffTime = comparison-lastTime
                console.log(diffTime)
                diffTime
                let nbSecondes = diffTime/1000
                let nbMinutes = nbSecondes/60
                let nbHours = nbMinutes/60
                
                let diff = new Object
                diff.ms = diffTime%1000
                diff.seconde = Math.trunc(nbSecondes%60)
                diff.minutes = Math.trunc(nbMinutes%60)
                diff.hours =Math.trunc(nbHours%24)
                console.log(diff)

                function convertNum(element){
                    let result = element < 0 ? element*(-1) : element
                    return result
                }
                function addAdditionalDiff(element){
                    let resultAdditionalDiff = element[0]==='-' ? element : '+'+element
                    return resultAdditionalDiff
                }

                function getTimerDiff(diff){
                if(diff.hours === 0 || diff.hours === -0)
                {
                    if(diff.minutes === 0 || diff.minutes === -0)
                    {
                        if(diff.seconde === 0 || diff.seconde === -0)
                        {
                            return diff.ms+'ms'
                        }
                        else{
                            return diff.seconde+','+convertNum(diff.ms)+'s'
                        }
                    }
                    else{
                        return diff.minutes+':'+convertNum(diff.seconde)+','+convertNum(diff.ms)+'s'
                    }
                }
                else{
                    return diff.hours+':'+convertNum(diff.minutes)+':'+convertNum(diff.seconde)+','+convertNum(diff.ms)
                }
                }

                let returnResultDiffRecord = getTimerDiff(diff)
                console.log(returnResultDiffRecord[0])
                diffRecord.innerHTML = addAdditionalDiff(returnResultDiffRecord)

            }
            diffRecord.innerHTML[0] === '-' ? diffRecord.classList.add('negativeScore') : diffRecord.classList.add('positiveScore')
            let newli = document.createElement('li')
            let newDiv = document.createElement('div')
            let newh4 = document.createElement('h4')
            let newTime = document.createElement('p')
            newh4.innerHTML = `<i style="color: ${codeHexa[numberCodeHexa]};" class="fas fa-flag"></i> <span style="color: ${codeHexa[numberCodeHexa]}; font-weight: bold;">Tour ${numberRound}</span>`
            newTime.innerHTML = `${stringOn(numberH)}:${stringOn(numberMin)}:${stringOn(numberSec)}:${numberMs}`

            newDiv.append(newh4)
            newDiv.append(diffRecord)
            newli.append(newDiv)
            newli.append(newTime)
            sectionRoundUl.append(newli)
            numberRound++
            numberCodeHexa === codeHexa.length-1 ? numberCodeHexa = 0 : numberCodeHexa++
            console.log(numberCodeHexa)

            localStorage.setItem('LastRound', comparison);
            comparison = 0

            let LastLiAppend = sectionRoundUl.lastChild
            let posLi = LastLiAppend.offsetTop
            let sizeLi = LastLiAppend.clientHeight
            let sizeBox = sectionRoundUl.clientHeight
            sectionRoundUl.scrollTop = (posLi+sizeLi)-(sizeBox)
        }
    }
    buttonRegister.addEventListener('click', (event)=>{
        RegisterTime()
    })
    document.addEventListener('keyup', (event)=>{
        console.log(event.key)
        if(event.key == ' ')
        {
            runButtonPlay()
        }
        else if(event.key === 'ArrowDown')
        {
            RegisterTime()
        }
    })
    buttonRedo.addEventListener('click', (event)=>{
        window.location.reload()
    })
})