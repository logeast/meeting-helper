import React, { useState, useRef, useEffect, memo } from "react";
import usersArr from "./datas";
import hashPosition from "./hashPosition";

function shuffle(data) {
  const len = data.length;
  for (let i = 0; i < len; i++) {
    const index = Math.floor(Math.random() * (i + 1));
    [data[i], data[index]] = [data[index], data[i]];
  }
  return data[0];
}

export function LuckyFlower(props) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const data = usersArr.slice();
  const [lucky, setLucky] = useState({});

  const TOTAL = Math.floor(Math.random() * 10) + 16;
  const DELAY = 150;
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(null);
  const updater = (count) => count - 1;
  if (count === 0) {
    timer && clearInterval(timer);
    timer && setTimer(null);
  }
  const onFindLucky = () => {
    const t = setInterval(() => {
      setCount(updater);
      setLucky(shuffle(data));
    }, DELAY);
    setCount(TOTAL);
    setTimer(t);
  };

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });
  }, []);

  return (
    <div>
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
        ref={ref}
        open={open}
        style={{
          border: "none",
          background: "#212534",
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
          <h3 style={{ margin: "16px", color: "#fff" }}>
            <span role="img" aria-label="flower">
              🌸
            </span>{" "}
            花落谁家
          </h3>

          <button onClick={onFindLucky}>{count === 0 ? "开始" : count}</button>
          <button onClick={() => setOpen(false)}>x</button>
        </header>
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "48px",
            // outline: "1px solid red",
            height: "80vh"
          }}
        >
          <div
            style={{
              // width: "80%",
              // outline: "1px solid red",
              display: "grid",
              alignItems: "center",
              justifyContent: "center",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 48
            }}
          >
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`hash-item lucky-avatar${
                    lucky.user === item.user ? " selcted" : ""
                  }`}
                >
                  <img
                    src={`https://r.hrc.oa.com/photo/500/${item.user}.png`}
                    alt={item.nickname}
                    title={item.nickname}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "100%"
                    }}
                  />
                </div>
              );
            })}
          </div>
        </section>
      </dialog>
    </div>
  );
}

export default memo(LuckyFlower);
