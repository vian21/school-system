var schoolId;
var schoolName;
var schoolMotto;
var schoolType;
var schoolEmail;
var schoolImage;
var schoolWebsite;
var numberOfStudents;
var numberOfMaleStudents;
var numberOfFemaleStudents;
var numberOfTeachers;
var reportsFolder = '';
var paid;

var genders = ['Male', 'Female'];

var schoolTypes = ['Day School', 'Boarding School'];

var staffTypes = ['Admin', 'Dean', 'Teacher', 'Accountant'];

var subjectTypes = ['Compulsary', 'Elective'];
var subjectEnrollmentStatus = ['not enrolled', 'enrolled'];
var periodTypes = ['Term', 'Semester'];

var periods, currentPeriodId, currentPeriod, start, end;

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//Variable to contain all students
var studentsArray = [];
//Variable to conatiner all teachers
var teachersArray = [];
//Variable to contain all streams id
var streams = [];
//Variable to contain subjects and their streams
var subjects = [];
//Variable to contain the tests done
var testsDone = [];

var grading = [];

var transactions = [];

var transactionType = ['Out', 'In']


//acoounting
var currentStudentAccountingPos;
var currentStudentAccountingId;
var currentStudentTransactions;

//discipline
var studentDisciplineInfo;
var disciplineMarks = 100;
var studentDisciplineId;
var disciplineTypes = ['Deduction', 'Awarding']



