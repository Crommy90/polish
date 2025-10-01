interface TableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
  className?: string;
}

// Helper function equivalent to cn/clsx for combining Tailwind classes
const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(" ");
};

export function Table({ headers, rows, className }: TableProps) {
  return (
    <div
      className={cn("w-full overflow-x-auto rounded-lg shadow-md", className)}
    >
      <table className="min-w-max divide-y divide-gray-200 dark:divide-gray-700 w-full">
        <thead className="bg-red-600 text-white dark:bg-red-800">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white text-gray-900 dark:divide-gray-700 dark:bg-gray-900 dark:text-gray-100">
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={
                rowIndex % 2 === 0
                  ? "bg-white dark:bg-gray-800"
                  : "bg-red-50 dark:bg-gray-900"
              }
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="whitespace-nowrap px-4 py-3 text-sm"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
