import React from "react";
import { connect } from "react-redux";
import { Modal } from 'react-responsive-modal';
import { toast } from "react-toastify";

import {
    createModalOpen,
    getUserCarListing,
    createCars,
    clearCarDetails
} from '../../actions';

class CarCMSComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: {
                brand: '', 
                modal: '', 
                year: '', 
                price: '', 
                color: '', 
                description: ''
            },
            submitted: false,
            loading: false,
            error: ""
        };
    }

    componentDidMount() {
        var carDetails = this.props.carDetails;
        this.setState({
            cars: carDetails,
        });
    }

    componentWillReceiveProps(nextprops) {
        var carDetails = nextprops.carDetails;
        this.setState({
            cars: carDetails,
        });
    }

    onCloseModal = () => { }

    closeModel = () => { //for close model
        this.props.createModalOpen(false);
        this.props.clearCarDetails();
    }

    handleChange = (e) => {
        const { cars } = this.state;
        const { name, value } = e.target;
        this.setState({
            cars: {
                ...cars,
                [name]: value
            },
        });
    }

    carFormSubmit = (e) => { //for submit cars
        e.preventDefault();
        this.setState({ submitted: true });
        const { brand, modal, year, price, color, description } = this.state.cars;

        // stop here if form is invalid
        if (!(brand && modal && year && price)) {
            return;
        }

        this.setState({ loading: true });
        var params = { brand, modal, year, price, color, description, id: this.state.cars.id };
        
        this.props.createCars(params).then(
            response => {
                this.setState({ error: "" });
                this.closeModel();
                this.props.getUserCarListing();
                toast.success(response.message);
            },
            error => {
                this.setState({ error: error, loading: false });
                toast.error(error);
            }
        );
    }

    render() {
        const { cars, submitted, loading, error } = this.state;
        const { brand, modal, year, price, color, description } = cars;
        return (
            <React.Fragment>
                <Modal
                    className="removebbg-popup"
                    open={this.props.isCreateModalOpen}
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
                                    {this.props.isCreate ? "Create" : "Edit"} Cars
                                </h5>
                            </div>
                            <div className="modal-body body-padding--value pb-0">
                                <form name="car-form" onSubmit={this.carFormSubmit}>
                                    <div
                                        className={
                                            "form-group" +
                                            (submitted && !brand ? " has-error" : "")
                                        }
                                    >
                                        <label
                                            htmlFor="exampleInputEmail1"
                                            className="font-14 font-qregular black-txt"
                                        >
                                            Brand *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="brand"
                                            aria-describedby="emailHelp"
                                            placeholder=""
                                            name="brand"
                                            value={brand}
                                            onChange={this.handleChange}
                                        />
                                        {submitted && !brand && (
                                            <div className="text-danger">Brand is required</div>
                                        )}
                                    </div>
                                    <div
                                        className={
                                            "form-group" +
                                            (submitted && !modal ? " has-error" : "")
                                        }
                                    >
                                        <label
                                            htmlFor="exampleInputEmail1"
                                            className="font-14 font-qregular black-txt"
                                        >
                                            Modal *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="modal"
                                            aria-describedby="emailHelp"
                                            placeholder=""
                                            name="modal"
                                            value={modal}
                                            onChange={this.handleChange}
                                        />
                                        {submitted && !modal && (
                                            <div className="text-danger">Brand is required</div>
                                        )}
                                    </div>
                                    <div
                                        className={
                                            "form-group" +
                                            (submitted && !year ? " has-error" : "")
                                        }
                                    >
                                        <label
                                            htmlFor="exampleInputEmail1"
                                            className="font-14 font-qregular black-txt"
                                        >
                                            Year *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="year"
                                            aria-describedby="emailHelp"
                                            placeholder=""
                                            name="year"
                                            value={year}
                                            onChange={this.handleChange}
                                        />
                                        {submitted && !year && (
                                            <div className="text-danger">year is required</div>
                                        )}
                                    </div>
                                    <div
                                        className={
                                            "form-group" +
                                            (submitted && !price ? " has-error" : "")
                                        }
                                    >
                                        <label
                                            htmlFor="exampleInputEmail1"
                                            className="font-14 font-qregular black-txt"
                                        >
                                            Price *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="price"
                                            aria-describedby="emailHelp"
                                            placeholder=""
                                            name="price"
                                            value={price}
                                            onChange={this.handleChange}
                                        />
                                        {submitted && !price && (
                                            <div className="text-danger">price is required</div>
                                        )}
                                    </div>
                                    <div
                                        className={
                                            "form-group"
                                        }
                                    >
                                        <label
                                            htmlFor="exampleInputEmail1"
                                            className="font-14 font-qregular black-txt"
                                        >
                                            Color
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="color"
                                            aria-describedby="emailHelp"
                                            placeholder=""
                                            name="color"
                                            value={color}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div
                                        className={
                                            "form-group"
                                        }
                                    >
                                        <label
                                            htmlFor="exampleInputEmail1"
                                            className="font-14 font-qregular black-txt"
                                        >
                                            Description *
                                        </label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            id="description"
                                            aria-describedby="emailHelp"
                                            placeholder=""
                                            name="description"
                                            value={description}
                                            onChange={this.handleChange}
                                        >{description}</textarea>

                                    </div>

                                    <div className="col-md-12 text-center p-0">
                                        <button
                                            disabled={loading}
                                            type="submit"
                                            className="btn btn-primary mt-2"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
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
        isCreateModalOpen: state.headerinfo.isCreateModalOpen,
        carDetails: state.cars.carDetails,
    };
};

const mapDispatchToProps = {
    createModalOpen,
    getUserCarListing,
    createCars,
    clearCarDetails
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CarCMSComponent);