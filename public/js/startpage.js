const startpage = ( () => {
    let container = document.createElement( 'container' )
    document.querySelector( 'body' ).appendChild( container )
    container.classList.add( 'container-fluid', 'start-page' )
    let section = document.createElement( 'section' )
    section.id = "main-section"
    container.appendChild( section )
    let jumbo = document.createElement( 'div' )
    section.appendChild( jumbo )
    jumbo.setAttribute( 'class', 'jumbo' )

    let heading = document.createElement( 'h2' )
    heading.innerText = "Välkommen till  kontaktboken"
    jumbo.appendChild( heading )

} )();






