let body = document.querySelector( 'body' )
let container = document.createElement( 'container' )
body.append( container )
let h3 = document.createElement( 'h3' )
h3.innerHTML = "Lägg till nytt";
container.append( h3 )

let main = document.createElement( 'div' )
container.append( main )

// get contact
// let card = document.createElement( 'div' )
// card.setAttribute( 'class', 'contact-card' )
// card.append( main )



//  add contacts 
// document.designMode = "on" 
let form = document.createElement( 'form' )
form.setAttribute( 'class', 'contact-form' )
let inputs = document.createElement( 'input' )
main.append( form )
form.appendChild( inputs )
inputs.setAttribute( 'class', 'contact-card-input' )

let button = document.querySelector( 'button' )
form.append( button )
button.setAttribute( 'class', 'btn' )





