const usersArr = [
  // ["example", "示例", "#93E396"],
  ["chihyunli", "知芸", "#93E396"],
  ["arryliu", "超哥", "#EABFFF"],
  ["yanqinghu", "庆", "#A5B4FC"],
  ["dingdingma", "丁丁", "#FFC880"],
  // ["quinceywang", "小希", "#FFBDAE"],
  ["yilanghe", "依朗", "#FFBDAE"],
  ["haiyingzhao", "海莹", "#B1D0FF"],
  ["dovechen", "鸽子哥", "#FFEA79"],
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
export default usersArrObj;
