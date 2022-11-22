const ACCESS_KEY = "access key here";

const headerList = {
  "Content-Type": "application/json",
  Authorization: `Client-ID ${ACCESS_KEY}`,
};

export const getPhotos = async () => {
  try {
    const response = await fetch(`https://api.unsplash.com/photos/`, {
      headers: headerList,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return console.log(err);
  }
};
