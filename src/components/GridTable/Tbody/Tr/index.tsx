import { GridTable } from "../../core";
import { ICellParams, IRowState } from "../../types";

export const Tr = ({
  gridTable,
  rowState,
}: {
  gridTable: GridTable;
  rowState: IRowState;
}) => {
  return (
    <tr style={{ width: "100%", display: "flex", justifyContent: "stretch" }}>
      {gridTable.columnsDefinition
        .filter((col) => col.show)
        .map((column) => {
          const cellState = rowState.state.find((cellState) => {
            return cellState.key === column.key;
          });

          if (cellState) {
            const cellParams: ICellParams = {
              fullState: gridTable.fullState,
              value: cellState.value,
              values: cellState.values,
              setValue: cellState.setValue,
              setValues: cellState.setValues,
              rowState: cellState.rowState,
            } as ICellParams;

            return (
              <td style={{ minWidth: column.width }} key={cellState.key}>
                {cellState.render
                  ? cellState.render(cellParams)
                  : cellState.value}
              </td>
            );
          } else {
            return (
              <td
                style={{
                  minWidth: column.width,
                  display: "flex",
                  alignContent: "center",
                }}
                key={column.key}
              >
                {column.value}
              </td>
            );
          }
        })}
    </tr>
  );
};
