class StudentDTO {
  constructor(record) {
    this.username = record.username
    this.accountType = record.accountType
    this.firstName = record.firstName
    this.middleName = record.middleName
    this.lastName = record.lastName
    this.userDOB = record.userDOB
    this.schoolID = record.schoolID
    this.previousSchoolIDs = record.previousSchoolIDs
  }
}