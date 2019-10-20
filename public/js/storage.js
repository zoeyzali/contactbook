let contacts;
try {
    contacts = JSON.parse( localStorage.contacts )
}
catch ( e ) {
    contacts = [];
}
contacts.save = function () {
    localStorage.contacts = JSON.stringify( this );
}


// if ( !contacts ) {
//     user = { id: 0, name: "Zoeeella", phoneNumber: "072-978 69 69", email: "zoeecoding@gmail.com" }
//     contacts.save()
// }
// console.log( store.user, 'Hardcoded storage item' )
