export const apiRoutes = {
  authLogin: "/api/auth/adminLogin",
  authLogout: "/api/auth/logout",
  loginByToken: "/api/auth/checktoken",
  getClassRoom: "/api/classroom",
  getChapterSubject: "/api/classroom/getChapterSubject",
  addClass: "/api/classroom",
  addSubject:"/api/classroom/createSubject",
  addChapter: "/api/classroom/createChapter",
  addLession: "/api/classroom/createLession",
  editChapterByID: "/api/classroom/editChapterByID",
  deleteChapterByID: "/api/classroom/deleteChapterByID",
  getQuestionByIDQR: "/api/question/getQuestionByIDQR",


  // post request
  getPost : "/api/manapost/getPostQuestion",
  getPostById: "/api/manapost/getPostQuestionById",

  // comment request
  getCommentsByPostId : "/api/manapost/getCommentPost"
};