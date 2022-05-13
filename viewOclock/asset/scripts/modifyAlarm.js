window.addEventListener("DOMContentLoaded", (event)=>
{
    let buttonValidate = document.querySelector('#validate')
    let buttonDelete = document.querySelector('#delete')
    let buttonModify = document.querySelector('#modify')
    let wrappprReveil = document.querySelector('.wrappprReveil')
    let formAwakening = document.querySelector('#addAwakening')
    let buttonGoForm = document.querySelector('#buttonGoForm')
    let ContenerAlarms = document.querySelector('#listAlarm')
    let buttondeletAllAlarm = document.querySelector('#deletAllAlarm')
    let AlarmStorageParse = JSON.parse(localStorage.getItem('Alarm'))
    let test = document.querySelector('#inspectCheckBox')
    let translateDay = [['Sun','dimanche'],['Mon','Lundi'],['Tue','mardi'],['Wed','mercredi'],['Thu','jeudi'],['Fri','vendredi'],['Sat','samedi']]
    let numberAlarmeSelected = null

    function messageForRecurence(element){
        if(element.recurence==="once")
        {
            return "Sonnera qu'une fois"
        }
        else if(element.recurence ==="customDate")
        {
            const event = new Date(element.customDate);
            return "Programmé pour le "+event.toLocaleDateString()
        }
        else if(element.recurence ==="alwaysWeek")
        {
            return "Programmé du lundi au vendredi";
        }
        else if(element.recurence ==="always")
        {
            return "Programmé pour tout les jours";
        }
        else if(element.recurence === "customRecursiv")
        {
            for (let index = 0; index < translateDay.length; index++) {
                const day = translateDay[index];
                if(day[0] === element.customRecursiv)
                {
                    return "Programmé pour tout les "+day[1];
                }
            }
        }

    }
    function timeRemaining(element)
    {
        function diffTimeIn(event, dateNow)
        {
            let eventValue = event.valueOf()
            let dateNowValue = dateNow.valueOf()
            let diffInMill = eventValue-dateNowValue
            let nbSecondes = diffInMill/1000
            let nbMinutes = nbSecondes/60
            let nbHours = nbMinutes/60
            let nbDay = nbHours/24
            
            let diff = new Object
            diff.seconde = Math.trunc(nbSecondes%60)
            diff.minutes = Math.trunc(nbMinutes%60)
            diff.hours =Math.trunc(nbHours%24)
            diff.day = Math.trunc(nbDay)
            

            return diff
        }
        
        let dateNow = new Date()
        let arrayDateNow = dateNow.toLocaleDateString().split('/')
        let heureNow = dateNow.getHours()

        let heureInt = parseInt(element.heure)
        let minutesInt = parseInt(element.minutes)

        function incrementDay(){
            if((heureInt > heureNow) || (heureInt === heureNow && minutesInt > dateNow.getMinutes()))
            {
                let newDateEvent = new Date()
                newDateEvent.setHours(heureInt)
                newDateEvent.setMinutes(minutesInt)
                newDateEvent.setSeconds(0)

                let difference = diffTimeIn(newDateEvent, dateNow)
                return `Déclenchée dans ${difference.hours}h,${difference.minutes}Min & ${difference.seconde}s`
            }
            else{
                let newDateEvent = new Date()
                let newDay = dateNow.getDate()+1
                newDateEvent.setDate(newDay)
                newDateEvent.setHours(heureInt)
                newDateEvent.setMinutes(minutesInt)
                newDateEvent.setSeconds(0)
                let difference = diffTimeIn(newDateEvent, dateNow)
                return `Déclenchée dans ${difference.hours}h,${difference.minutes}Min & ${difference.seconde}s`
            }
        }

        for (let index = 0; index < arrayDateNow.length; index++) {
            arrayDateNow[index] = parseInt(arrayDateNow[index]);
        }

        if(element.recurence === 'once' || element.recurence === 'always')
        {
            if((heureInt > heureNow) || (heureInt === heureNow && minutesInt > dateNow.getMinutes()))
            {
                let newDateEvent = new Date()
                newDateEvent.setHours(heureInt)
                newDateEvent.setMinutes(minutesInt)
                newDateEvent.setSeconds(0)

                let difference = diffTimeIn(newDateEvent, dateNow)
                return `Déclenchée dans ${difference.hours}h,${difference.minutes}Min & ${difference.seconde}s`
            }
            else{
                let newDateEvent = new Date()
                let newDay = dateNow.getDate()+1
                newDateEvent.setDate(newDay)
                newDateEvent.setHours(heureInt)
                newDateEvent.setMinutes(minutesInt)
                newDateEvent.setSeconds(0)
                let difference = diffTimeIn(newDateEvent, dateNow)
                return `Déclenchée dans ${difference.hours}h,${difference.minutes}Min & ${difference.seconde}s`
            }
        }
        else if(element.recurence === "customDate")
        {
            let newDateEvent = new Date(element.customDate)
            newDateEvent.setHours(heureInt)
            newDateEvent.setMinutes(minutesInt)
            newDateEvent.setSeconds(0)
            
            let difference = diffTimeIn(newDateEvent, dateNow)
            
            let messageJour = difference.day===0 ? "dans" : `dans ${difference.day} jours,`

            return `Déclenchée ${messageJour} ${difference.hours}h,${difference.minutes}Min & ${difference.seconde}s`
        }
        else if(element.recurence === "alwaysWeek")
        {
            let arrayDayOn = [0,1,2,3,4]
            if(arrayDayOn.includes(dateNow.getDay()))
            {
                if((heureInt > heureNow) || (heureInt === heureNow && minutesInt > dateNow.getMinutes()))
                {
                    let newDateEvent = new Date()
                    newDateEvent.setHours(heureInt)
                    newDateEvent.setMinutes(minutesInt)
                    newDateEvent.setSeconds(0)

                    let difference = diffTimeIn(newDateEvent, dateNow)
                    return `Déclenchée dans ${difference.hours}h,${difference.minutes}Min & ${difference.seconde}s`
                }
                else{
                    let newDateEvent = new Date()
                    let newDay = dateNow.getDate()+1
                    newDateEvent.setDate(newDay)
                    newDateEvent.setHours(heureInt)
                    newDateEvent.setMinutes(minutesInt)
                    newDateEvent.setSeconds(0)
                    let difference = diffTimeIn(newDateEvent, dateNow)
                    return `Déclenchée dans ${difference.hours}h,${difference.minutes}Min & ${difference.seconde}s`
                }
            }
            else{
                if((dateNow.getDay()===5) && (heureInt > heureNow) || (heureInt === heureNow && minutesInt > dateNow.getMinutes()))
                {
                    let newDateEvent = new Date()
                    newDateEvent.setHours(heureInt)
                    newDateEvent.setMinutes(minutesInt)
                    newDateEvent.setSeconds(0)

                    let difference = diffTimeIn(newDateEvent, dateNow)
                    return `Déclenchée dans ${difference.hours}h,${difference.minutes}Min & ${difference.seconde}s`
                }
                else{
                    let newDay = dateNow.getDay()===5 ? dateNow.getDate()+3 : dateNow.getDate()+2
                    let newDateEvent = new Date()
                    newDateEvent.setDate(newDay)
                    newDateEvent.setHours(heureInt)
                    newDateEvent.setMinutes(minutesInt)
                    newDateEvent.setSeconds(0)
                
                    let difference = diffTimeIn(newDateEvent, dateNow)
            
                    let messageJour = difference.day===0 ? "dans" : `dans ${difference.day} jours,`
        
                    return `Déclenchée ${messageJour} ${difference.hours}h,${difference.minutes}Min & ${difference.seconde}s`
                }
                
            }
        }
        else if(element.recurence === "customRecursiv")
        {
            const AlarmegetDay = (key) => key[0] === element.customRecursiv;
            DayChoose = translateDay.findIndex(AlarmegetDay);
            newIntervalDate = DayChoose-dateNow.getDay() < 0 ? 7+DayChoose-dateNow.getDay() : DayChoose-dateNow.getDay()

            if(((heureInt < heureNow) || (heureInt === heureNow && minutesInt <= dateNow.getMinutes())) && newIntervalDate===0){
                newIntervalDate = 7
            }

            let newDateEvent = new Date()
            newDateEvent.setDate(newDateEvent.getDate()+newIntervalDate)
            newDateEvent.setHours(heureInt)
            newDateEvent.setMinutes(minutesInt)
            newDateEvent.setSeconds(0)

            let difference = diffTimeIn(newDateEvent, dateNow)
            
            let messageJour = difference.day===0 ? "dans" : `dans ${difference.day} jours,`
        
            return `Déclenchée ${messageJour} ${difference.hours}h,${difference.minutes}Min & ${difference.seconde}s`

        }
    }

    if(AlarmStorageParse!==null){

        AlarmStorageParse.forEach(element => {
            
            let titleAlarm = document.createElement('h4')
            titleAlarm.innerHTML = element.titre
            let Newli = document.createElement('li')
            let divTimeAndToggle = document.createElement('div')
            let Time = document.createElement('p')
            Time.innerHTML = element.heure+':'+element.minutes
            let buttonMuted = document.createElement('button')
            let roundToggle = document.createElement('div')
            roundToggle.classList.add('toggleFamily')
            buttonMuted.setAttribute('type','checkbox')
            buttonMuted.className = "toggleMute"
            buttonMuted.classList.add('toggleFamily')
            if(element.muted === true)
            {   
                Newli.classList.add('liMuted')
                buttonMuted.classList.add('toggleOn')
                roundToggle.style.animationDuration = '0ms'
                roundToggle.classList.add('openToggle')
                roundToggle.innerHTML = '<i class="fa-solid fa-volume-xmark toggleFamily"></i>'
            }
            else{
                roundToggle.innerHTML = '<i class="fa-solid fa-volume-high toggleFamily"></i>'
            }
            buttonMuted.append(roundToggle)
            let recurence = document.createElement('p')
            recurence.innerHTML = messageForRecurence(element)
            let timeTo = document.createElement('p')
            timeTo.innerHTML= 'Déclanchée dans ...'

            divTimeAndToggle.append(Time)
            divTimeAndToggle.append(buttonMuted)
            Newli.append(titleAlarm)
            Newli.append(divTimeAndToggle)
            Newli.append(recurence)
            Newli.append(timeTo)
            ContenerAlarms.append(Newli)

        });
        

        let liList = ContenerAlarms.querySelectorAll('li')
        let toggle = ContenerAlarms.querySelectorAll('li > div > button')
        
        for (let index = 0; index < toggle.length; index++) {
            const element = toggle[index];
            element.addEventListener('click', (event)=>{
                let roundToggleSelected = element.querySelector('div')
                roundToggleSelected.style.animationDuration = '150ms'
                element.classList.toggle('toggleOn')
    
                if(element.classList.contains('toggleOn') !== true)
                {
                    roundToggleSelected.innerHTML = '<i class="fa-solid fa-volume-high toggleFamily"></i>'
                    
                }
                else{
                    roundToggleSelected.innerHTML = '<i class="fa-solid fa-volume-xmark toggleFamily"></i>'
                    
                }
    
                if(roundToggleSelected.classList.contains('openToggle') !== true)
                {
                    roundToggleSelected.classList.remove('closeToggle')
                    roundToggleSelected.classList.add('openToggle')
                }
                else{
                    roundToggleSelected.classList.toggle('openToggle')
                    roundToggleSelected.classList.toggle('closeToggle')
                    
                }
                liList[index].classList.toggle('liMuted')
                AlarmStorageParse[index].muted = AlarmStorageParse[index].muted ? false : true;
                let NewAlarmForStorage = JSON.stringify(AlarmStorageParse)
                let alarmStorage = localStorage.setItem('Alarm', NewAlarmForStorage)
                location.reload(true)
                
            },false)
        }

        for (let index = 0; index < liList.length; index++) {
            const element = liList[index];
            element.addEventListener('click', (event)=>{

                let enventelement = event.srcElement
                if(enventelement.classList.contains('toggleFamily')===false)
                {
                        
                    for (const [key, value] of Object.entries(AlarmStorageParse[index])) {
                        if(key !== 'muted')
                        {
                            formElementSelected =  document.getElementsByName(key)
                            formElementSelected[0].value = value
                        }
                    }

                    function OpenInputWhen(element)
                    {
                        elementFocus = document.querySelector('#'+element)

                        if(recurence.value === element.toString())
                        {
                            elementFocus.classList.remove('hidden')
                        }
                        else if(elementFocus.classList.contains('hidden')=== false){
                            elementFocus.classList.add('hidden')
                        }
                    }
                    OpenInputWhen('customRecursiv')
                    OpenInputWhen('customDate')
                    
                    buttonDelete.classList.remove('hidden')
                    buttonModify.classList.remove('hidden')
                    buttonValidate.classList.add('hidden')         
                    formAwakening.classList.remove('hidden')
                    wrappprReveil.classList.add('widowsForce')
                    buttonGoForm.classList.add('hidden')
                    numberAlarmeSelected = index
                }
            })
            
        }

        buttonDelete.addEventListener('click', (event) => {
            AlarmStorageParse.splice(numberAlarmeSelected,1)

            let NewAlarmForStorage = JSON.stringify(AlarmStorageParse)
            let alarmStorage = localStorage.setItem('Alarm', NewAlarmForStorage)
            location.reload(true)

        })

        buttonModify.addEventListener('click', (event)=>{

            event.preventDefault()
            let resultForm = new FormData(formAwakening);
        })

        formAwakening.addEventListener('formdata', (e) => {
            if(buttonModify.classList.contains('hidden') === false)
            {
                console.log(e)
                let alarm = new Object
                alarm.muted = false
                let dateNow = new Date()
        
                let data = e.formData;
        
                for (var value of data.entries()) {
        
                    let attribut = value[0]
                    if(attribut === 'customDate' && value[1]!== '')
                    {
                        let dateAlarm = new Date(value[1])
                        value[1] = dateAlarm.toDateString()
                    }
                    alarm[attribut] = value[1];
                }
                console.log(AlarmStorageParse)
                AlarmStorageParse.splice(numberAlarmeSelected,1, alarm)
                console.log(AlarmStorageParse)
        
                let AlarmForStorage = JSON.stringify(AlarmStorageParse)

                let alarmStorage = localStorage.setItem('Alarm', AlarmForStorage)
                location.reload(true)
            }
          });
       

        function timerCountAllLi(){

            for (let index = 0; index < liList.length; index++) {
                const element = liList[index];
                let timerCount = element.querySelector('p:last-child')
                timerCount.innerHTML = timeRemaining(AlarmStorageParse[index])
            }
        }
        
        setInterval(timerCountAllLi,100)
        //timerCountAllLi()

        buttondeletAllAlarm.addEventListener('click', (event)=> {
        localStorage.removeItem('Alarm')
        location.reload(true)
        })
    }
})