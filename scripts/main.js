const fetchAndDisplayImages = async () => {
  const fetchedData = await (await fetch("./json/photos.json")).json();
  const imageDataList = fetchedData.data;
  let imageListHtml = "";

  for (const itemData of imageDataList) {
    imageListHtml += `<li class="item" data-item-id="${itemData.id}">
                          <img src="${itemData.image}" alt="" />
                      </li>`;
  }

  document.querySelector(".image-list").innerHTML = imageListHtml;
  return imageDataList;
};

const showImageModal = (imageData) => {
  document.querySelector(".image-dialog").classList.add("show");

  document.querySelector(
    ".image-container"
  ).innerHTML = `<img src="${imageData.image}" class="image" width="960" height="540" alt="">`;

  document.querySelector(".image-title").innerHTML = imageData.title;

  document.querySelector(".image-description").innerHTML =
    imageData.description;
};

const addNewInfomation = (imageDataList) => {
  var count = 0;

  document.querySelector(".image-container")
    .addEventListener("click", (event) => {
      // console.log("clicked");
      // console.log(document.querySelector(".image").getAttribute('src'));
      if (document.querySelector(".image").getAttribute('src') == "photos/flower08.jpg") {
        count += 1;
        if (count == 5) {
          alert("花の新しい情報が解放されました。")
          document.querySelector(".image-title").innerHTML = "深淵に咲く花"
          document.querySelector(".image-description").innerHTML = "光の届かない深淵にひっそりと咲く、あまり見かけない花。";
          console.log(imageDataList)
          imageDataList[7].title = "深淵に咲く花"
          imageDataList[7].description = "光の届かない深淵にひっそりと咲く、あまり見かけない花。"
        }
      }
      // console.log(count);
  });
}

const updateButtons = (currentImageIndex, imageDataList) => {
  document.querySelector(".prev-button").disabled = currentImageIndex - 1 <= -1;

  document.querySelector(".next-button").disabled =
    currentImageIndex + 1 >= imageDataList.length;
};

const addButtonListeners = (imageDataList) => {
  let currentImageIndex = -1;

  updateButtons(currentImageIndex, imageDataList);

  document.querySelector(".next-button").addEventListener("click", () => {
    currentImageIndex++;
    if (currentImageIndex >= imageDataList.length) {
      currentImageIndex = 0;
    }
    const targetImageData = imageDataList[currentImageIndex];
    showImageModal(targetImageData);
    updateButtons(currentImageIndex, imageDataList);
  });

  document.querySelector(".prev-button").addEventListener("click", () => {
    currentImageIndex--;
    const targetImageData = imageDataList[currentImageIndex];
    showImageModal(targetImageData);
    updateButtons(currentImageIndex, imageDataList);
  });

  document.querySelector(".close-button").addEventListener("click", () => {
    document.querySelector(".image-dialog").classList.remove("show");
  });

  document.querySelectorAll(".item").forEach((itemElement) => {
    itemElement.addEventListener("click", () => {
      const itemId = itemElement.dataset.itemId;
      if (itemId === undefined) {
        return;
      }

      const targetImageIndex = imageDataList.findIndex(
        (data) => data.id === itemId
      );

      if (targetImageIndex === -1) {
        return;
      }

      currentImageIndex = targetImageIndex;

      const targetImageData = imageDataList[currentImageIndex];
      showImageModal(targetImageData);
    });
  });
};

const main = async () => {
  // 画像の表示
  const imageDataList = await fetchAndDisplayImages();

  // ボタンへのイベント設定
  addButtonListeners(imageDataList);
  //隠し機能設定
  addNewInfomation(imageDataList);
};

main();
