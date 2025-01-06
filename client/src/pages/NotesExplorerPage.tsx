import { addEdge, Background, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import { useGraphNotes } from "../api/NoteApi";
import "@xyflow/react/dist/style.css";
import { UseAuthContext } from "../context/AuthContext";
import { useCallback, useEffect, useMemo } from "react";
import CustomNode from "../util/CustomNode";
import CustomEdge from "../util/CustomEdge";

const NotesExplorerPage = () => {
  const { user } = UseAuthContext();
  const { graphNotes } = useGraphNotes();

  const nodes = useMemo(() => {
    if (!graphNotes) return [];
    return graphNotes.map((note, index) => {
      const savedPosition = JSON.parse(localStorage.getItem(`node-position-${note.id}`) || "{}");
      return {
        id: note.id.toString(),
        position: savedPosition || { x: index * 100, y: 100 },
        data: { label: note.title, icon: note.icon, id: note.id, color: note.color },
        type: "custom",
      };
    });
  }, [graphNotes]);

  const edges = useMemo(() => {
    if (!graphNotes) return [];
    return graphNotes
      .filter((note) => note.parentNoteId)
      .map((note) => ({
        id: `e${note.id}-${note.parentNoteId}`,
        source: note.id,
        target: note.parentNoteId,
        type: "custom",
      }));
  }, [graphNotes]);

  const nodeTypes = { custom: CustomNode };
  const edgeTypes = {
    custom: CustomEdge,
  };

  const [currentNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [currentEdges, setEdges, onEdgesChange] = useEdgesState(edges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onNodePositionChange = useCallback((id: string, position: string) => {
    localStorage.setItem(`node-position-${id}`, JSON.stringify(position));
  }, []);

  useEffect(() => {
    if (graphNotes) {
      setNodes(nodes);
      setEdges(edges);
    }
  }, [graphNotes, nodes, edges, setNodes, setEdges]);

  return (
    <div className="flex flex-col h-full w-full overflow-auto  ">
      <h2 className="text-2xl text-black font-bold">
        Welcome Back, <span className="text-gray-500 font-normal text-xl">{user?.email}</span>
      </h2>
      <div style={{ width: "100%", height: "100vh" }}>
        <ReactFlow
          nodes={currentNodes}
          edges={currentEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeDragStop={(event, node) => onNodePositionChange(node.id, node.position)}
        >
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default NotesExplorerPage;
