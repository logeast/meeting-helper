import React, { useState, useReducer, createContext, useContext } from "react";
import { categoreLinks, fmtVal } from "./utils";

const usersArr = [
  // ["Schedule", "基本信息", "#CED3DA"],
  ["chihyunli", "知芸", "#93E396"],
  ["arryliu", "超哥", "#FFEA79"],
  ["yanqinghu", "庆", "#A5B4FC"],
  ["dingdingma", "丁丁", "#FFC880"],
  ["quinceywang", "小希", "#FFBDAE"],
  ["haiyingzhao", "海莹", "#B1D0FF"],
  ["dovechen", "鸽子哥", "#EABFFF"],
  ["lacqlu", "向东", "#EAC287"]
  // ["Vitamin", "维他命", "#CED3DA"],
];

const getUserStorage = (user) => {
  const lsname = `user_${user}`;
  return localStorage.getItem(lsname);
};

const usersArrObj = Array.from(usersArr, ([user, nickname, color]) => ({
  user,
  nickname,
  color,
  value: getUserStorage(user) || ""
}));

const initialState = {
  usersData: usersArrObj || []
};
const UsersContext = createContext({
  state: initialState,
  dispatch: () => null
});

const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UsersContext.Provider value={[state, dispatch]}>
      {children}
    </UsersContext.Provider>
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case "usersData":
      return {
        ...state,
        usersData: action.usersData
      };
    default:
      return state;
  }
};

// 输入单元
function InputArea(props) {
  const { user, nickname, color, value, onChange, onBlur } = props;
  return (
    <div
      className="input-area"
      style={{
        display: "flex",
        flexDirection: "column",
        height: 240
      }}
    >
      <textarea
        placeholder={`请粘贴会议纪要`}
        style={{
          width: "100%",
          flex: 1,
          outline: "none",
          border: "none",
          resize: "none",
          padding: 16,
          background: "transparent"
        }}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div
        className="info"
        style={{
          display: "flex",
          alignItems: "center",
          height: 54,
          padding: "0 16px",
          fontSize: 22,
          fontWeight: 300,
          color: "rgba(0,0,0,.3)",
          pointerEvents: "none",
          userSelect: "none"
        }}
      >
        {nickname}({user})
      </div>
    </div>
  );
}

// 格式化单元
function FormatAreaInner(props) {
  const { data = [], user, nickname } = props;

  return (
    <>
      {user && data.length !== 0 && (
        <h4 className="paragraph text-align-type-left pap-line-1.7 pap-line-rule-auto pap-spacing-before-0pt pap-spacing-after-0pt">
          {nickname}({user})
        </h4>
      )}
      <ul style={{ paddingLeft: 20, fontSize: "11pt" }}>
        {data.map((item, index) => {
          return (
            <>
              <li key={index}>
                <p className="paragraph text-align-type-left pap-line-1.3 pap-line-rule-auto pap-spacing-before-3pt pap-spacing-after-3pt pap-left-indent-2em pap-hanging-indent-1.6em">
                  <span>{item.title}</span>{" "}
                  {item.url && <a href={item.url}>{categoreLinks(item.url)}</a>}
                </p>
              </li>
              <ul style={{ paddingLeft: 48 }}>
                {Array.isArray(item?.items) &&
                  item.items.map((subitem, index) => (
                    <li key={index}>
                      <p className="paragraph text-align-type-left pap-line-1.3 pap-line-rule-auto pap-spacing-before-3pt pap-spacing-after-3pt pap-left-indent-4em pap-hanging-indent-1.6em">
                        {subitem}
                      </p>
                    </li>
                  ))}
              </ul>
            </>
          );
        })}
      </ul>
    </>
  );
}

// 用户单元：输入+格式化
function UserSection(props) {
  const { user, nickname, color } = props;
  const lsname = `user_${user}`;

  const [value, setValue] = useState(getUserStorage(user) || "");
  const [state, dispatch] = useContext(UsersContext);

  const onChange = (e) => {
    setValue(e.target.value);
    dispatch({
      type: "usersData",
      usersData: state.usersData.map((item) =>
        item.user === user ? { ...item, value: e.target.value } : item
      )
    });
  };

  const onBlur = (e) => {
    localStorage.setItem(lsname, e.target.value);
  };

  return (
    <section
      className="user-section"
      style={{
        background: color,
        borderRadius: 4,
        boxShadow:
          "0px 3px 5px rgba(0, 0, 0, 0.08), 0px 6px 15px rgba(0, 0, 0, 0.08)"
      }}
    >
      <InputArea
        user={user}
        nickname={nickname}
        color={color}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
      <details style={{ position: "relative" }}>
        <summary
          style={{
            color: "rgba(0,0,0,.3)",
            height: 54,
            lineHeight: "54px",
            fontWeight: 300,
            cursor: "pointer",
            position: "absolute",
            top: -54,
            right: 0,
            padding: "0 16px"
          }}
        >
          查看
        </summary>
        <div className="format-area" style={{}}>
          <div
            className="xxr"
            style={{ padding: "16px", maxHeight: 160, overflowY: "auto" }}
            contentEditable
            suppressContentEditableWarning
          >
            <FormatAreaInner
              user={user}
              nickname={nickname}
              color={color}
              data={fmtVal(value)}
            />
          </div>
        </div>
      </details>
    </section>
  );
}

// 编辑器
function Editor() {
  const [state, dispatch] = useContext(UsersContext);
  return (
    <section
      className="wk-e"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        padding: "2px 16px 16px 2px",
        overflow: "auto"
      }}
    >
      {state.usersData.map(({ user, nickname, color }) => {
        return (
          <div key={user}>
            <UserSection user={user} nickname={nickname} color={color} />
          </div>
        );
      })}
    </section>
  );
}

// 预览器
function Viewer() {
  const [state, dispatch] = useContext(UsersContext);

  return (
    <section
      className="wk-v"
      style={{
        background: "#fff",
        borderRadius: 4,
        overflow: "auto"
      }}
    >
      <div
        className="xxr"
        style={{
          height: "100%",
          outline: "none",
          padding: "16px"
          // boxShadow:
          //   "0px 3px 5px rgba(0, 0, 0, 0.08), 0px 6px 15px rgba(0, 0, 0, 0.08)"
        }}
        contentEditable
        suppressContentEditableWarning
      >
        {/* {
          <h3 className="paragraph text-align-type-left pap-line-1.7 pap-line-rule-auto pap-spacing-before-0pt pap-spacing-after-0pt">
            工作汇报
          </h3>
        } */}
        {state.usersData.map((item) => {
          const { user, nickname, color, value } = item;
          return (
            <FormatAreaInner
              key={user}
              user={user}
              nickname={nickname}
              color={color}
              data={fmtVal(value)}
            />
          );
        })}
      </div>
    </section>
  );
}

const Appv2 = () => {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        maxHeight: "calc(100vh - 40px)"
      }}
    >
      <h1 style={{ flex: "none" }}>会议纪要助手</h1>
      <div
        className="wk"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 24,
          flex: 1,
          overflow: "hidden"
        }}
      >
        <UsersProvider>
          <Editor />
          <Viewer />
        </UsersProvider>
      </div>
    </div>
  );
};
export default Appv2;
