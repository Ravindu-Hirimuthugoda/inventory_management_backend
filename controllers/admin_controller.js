const { successMessage, errorMessage } = require("../utils/response_message");

const AdminService = require("../services/admin_service");
const UserService = require("../services/user");
const StudentService = require("../services/student");
const LectureService = require("../services/lecturer");
const LaboratoryService = require("../services/labarotary_service");
const OfficeClerkService = require("../services/office_clerk_service");
const TechnicalOfficerService = require("../services/technical_officer_service");
const { checkUserType } = require("../utils/check_user_type");
const bcrypt = require("bcrypt");

let adminService = new AdminService();
let userService = new UserService();
let studentService = new StudentService();
let lectureService = new LectureService();
let officeClerkService = new OfficeClerkService();
let technicalOfficerService = new TechnicalOfficerService();
let laboratoryService = new LaboratoryService();

const addAdmin = async (req, res, next) => {
  try {
    console.log(req.body);
    const index = req.body.index;
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    let user;
    let admin;
    if (checkUserType(req.user.type, "Admin")) {
      try {
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        let hashPw = await bcrypt.hash(password, salt);
      
        user = await userService.createUser(email, hashPw, "Admin", false);
        
        if (user != null) {
          admin = await adminService.createAdmin(
            index,
            firstName,
            lastName,
            user.id
          );
          if (admin != null) {
            let out = {
              user: user,
              admin: admin,
            };
            return successMessage(res, out);
          } else {
            return errorMessage(res, "User did not added", 401);
          }
        } else {
          return errorMessage(res, "User already exsist", 401);
        }
      } catch (e) {
        console.log(e);
        return errorMessage(res, "Something went wrong", 500);
      }
    } else {
      return errorMessage(res, "Not authenticated.", 401);
    }
  } catch (err) {
    next(err);
  }
};

const addStudent = async (req, res, next) => {
  try {
    console.log(req.body.index);
    const index = req.body.index;
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const department = req.body.department;

    let user;
    let student;
    if (checkUserType(req.user.type, "Admin")) {
      try {
        let isUser = await userService.getUserByEmail(email);
        if (isUser != null) {
          let isStudent = await studentService.getStudentByID(index);
          if (isStudent != null) {
   
        const salt = await bcrypt.genSalt(10);
        let hashPw = await bcrypt.hash(password, salt);
            user = await userService.createUser(email, hashPw, "student", false);
            student = await studentService.createStudent(
              index,
              firstName,
              lastName,
              user.id,
              department
            );
            let out = {
              user: user,
              student: student,
            };
            return successMessage(res, out);
          } else {
            return errorMessage(res, "Student already exsist for entered index", 406);
          }
        } else {
          return errorMessage(res, "User already exsist", 406);
        }
      } catch (e) {
        console.log(e);
        return errorMessage(res, "Something went wrong", 500);
      }
    } else {
      return errorMessage(res, "Not authenticated.", 401);
    }
  } catch (err) {
    next(err);
  }
};

const addLecturer = async (req, res, next) => {
  try {
    console.log(req.body);
    const index = req.body.index;
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const department = req.body.department;

    let user;
    let lecturer;

    if (checkUserType(req.user.type, "Admin")) {
      try {
       let isUser = await userService.getUserByEmail(email);
    
        if (isUser != null) {
          let isLecturer = await lectureService.getLecturerByID(
            index,
            
          );
          if (isLecturer != null) {
            const salt = await bcrypt.genSalt(10);
        let hashPw = await bcrypt.hash(password, salt);
            user = await userService.createUser(email, hashPw, "Lecturer", false);
            lecturer = await lectureService.createLecturer(
              index,
              firstName,
              lastName,
              user.id,
              department
            );
            let out = {
              user: user,
              lecturer: lecturer,
            };
            return successMessage(res, out);
          } else {
            return errorMessage(res, "Lecturer  already exsist", 406);
          }
        } else {
          return errorMessage(res, "User already exsist", 406);
        }
      } catch (e) {
        console.log(e);
        return errorMessage(res, "Something went wrong", 500);
      }
    } else {
      return errorMessage(res, "Not authenticated.", 401);
    }
  } catch (err) {
    next(err);
  }
};

const addOfficeClerk = async (req, res, next) => {
  try {
    console.log(req.body);
    const index = req.body.index;
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    let user;
    let officeClerk;
    if (checkUserType(req.user.type, "Admin")) {
      try {
       let isUser = await userService.getUserByEmail(
          email,
          
        );
        
        if (isUser != null) {
         let isOfficeClerk = await officeClerkService.getOfficeClerkByID(
            index,
            
          );
          if (isOfficeClerk != null) {
            const salt = await bcrypt.genSalt(10);
        let hashPw = await bcrypt.hash(password, salt);
            user = await userService.createUser(
              email,
              hashPw,
              "OfficeClerk",
              false
            );
            officeClerk = await officeClerkService.createOfficeClerk(
              index,
              firstName,
              lastName,
              user.id
            );
            let out = {
              user: user,
              officeClerk: officeClerk,
            };
            return successMessage(res, out);
          } else {
            return errorMessage(res, "Office Clerk already exsist", 406);
          }
        } else {
          return errorMessage(res, "User already exsist", 406);
        }
      } catch (e) {
        console.log(e);
        return errorMessage(res, "Something went wrong", 500);
      }
    } else {
      return errorMessage(res, "Not authenticated.", 401);
    }
  } catch (err) {
    next(err);
  }
};

