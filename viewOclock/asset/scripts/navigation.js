window.addEventListener("DOMContentLoaded", (event)=>
{
    let nav = document.querySelector('body > header > nav')
    let navli = nav.querySelectorAll('li')

    navli.forEach(element => {

        let linkDirection = element.querySelector('a')
        let IconSVG = linkDirection.querySelector('svg')
        let AllPath = IconSVG.querySelectorAll('path')


        let actuellocation = window.location.href.split('/')
        
        if(linkDirection.attributes.href.nodeValue === actuellocation[actuellocation.length-1])
        {
            linkDirection.classList.add('aSelected')
            AllPath.forEach(element => {element.classList.replace('st2','st1')})
        }
        else{
            AllPath.forEach(element => {element.classList.replace('st1','st2')})
            linkDirection.classList.remove('aSelected')
        }

        linkDirection.addEventListener('mouseover',(event) =>
        {
            AllPath.forEach(element => {
                if(element.classList.contains('st2'))
                {
                element.classList.replace('st2','st1')
                }
            });
        })
        linkDirection.addEventListener('mouseout',(event) =>
        {
            AllPath.forEach(element => {
                element.classList.replace('st1','st2')
            });
        })

    });

});