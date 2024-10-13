export const apiRoutes = {
  authLogin: "/api/auth/adminLogin",
  authLogout: "/api/auth/logout",
  loginByToken: "/api/auth/checktoken",
  getAllUsers: "/api/auth/getAllUsers",
  deleteUserByProfileId: "/api/auth/deleteUserByProfileId",
  getClassRoom: "/api/classroom",
  addClass: "/api/classroom",

  getChapterSubject: "/api/classroom/getChapterSubject",
  addSubject:"/api/classroom/createSubject",
  deleteSubject: "/api/classroom/deleteSubject",
  updateSubject: "/api/classroom/updateSubject",

  addChapter: "/api/classroom/createChapter",
  addLession: "/api/classroom/createLession",
  addSlideLession: "/api/classroom/addSlideLession",
  deleteLession: "/api/classroom/deleteLession",
  updateLession: "/api/classroom/updateLession",
  editChapterByID: "/api/classroom/editChapterByID",
  deleteChapterByID: "/api/classroom/deleteChapterByID",
  
  getQuestionByIDQR: "/api/question/getQuestionByIDQR",
  addQuestion: "api/question/createQuestion",
  updateQuestion: "api/question/updateQuestion",
  deleteQuestion :"api/question/deleteQuestion",

  // post request
  getPost : "/api/manapost/getPostQuestion",
  getPostById: "/api/manapost/getPostQuestionById",

  // comment request
  getCommentsByPostId : "/api/manapost/getCommentPost",

  chat: "/api/chat"
};