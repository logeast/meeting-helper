export const isTitle = (value) => {
  const orderList = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "1.",
    "2.",
    "3.",
    "4.",
    "5.",
    "6.",
    "7.",
    "8.",
    "9.",
    "1、",
    "2、",
    "3、",
    "4、",
    "5、",
    "6、",
    "7、",
    "8、",
    "9、",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "【1】",
    "【2】",
    "【3】",
    "【4】",
    "【5】",
    "【6】",
    "【7】",
    "【8】",
    "【9】",
    "1️⃣",
    "2️⃣",
    "3️⃣",
    "4️⃣",
    "5️⃣",
    "6️⃣",
    "7️⃣",
    "8️⃣",
    "9️⃣"
  ];
  let flag = false;
  let targetItem = "";
  orderList.map((item) => {
    if (value.slice(0, 4).indexOf(item) > -1) {
      flag = true;
      targetItem = item;
    }
    return {
      isTitle: flag,
      vlaue: value
    };
  });
  return { flag, targetItem };
};

export const isListItem = (value) => {
  const orderList = ["-", "*", "·"];
  let flag = false;
  let targetItem = "";
  orderList.map((item) => {
    if (value.slice(0, 4).indexOf(item) > -1) {
      flag = true;
      targetItem = item;
    }
    return {
      isListItem: flag,
      vlaue: value
    };
  });
  return { flag, targetItem };
};

export const isUrl = (str) => {
  const urlRegExp = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
  return urlRegExp.test(str);
};

export const splitStr = (str) => {
  return str
    .trim()
    .split("\n")
    .filter((item) => item !== "");
};

export const formatArr = (arr = []) => {
  let result = [];
  let subArr = [];
  arr.forEach((item) => {
    if (isTitle(item).flag) {
      subArr = [];
      subArr.push(item);
      result.push(subArr);
    } else {
      subArr.push(item);
    }
  });
  return result;
};

export const addTag = (arr = []) => {
  let result = [];
  arr.forEach((item) => {
    const itemObj = {
      title: "",
      url: "",
      urls: [],
      items: []
    };
    if (Array.isArray(item)) {
      item.forEach((subItem) => {
        if (isTitle(subItem).flag) {
          itemObj.title = subItem
            .replace(isTitle(subItem).targetItem, "")
            .trim();
        } else if (isUrl(subItem.trim())) {
          itemObj.url = subItem;
          itemObj.urls.push(subItem);
        } else if (isListItem(subItem).flag) {
          itemObj.items.push(
            subItem.replace(isListItem(subItem).targetItem, "").trim()
          );
        }
      });
    }
    result.push(itemObj);
  });
  console.log(result);
  return result;
};

export const categoreLinks = (url) => {
  const linkMap = new Map([
    ["figma", "Figma"],
    ["tapd", "TAPD"],
    ["web/spear/", "重构稿"],
    ["cccc/", "重构稿"],
    ["onedesign", "One Design"],
    ["web/odc", "One Design"]
  ]);
  let result = "链接";
  linkMap.forEach((value, key) => {
    if (url.indexOf(key) > -1) {
      result = value;
    }
  });
  return result;
};

export const fmtVal = (val) => addTag(formatArr(splitStr(val)));
