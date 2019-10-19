// Contact object
class Contact {
    constructor( id, name, phoneNumber, email, history = [] ) {
        this.id = id
        this.name = name
        this.phoneNumber = phoneNumber
        this.email = email
        this.history = history
    }
}

const displayContacts = () => {
    contacts.map( ( contact ) => {
        addContactToList( contact )
    } )
}
displayContacts()


function addContactToList( contact ) {
    const list = document.querySelector( '#output' )
    list.innerHTML +=
        `<ul 
        id="cards" class="contact-card"
        data-id=${contact.id}> 
        <li id="name">${contact.name}</li>
        <li id="phoneNumber">
        ${contact.phoneNumber}</li>
        <li id="email">
         ${contact.email}</li>
        <a class="editBtn"
            data-id="${contact.id}">
        <i class="fa fa-pencil"></i></a>
             <a class="deleteBtn delete"
            data-id="${contact.id}">x</a>
               <a class="historyBtn"
            data-id="${contact.id}">
            <i class="fa fa-refresh">
            </i></a>
            </ul>
            `
}

// validation message 
function showAlert( message, className ) {
    const div = document.createElement( 'div' )
    div.className = `alert alert-${className}`
    div.appendChild( document.createTextNode( message ) )
    const formWrapper = document.querySelector( '.contact-form' )
    const heading = document.querySelector( '.addheading' )
    formWrapper.insertBefore( div, heading )
    // setting time out 
    setTimeout( () => document.querySelector( '.alert' ).remove(), 3000 )
}

//  Clear form inputs
function clearInputFields() {
    document.querySelector( '#nameInput' ).value = ''
    document.querySelector( '#phoneNumberInput' ).value = ''
    document.querySelector( '#emailInput' ).value = ''
}
// clearInputFields()


// remove contacts from dom/storage
function deleteContact( { id, target } ) {
    contacts.splice( contacts.findIndex( contact =>
        contact.id === Number( id ) ), 1 )
    target.parentElement.remove()
    contacts.save();
}



// edit contact 
function editContact( { id } ) {
    const contactIndex = contacts.findIndex( contact => contact.id === Number( id ) )
    const contact = contacts[contactIndex]
    this.editContactCard = new EditContactCard( contact, id )
    this.history = new History( contact, id )
}



// updating form inputs 
function updateForm( id ) {
    let name = document.querySelector( '#editName' ).value
    let phoneNumber = document.querySelector( '#editPhone' ).value
    let email = document.querySelector( '#editEmail' ).value

    // replacing old contact with new and insert to history[]
    // updated view visible on refresh due to some edit bug// 
    let editContactCard = new Contact( id, name, phoneNumber, email )
    console.log( editContactCard, 'the edited contact' )
    const contactIndex = contacts.findIndex( contact => contact.id === Number( id ) )
    let contact = contacts[contactIndex]
    const addContactToHistory = { ...contact, history: undefined }
    editContactCard.history.push( addContactToHistory )
    contacts.splice( contactIndex, 1, editContactCard )
    document.querySelector( 'div.editWrap' ).outerHTML = ''
    contacts.save()
    this.editContact( id )
    this.clearInputFields()
}


function cancelEdit() {
    // console.log( 'editing cancelled' )
    document.querySelector( 'div.editWrap' ).outerHTML = ''
}
















