import { useState } from "react";
import { addTag, splitStr, formatArr, categoreLinks } from "./utils";

export default function App() {
  const [value, setValue] = useState(localStorage.getItem("value") || "");

  const [name, setName] = useState(localStorage.getItem("name") || "chao");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = (e) => {
    localStorage.setItem("value", e.target.value);
  };

  return (
    <div>
      <h1>周会纪要助手</h1>
      <textarea
        placeholder="请粘贴你的会议纪要"
        style={{ width: "100%", height: 240, marginBottom: 8 }}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <section style={{ display: "flex", alignItems: "center" }}>
        请选择姓名：
        <select
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            localStorage.setItem("name", e.target.value);
          }}
        >
          <option value="chao">chao</option>
          <option value="chih">chih</option>
          <option value="dove">dove</option>
          <option value="haiying">haiying</option>
          <option value="lacq">lacq</option>
          <option value="cc">cc</option>
        </select>
      </section>
      <div style={{ borderTop: "1px dashed #d2d4d9", margin: "40px 0" }} />
      <section>
        <div style={{ paddingBottom: 8 }}>
          转换结果(全选复制到会议纪要文档中)：
        </div>
        <div
          contentEditable
          className="xxr"
          style={{
            width: "100%",
            height: 240,
            outline: "1px solid red",
            overflow: "auto",
            padding: "8px"
          }}
        >
          <ul style={{ paddingLeft: 20 }}>
            {addTag(formatArr(splitStr(value))).map((item, index) => {
              return (
                <li key={index}>
                  <p className="paragraph text-align-type-left pap-line-1 pap-line-rule-auto pap-spacing-before-3pt pap-spacing-after-3pt pap-left-indent-2em pap-hanging-indent-1.6em">
                    <span>{item.title}</span>
                    {item.url && (
                      <a href={item.url}>{categoreLinks(item.url)}</a>
                    )}
                    <span>｜{name}</span>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
