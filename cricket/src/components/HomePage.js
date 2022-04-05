import React, {Component} from 'react'
import {Container} from 'reactstrap'

class HomePage extends Component {
    render(){
        return(
            <Container className="toplookout">
                <Match />
                <LeaguePage />
            </Container>
        )
    }
}

export default HomePage