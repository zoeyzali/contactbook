const startpage = () => {
    let section = document.createElement( 'section' )
    document.querySelector( 'body' ).appendChild( section )
    section.classList.add( 'start-page', 'section' )
    let jumbo = document.createElement( 'div' )
    section.appendChild( jumbo )
    jumbo.setAttribute( 'class', 'jumbo' )

    let output = document.createElement( 'div' )
    jumbo.appendChild( output )
    output.setAttribute( 'id', 'output' )

    let heading = document.createElement( 'h2' )
    heading.innerHTML = "Välkommen till  kontaktboken"
    output.appendChild( heading )
}


startpage()

