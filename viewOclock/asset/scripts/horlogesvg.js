window.addEventListener("DOMContentLoaded", (event)=>
{
    /**
     * Modifie l'affichage du dernier element
     * @param {*} element 
     * @param {*} unit 
     */
    function removeLastElement(element, unit)
    {
        if(unit === 's' || unit === 'm')
        {
            let lastUnit = element===0 ? 59 : element-1;
            let lastElement = document.getElementById(unit+lastUnit)
            lastElement.classList.replace('st2','st0')
        }
        else if(unit === 'h')
        {
            let lastUnit = element===0 ? 11 : element-1;
            let lastElement = document.getElementById(unit+lastUnit)
            lastElement.classList.replace('st1','st0')
        }
    }

    /**
     * Modifie l'affichage des élements selectionnés
     */
    function afficheHorloge()
    {
        let DateNow = new Date

        let hours = DateNow.getHours()
        let selectedHour = hours >= 12 ? (hours-12) : hours;
        removeLastElement(selectedHour, 'h')
        let elementHour = document.getElementById(`h${selectedHour}`)
        elementHour.classList.replace('st0','st1')

        let minutes = DateNow.getMinutes()
        removeLastElement(minutes, 'm')
        let elementMin = document.getElementById(`m${minutes}`)
        elementMin.classList.replace('st0','st2')

        let seconds = DateNow.getSeconds()
        removeLastElement(seconds, 's')
        let elementSec = document.getElementById(`s${seconds}`)
        elementSec.classList.replace('st0','st2')
    }
    //2022-04-29T12:20:40.996Z
    
    function printTimeNum(){
        let DateNow = new Date
        dateNormIso = DateNow.toString()
        timeNormIso = dateNormIso.split(' ')
        units = timeNormIso[4].split(':')
        let timer = document.querySelector('time')
        timer.innerHTML = `${units[0]}:${units[1]}:${units[2]}`;
    }
    setInterval(afficheHorloge, 100);
    setInterval(printTimeNum, 100);

    console.log(JSON.parse(localStorage.getItem('Alarm')))
});