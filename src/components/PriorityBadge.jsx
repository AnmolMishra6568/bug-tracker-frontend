export default function PriorityBadge({ p }){
  return <span className={"badge " + (p||"medium")}>{(p||"medium").toUpperCase()}</span>;
}
