// export function Toolbar({
//   isSaving,
//   lastSavedAt,
//   error,
// }: {
//   isSaving: boolean;
//   lastSavedAt: Date | null;
//   error: string | null;
// }) {
//   return (
//     <div className="flex items-center justify-between gap-2 border-b p-2 bg-white/90 ">
//       <span className="text-sm font-medium">Canvas</span>
//       <div className="text-xs text-gray-600">
//         {error ? (
//           <span className="text-red-600">{error}</span>
//         ) : isSaving ? (
//           "Saving..."
//         ) : lastSavedAt ? (
//           `Saved ${lastSavedAt.toLocaleTimeString()}`
//         ) : (
//           "Not saved yet"
//         )}
//       </div>
//     </div>
//   );
// }
