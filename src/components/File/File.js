import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { getRole } from "../../Redux/selectors";
import ContextMenuFile from "../ContextMenuFile/ContextMenuFile";
import { Icon } from "@iconify/react";

import "./File.css";

const File = memo(({ item }) => {
  const [contextMenuView, setContextMenuView] = useState(false);
  const role = useSelector(getRole);
  const accessToFolder = item.access.includes(role);
  return (
    <div className="file">
      {accessToFolder ? (
        <Icon icon="material-symbols:lock-open-sharp" />
      ) : (
        <Icon icon="material-symbols:lock-sharp" />
      )}

      <Icon icon="mdi:file" />
      <span
        className="file__name"
        onClick={() => setContextMenuView(!contextMenuView)}
      >
        {item.name}
      </span>
      {contextMenuView && accessToFolder && <ContextMenuFile file={item} />}
    </div>
  );
});

export default File;
