import React, { useState } from 'react';
import { ShoppingListService } from '../../services';

const AddShoppingItem = () => {
  const initialItemState = {
    id: null,
    title: '',
    description: '',
    finished: false
  };
  const [item, setItem] = useState(initialItemState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const saveItem = () => {
    const data = {
      title: item.title,
      description: item.description
    };

    ShoppingListService.create(data)
      .then((response) => {
        setItem({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          finished: response.data.finished ? response.data.finished : false
        });
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newItem = () => {
    setItem(initialItemState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newItem}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter item name"
              required={true}
              value={item.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Enter item description"
              required={true}
              value={item.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <div className="button-container">
            <button
              onClick={saveItem}
              className="btn btn-success custom-button"
              disabled={item.title === '' || item.description === ''}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddShoppingItem;
