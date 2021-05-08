const buttons = document.querySelectorAll("button");
const myIFrame = document.querySelector("#output");
const txtInput = document.querySelector("#title");
textField.document.designMode = "On";
const randomID = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};
const today = new Date();
const mock = {
  id: randomID(),
  title: "",
  content: "",
  date: today.toISOString(),
};
const URL = "http://localhost:3000/data/";
let title = "";

txtInput.addEventListener("input", (e) => {
  e.preventDefault();
  title = e.target.value;
});

const postData = async (content) => {
  await fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  })
    .then((res) => res)
    .catch((err) => console.log(err));
};

const handleSave = (content) => {
  const newObj = {
    ...mock,
    title: title,
    content: content,
  };
  postData(newObj);

  return newObj;
};

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () => {
    let cmd = buttons[i].getAttribute("data-cmd");
    if (buttons[i].name === "active") {
      buttons[i].classList.toggle("active");
    }

    if (cmd === "save") {
      const content = myIFrame.contentWindow.document.body.innerHTML;
      handleSave(content);
    } else {
      textField.document.execCommand(cmd, false, null);
    }
  });
}
