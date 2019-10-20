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

// We can listen
// let listener1 = listen( 'click', '.info-text', e => {
//     console.log( 'You clicked an .info-text' );
// } );
// let listener2 = listen( 'click', 'button', e => {
//     console.log( 'You clicked a button' );
// } );

// We can unlisten - try commenting in these lines:
// unlisten( listener1 );
// unlisten( listener2 );


// main body
let body = document.querySelector( 'section' )
let container = document.createElement( 'container' )
container.setAttribute( 'class', 'container' )
body.appendChild( container )
let main = document.createElement( 'div' )
main.setAttribute( 'class', 'contact-page' )
container.append( main )

//  add contacts 
let form = document.createElement( 'form' )
form.classList.add( 'hide', 'contact-form' )
let h3 = document.createElement( 'h3' )
h3.setAttribute( 'class', 'add-heading' )
h3.innerHTML = "Skapa ny kontakt";
form.append( h3 )

let nameInput = document.createElement( 'input' )
main.appendChild( form )
form.appendChild( nameInput )
nameInput.placeholder = "namn"
nameInput.setAttribute( 'id', 'nameInput' )


let phoneInput = document.createElement( 'input' )
form.appendChild( phoneInput )
phoneInput.placeholder = "telefonnummer"
phoneInput.setAttribute( 'id', 'phoneInput' )

let emailInput = document.createElement( 'input' )
form.appendChild( emailInput )
emailInput.setAttribute( 'id', 'emailInput' )
emailInput.setAttribute( 'type', 'email' )
emailInput.placeholder = "janedoe@idk.com"


// submit btn
let submitBtn = document.createElement( 'button' )
submitBtn.innerHTML = "Spara"
form.append( submitBtn )
submitBtn.setAttribute( 'id', 'submitBtn' )

let header = document.querySelector( 'header' )
let showFormBtn = document.createElement( 'button' )
showFormBtn.setAttribute( 'id', 'showFormBtn' )
showFormBtn.setAttribute( 'class', 'btn' )
showFormBtn.innerHTML = "+"
header.appendChild( showFormBtn )

// Contact object
class Contact {
    constructor( name, phoneNumber, email, id ) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.id = id
    }
}

// handle Display class
class Display {
    static displayContacts() {
        const contacts = Store.getContacts();
        contacts.forEach( ( contact ) => {
            console.log( contact.id, 'ID from DISPLAY' )
            Display.addContactToList( contact )
        } )
    }

    static addContactToList( contact ) {
        const list = document.querySelector( '#output' );
        let card = document.createElement( 'ul' )
        card.setAttribute( 'id', 'cards' )
        card.classList.add( 'contact-card' )
        card.dataset.id = contact.id
        card.innerHTML = `
            <li id="name">${contact.name}</li>
            <li class="edit" id="phone">${contact.phoneNumber}
            <span class="edit-btn">
            <i class="fa fa-pencil">
            </i>
            </span>
            </li>
            <li id="email">${contact.email}
            <span class="edit edit-btn">
            <i class="fa fa-pencil">
            </i>
            </span>
            </li>
            <span>
            <a class="delete delete-btn" dataId="${contact.id}">X</a>
            </span>
            `
        console.log( card.dataset.id, 'BRRAP DATASET ID' )
        list.appendChild( card )
    }

    static deleteContact( el ) {
        if ( el.classList.contains( 'delete' ) ) {
            const id = el.dataset.id
            document.querySelector( `.contact-card[data-id="${id}"]` ).remove();
        }
    }

    // static editContact( el ) {
    //     if ( el.classList.contains( 'edit' ) ) {
    //         const id = el.dataset.id;
    //         console.log( el.dataset.id, 'SHOOO' )
    //         let newPhone = document.querySelector( '#phone' ).value;
    //         let newEmail = document.querySelector( '#email' ).value;
    //         let editable = document.querySelector( 'li' )
    //         //editable.isContentEditable = true
    //         editable.innerHTML = `
    //         <input type="number" id="phone" placeholder="Uppdatera nummer" ${newPhone}/>
    //         <input type="email" id="email" placeholder="Uppdatera epost" ${newEmail}/>
    //         <a type="button" data-id="${id}" id="save-btn" class="save-edit hide"> 
    //          <i class="fa fa-check">
    //         </i>
    //         </a>
    //         `
    //     }
    // }


