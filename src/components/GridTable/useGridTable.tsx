import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { GridTable, ICoreData } from "./core";
import { IDefinitions, IFullState, IRowsData } from "./types";

export const useGridTable = (props: {
  data: IRowsData;
  definitions: IDefinitions;
}) => {
  const definitions = useMemo(() => {
    const newColumnsDefinition = props.definitions.columnsDefinition.map(
      (def) => {
        const newDef = { ...def };
        const show = (newDef as object).hasOwnProperty("show")
          ? newDef.show
          : true;
        newDef.sorted = false;
        newDef.filter = true;
        newDef.show = show;
        newDef.columnEvents = {};
        newDef.events = {};
        newDef.cellHeadEvents = {};
        newDef.render = newDef.render || (({ value }) => <>{value}</>);
        return newDef;
      }
    );
    return {
      ...props.definitions,
      rowsDefinition: {
        idKey: props.definitions.rowsDefinition.idKey,
        rowHeight: "50px",
        rowEvents: {},
        rowRender: ({ children }: { children: ReactNode }) => {
          return <span>{children}</span>;
        },

        rowHeadHeight: "50px",
        rowHeadEvents: {},
        rowHeadRender: ({ children }: { children: ReactNode }) => {
          return <span>{children}</span>;
        },
      },
      columnsDefinition: newColumnsDefinition,
    };
  }, []);

  const [state, setState] = useState<IFullState | null>(null);
  const columnsDefinition = useMemo(() => definitions.columnsDefinition, []);

  const callbackSubscriber = (coreData: ICoreData) => {
    setState(coreData.fullState);
  };

  const gridTable = useMemo(() => {
    const gridTable = new GridTable(
      props.data,
      definitions,
      callbackSubscriber
    );
    return gridTable;
  }, [props.data]);

  useEffect(() => {
    const unsubscribe = gridTable.subscribe(callbackSubscriber);
    return unsubscribe;
  }, []);

  return {
    columnsDefinition,
    state,
    gridTable,
  };
};
