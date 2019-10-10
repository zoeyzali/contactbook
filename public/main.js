let store;
try {
    store = JSON.parse( localStorage.store )
}
catch ( e ) {
    store = {};
}
store.save = function () {
    localStorage.store = JSON.stringify( this );
}

if ( !store.admin ) {
    // console.log( 'creating admin' )
    store.admin = { name: 'Zoe', status: 'superadmin' }
    store.save()
}
// console.log( store.admin, 'The ADMIN' )

// main body
let body = document.querySelector( 'body' )
let container = document.createElement( 'container' )
container.setAttribute( 'class', 'main-container' )
body.append( container )
let main = document.createElement( 'div' )
main.setAttribute( 'class', 'contact-page' )
container.append( main )

const btnGoup = ['Lägg till', 'Min kontakter']
btnGoup.forEach( btnText => {
    let btn = document.createElement( 'button' )
    btn.innerHTML = btnText
    main.appendChild( btn )
    btn.setAttribute( 'class', 'btn' )
} )

//  add contacts 
// document.designMode = "on" 
let form = document.createElement( 'form' )
form.setAttribute( 'class', 'contact-form' )
let h3 = document.createElement( 'h3' )
h3.setAttribute( 'class', 'add-heading' )
h3.innerHTML = "Ny kontakt";
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
let submitBtn = document.querySelector( 'button' )
// submitBtn.innerHTML = "Spara"
form.append( submitBtn )
// submitBtn.setAttribute( 'id', 'submitBtn' )

let table = document.createElement( 'table' )
table.setAttribute( 'id', 'renderedContact' )
main.appendChild( table )
const tableHeader = ['namn', 'nummer', 'e-post']
tableHeader.forEach( text => {
    let th = document.createElement( 'th' )
    th.innerHTML = text
    table.appendChild( th )
    th.setAttribute( 'class', 'contact-headings' )
} )


// Contact object
class Contact {
    constructor( name, phoneNumber, email ) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}
// handle UI class
class UI {
    static displayContacts() {
        const contacts = Store.getContacts();
        contacts.forEach( ( contact ) => UI.addContactToList( contact ) )
    }

    static addContactToList( contact ) {
        const list = document.querySelector( '#renderedContact' );
        const row = document.createElement( 'tr' );
        row.setAttribute( 'class', 'contact-headings' )
        row.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.phoneNumber}</td>
        <td>${contact.email}</td>
        <td>
        <a href="#" class="delete delete-btn">x</a>
        </td>
        <td>
        <a href="#" class="edit edit-btn">
        <i class="fa fa-pencil edit-btn"></i>
        </a>
        </td>
        `
        list.appendChild( row )
    }

    static editContact( el ) {
        if ( el.classList.contains( 'edit' ) ) {
            el.parentElement.parentElement.edit()
        }
    }
    static deleteContact( el ) {
        if ( el.classList.contains( 'delete' ) ) {
            el.parentElement.parentElement.remove()
        }
    }

    static showAlert( message, className ) {
        const div = document.createElement( 'div' )
        div.className = `alert alert-${className}`;
        div.appendChild( document.createTextNode( message ) );
        const main = document.querySelector( '.contact-form' )
        const heading = document.querySelector( '.add-heading' );
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

    static deleteContact( name ) {
        const contacts = Store.getContacts();
        contacts.forEach( ( contact, index ) => {
            if ( contact.name === name ) {
                contact.splice( index, 1 )
            }
        } );
        localStorage.setItem( 'contacts', JSON.stringify( contacts ) )
    }
}

//  display added contact 
document.addEventListener( 'DOMContentLoaded', UI.displayContacts )
// add a contact
document.querySelector( '.contact-form' ).addEventListener( 'submit', ( e ) => {
    // get form values 
    e.preventDefault();
    const name = document.querySelector( '#nameInput' ).value;
    const phoneNumber = document.querySelector( '#phoneInput' ).value;
    const email = document.querySelector( '#emailInput' ).value;
    // validate 
    if ( name === "" || phoneNumber === "" || email === "" ) {
        UI.showAlert( 'Mata in alla fält', 'danger' )
    } else {

        // instantiating a new contact 
        const contact = new Contact( name, phoneNumber, email )
        // console.log( contact, 'Adding a contact' )
        // add contact to UI
        UI.addContactToList( contact );
        // add contact to localstorage
        Store.addContact( contact )
        // show alert
        UI.showAlert( 'Kontakt sparat', 'success' )
        // Clear input fields 
        UI.clearInputFields( contact );
    }
} );

// Remove a contact 
document.querySelector( '#renderedContact' ).addEventListener( 'click', ( e ) => {
    UI.deleteContact( e.target )
    Store.deleteContact( e.target.parentElement.previousElementSibling.textContent )
    UI.showAlert( 'Kontakt raderat', 'danger' )
} )


// // function get contacts from JSON
// document.getElementById( 'getJson' ).addEventListener( 'click', getJson )
// function getJson() {
//     fetch( 'contacts.json' )
//         .then( ( res ) => res.json() )
//         .then( ( data ) => {
//             console.log( data )
//             let output =
//                 "<h3>Mina kontakter</h3>"
//             data.forEach( function ( contact ) {
//                 output +=
//                     `<ul> 
//                             <li>Namn ${contact.name}</li>
//                              <li>Nummer ${contact.phoneNumber}</li>
//                             <li>E-post ${contact.email}</li>
//                             <li>${contact.address}</li>
//                              <li>${contact.city}</li>
//                             </ul> 
//                             `
//             } );
//             document.getElementById( 'output' ).innerHTML = output;
//         } )
// };


function editContact() { }

function deleteContact() { }