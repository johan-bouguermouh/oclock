window.addEventListener("DOMContentLoaded", (event)=>
{
    let wrappprReveil = document.querySelector('.wrappprReveil')
    let formAwakening = document.querySelector('#addAwakening')
    let selectHour = document.querySelector('#heure')
    let selectMin = document.querySelector('#minutes')
    let recurence = document.querySelector('#recurence')
    let playsong = document.querySelector('#playSong')
    let sonnerie = document.querySelector('#sonnerie')
    let validate = formAwakening.querySelector('#validate')
    let customDate = document.querySelector('#customDate')
    let AlarmStorageParse = JSON.parse(localStorage.getItem('Alarm'))
    let indexAlarmTab = AlarmStorageParse!== null ? AlarmStorageParse.length : 0;
    let buttonGoForm = document.querySelector('#buttonGoForm')
    let buttonExit = formAwakening.querySelector('#exitForm')
    selectHour.value = "00"
    selectMin.value= "00"


    buttonGoForm.addEventListener('click', (event) => {

        formAwakening.classList.remove('hidden')
        wrappprReveil.classList.add('widowsForce')
        buttonGoForm.classList.add('hidden')
    })

    let AlarmTab = []
    if(AlarmStorageParse!==null)
    {
        for (let index = 0; index < AlarmStorageParse.length; index++) {
            AlarmTab[index] = AlarmStorageParse[index];
            
        }
    }
    

    for (let index = 1; index < 24; index++) {
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
    
    recurence.addEventListener('change', (event) =>{

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
    })

    playsong.addEventListener('click', (event) => {
        event.preventDefault()
        var audio = new Audio('./asset/mp3/'+sonnerie.value+'.mp3');
        audio. play()
        setTimeout(()=>{
            audio.muted = true
        }, 3000)
    })

    buttonExit.addEventListener('click', (event)=>{
        event.preventDefault();
        location.reload(true)

    })

    validate.addEventListener('click', (e) => {
        e.preventDefault();
        let resultForm = new FormData(formAwakening);

      });
    
      formAwakening.addEventListener('formdata', (e) => {
        if(validate.classList.contains('hidden') === false)
        {
            console.log('executé coté add')
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

            AlarmTab[indexAlarmTab] = alarm
            indexAlarmTab++;

            let AlarmForStorage = JSON.stringify(AlarmTab)


            let alarmStorage = localStorage.setItem('Alarm', AlarmForStorage)
            location.reload(true)
        }
    })

});