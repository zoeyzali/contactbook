// main body
let body = document.querySelector( 'body' )
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
main.append( form )
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
emailInput.placeholder = "janedoe@idk.com"


// submit btn
let submitBtn = document.createElement( 'button' )
submitBtn.innerHTML = "Spara"
form.append( submitBtn )
submitBtn.setAttribute( 'id', 'submitBtn' )


// Contact object
class Contact {
    constructor( name, phoneNumber, email, id ) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.id = id
    }
}
console.log( this.id, 'the id' )

// handle Display class
class Display {
    static displayContacts() {
        const contacts = Store.getContacts();
        contacts.forEach( ( contact ) => Display.addContactToList( contact ) )
    }

    static addContactToList( contact ) {
        const list = document.querySelector( '#output' );
        let card = document.createElement( 'div' )
        card.setAttribute( 'id', 'cards' )
        card.innerHTML = `
        <ul id=${contact.id}>
            <li>${contact.name}</li>
            <li>${contact.phoneNumber}</li>
            <li>${contact.email}</li>
            <li class="delete delete-btn">x</li>
            <li class="edit edit-btn">
            <i class="fa fa-pencil edit-btn"></i>
            </li>
            </ul>
            `
        list.appendChild( card )
    }

    static deleteContact( el ) {
        if ( el.classList.contains( 'delete' ) ) {
            el.parentElement.parentElement.remove()
            console.log( el.parentElement.parentElement, 'the parent?' )
        }
    }

    static editContact( el ) {
        if ( el.classList.contains( 'edit' ) ) {
            console.log( el )
        }
    }

    static updateContact() {

    }

    static showAlert( message, className ) {
        const div = document.createElement( 'div' )
        div.className = `alert alert-${className}`;
        div.appendChild( document.createTextNode( message ) );
        const main = document.querySelector( '.contact-form' )
        const heading = document.querySelector( '.add-heading' )
        main.insertBefore( div, heading )
        if ( div === true ) {
            heading.setAttribute( 'class', 'toggled' )
        } else {
            main.insertAdjacentElement( 'afterbegin', heading )
        }

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

    static deleteContact( name ) {
        const contacts = Store.getContacts();
        contacts.forEach( ( contact, index ) => {
            if ( contact.name === name ) {
                contact.splice( index, 1 )
                console.log( contact.name, 'YAO index' )
            }
        } );
        localStorage.setItem( 'contacts', JSON.stringify( contacts ) )
    }

    static toggleForm() {
        let showForm = document.querySelector( '.contact-form' )
        showForm.classList.toggle( 'toggled' )
        console.log( showForm )
    }
}

//  display added contact 
document.addEventListener( 'DOMContentLoaded', Display.displayContacts )

// add a contact
document.querySelector( '.contact-form' ).addEventListener( 'submit', ( e ) => {
    // get form values 
    e.preventDefault();
    const name = document.querySelector( '#nameInput' ).value;
    const phoneNumber = document.querySelector( '#phoneInput' ).value;
    const email = document.querySelector( '#emailInput' ).value;
    // validate 
    if ( name === "" || phoneNumber === "" || email === "" ) {
        Display.showAlert( 'Mata in alla fält och försök igen', 'danger' )
    } else {
        // instantiating a new contact 
        const contact = new Contact( name, phoneNumber, email )
        console.log( contact, 'Adding a contact' )
        // add contact to Display
        Display.addContactToList( contact );
        // add contact to localstorage
        Store.addContact( contact )
        // show alert
        Display.showAlert( 'Kontakt sparat', 'success' )
        // Clear input fields 
        Display.clearInputFields( contact );
    }
} )


// Remove a contact 
document.querySelector( '#output' ).addEventListener( 'click', ( e ) => {
    Display.deleteContact( e.target )
    Store.deleteContact( e.target.parentElement.previousSiblingElement.textContent )
    Display.showAlert( 'Kontakt raderat', 'danger' )
} )


document.querySelector( '#card' ).addEventListener( 'click', ( e ) => {
    Display.editContact( e.target )
    console.log( e.target, ' selector?' )

} )
function editContact() { }

function deleteContact() { }