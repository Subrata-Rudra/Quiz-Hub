# Backend API Endpoints
## Sign Up
POST Request,
URL: http://localhost:5000/user/ , 
body: {
    "name": "John Doe",
    "email": "john123@gmail.com",
    "password": "123456"
}
## Sign In / Log In
POST Request,
URL: http://localhost:5000/user/login , 
body: {
    "email": "john123@gmail.com",
    "password": "123456"
}
## Get Quiz Questions
POST Request,
URL: http://localhost:5000/quiz/questions , 
body: {
    "language_id": "english",
    "category": "easy"
} , 
Authorization: Bearer JWT_Token
## Get Quiz Answers
POST Request,
URL: http://localhost:5000/quiz/answers , 
body: {
  "uid": "user_id",
  "pairs": [
    { "objectId": "question_id", "givenAnswer": "3" },
    { "objectId": "question_id", "givenAnswer": "0" },
    { "objectId": "question_id", "givenAnswer": "1" }
  ]
} , 
Authorization: Bearer JWT_Token
## Get Performance History in One Language of a User
GET Request,
URL: http://localhost:5000/performance , 
Parameters: uid: user_id, lang_id: language_id , 
Authorization: Bearer JWT_Token
## Get Leaderboard of any Language
GET Request,
URL: http://localhost:5000/performance/leaderboard , 
Parameters: lang_id: language_id , 
Authorization: Bearer JWT_Token
## Get Language Proficiency Level of any User
GET Request,
URL: http://localhost:5000/performance/proficiency , 
Parameters: uid: user_id , 
Authorization: Bearer JWT_Token
## Delete Performance History of any User
GET Request,
URL: http://localhost:5000/performance/deletehistory , 
Parameters: uid: user_id , 
Authorization: Bearer JWT_Token
## Get All Language available in Quiz Questions
GET Request,
URL: http://localhost:5000/quiz/languages , 
Authorization: Bearer JWT_Token
