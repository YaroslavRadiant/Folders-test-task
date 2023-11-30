import { memo } from "react";
import File from "../File/File";
import Folder from "../Folder/Folder";

const Item = memo(({ item }) => {
  if (item.type === "file") {
    return <File item={item} />;
  }
  return <Folder folder={item} />;
});

export default Item;
