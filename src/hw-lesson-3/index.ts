type statusType = "active" | "inactive";
type areaType = "Development" | "Design" | "Marketing" | "QA";
type levelType = "Junior" | "Middle" | "Senior";
type directionType =
  | "Frontend"
  | "Backend"
  | "TypeScript"
  | "UI/UX"
  | "Manual"
  | "Automation";
type Lecturer = {
  name: string;
  surname: string;
  position: string;
  company: string;
  experience: number;
  courses: string[];
  contacts: string[];
};

class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

  _areas: Area[] = [];
  _lecturers: Lecturer[] = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): Area[] {
    return this._areas;
  }

  get lecturers(): Lecturer[] {
    return this._lecturers;
  }
  addArea(area: Area): void {
    this._areas.push(area);
  }
  addLecturer(lecturer: Lecturer): void {
    this._lecturers.push(lecturer);
  }
  removeArea(areaName: string): void {
    this._areas = this._areas.filter((a): boolean => a._name !== areaName);
  }
  removeLecturer(lecturerName: string): void {
    this._lecturers = this._lecturers.filter(
      (l): boolean => `${l.name} ${l.surname}` !== lecturerName,
    );
  }
}

class Area {
  // implement getters for fields and 'add/remove level' methods
  _levels: Level[] = [];
  _name: string;

  constructor(name: string) {
    this._name = name;
  }
  get levels(): Level[] {
    return this._levels;
  }
  get name(): string {
    return this._name;
  }
  addLevel(level: Level): void {
    this._levels.push(level);
  }
  removeLevel(levelName: string): void {
    this._levels = this._levels.filter((l): boolean => l.name !== levelName);
  }
}

class Level {
  // implement getters for fields and 'add/remove group' methods

  _groups: Group[] = [];
  _name: string;
  _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }
  get groups(): Group[] {
    return this._groups;
  }
  get name(): string {
    return this._name;
  }
  get description(): string {
    return this._description;
  }
  addGroup(group: Group): void {
    this._groups.push(group);
  }
  removeGroup(statusGroup: statusType): void {
    this._groups = this._groups.filter(
      (g): boolean => g._status !== statusGroup,
    );
  }
}

class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods
  _directionName: directionType = "Frontend";
  _levelName: levelType = "Junior";
  _area: areaType = "Development";
  _status: statusType = "active";
  _students: Student[] = []; // Modify the array so that it has a valid toSorted method*

  constructor(directionName: directionType, levelName: levelType) {
    this._directionName = directionName;
    this._levelName = levelName;
  }

  get students(): Student[] {
    return this._students;
  }
  get directionName(): string {
    return this._directionName;
  }
  get levelName(): string {
    return this._levelName;
  }
  get status(): statusType {
    return this._status;
  }
  get area(): areaType {
    return this._area;
  }
  set status(newStatus: statusType) {
    this._status = newStatus;
  }
  set area(newArea: areaType) {
    this._area = newArea;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }
  removeStudent(student: string): void {
    this._students = this._students.filter(
      (s): boolean => s.fullName !== student,
    );
  }
  showPerformance(): Student[] {
    const sortedStudents = [...this._students].sort(
      (a: Student, b: Student): number =>
        b.getPerformanceRating() - a.getPerformanceRating(),
    );
    return sortedStudents;
  }
}

class Student {
  // implement 'set grade' and 'set visit' methods

  _firstName: string;
  _lastName: string;
  _birthYear: number;
  _grades: { [workName: string]: number } = {}; // workName: mark
  _visits: boolean[] = []; // lesson: present

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }
  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(" ");
  }
  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  setGrade(workName: string, mark: number): void {
    this._grades[workName] = mark;
  }
  setVisit(present: boolean): void {
    this._visits.push(present);
  }
  getPerformanceRating(): number {
    const gradeValues = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade =
      gradeValues.reduce((sum, grade): number => sum + grade, 0) /
      gradeValues.length;
    const attendancePercentage =
      (this._visits.filter((present): boolean => present).length /
        this._visits.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}

// 1. Створюємо школу
const mySchool = new School();

// 2. Створюємо область та рівень
const itArea = new Area("Development");
const middleLevel = new Level("Middle", "Курс для тих, хто вже знає базу");

// 3. Збираємо ланцюжок (Композиція)
mySchool.addArea(itArea);
itArea.addLevel(middleLevel);

// 4. Створюємо групу
const tsGroup = new Group("TypeScript", "Middle");
middleLevel.addGroup(tsGroup);

// 5. Додаємо студента
const student1 = new Student("Іван", "Сірко", 1995);
student1.setVisit(true);
student1.setVisit(true);
student1.setVisit(false); // 66% відвідуваності
student1.setGrade("Homework 1", 90);
student1.setGrade("Exam", 100);

tsGroup.addStudent(student1);

// --- ПЕРЕВІРКА РЕЗУЛЬТАТІВ ---

console.log("--- Тест архітектури ---");
console.log(`Школа має областей: ${mySchool.areas.length}`); // Очікуємо 1
console.log(`Область має назву: ${itArea.name}`); // Очікуємо Development

console.log("\n--- Тест успішності ---");
const performance = tsGroup.showPerformance();
console.log(`Кращий студент: ${performance[0].fullName}`);
console.log(`Рейтинг: ${performance[0].getPerformanceRating().toFixed(2)}`);

// --- ТЕСТ ВИДАЛЕННЯ (Те, що ми обговорювали) ---
console.log("\n--- Тест видалення ---");
tsGroup.removeStudent("Сірко Іван");
console.log(`Студентів після видалення: ${tsGroup.students.length}`); // Очікуємо 0