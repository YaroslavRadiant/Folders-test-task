import { memo, useState } from "react";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { getChildren, getRole } from "../../Redux/selectors";
import ContextMenuFolder from "../ContextMenuFolder/ContextMenuFolder";
import Item from "../Item/Item";

import "./Folder.css";

const Folder = memo(({ folder, parentID }) => {
  const role = useSelector(getRole);
  const children = useSelector((state) =>
    getChildren(state, { folderId: folder.id })
  );

  const [contextMenuView, setContextMenuView] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const accessToFolder = folder.access.includes(role);

  const handeleIcon = () => {
    if (children.length === 0) {
      return;
    }
    if (!accessToFolder) {
      return <Icon icon="material-symbols:lock-sharp" />;
    }
    if (collapsed) {
      return <Icon icon="ic:baseline-minus" />;
    }
    return <Icon icon="ic:baseline-plus" />;
  };

  const folderMargin = folder.inside.length === 0 ? "25px" : "0px";

  return (
    <div>
      <div className="folder__container" style={{ marginLeft: folderMargin }}>
        {folder.inside.length > 0 && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            disabled={!accessToFolder || folder.inside.length === 0}
            className="folder__icon-button"
          >
            {handeleIcon()}
          </button>
        )}
        <Icon icon="material-symbols:folder" />
        <strong
          className="folder__container_name"
          onClick={() => setContextMenuView(!contextMenuView)}
        >
          {folder.name}
        </strong>
        {contextMenuView && accessToFolder && (
          <ContextMenuFolder folder={folder} />
        )}
      </div>

      <div className="folder__container__wrapper">
        {collapsed &&
          accessToFolder &&
          children.map((item, index) => <Item key={index} item={item} />)}
      </div>
    </div>
  );
});

export default Folder;