    static editContact( card ) {

        let updated = `<input class="show" placeholder="Uppdatera nummer"/>`
        console.log( card, 'from EDITFn' )
        document.querySelector( `.contact-card[dataId="${card}"]` )
        console.log( card, 'CARD ID?' )
    }

    static updateContact() {
        console.log( 'contact update' )
    }

    static showAlert( message, className ) {
        const div = document.createElement( 'div' )
        div.className = `alert alert - ${className}`;
        div.appendChild( document.createTextNode( message ) );
        const main = document.querySelector( '.contact-form' )
        const heading = document.querySelector( '.add-heading' )
        main.insertBefore( div, heading )

        // setting time out 
        setTimeout( () => document.querySelector( '.alert' ).remove(), 3000 )
    }

    // to clear inputs
    static clearInputFields() {
        document.querySelector( '#nameInput' ).value = ''
        document.querySelector( '#phoneInput' ).value = ''
        document.querySelector( '#emailInput' ).value = ''
    }
}

// store contact handles storage 
class Store {
    static getContacts() {
        let contacts;
        if ( localStorage.getItem( 'contacts' ) === null ) {
            contacts = [];
        } else {
            contacts = JSON.parse( localStorage.getItem( 'contacts' ) );
        }
        return contacts;
    }

    static addContact( contact ) {
        const contacts = Store.getContacts();
        contacts.push( contact );
        localStorage.setItem( 'contacts', JSON.stringify( contacts ) );
    }

    static deleteContact( id ) {
        const contacts = Store.getContacts();
        contacts.forEach( ( contact, index ) => {
            // console.log( contact.id, 'DELETED' )
            if ( contact.id === id ) {
                contacts.splice( index, 1 )
            }
        } )
        localStorage.setItem( 'contacts', JSON.stringify( contacts ) )
        // contacts.save( id )
        return contacts
    }


}

//  display added contact 
// let onload = listen( 'onload', 'DOMContentLoaded', Display.displayContacts )
document.addEventListener( 'DOMContentLoaded', Display.displayContacts )
// add a contact
let listenAdd = listen( 'submit', '.contact-form', e => {
    // get form values 
    e.preventDefault();
    const id = Math.floor( ( Math.random() * 100 ) + 2 )
    const name = document.querySelector( '#nameInput' ).value;
    const phoneNumber = document.querySelector( '#phoneInput' ).value;
    const email = document.querySelector( '#emailInput' ).value;

    // validate 
    if ( name === "" || phoneNumber === "" || email === "" ) {
        Display.showAlert( 'Mata in alla fält och försök igen', 'danger' )
    } else {
        // instantiating a new contact 
        const contact = new Contact( name, phoneNumber, email, id )
        // console.log( contact, 'Adding a contact' )
        // add contact to Display
        Display.addContactToList( contact );
        // add contact to localstorage
        Store.addContact( contact )
        // show alert
        Display.showAlert( 'Kontakt sparat', 'success' )
        // Clear input fields 
        Display.clearInputFields( contact );
        // Display.toggleForm
        Display.updateContact( contact )
    }
} )


// Event Remove a contact 
let deleteCont = listen( 'click', '#output', e => {
    Display.deleteContact( e.target )
    Store.deleteContact( e.target.parentElement.previousElementSibling )
    Display.showAlert( 'Kontakt raderat', 'danger' )
} )


// Event Edit a contact
let editCont = listen( 'click', '#cards', e => {
    e.preventDefault();
    Display.editContact( e.target.parentElement.dataset.id )
    console.log( e.target.parentElement.dataset.id, 'edit functioned' )

    // console.log( e.target, ' target from edit?' )
    Display.showAlert( 'Kontakt uppdaterad', 'success' )
} )



// TOGGLE FORM 
document.getElementById( 'showFormBtn' ).addEventListener( 'click', ( () => {
    let showForm = document.querySelector( '.contact-form' )
    showForm = 'hide' ? showForm.classList.toggle( 'show' ) : showForm.classList.toggle( 'hide' )
    console.log( showForm, 'clicked' )
} ) )

function editContact() { }

function deleteContact() { }