const addTechnicalOfficer = async (req, res, next) => {
  try {
    console.log(req.body);
    const index = req.body.index;
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const labId = req.body.labId;

    let user;
    let technicalOfficer;

    if (checkUserType(req.user.type, "Admin")) {
      try {
       let isUser = await userService.getUserByEmail(
          email
          
        );
        
        if (isUser != null) {
         let isTechnicalOfficer =
            await technicalOfficerService.getTechnicalOfficerByID(
              index,
              
            );
          if (isTechnicalOfficer != null) {
            const salt = await bcrypt.genSalt(10);
        let hashPw = await bcrypt.hash(password, salt);
            user = await userService.createUser(
              email,
              hashPw,
              "TechnicalOfficer",
              false
            );
            technicalOfficer =
            await technicalOfficerService.createTechnicalOfficer(
              index,
              firstName,
              lastName,
              user.id,
              labId
            );
            let out = {
              user: user,
              technicalOfficer: technicalOfficer,
            };
            return successMessage(res, out);
          } else {
            return errorMessage(res, "Technical Officer already exsist", 406);
          }
        } else {
          return errorMessage(res, "User already exsist", 406);
        }
      } catch (e) {
        console.log(e);
        return errorMessage(res, "Something went wrong", 500);
      }
    } else {
      return errorMessage(res, "Not authenticated.", 401);
    }
  } catch (err) {
    next(err);
  }
};

const addLaboratory = async (req, res, next) => {
  try {
    console.log(req.body);
    const labName = req.body.labName;
    const department = req.body.department;

    let laboratory;
    if (checkUserType(req.user.type, "Admin")) {
      try {
        laboratory = await laboratoryService.createLaboratory(
          labName,
          department
        );
        if (laboratory != null) {
          let out = {
            laboratory: laboratory,
          };
          return successMessage(res, out);
        } else {
          return errorMessage(res, "Laboratory has already exist", 406);
        }
      } catch (e) {
        console.log(e);
        return errorMessage(res, "Something went wrong", 500);
      }
    } else {
      return errorMessage(res, "Not authenticated.", 401);
    }
  } catch (err) {
    next(err);
  }
};

const getLaboratory = async (req, res, next) => {
  try {
    let laboratories;
    if (checkUserType(req.user.type, "Admin")) {
      try {
        laboratories = await laboratoryService.readAllLaboratory();
        if (laboratories != null) {
          let out = {
            laboratory: laboratories,
          };
          return successMessage(res, out);
        } else {
          return errorMessage(res, "Laboratories not found", 500);
        }
      } catch (e) {
        console.log(e);
        return errorMessage(res, "Something went wrong", 500);
      }
    } else {
      return errorMessage(res, "Not authenticated.", 401);
    }
  } catch (err) {
    next(err);
  }
};

//!----------last entry--------------
const getLastStudent = async (req, res, next) => {
  try {
    let student;

    if (checkUserType(req.user.type, "Admin")) {
      try {
        student = await studentService.readLastEntry();
        if (student != null) {
          return successMessage(res, student);
        } else {
          return errorMessage(res, "Last entry not found", 500);
        }
      } catch (e) {
        console.log(e);
        return errorMessage(res, "Something went wrong", 500);
      }
    } else {
      return errorMessage(res, "Not authenticated for this user.", 401);
    }
  } catch (err) {
    next(err);
  }
};
const getLastLecture = async (req, res, next) => {
  try {
    let lecture;
    if (checkUserType(req.user.type, "Admin")) {
      try {
        lecture = await lectureService.readLastEntry();
        if (lecture != null) {
          return successMessage(res, lecture);
        } else {
          return errorMessage(res, "Last entry not found", 500);
        }
      } catch (e) {
        console.log(e);
        return errorMessage(res, "Something went wrong", 500);
      }
    } else {
      return errorMessage(res, "Not authenticated.", 401);
    }
  } catch (err) {
    next(err);
  }
};
const getLastOfficeClerk = async (req, res, next) => {
  try {
    let officeClerk;
    if (checkUserType(req.user.type, "Admin")) {
      try {
        officeClerk = await officeClerkService.readLastEntry();
        if (officeClerk != null) {
          return successMessage(res, officeClerk);
        } else {
          return errorMessage(res, "Last entry not found", 500);
        }
      } catch (e) {
        console.log(e);
        return errorMessage(res, "Something went wrong", 500);
      }
    } else {
      return errorMessage(res, "Not authenticated.", 401);
    }
  } catch (err) {
    next(err);
  }
};
const getLastTechnicalOfficer = async (req, res, next) => {
  try {
    let technicalOfficer;
    if (checkUserType(req.user.type, "Admin")) {
      try {
        technicalOfficer = await technicalOfficerService.readLastEntry();
        if (technicalOfficer != null) {
          return successMessage(res, technicalOfficer);
        } else {
          return errorMessage(res, "Last entry not found", 500);
        }
      } catch (e) {
        console.log(e);
        return errorMessage(res, "Something went wrong", 500);
      }
    } else {
      return errorMessage(res, "Not authenticated.", 401);
    }
  } catch (err) {
    next(err);
  }
};
const getLastAdmin = async (req, res, next) => {
  try {
    let admin;
    if (checkUserType(req.user.type, "Admin")) {
      try {
        admin = await adminService.readLastEntry();
        if (admin != null) {
          return successMessage(res, admin);
        } else {
          return errorMessage(res, "Last entry not found", 500);
        }
      } catch (e) {
        console.log(e);
        return errorMessage(res, "Something went wrong", 500);
      }
    } else {
      return errorMessage(res, "Not authenticated.", 401);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addAdmin,
  addStudent,
  addLecturer,
  addOfficeClerk,
  addTechnicalOfficer,
  addLaboratory,
  getLaboratory,

  getLastAdmin,
  getLastLecture,
  getLastOfficeClerk,
  getLastStudent,
  getLastTechnicalOfficer,
};
