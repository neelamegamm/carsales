import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from 'react-bootstrap';

import {
    getAllCarListing
} from '../../actions';

class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            limit: 8
        }
    }

    loadMore = () => {
        var offset = this.state.offset + this.state.limit;
        var params = {
            limit: this.state.limit,
            offset
        }

        this.props.getAllCarListing(params).then(response => {
            this.setState({
                offset
            })
        })
    }

    render() {
        const { carListing, carTotal } = this.props;
        return (
            <React.Fragment>
                <Container fluid="md">
                    <h4>All Cars</h4>
                    <Row>
                        {carListing && carListing.map((cars, key) => {
                            return (
                                <Col lg={3} className="mr-3 shadow-none p-3 mb-5 bg-light rounded">
                                    <img src="notavailable.jpg" width="250" />
                                    <p>Brand:  {cars.brand}</p>
                                    <p>Modal:  {cars.modal}</p>
                                    <p>Price:  {cars.price}</p>
                                    <p>Year:  {cars.year}</p>
                                    <p>Description:  {cars.description}</p>
                                    <p>Posted By:  {cars.users.name}</p>
                                </Col>
                            )
                        })}
                        {carListing.length > 0 && carListing.length < carTotal && <p><button className="btn btn-secondary" onClick={() => { this.loadMore() }}>Show More</button> </p>
                        }
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        carListing: state.cars.carListings,
        carTotal: state.cars.carTotal,
    };
};

const mapDispatchToProps = {
    getAllCarListing
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeComponent);