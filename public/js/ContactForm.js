const ContactForm = ( () => {
    let jumbo = document.querySelector( '.jumbo' )
    let main = document.createElement( 'div' )
    main.setAttribute( 'class', 'form-wrapper' )
    jumbo.appendChild( main )

    //  create form
    let form = document.createElement( 'form' )
    form.classList.add( 'show', 'contact-form' )
    main.append( form )
    let heading = document.createElement( 'h3' )
    heading.innerHTML = `<h3>Skapa ny kontakt</h3>`
    heading.setAttribute( 'class', 'addheading' )
    form.appendChild( heading )

    let output = document.createElement( 'div' )
    output.setAttribute( 'id', 'output' )
    output.className = "outputWrapper"
    jumbo.appendChild( output )

    // create form elements 
    const inputFields = ["name", "phoneNumber", "email"]
    inputFields.map( input => {
        // console.log( input )
        let field = document.createElement( 'input' )
        input.innerText = field.inputFields;
        form.appendChild( field )
        field.classList.add( `contact-form-inputs-${input}` )
        field.setAttribute( 'id', `${input}Input` )

        // field.placeholder = `skriv in ${input}`
        let placeholder = `${input}`
        if ( placeholder === "name" ) {
            field.placeholder = `ange namn`
            field.type = "text"
        }
        if ( placeholder === "phoneNumber" ) {
            field.placeholder = `0046 72 978 xx xx`
            field.type = "number"
        }
        if ( placeholder === "email" ) {
            field.placeholder = `janedoe@idk.com`
            field.type = "email"
        }
        // console.log( `the input fields are ${input}` )
    } )
    // submit btn
    let submitBtn = document.createElement( 'button' )
    submitBtn.innerText = "Spara"
    form.append( submitBtn )
    submitBtn.setAttribute( 'id', 'submitBtn' )

    let header = document.querySelector( 'header' )
    let showFormBtn = document.createElement( 'button' )
    showFormBtn.setAttribute( 'id', 'showFormBtn' )
    showFormBtn.setAttribute( 'class', 'btn' )
    showFormBtn.innerText = "+"
    header.appendChild( showFormBtn )

} )()
