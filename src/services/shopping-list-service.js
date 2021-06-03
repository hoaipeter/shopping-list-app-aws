import http from './http-service';

const getAll = () => {
  return http.get('/get');
};

const get = (id) => {
  return http.get(`/get/${id}`);
};

const create = (data) => {
  return http.post('/create', data);
};

const update = (id, data) => {
  return http.put(`/update/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/delete/${id}`);
};

const removeAll = () => {
  return http.delete(`/delete`);
};

const findByTitle = (title) => {
  return http.get(`/get?title=${title}`);
};

const ShoppingListService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default ShoppingListService;
