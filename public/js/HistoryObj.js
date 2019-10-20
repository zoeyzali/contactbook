class History {
    constructor( contact, id ) {
        this.history( contact, id )
    }

    history( contact, id ) {
        contact.history.forEach( ( element ) => {
            // console.log( element.id )
            let historyContainer = document.querySelector( '.historyContainer' )
            let historySection = document.createElement( 'div' )
            historyContainer.append( historySection )
            historySection.innerHTML
            historySection.setAttribute( 'class', 'historySection' )
        } )

    }
}