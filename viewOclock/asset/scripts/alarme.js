window.addEventListener("DOMContentLoaded", (event)=>{
    let header = document.querySelector('body > header')
    let AlarmStorageParse = JSON.parse(localStorage.getItem('Alarm'))
    let translateDay = [['Sun','dimanche'],['Mon','Lundi'],['Tue','mardi'],['Wed','mercredi'],['Thu','jeudi'],['Fri','vendredi'],['Sat','samedi']]
    let sectionAlert = document.createElement('section')
    let audioAlarme = document.createElement('audio')

    sectionAlert.classList.add('hidden')

   
    if(AlarmStorageParse!==null){
        function appearAlert(element)
        { 
            sectionAlert.classList.remove('hidden')
            sectionAlert.classList.add('modaleAlarme')
            let buttonContent = document.createElement('button')

            let flaticon = document.createElement('img')
            flaticon.src = './asset/images/icon_chrono.svg'

            let positionContent = document.createElement('div')
            let titleAlarme = document.createElement('h4')
            titleAlarme.innerHTML = element.titre
            let descriptionAlarme = document.createElement('p')
            descriptionAlarme.innerHTML = element.story
            positionContent.append(titleAlarme)
            positionContent.append(descriptionAlarme)

            buttonContent.append(flaticon)
            buttonContent.append(positionContent)
            sectionAlert.append(buttonContent)

            header.append(sectionAlert)

        }
        function runAlert(element){
            audioAlarme.src = './asset/mp3/'+element.sonnerie+'.mp3'
            audioAlarme.play(true)
        //  alert("on lance l'alarme")
        appearAlert(element)
        }
        
        function playAlarm()
        {
            let DateNow = new Date()
            witnessH = DateNow.getHours() < 10 ? `0${DateNow.getHours()}` : DateNow.getHours().toString()
            witnessMin =  DateNow.getMinutes() < 10 ? `0${DateNow.getMinutes()}` : DateNow.getMinutes().toString()

            for (let index = 0; index < AlarmStorageParse.length; index++) {
                const element = AlarmStorageParse[index];
                if(!element.muted)
                {
                    if(element.recurence === 'once' || element.recurence === 'always')
                    {
                        
                        if(witnessH === element.heure && witnessMin === element.minutes && DateNow.getSeconds() < 1)
                        {
                            runAlert(element)
                            console.log(AlarmStorageParse.indexOf(element))
                            console.log(index)
                            element.recurence === 'once' ? AlarmStorageParse.splice(index,1) : AlarmStorageParse;
                            let AlarmForStorage = JSON.stringify(AlarmStorageParse)
                            let alarmStorage = localStorage.setItem('Alarm', AlarmForStorage)
                        }
                    }
                    else if(element.recurence === "customDate")
                    {
                        let event = new Date(element.customDate)
                        event.setHours(element.heure)
                        event.setMinutes(element.minutes)

                        if(event.toString() === DateNow.toString())
                        {
                            runAlert(element)
                        }
                    }
                    else if(element.recurence === "alwaysWeek")
                    {
                        let arrayDayOn = [1,2,3,4,5]
                        if(arrayDayOn.includes(DateNow.getDay()) && witnessH === element.heure && witnessMin === element.minutes && DateNow.getSeconds() < 1)
                        {
                            runAlert(element)
                        }
                    }
                    else if(element.recurence === "customRecursiv")
                    {
                        const AlarmegetDay = (key) => key[0] === element.customRecursiv;
                        DayChoose = translateDay.findIndex(AlarmegetDay);
                        if((DateNow.getDay() === DayChoose) && witnessH === element.heure && witnessMin === element.minutes && DateNow.getSeconds() < 1)
                        {
                            runAlert(element)
                        }
                    }
                    
                }
                
            };
        }
        sectionAlert.addEventListener('click', (event)=>{
            audioAlarme.muted = true
            sectionAlert.classList.add('hidden')
            location.reload(true)
        })
        let alarmeInterval = setInterval(playAlarm,1000)
    }
    //playAlarm()

});