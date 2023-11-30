import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addContent,
  deleteContent,
  moveContent,
  renameContent,
} from "../../Redux/reducers/rootReducer";
import { getRole } from "../../Redux/selectors";
import { Icon } from "@iconify/react";

import "./ContextMenuFolder.css";

const ContextMenuFolder = memo(({ folder }) => {
  const role = useSelector(getRole);
  const [nameValue, setNameValue] = useState("");
  const [addData, setAddData] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(
      addContent({
        parentId: folder.id,
        content: {
          parentId: folder.id,
          id: Date.now(),
          access: role === "admin" ? ["admin"] : ["admin", "user"],
          type: addData,
          name: nameValue,
          ...(addData === "folder" ? { inside: [] } : {}),
        },
      })
    );
    setNameValue("");
  };

  const handleDelete = () => {
    dispatch(
      deleteContent({
        id: folder.id,
      })
    );
    setNameValue("");
  };

  const handleMove = () => {
    dispatch(
      moveContent({
        contentId: folder.id,
        newParentName: nameValue,
      })
    );
    setNameValue("");
  };

  const handleRename = () => {
    dispatch(
      renameContent({
        id: folder.id,
        newName: nameValue,
      })
    );
    setNameValue("");
  };

  const handleChange = (e) => {
    setNameValue(e.target.value);
  };

  const handleButtonVariant = () => {
    if (addData === "edit") {
      handleRename();
      return;
    }
    if (addData === "move") {
      handleMove();
      return;
    }
    handleAdd();
  };

  return (
    <div className="context-menu">
      <button
        onClick={() => {
          setAddData("edit");
          setNameValue(folder.name);
        }}
      >
        <Icon icon="mdi:rename" />
      </button>
      <button
        onClick={() => {
          setAddData("folder");
          setNameValue("");
        }}
      >
        <Icon icon="mdi:folder-add" />
      </button>
      <button
        onClick={() => {
          setAddData("file");
          setNameValue("");
        }}
      >
        <Icon icon="ri:file-add-fill" />
      </button>
      <button onClick={handleDelete} disabled={!folder.parentId}>
        <Icon icon="material-symbols:delete" />
      </button>
      <button
        onClick={() => {
          setAddData("move");
          setNameValue("");
        }}
        disabled={!folder.parentId}
      >
        <Icon icon="icon-park-outline:change" />
      </button>
      {addData.length !== 0 && (
        <div className="context-menu__add">
          <input value={nameValue} onChange={handleChange} />
          <button onClick={handleButtonVariant}>Go!</button>
        </div>
      )}
    </div>
  );
});

export default ContextMenuFolder;
