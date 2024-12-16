// import { Context, getSheetIndex, locale } from "@fortune-sheet/core";
// import React, { useCallback, useContext, useEffect, useState } from "react";
import React, { useState, useEffect, useRef } from "react";
import { Card, Collapse, Drawer, Space } from "antd";
// import WorkbookContext from "../../context";
// import ColorPicker from "../Toolbar/ColorPicker";
import "./index.css";
// import { getRecord } from "../../../../../backend-demo/record.js";
// import "antd/dist/antd.css";
// const getRecord = require("../../../../../backend-demo/record.js");

type Props = {
  open: boolean;
  handleOpen: (val: any) => void;
};

export const IPv6: React.FC<Props> = ({ open, handleOpen }) => {
  const wsRef = useRef<WebSocket>();
  const [data, setData] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8081/ws");
    wsRef.current = socket;
    socket.onopen = () => {
      socket.send(JSON.stringify({ req: "getData" }));
    };
    socket.onerror = (err) => {
      console.log("连接失败，", err);
    };
    socket.onmessage = async (e) => {
      const { req, data: tableData } = JSON.parse(e.data);
      // if (req === "getData") {
      //   setData(tableData);
      // }
    };
  }, []);
  // const { context, setContext } = useContext(WorkbookContext);
  // const { toolbar, sheetconfig, button } = locale(context);
  // const [inputColor, setInputColor] = useState<string>("#000000");
  // const [selectColor, setSelectColor] = useState<undefined | string>(
  //   context.luckysheetfile[
  //     getSheetIndex(context, context.currentSheetId) as number
  //   ].color
  // );

  // 确定按钮
  // const certainBtn = useCallback(() => {
  //   setSelectColor(inputColor);
  // }, [inputColor]);

  // 把用户选择的颜色记录在ctx中
  // useEffect(() => {
  //   setContext((ctx: Context) => {
  //     if (ctx.allowEdit === false) return;
  //     const index = getSheetIndex(ctx, ctx.currentSheetId) as number;
  //     ctx.luckysheetfile[index].color = selectColor;
  //   });
  // }, [selectColor, setContext]);

  // const [open, setOpen] = useState(true);

  // const showDrawer = () => {
  //   setOpen(true);
  // };

  const onClose = () => {
    handleOpen(false);
  };

  const recordClick = (r: Record<string, any>) => {
    console.log(r, "111111111");
  };

  return (
    <div>
      <Drawer title="IPv6" placement="right" onClose={onClose} open={open}>
        <div style={{ display: "flex", flexDirection: "column", rowGap: 10 }}>
          {data?.map((item) => {
            return <Collapse key={item._id}>123</Collapse>;
          })}
        </div>
      </Drawer>
    </div>
  );
};
