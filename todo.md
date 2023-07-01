# Auth Route
    1. Register
    2. Login
    4. Verify Email
    3. Update Password

# User Route
    1. Get All Users
    2. Get Single User by ID
    3. 

# Exam Route
    1. Create New Exam
    2. Get All Exam
    3. 

# Result Route
    1. Get Single Users Results List in his profile
    2. Get All Exam
    3. 




## Create Exam in Admin
    {
        subjects: [physics, chemistry, higher-math],
        chapters: [

        ]
    }


## Create A Question
    {
        subject: select a subject,
        chapter: select a chapter,
        type: [board, varsity, engineering, medical, dental]
        title: String,
        options: [
            String...
        ],
        answer: options index,
        details: String,
    }


## Create Exam in User (Mock)
    {
        subjects: [physics 1, physics 2, chemistry 1, chemistry 2, higher-math 1, higher-math 2],
        chapters: [
            physics-1:{
                1: __
                ...
            },
            physics-2:{
                1: __
                ...
            },
            chem-1:{
                1: __
                ...
            },
            chem-2:{
                1: __
                ...
            },
            hm-1:{
                1: __
                ...
            },
            hm-2:{
                1: __
                ...
            },
        ],
        questions:[
            
        ]
    }



## Request From User For Mock Exam
    {
        type: board,
        choice: [
            {
                subject: physics1,
                chapter: 1,
                total: 20/4 + 20%4,
            },
            {
                subject: physics1,
                chapter: 2,
                total: 20/4
            },
            {
                subject: physics1,
                chapter: 3,
                total: 20/4
            },
            {
                subject: physics1,
                chapter: 4,
                total: 20/4
            },
            {
                subject: physics2,
                chapter: [1,3,8],
                total: 10
            },
            {
                subject: chemistry1,
                chapter: [1,3,4],
                total: 15
            },
        ],
        duration: 30,
        negativeMarking: false,
    }
        
    
    for(i, i<choice, i++){
        Question.find({type:type, choice:[$in: {subject:choice[i].subject, chapter:choice[i].chapter[j]} ] }).skip().limit(num_of_question)
        return [{},{},{}...]
    }