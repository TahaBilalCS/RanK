import React from "react";
import { connect } from "react-redux";
import { createList } from "../../actions";
import ListingsForm from "./ListingsForm";

class ListingCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createList(formValues);
  };
  render() {
    return (
      <div>
        <h3>Create a Listing</h3>
        <ListingsForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createList })(ListingCreate);
