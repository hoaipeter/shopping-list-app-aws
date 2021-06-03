import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ShoppingListService } from '../../services';
import { useTable } from 'react-table';

const ShoppingList = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const itemsRef = useRef();

  itemsRef.current = items;

  useEffect(() => {
    retrieveItems();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveItems = async () => {
    setIsLoading(true);
    try {
      const response = await ShoppingListService.getAll();
      setItems(response.data);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const refreshList = () => {
    retrieveItems();
  };

  const removeAllItems = () => {
    ShoppingListService.removeAll()
      .then((response) => {
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    ShoppingListService.findByTitle(searchTitle)
      .then((response) => {
        setItems(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openItem = (rowIndex) => {
    const id = itemsRef.current[rowIndex].id;

    props.history.push('/shopping-list/' + id);
  };

  const deleteItem = (rowIndex) => {
    const id = itemsRef.current[rowIndex].id;

    ShoppingListService.remove(id)
      .then((response) => {
        props.history.push('/shopping-list');

        let newItems = [...itemsRef.current];
        newItems.splice(rowIndex, 1);

        setItems(newItems);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title'
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Status',
        accessor: 'finished',
        Cell: (props) => {
          return props.value ? 'Finished' : 'Pending';
        }
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <span onClick={() => openItem(rowIdx)}>
                <i className="far fa-edit action mr-2" />
              </span>

              <span onClick={() => deleteItem(rowIdx)}>
                <i className="fas fa-trash action" />
              </span>
            </div>
          );
        }
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: items
  });

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div style={{ marginLeft: 10 }} className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={findByTitle}>
              Search
            </button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div style={{ textAlign: 'center', marginTop: 53 }}>
          <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#212529">
            <g fill="none" fillRule="evenodd">
              <g transform="translate(1 1)" strokeWidth="2">
                <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            </g>
          </svg>
        </div>
      ) : (
        <>
          {items.length > 0 ? (
            <>
              <div className="col-md-10 list">
                <table className="table table-striped table-bordered" {...getTableProps()}>
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="col-md-8">
                <button className="btn btn-sm btn-danger" onClick={removeAllItems} disabled={items.length <= 0}>
                  Remove All
                </button>
              </div>
            </>
          ) : (
            <p>The list is empty. Would you like to add some items into the list?</p>
          )}
        </>
      )}
    </div>
  );
};

export default ShoppingList;
