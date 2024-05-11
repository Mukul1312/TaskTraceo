interface TaskDetails {
  taskName: string;
  progressPerc: number;
  remaningDays: number;
  themeColor: string;
}

const data: TaskDetails[] = [
  {
    taskName: "UI Design",
    progressPerc: 80,
    remaningDays: 10,
    themeColor: "rgb(81, 17, 176)",
  },
  {
    taskName: "Backend Development",
    progressPerc: 60,
    remaningDays: 5,
    themeColor: "rgb(134, 31, 19)",
  },
  {
    taskName: "Database Setup",
    progressPerc: 30,
    remaningDays: 8,
    themeColor: "rgb(9, 225, 78)",
  },
  {
    taskName: "Testing",
    progressPerc: 20,
    remaningDays: 7,
    themeColor: "rgb(191, 13, 31)",
  },
  {
    taskName: "Frontend Integration",
    progressPerc: 40,
    remaningDays: 6,
    themeColor: "rgb(211, 23, 133)",
  },
  {
    taskName: "API Documentation",
    progressPerc: 50,
    remaningDays: 4,
    themeColor: "rgb(85, 192, 27)",
  },
  {
    taskName: "Bug Fixing",
    progressPerc: 10,
    remaningDays: 9,
    themeColor: "rgb(16, 142, 41)",
  },
  {
    taskName: "Deployment",
    progressPerc: 70,
    remaningDays: 3,
    themeColor: "rgb(223, 7, 151)",
  },
  {
    taskName: "User Acceptance Testing",
    progressPerc: 25,
    remaningDays: 2,
    themeColor: "rgb(9, 100, 211)",
  },
  {
    taskName: "Final Review",
    progressPerc: 90,
    remaningDays: 1,
    themeColor: "rgb(121, 21, 213)",
  },
];

export default data;
