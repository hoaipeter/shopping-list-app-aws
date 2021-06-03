import React, { useState, useEffect } from 'react';
import { ShoppingListService } from '../../services';
import './shopping-item.css';

const ShoppingItem = (props) => {
  const [currentItem, setCurrentItem] = useState({
    id: null,
    title: '',
    description: '',
    finished: false
  });
  const [message, setMessage] = useState('');

  const getItem = (id) => {
    ShoppingListService.get(id)
      .then((response) => {
        setCurrentItem(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getItem(props.match.params.id);
  }, [props.match.params.id]);

  const isDisabled = currentItem.title === '' || currentItem.description === '';

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

  const updateFinished = (status) => {
    const data = {
      id: currentItem.id,
      finished: status
    };

    ShoppingListService.update(currentItem.id, data)
      .then((response) => {
        setCurrentItem({ ...currentItem, finished: status });
        setMessage('The status was updated successfully!');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateItem = () => {
    ShoppingListService.update(currentItem.id, currentItem)
      .then((response) => {
        setMessage('The item was updated successfully!');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteItem = () => {
    ShoppingListService.remove(currentItem.id)
      .then((response) => {
        props.history.push('/');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentItem ? (
        <div className="edit-form">
          <h4>Item</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentItem.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentItem.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>&nbsp;
              </label>
              {currentItem.finished ? 'Done' : 'Pending'}
            </div>
          </form>

          <div className="button-container">
            {currentItem.finished ? (
              <button
                className="badge-primary mr-2 custom-button"
                onClick={() => updateFinished(false)}
                disabled={isDisabled}
              >
                Unfinished
              </button>
            ) : (
              <button
                className="badge-primary mr-2 custom-button"
                onClick={() => updateFinished(true)}
                disabled={isDisabled}
              >
                Finish
              </button>
            )}

            <button className="badge-danger mr-2 custom-button" onClick={deleteItem}>
              Delete
            </button>

            <button type="submit" className="badge-success custom-button" onClick={updateItem} disabled={isDisabled}>
              Update
            </button>
          </div>

          <p style={{ marginTop: 15 }}>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on an item...</p>
        </div>
      )}
    </div>
  );
};

export default ShoppingItem;
