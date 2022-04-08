import { GridTable as ClassGridTable } from "./core";
import { Thead } from "./Thead";
import { Tbody } from "./Tbody";
import classes from "./style.module.css";
export * from "./useGridTable";

export const GridTable = ({
  gridTable,
}: {
  columnsDefinition: ClassGridTable["columnsDefinition"];
  gridTable: ClassGridTable;
  state: ClassGridTable["fullState"];
}) => {
  return (
    <table className={classes.table}>
      <Thead gridTable={gridTable} />
      <Tbody gridTable={gridTable} />
    </table>
  );
};
