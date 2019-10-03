let body = document.querySelector( 'body' )
let div = document.createElement( 'div' )
body.append( div )
let h1 = document.createElement( 'h1' )
h1.innerHTML = "Mina Kontakter";
div.append( h1 )

let contactsList = document.createElement( 'ul' )
let h4 = document.createElement( 'h4' )
h4.innerHTML = "Namn";
div.append( contactsList )
contactsList.append( h4 )
