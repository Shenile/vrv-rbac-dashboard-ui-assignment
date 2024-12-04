import React from "react";

export const Table = ({ headers, data, renderRow }) => {
  return (
    <div className="rounded-lg">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="border-b border-gray-300 dark:border-gray-600 py-2 pb-4 font-semibold text-left text-gray-900 dark:text-white"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody >{data.map((row, index) => renderRow(row, index))}</tbody>
      </table>
    </div>
  );
};
