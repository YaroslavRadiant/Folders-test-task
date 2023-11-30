import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteContent,
  moveContent,
  renameContent,
} from "../../Redux/reducers/rootReducer";
import { Icon } from "@iconify/react";

const ContextMenuFile = memo(({ file }) => {
  const [nameValue, setNameValue] = useState("");
  const [addData, setAddData] = useState("");
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(
      deleteContent({
        id: file.id,
      })
    );
    setNameValue("");
  };

  const handleRename = () => {
    dispatch(
      renameContent({
        id: file.id,
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
    handleMove();
  };

  const handleMove = () => {
    dispatch(
      moveContent({
        contentId: file.id,
        newParentName: nameValue,
      })
    );
    setNameValue("");
  };

  return (
    <div className="context-menu">
      <button
        onClick={() => {
          setAddData("edit");
          setNameValue(file.name);
        }}
      >
        <Icon icon="mdi:rename" />
      </button>

      <button onClick={handleDelete}>
        <Icon icon="material-symbols:delete" />
      </button>
      <button
        onClick={() => {
          setAddData("move");
          setNameValue("");
        }}
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

export default ContextMenuFile;
