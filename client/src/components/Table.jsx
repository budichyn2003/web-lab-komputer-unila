import React from 'react';
import { motion } from 'framer-motion';

const Table = ({ columns, data, actions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-300"
              >
                {column.header}
              </th>
            ))}
            {actions && (
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">
                Aksi
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="px-4 py-8 text-center text-gray-400"
              >
                Tidak ada data
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: rowIndex * 0.05 }}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-4 py-3 text-sm text-gray-300">
                    {column.render ? column.render(row) : row[column.accessor]}
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      {actions(row)}
                    </div>
                  </td>
                )}
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
