"use client"
import { motion } from "framer-motion";
interface TableProps {
  dataset: { header: string; data: string[] }[];
  unique_id?: number;
  caption?: string;
}

export const VerticalTable = ({ dataset, caption, unique_id }: TableProps) => {
  if (dataset.length === 0) return null;
  return (
    <table className="font-exo text-base border rounded-md table-auto overflow-hidden text-white">
      {caption && (
        <motion.caption className="bg-osuhub-dark-ice-blue p-2 text-start">
          {caption}
        </motion.caption>
      )}
      <tbody>

        {dataset.map((data) => {
          return (
            <tr
              className="border border-slate-800 even:bg-osuhub-dark-ice-grey odd:bg-osuhub-dark-ice-grey p-1 transition-colors hover:bg-osuhub-gray"
              key={unique_id + data.header}
            >
              <th className="first:border-r border-slate-800  p-2 text-start  ">{data.header}</th>
              {data.data.map((r) => (
                <td key={r == "??" ? crypto.randomUUID() : unique_id + r} className="grey  p-3 " >
                  {r}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export const HorizontalTable = ({ dataset, caption, unique_id }: TableProps) => {


  return < table className="font-exo text-xl border rounded-md table-auto overflow-hidden text-white" >
    {caption && (
      <motion.caption className="bg-osuhub-dark-ice-blue p-2 text-start">
        {caption}
      </motion.caption>
    )
    }
    <tbody>

      {dataset.map((data) => {
        return (
          <tr
            className="border border-slate-800 even:bg-osuhub-dark-ice-grey odd:bg-osuhub-dark-ice-grey p-2 transition-colors hover:bg-osuhub-gray"
            key={unique_id + data.header}
          >
            <th className="first:border-r border-slate-800  p-2 text-start  ">{data.header}</th>
            {data.data.map((r) => (
              <td key={r == "??" ? crypto.randomUUID() : unique_id + r} className="grey  p-3 " >
                {r}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </table >

}



export default VerticalTable;
