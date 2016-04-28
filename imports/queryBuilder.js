export default queryBuilder;

function queryBuilder(searchText) {
  return searchText ? {title: {$regex: searchText, $options: 'i'}} : {};
}
