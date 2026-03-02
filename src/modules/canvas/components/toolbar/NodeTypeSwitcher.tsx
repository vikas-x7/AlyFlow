export function NodeTypeSwitcher({
  onAdd,
}: {
  onAdd: (type: "text" | "image" | "video" | "link" | "file" | "code") => void;
}) {
  return (
    <div className="flex gap-2">
      <button type="button" className="text-xs border rounded px-2 py-1" onClick={() => onAdd("text")}>
        Text
      </button>
      <button type="button" className="text-xs border rounded px-2 py-1" onClick={() => onAdd("image")}>
        Image
      </button>
      <button type="button" className="text-xs border rounded px-2 py-1" onClick={() => onAdd("video")}>
        Video
      </button>
      <button type="button" className="text-xs border rounded px-2 py-1" onClick={() => onAdd("link")}>
        Link
      </button>
      <button type="button" className="text-xs border rounded px-2 py-1" onClick={() => onAdd("file")}>
        File
      </button>
      <button type="button" className="text-xs border rounded px-2 py-1" onClick={() => onAdd("code")}>
        Code
      </button>
    </div>
  );
}

