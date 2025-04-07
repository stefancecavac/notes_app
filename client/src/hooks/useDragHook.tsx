import { useEffect, useState } from "react";
import { noteData } from "../dataTypes";
import { useDebounce } from "use-debounce";
import { useUpdateModuleOrder } from "../api/ModuleApi";

export const useDragHook = ({ singleNote }: { singleNote: noteData }) => {
  const [moduleList, setModuleList] = useState(singleNote?.modules || []);

  return { setModuleList, moduleList };
};
