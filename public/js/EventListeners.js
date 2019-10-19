
// We use a self executing function
// "our own private universe"
// and export the things we want to be public
const [listen, unlisten] = ( () => {

    let listeningOnType = {};
    let listeners = [];

    function listen( eventType, cssSelector, func ) {
        // Register a "listener"
        let listener = { eventType, cssSelector, func };
        listeners.push( listener );
        // If no listener on window[eventType] register a 
        // a real/raw js-listener
        if ( !listeningOnType[eventType] ) {
            // add event listener for this type on the whole window
            window.addEventListener( eventType, e => {
                listeners
                    .filter( x => x.eventType === eventType )
                    .forEach( listener => {
                        if ( e.target.closest( listener.cssSelector ) ) {
                            listener.func( e );
                        }
                    } );
            } );
            listeningOnType[eventType] = true;
        }
        return listener;
    }

    function unlisten( listener ) {
        listeners.splice( listeners.indexOf( listener ), 1 );
    }
    return [listen, unlisten];
} )();



//  display added contact 
window.onload = function () {
    this.displayContacts
}

// toggle form 
let toggleForm = listen( 'click', '#showFormBtn', () => {
    let showForm = document.querySelector( '.contact-form' )
    showForm = 'hide' ? showForm.classList.toggle( 'show' ) : showForm.classList.toggle( 'hide' )
} )

// submit form event 
let listenAdd = listen( 'submit', '.contact-form', e => {
    e.preventDefault()
    const id = Math.floor( ( Math.random() * 1000 ) + 1 )
    const name = document.querySelector( '#nameInput' ).value
    const phoneNumber = document.querySelector( '#phoneNumberInput' ).value
    const email = document.querySelector( '#emailInput' ).value
    // Validate
    if ( name === "" || phoneNumber === "" || email === "" ) {
        this.showAlert( 'Mata in alla fält och försök igen', 'danger' )
    } else {
        const contact = new Contact( id, name, phoneNumber, email )
        contacts.push( contact )
        this.addContactToList( contact )
        this.showAlert( 'Kontakt sparat', 'success' )
        contacts.save()
        this.clearInputFields()
        // this.updateForm( contact )
    }
} )

addMoreNumbers = listen( 'click', '.phoneBtn', e => {
    let element = e.target.parentElement
    let extraNrField = document.createElement( 'input' ); extraNrField.innerHTML = "text"
    extraNrField.placeholder = "lägg till flera nummer"
    extraNrField.className += "input"
    let removePhoneButton = document.createElement( 'button' )
    removePhoneButton.innerHTML = "x"
    removePhoneButton.className = "removeNrBtn"
    element.appendChild( extraNrField )
    element.appendChild( removePhoneButton )
} )

addMoreEmails = listen( 'click', '.emailBtn', e => {
    let element = e.target.parentElement
    let extraEmail = document.createElement( 'input' );
    extraEmail.innerHTML = "text"
    extraEmail.placeholder = "lägg till flera epost"
    extraEmail.className += "input"
    let removeEmailButton = document.createElement( 'button' )
    removeEmailButton.innerHTML = "x"
    removeEmailButton.className = "removeExEmail"
    element.appendChild( extraEmail )
    element.appendChild( removeEmailButton )
} )

deleteAddPhone = listen( 'click', '.removeNrBtn', e => {
    let el = e.target.previousSibling
    let el2 = e.target
    console.log( el, el2, 'yao elements' )
    el.remove()
    el2.remove()
} )

deleteExEmail = listen( 'click', '.removeExEmail', e => {
    let el = e.target.previousSibling
    let el2 = e.target
    el.remove()
    el2.remove()
} )

// event delete a contact 
let deleteCont = listen( 'click', '.deleteBtn', e => {
    let target = e.target
    let id = target.getAttribute( 'data-id' )
    this.deleteContact( { target, id } )
} )

// edit listener
let editListen = listen( 'click', '.editBtn', e => {
    let target = e.target.closest( '[data-id]' )
    let id = target.getAttribute( 'data-id' )
    this.editContact( { target, id } )
} )

// saveEdit listener
let saveCont = listen( 'click', '.updateForm', e => {
    let target = e.target.closest( '[data-id]' )
    let id = target.getAttribute( 'data-id' )
    this.updateForm( id )
} )

let cancelListener = listen( 'click', '.cancelBtn', e => {
    const target = e.target
    console.log( target, 'cancel clicked' )
    this.cancelEdit()
} )

let getHistory = listen( 'click', '.historyBtn', () => {
    console.log( 'history clicked' )
    this.history( contact, id )
} )


