import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tree: {
    1: {
      parentId: null,
      id: 1,
      access: ["admin", "user"],
      type: "folder",
      name: "main",
      inside: [2, 3, 8],
    },
    2: {
      parentId: 1,
      id: 2,
      access: ["admin"],
      type: "folder",
      name: "files",
      inside: [9],
    },
    3: {
      parentId: 1,
      id: 3,
      access: ["admin", "user"],
      type: "folder",
      name: "music",
      inside: [6, 7],
    },
    6: {
      parentId: 3,
      id: 6,
      type: "file",
      name: "Now-you`r-gone.mp3",
      access: ["admin"],
    },
    7: {
      parentId: 3,
      id: 7,
      type: "file",
      name: "Rize.mp3",
      access: ["admin", "user"],
    },
    8: {
      parentId: 1,
      id: 8,
      access: ["admin", "user"],
      type: "folder",
      name: "photo",
      inside: [],
    },
    9: {
      parentId: 1,
      id: 9,
      type: "file",
      name: "package.json",
      access: ["admin"],
    },
  },
  role: "user",
  search: "",
};

const rootReducerSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    changeRole: (state, action) => {
      state.role = action.payload;
    },
    changeSearch: (state, action) => {
      state.search = action.payload;
    },
    addContent: (state, action) => {
      const { content, parentId } = action.payload;
      state.tree[content.id] = content;
      state.tree[parentId].inside.push(content.id);
    },
    renameContent: (state, action) => {
      const { id, newName } = action.payload;
      state.tree[id].name = newName;
    },
    deleteContent: (state, action) => {
      const { id } = action.payload;

      const deleteElementAndChildren = (elementId) => {
        const element = state.tree[elementId];
        if (element) {
          const parent = state.tree[element.parentId];
          if (parent) {
            parent.inside = parent.inside.filter((item) => item !== elementId);
          }
          delete state.tree[elementId];
          if (element.type !== "file") {
            element.inside.forEach((childId) => {
              deleteElementAndChildren(childId);
            });
          }
        }
      };

      deleteElementAndChildren(id);
    },
    moveContent: (state, action) => {
      const { contentId, newParentName } = action.payload;

      const oldParentId = state.tree[contentId].parentId;
      const newParentId = Object.values(state.tree).find(
        (element) => element.name === newParentName
      )?.id;

      if (oldParentId !== undefined && newParentId !== undefined) {
        state.tree[oldParentId].inside = state.tree[oldParentId].inside.filter(
          (item) => item !== contentId
        );

        state.tree[newParentId].inside.push(contentId);

        state.tree[contentId].parentId = newParentId;
      }
    },
  },
});

export const {
  changeRole,
  changeSearch,
  addContent,
  renameContent,
  deleteContent,
  moveContent,
} = rootReducerSlice.actions;
export default rootReducerSlice.reducer;
