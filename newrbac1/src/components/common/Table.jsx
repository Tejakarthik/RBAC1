import React from 'react';

const Table = ({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  actions = true 
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column, index) => (
              <th 
                key={index} 
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider 
                  md:table-cell hidden"
              >
                {column.header}
              </th>
            ))}
            {actions && (
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider 
                md:table-cell hidden">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className="flex flex-col md:table-row border-b md:hover:bg-gray-50"
            >
              {columns.map((column, colIndex) => (
                <React.Fragment key={colIndex}>
                  <td 
                    className="md:table-cell block px-4 py-2 
                      before:content-[attr(data-label)] before:font-bold 
                      before:mr-3 before:md:hidden 
                      text-sm text-gray-500 md:w-auto"
                    data-label={column.header}
                  >
                    {column.render 
                      ? column.render(row[column.accessor], row) 
                      : row[column.accessor]}
                  </td>
                </React.Fragment>
              ))}
              {actions && (
                <td 
                  className="md:table-cell block px-4 py-2 
                    before:content-['Actions'] before:font-bold 
                    before:mr-3 before:md:hidden 
                    text-sm font-medium"
                >
                  <div className="flex space-x-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="text-indigo-600 hover:text-indigo-900 md:px-2"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="text-red-600 hover:text-red-900 md:px-2"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;