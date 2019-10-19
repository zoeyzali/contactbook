class EditContactCard {
    constructor( contact, id ) {
        this.editContactCard( contact, id )
    }

    editContactCard( contact, id ) {
        let body = document.querySelector( '.form-wrapper' )
        let editContainer = document.createElement( 'div' )
        body.appendChild( editContainer )
        editContainer.className = 'editWrap'
        editContainer.setAttribute( 'data-id', id )
        editContainer.innerHTML = `<h3>Redigera kontakt</h3>`

        let name = document.createElement( 'input' )
        name.innerHTML
        name.id = "editName"
        name.value = contact.name
        name.className = "contact-form-inputs-name"
        editContainer.append( name )

        let phoneNumber = document.createElement( 'input' )
        phoneNumber.innerHTML;
        phoneNumber.id = "editPhone"
        phoneNumber.value = contact.phoneNumber
        phoneNumber.className = "contact-form-inputs-phoneNumber"
        editContainer.append( phoneNumber )

        let email = document.createElement( 'input' )
        email.innerHTML;
        email.id = "editEmail"
        email.value = contact.email
        email.className = "contact-form-inputs-email"
        editContainer.append( email )


        let addEmailBtn = document.createElement( 'button' )
        editContainer.append( addEmailBtn );
        addEmailBtn.innerHTML = `+ epost `
        addEmailBtn.setAttribute( 'class', 'emailBtn' )

        let addPhoneButton = document.createElement( 'button' )
        editContainer.append( addPhoneButton );
        addPhoneButton.innerHTML = '+ Nummer'
        addPhoneButton.setAttribute( 'class', 'phoneBtn' )

        let saveEditDiv = document.createElement( 'div' )
        editContainer.appendChild( saveEditDiv );
        saveEditDiv.className = 'saveEditDiv';

        let saveEditBtn = document.createElement( 'button' )
        saveEditDiv.appendChild( saveEditBtn );
        saveEditBtn.className = 'updateForm';
        saveEditBtn.innerHTML = 'Spara ändringar'

        let cancelBtn = document.createElement( 'button' )
        saveEditDiv.appendChild( cancelBtn )
        cancelBtn.className = 'cancelBtn'
        cancelBtn.innerHTML = 'Avbryt'

        let wrapperHistory = document.createElement( 'div' );
        body.append( wrapperHistory );
        wrapperHistory.innerHTML;
        wrapperHistory.setAttribute( 'class', 'wrapperHistory' );
        wrapperHistory.setAttribute( 'data-id', id )

        let historyTitle = document.createElement( 'h1' );
        wrapperHistory.append( historyTitle );
        historyTitle.innerHTML = 'Historik';
        historyTitle.setAttribute( 'id', 'title' );
    }
}

