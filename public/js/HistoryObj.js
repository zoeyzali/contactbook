class History {
    constructor( contact, id ) {
        this.history( contact, id )
    }

    history( contact, id ) {
        console.log( id, 'effing id' )
        contact.history.forEach( ( element ) => {
            let historyContainer = document.querySelector( '.historyContainer' )
            let historySection = document.createElement( 'div' )
            historyContainer.append( historySection )
            historySection.innerHTML
            historySection.setAttribute( 'class', 'historySection' )
            console.log( element )
        } )

    }
}