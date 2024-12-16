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

export const History: React.FC<Props> = ({ open, handleOpen }) => {
  const wsRef = useRef<WebSocket>();
  const [data, setData] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8081/ws");
    wsRef.current = socket;
    socket.onopen = () => {
      socket.send(JSON.stringify({ req: "getRecord", data: "record" }));
    };
    socket.onerror = (err) => {
      console.log("连接失败，", err);
    };
    socket.onmessage = async (e) => {
      const { req, data: tableData } = JSON.parse(e.data);
      // console.log(msg, "data");
      if (req === "getData") {
        setData(tableData);
      }
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
      <Drawer title="协作记录" placement="right" onClose={onClose} open={open}>
        <div style={{ display: "flex", flexDirection: "column", rowGap: 10 }}>
          {data?.map((item) => {
            const record = item.record as Record<string, any>[];
            const date = new Date(item.createtime);
            return (
              <Collapse key={item._id}>
                <Collapse.Panel
                  header={`${date.getFullYear()}/${
                    date.getMonth() + 1
                  }/${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
                  key={item.createtime}
                >
                  <Space direction="vertical">
                    {record.map((r, index) => {
                      if (index === 0) {
                        console.log(r, "-----");
                      }
                      const isString = typeof r.value === "string";
                      const { path } = r;
                      const row = path[1];
                      const col = path[2];
                      return (
                        <div key={index}>
                          {/* 用户名 */}
                          <div
                            className="record-item"
                            onClick={() => {
                              recordClick(r);
                            }}
                          >
                            Username:{r.username}
                          </div>
                          {/* 操作记录 */}
                          <div>操作记录：{r.op}</div>
                          {/* 操作值 */}
                          <div>
                            操作位置：{row}行，{col}列
                          </div>
                          <div className="value">
                            值：
                            {isString
                              ? r.value
                              : JSON.stringify(r.value, undefined, 2)}
                          </div>
                        </div>
                      );
                    })}
                  </Space>
                </Collapse.Panel>
              </Collapse>
            );
          })}
        </div>
      </Drawer>
    </div>
  );
};
