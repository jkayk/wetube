import routes from "../routes";
import Video from "../models/Video";

//Home
export const home = async (req, res) => {
  //async is something that waits for you
  try {
    const videos = await Video.find({}).sort({ _id: -1 }); //await to show what you're wating for and -1 means we're going from top to bottom
    res.render("home", { pageTitle: "Home", videos }); //this will happen when the above is finisehd even if not successful
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] }); //still show something even if there's an error
  }
};

//Search
export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  //the above is same as const searchingBy = req.query.term;
  res.render("search", { pageTitle: "Search", searchingBy });
};

//Upload
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  console.dir();
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });
  res.redirect(routes.videoDetail(newVideo.id));
};

//Video Detail
export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

//Edit Video
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    res.render(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

//Delete Video
export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
