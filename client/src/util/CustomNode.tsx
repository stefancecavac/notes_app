import { Handle, Position } from "@xyflow/react";
import { noteData } from "../dataTypes";
import { Link } from "react-router-dom";

const CustomNode = ({ data }: { data: noteData }) => {
  return (
    <Link to={`/notes/${data.id}/${encodeURIComponent(data.title)}`}>
      <div className="hover:scale-110 transition-all shadow-sm">
        <Handle style={{ opacity: 0 }} type="source" position={Position.Top} id="source" />

        <div
          style={{
            background: `
        linear-gradient(to left bottom, transparent 50%, rgba(0, 0, 0, 0.1) 0) no-repeat 100% 0 / 1em 1em,
        linear-gradient(-135deg, transparent 0.7em, ${data.color || "#f5f5f5"} 0)
        
      `,
          }}
          className="flex items-center gap-2 p-2 rounded-tl-md pr-6"
        >
          <p
            dangerouslySetInnerHTML={{
              __html: data.icon
                ? data.icon
                : `<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5  "
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10 9H8" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
          </svg>`,
            }}
            className={`${
              data.color ? "fill-neutral-100 text-neutral-100" : "fill-neutral-400 text-neutral-400"
            }   rounded-md bg-neutral-100/20 font-medium size-5`}
          ></p>

          <p className={`${data.color ? "text-neutral-100" : "text-neutral-500"} font-medium text-xs`}>{data.label}</p>
        </div>
        <div className="bg-neutral-100 border border-t-0 rounded-b-md ">
          <p className="text-neutral-400 text-xs p-1">15.6.2056</p>
        </div>
        <Handle style={{ opacity: 0 }} type="target" position={Position.Bottom} id="target1" />
      </div>
    </Link>
  );
};

export default CustomNode;
