import { useState } from "react";
import { noteData } from "../dataTypes";

export const useDragHook = ({ singleNote }: { singleNote: noteData }) => {
  const [moduleList, setModuleList] = useState(singleNote?.modules || []);

  return { setModuleList, moduleList };
};
