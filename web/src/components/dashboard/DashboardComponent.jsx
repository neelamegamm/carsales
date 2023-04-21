import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from 'react-bootstrap';

import {
    getUserCarListing,
    createModalOpen,
    viewModalOpen,
    deleteModalOpen,
    getCarDetails,
    clearCarDetails
} from '../../actions';
import CarCMSComponent from "./CarCMSComponent";
import CarModalComponent from "../common/CarModalComponent";

class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            limit: 8
        }
    }

    componentDidMount() {
        this.props.getUserCarListing();
    }

    isViewCars = (isView, carId) => {
        this.props.getCarDetails(carId).then(
            response => {
                if (isView) {//view Cars
                    this.props.viewModalOpen(true);
                    this.setState({ isView: isView });
                } else { //delete cars
                    this.props.deleteModalOpen(true);
                    this.setState({ isView: isView })
                }
            }
        );
    }

    createCar = (isCreate, carId) => {
        this.props.clearCarDetails();

        if (!isCreate) {
            //Edit car details
            this.props.getCarDetails(carId).then(
                response => {
                    this.props.createModalOpen(true);
                }
            );
        } else {
            //Create car
            this.props.createModalOpen(true);
        }
    }

    loadMore = () => {
        var offset = this.state.offset + this.state.limit;
        var params = {
            limit: this.state.limit,
            offset
        }

        this.props.getUserCarListing(params).then(response => {
            this.setState({
                offset
            })
        })
    }

    render() {
        const { carListing, userCarTotal } = this.props;
        return (
            <React.Fragment>
                <Container fluid="md">
                    <h4>Your added cars: <button className="btn btn-primary" onClick={() => {
                        this.createCar(true)
                    }}>Create +</button> </h4>
                    <Row>
                        {carListing && carListing.map((cars, key) => {
                            return (
                                <Col lg={3} className="mr-3 shadow-none p-3 mb-5 bg-light rounded">
                                    <div className="pull-right">
                                        <span onClick={() => {
                                            this.createCar(false, cars.id)
                                        }}><i className="fa fa-edit"></i></span>
                                        <span onClick={() => {
                                            this.isViewCars(true, cars.id);
                                        }}><i className="fa fa-eye"></i></span>
                                        <span onClick={() => {
                                            this.isViewCars(false, cars.id);
                                        }}><i className="fa fa-trash"></i></span>
                                    </div>
                                    <img src="notavailable.jpg" width="250" />
                                    <p>Brand:  {cars.brand}</p>
                                    <p>Modal:  {cars.modal}</p>
                                    <p>Price:  {cars.price}</p>
                                    <p>Year:  {cars.year}</p>
                                    <p>Description:  {cars.description}</p>
                                </Col>
                            )
                        })}
                        {carListing.length > 0 && carListing.length < userCarTotal && <p><button className="btn btn-secondary" onClick={() => { this.loadMore() }}>Show More</button> </p>
                        }

                    </Row>
                </Container>

                <CarCMSComponent isCreate={this.props.carDetails.id ? false : true} />
                <CarModalComponent isView={this.state.isView} />

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        carListing: state.cars.userCarListings,
        is_auth: state.auth.is_auth,
        carDetails: state.cars.carDetails,
        userCarTotal: state.cars.userCarTotal,

    };
};

const mapDispatchToProps = {
    getUserCarListing,
    createModalOpen,
    viewModalOpen,
    deleteModalOpen,
    getCarDetails,
    clearCarDetails
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardComponent);