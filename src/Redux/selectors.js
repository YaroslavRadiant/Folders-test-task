import { createSelector } from "reselect";

const getRole = (state) => state.role;
const getTree = (state) => state.tree;
const getSearchValue = (state) => state.search;
const getFolderInside = (state, props) => state.tree[props.folderId].inside;

const getData = createSelector([getTree, getSearchValue], (tree, search) => {
  if (search.length === 0) {
    return tree[1];
  }

  const itemsWithQwe = Object.values(tree).filter((el) => {
    return el.name.toLowerCase().includes(search.toLowerCase());
  });

  return itemsWithQwe;
});

const getChildren = createSelector([getTree, getFolderInside], (tree, inside) =>
  inside.map((el) => tree[el])
);

export { getData, getChildren, getRole };
