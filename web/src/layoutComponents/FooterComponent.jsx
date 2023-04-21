import React from "react";
import { connect } from "react-redux";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

class FooterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aboutAriaExpand: false,
        }
    }
    render() {
        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col className="text-center">Optisol Business Solutions © 2021</Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        //  is_auth: state.auth.is_auth
    };
};

const mapDispatchToProps = {
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FooterComponent);