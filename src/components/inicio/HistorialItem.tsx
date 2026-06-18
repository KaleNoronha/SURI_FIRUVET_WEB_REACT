interface HistorialItemProps {
  titulo: string;
  hora: string;
  fecha: string;
}

function HistorialItem({ titulo, hora, fecha }: HistorialItemProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <p className="text-sm text-gray-700">{titulo}</p>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-800">{hora}</p>
        <p className="text-xs text-gray-500">{fecha}</p>
      </div>
    </div>
  );
}

export default HistorialItem;
