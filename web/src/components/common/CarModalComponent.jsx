import React from "react";
import { connect } from "react-redux";
import { Modal } from 'react-responsive-modal';
import { toast } from "react-toastify";

import {
    viewModalOpen,
    deleteModalOpen,
    deleteCarDetails,
    getUserCarListing
} from '../../actions';

class CarModalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    onCloseModal = () => { }

    closeModel = () => { //for close the model
        this.cleatState();
        this.props.viewModalOpen(false);
        this.props.deleteModalOpen(false);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    deleteCar = (carId) => {
        this.setState({ submitted: true, loading: true });
        this.props.deleteCarDetails(carId).then(
            response => {
                this.setState({ error: "" });
                this.closeModel();
                this.props.getUserCarListing();
                toast.success(response.message);
            },
            error => {
                this.setState({ error: error, loading: false });
                toast.success(error);
            }
        );
    }

    render() {
        const { loading } = this.state;
        const { carDetails, isView, isViewModalOpen, isDeleteModalOpen } = this.props;
        console.log('carDetails', carDetails)
        return (
            <React.Fragment>
                <Modal
                    className="removebbg-popup"
                    open={isViewModalOpen || isDeleteModalOpen}
                    onClose={this.closeModel}
                    center
                >
                    <div className="modal-dialog modal-width--custom m-t-80" role="document">
                        <div className="modal-content">
                            <div className="modal-header header-styling  border-0">
                                <h5
                                    className="modal-title text-center col-md-11 p-0 font-semibold"
                                    id="exampleModalLabel font-medium"
                                >
                                    {isView ? "View" : "Delete"} Cars
                                </h5>
                            </div>
                            <div className="modal-body body-padding--value pb-0">
                                {isView &&
                                    <div>
                                        <img src="notavailable.jpg" width="250" />
                                        <p>Brand:  {carDetails.brand}</p>
                                        <p>Modal:  {carDetails.modal}</p>
                                        <p>Price:  {carDetails.price}</p>
                                        <p>Year:  {carDetails.year}</p>
                                        <p>Description:  {carDetails.description}</p>
                                    </div>

                                }
                                {!isView &&
                                    <>
                                        <div>
                                            Are you sure want to delete this car details?
                                        </div>
                                        <div className="col-md-12 text-center p-0">
                                            <button
                                                onClick={() => this.deleteCar(carDetails.id)}
                                                disabled={loading}
                                                type="button"
                                                className="btn btn-primary mt-2"
                                            >
                                                Okay
                                            </button>
                                            <button
                                                onClick={this.closeModel}
                                                disabled={loading}
                                                type="button"
                                                className="btn btn-danger mt-2"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isViewModalOpen: state.headerinfo.isViewModalOpen,
        isDeleteModalOpen: state.headerinfo.isDeleteModalOpen,
        carDetails: state.cars.carDetails,
    };
};

const mapDispatchToProps = {
    viewModalOpen,
    deleteModalOpen,
    deleteCarDetails,
    getUserCarListing
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CarModalComponent);