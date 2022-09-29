import React, { useState, useRef, useEffect } from "react";

export function LuckyFlower(props) {
  const [open, setOpen] = useState(!false);
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });
  });

  return (
    <div ref={ref} style={{ cursor: "pointer" }} onClick={() => setOpen(true)}>
      <button
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "#296bef",
          marginRight: "8px"
        }}
        onClick={() => setOpen(true)}
      >
        <span role="img" aria-label="flower">
          🌸
        </span>{" "}
        花落谁家
      </button>
      <dialog
        open={open}
        style={{
          border: "none",
          background: "#000",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          width: "100%",
          height: "100%"
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <h4 style={{ margin: "0 0 8px 0", color: "#fff" }}>输入/输出格式</h4>
          <button onClick={() => setOpen(false)}>关闭</button>
        </header>
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        ></section>
      </dialog>
    </div>
  );
}

export default LuckyFlower;
