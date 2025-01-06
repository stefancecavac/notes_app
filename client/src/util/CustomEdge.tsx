import "@xyflow/react/dist/style.css";

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}) => {
  const stepHeight = -10;
  const stepWidth = 0;

  const path = `M${sourceX},${sourceY} 
                L${sourceX + stepWidth},${sourceY} 
                L${sourceX + stepWidth},${targetY - stepHeight}
                L${targetX},${targetY - stepHeight} 
                L${targetX},${targetY}`;

  return <path id={id} className="stroke-neutral-200" style={{ strokeWidth: 1.5, fill: "none", strokeLinecap: "round" }} d={path} />;
};

export default CustomEdge;
