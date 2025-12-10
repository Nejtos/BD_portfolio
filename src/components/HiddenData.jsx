const allHiddenData = {
  1: import.meta.glob("../assets/hidden/images/*.{jpg, JPG}", {
    eager: true,
  }),
};

const loadImages = (id) => {
  const hiddenData = allHiddenData[id] || {};
  const images = Object.values(hiddenData).map((mod) => mod.default);

  images.sort((a, b) => {
    const nameA = a.split("/").pop();
    const nameB = b.split("/").pop();
    return nameA.localeCompare(nameB, undefined, { numeric: true });
  });

  return images;
};

export const getHiddenPhotos = () => {
  return [
    {
      id: 1,
      title: "hidden",
      alt: "hidden",
      size: "cover",
      content: loadImages(1).map((img, index) => ({ id: index + 1, img })),
      gridAreas: [
        "1 / 1 / 2 / 3",
        "1 / 3 / 2 / 5",
        "1 / 5 / 2 / 7",
        "2 / 2 / 3 / 4",
        "2 / 4 / 3 / 6",
        "3 / 2 / 4 / 4",
        "3 / 4 / 4 / 6",
        "4 / 2 / 5 / 4",
        "4 / 4 / 5 / 6",
        "5 / 1 / 6 / 3",
        "5 / 3 / 6 / 5",
        "5 / 5 / 6 / 7",
        "6 / 1 / 7 / 3",
        "6 / 3 / 7 / 5",
        "6 / 5 / 7 / 7",
        "7 / 1 / 8 / 3",
        "7 / 3 / 8 / 5",
        "7 / 5 / 8 / 7",
        "8 / 1 / 9 / 3",
        "8 / 3 / 9 / 5",
        "8 / 5 / 9 / 7",
        "9 / 1 / 10 / 3",
        "9 / 3 / 10 / 5",
        "9 / 5 / 10 / 7",
        "10 / 1 / 11 / 3",
        "10 / 3 / 11 / 5",
        "10 / 5 / 11 / 7",
        "11 / 1 / 12 / 3",
        "11 / 3 / 12 / 5",
        "11 / 5 / 12 / 7",
        "12 / 1 / 13 / 3",
        "12 / 3 / 13 / 5",
        "12 / 5 / 13 / 7",
        "13 / 1 / 14 / 3",
        "13 / 3 / 14 / 5",
        "13 / 5 / 14 / 7",
      ],
    },
  ];
};
