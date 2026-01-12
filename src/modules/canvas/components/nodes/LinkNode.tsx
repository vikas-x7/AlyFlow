import { BaseNode } from "./BaseNode";
import type { NodeProps } from "reactflow";

export function LinkNode({
  data,
}: NodeProps<{ url?: string; label?: string }>) {
  return (
    <BaseNode title="Link" titleColor="#38bdf8" indicatorColor="#0284c7">
      {data?.url ? (
        <a
          className="text-blue-600 underline break-all"
          href={data.url}
          target="_blank"
          rel="noreferrer"
        >
          {data.label?.trim() ? data.label : data.url}
        </a>
      ) : (
        <p className="text-gray-600 text-sm">No link URL set</p>
      )}
    </BaseNode>
  );
}

// import { BaseNode } from "./BaseNode";
// import type { NodeProps } from "reactflow";

// export function LinkNode({
//   data,
// }: NodeProps<{ url?: string; label?: string }>) {
//   return (
//     <BaseNode title="Link" titleColor="#38bdf8" indicatorColor="#0284c7">
//       {data?.url ? (

//           className="text-xs text-[#38bdf8] underline break-all hover:text-[#7dd3fc] transition-colors"
//           href={data.url}
//           target="_blank"
//           rel="noreferrer"
//         >
//           {data.label?.trim() ? data.label : data.url}
//         </a>
//       ) : (
//         <p className="text-xs text-[#6b7280]">No link URL set</p>
//       )}
//     </BaseNode>
//   );
// }
