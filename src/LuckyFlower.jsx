import React, { useState, useRef, useEffect, memo } from "react";
import usersArr from "./datas";

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

  const TOTAL = Math.floor(Math.random() * 10) + 20;
  const DELAY = 150;
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(null);
  const updater = (count) => (count <= 0 ? 0 : count - 1);
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
    if (window.location.hash === "#flower") {
      setOpen(true);
    }
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        window.location.hash = "";
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
        onClick={() => {
          setOpen(true);
          window.location.hash = "#flower";
        }}
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

          <button
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#fff",
              fontSize: "2em",
              transform: "rotate(45deg)",
              marginRight: "8px"
            }}
            onClick={() => {
              setOpen(false);
              window.location.hash = "";
            }}
          >
            +
          </button>
        </header>
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "48px",
            // outline: "1px solid red",
            height: "80vh"
          }}
        >
          <button className="start-button" onClick={onFindLucky}>
            {count === 0 ? "开始" : count}
          </button>

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
                    src={`https://passport.woa.com/login-avatar?user=${item.user}`}
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
          <div style={{ color: "#fff", fontSize: "3em", height: "1em" }}>
            <span role="img" aria-label="flower">
              🌸
            </span>{" "}
            {lucky.user && `${lucky.nickname} (${lucky.user})`}
          </div>
        </section>
      </dialog>
    </div>
  );
}

export default memo(LuckyFlower);
