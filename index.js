const express = require( 'express' )
// const path = require( 'path' )
const app = express()
const port = 3002

// test route 
app.get( '/test', ( req, res ) => res.send( 'Its been 84 years ;) ' ) )

app.use( express.static( 'public' ) )

app.listen( port, () => console.log( `Shoo, the server is on port ${port}` ) )