export const apiRoutes = {
  authLogin: "/api/auth/adminLogin",
  authLogout: "/api/auth/logout",
  loginByToken: "/api/auth/checktoken",
  getClassRoom: "/api/classroom",
  getChapterSubject: "/api/classroom/getChapterSubject",
  addClass: "/api/classroom",
  addSubject:"/api/classroom/createSubject",
  deleteSubject: "/api/classroom/deleteSubject",
  updateSubject: "/api/classroom/updateSubject",
  addChapter: "/api/classroom/createChapter",
  addLession: "/api/classroom/createLession",
  deleteLession: "/api/classroom/deleteLession",
  updateLession: "/api/classroom/updateLession",
  editChapterByID: "/api/classroom/editChapterByID",
  deleteChapterByID: "/api/classroom/deleteChapterByID",
  getQuestionByIDQR: "/api/question/getQuestionByIDQR",


  // post request
  getPost : "/api/manapost/getPostQuestion",
  getPostById: "/api/manapost/getPostQuestionById",

  // comment request
  getCommentsByPostId : "/api/manapost/getCommentPost"
};