var selector = document.querySelector(".selector_box");
selector.addEventListener("click", () => {
  if (selector.classList.contains("selector_open")) {
    selector.classList.remove("selector_open");
  } else {
    selector.classList.add("selector_open");
  }
});

document.querySelectorAll(".date_input").forEach((element) => {
  element.addEventListener("click", () => {
    document.querySelector(".date").classList.remove("error_shown");
  });
});

var sex = "m";

document.querySelectorAll(".selector_option").forEach((option) => {
  option.addEventListener("click", () => {
    sex = option.id;
    document.querySelector(".selected_text").innerHTML = option.innerHTML;
  });
});

var upload = document.querySelector(".upload");

var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = ".jpeg,.png,.gif";

document.querySelectorAll(".input_holder").forEach((element) => {
  var input = element.querySelector(".input");
  input.addEventListener("click", () => {
    element.classList.remove("error_shown");
  });
});

imageInput.addEventListener("change", () => {
    var file = imageInput.files[0];
    if (!file) return;

    var formData = new FormData();
    formData.append("image", file);

    fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: { Authorization: "Client-ID e4d98a899c8c946" },
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        console.log("Upload zakończony:", data);
        var url = data.data.link;
        upload.setAttribute("selected", url);
        upload.querySelector(".upload_uploaded").src = url;
        upload.classList.add("upload_loaded");
    })
    .catch(err => {
        console.error("Błąd uploadu:", err);
        alert("Upload nie powiódł się!");
    });
});



document.querySelector(".go").addEventListener("click", () => {
  var empty = [];

  var params = new URLSearchParams();

  params.set("sex", sex);
  if (!upload.hasAttribute("selected")) {
    empty.push(upload);
    upload.classList.add("error_shown");
  } else {
    params.set("image", upload.getAttribute("selected"));
  }

  const day = document.getElementById("day");
  const month = document.getElementById("month");
  const year = document.getElementById("year");

  [day, month, year].forEach((input) => {
    if (isEmpty(input.value)) {
      dateEmpty = true;
    } else {
      params.set(input.id, input.value);
    }
  });

  document.querySelectorAll(".input_holder").forEach((element) => {
    var input = element.querySelector(".input");

    if (isEmpty(input.value)) {
      empty.push(element);
      element.classList.add("error_shown");
    } else {
      params.set(input.id, input.value);
    }
  });

  if (empty.length != 0) {
    empty[0].scrollIntoView();
  } else {
    forwardToId(params);
  }
});

function isEmpty(value) {
  let pattern = /^\s*$/;
  return pattern.test(value);
}

function forwardToId(params) {
  location.href = "/id?" + params;
}

var guide = document.querySelector(".guide_holder");
guide.addEventListener("click", () => {
  if (guide.classList.contains("unfolded")) {
    guide.classList.remove("unfolded");
  } else {
    guide.classList.add("unfolded");
  }
});




