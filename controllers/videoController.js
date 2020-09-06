import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  //async is something that waits for you
  try {
    const videos = await Video.find({}); //await to show what you're wating for
    res.render("home", { pageTitle: "Home", videos }); //this will happen when the above is finisehd even if not successful
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] }); //still show something even if there's an error
  }
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  //the above is same as const searchingBy = req.query.term;
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const postUpload = (req, res) => {
  const { body } = req;
  consolne.log(body);
  res.render("upload", { pageTitle: "Upload" });
  // to do: upload and save video
  // res.redirect(routes.videoDetail(234235236));
};

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
