preQuestionnaireQuestions = [
    "Richter scale is linear, A 8-points eartquake in the richter scale is almost twice as powerful as a 4-points earthquake.",

    "Richter magnitude is the most important factor when evaluating a seismic event",

    "Earthquakes often produce cracks on the ground that are very dangerous to the structures.",

    // "Only small buildings suffer from resonance",

    // "Seismic events can happen at any point of the planet with the same probability",

    // "people, furniture and non structural elements only contribute with the weight and don’t change the structural behaviour of a building.",

    // "The stiffness of a building depends only of its mass",

    // "Buildings should be flexible enough to allow people evacuate the building before the collapse.",

    // "Making buildings as stiff as possible should always be the goal.",

    // "Buildings vibrate and move with earthquakes.",

    // "Making buildings stiffer is usually more expensive and requires more material.",

    // "all buildings have a natural frequency",

    // "the natural frequency of a building only depends on its height",

    // "the magnitude of an earthquake is the only important factor to consider.",

    // "Tall buildings have longer and wider periods than shorter buildings.",

    // "Short buildings always have less risk of collapsing than tall buildings.",

    // "different wavelengths of a seism can affect different buildings in different ways.",

    // "from a anti seismic point of view It’s better to have tall buildings",

    // "In general, short buildings are less flexible than tall ones.",

    // "Buildings suffer the bigger forces at the top"

];

EngagementQuestions = [
    "The presentation was understandable",
    "I liked how the topics were presented",
    "I felt the presenter knew what he was saying",
    "The presentation was boring",
    "the presentation had visual elements that helped me understand the topic"

]

var Data = {};   //In this object I collect the data and I send it at the end

var typeOfPresentation;     // this is either AR or PPT
const AR = 0;
const PPT = 1;


//#region Terms Of Service
//-------------------------------------------------------------------------
//-----------------       T E R M S    O F     S E R V I C E
//-------------------------------------------------------------------------

function CheckTermsAndAge() {
    var termsAccepted = document.getElementById("TermsAcceptance");
    var olderThan18 = document.getElementById("AgeChecked");

    var termsNotAccepted = document.getElementById("TermsNotAcceptedDialog");
    var legalAgeNotAccepted = document.getElementById("LegalAgeNotAcceptedDialog");

    if (!termsAccepted.checked) {
        if (termsNotAccepted.classList.contains("hidden"))
            termsNotAccepted.classList.remove("hidden");
    }
    else {
        if (!termsNotAccepted.classList.contains("hidden"))
            termsNotAccepted.classList.add("hidden");
    }



    if (!olderThan18.checked) {

        if (legalAgeNotAccepted.classList.contains("hidden"))
            legalAgeNotAccepted.classList.remove("hidden");
    }
    else {
        if (!legalAgeNotAccepted.classList.contains("hidden"))
            legalAgeNotAccepted.classList.add("hidden");
    }



    if (termsAccepted.checked && olderThan18.checked) {
        document.getElementById("Terms").classList.add("hidden");
        document.getElementById("Demographics").classList.remove("hidden");
    }

}







//#endregion


//#region Demographics

//-------------------------------------------------------------------------
//-----------------        D E M O G R A P H I C S
//-------------------------------------------------------------------------

function validateDemographicAnswers() {

    var Gender = document.getElementById("Gender");
    var Age = document.getElementById("Age")
    var Continent = document.getElementById("Continent");
    var Country = document.getElementById("Country");
    var Education = document.getElementById("Education");
    var Ethnicity = document.getElementById("Ethnicity");
    var Language = document.getElementById("Language");
    var Device = document.getElementById("Device");

    var Answers = [Gender, Age, Continent, Country, Education, Ethnicity, Language, Device];

    var allQuestionAnswered = true;
    Answers.forEach(element => {
        if (element.value === "") {
            element.parentNode.classList.add("RedBorder");
            allQuestionAnswered = false;
        }
        else {
            if (element.parentNode.classList.contains("RedBorder"))
                element.parentNode.classList.remove("RedBorder");
        }
    });


    var pleaseAnswerAll = document.getElementById("Demographics_AnswerAllQuestions");

    if (!allQuestionAnswered) {                                 //questions without answers
        if (pleaseAnswerAll.classList.contains("hidden"))
            pleaseAnswerAll.classList.remove("hidden");

    }
    else {                                                      // Answered everything
        if (!pleaseAnswerAll.classList.contains("hidden"))
            pleaseAnswerAll.classList.add("hidden");

        document.getElementById("Demographics").classList.add("hidden");
        document.getElementById("PreQuestionnaire").classList.remove("hidden");
        AddDemographicsToData(Answers)
    }

}

function AddDemographicsToData(answersData) {

    Data.Demographics = {
        Gender: answersData[0].value,
        Age: answersData[1].value,
        Continent: answersData[2].value,
        Country: answersData[3].value,
        Education: answersData[4].value,
        Ethnicity: answersData[5].value,
        Language: answersData[6].value,
        Device: answersData[7].value
    }
}



function CheckIfItsOther(question) {
    if (question.value == "Other") {
        var ElementToShow = document.getElementById(question.id + "_other")
        ElementToShow.classList.remove("hidden");
    }
    else {
        var ElementToShow = document.getElementById(question.id + "_other")
        if (!ElementToShow.classList.contains("hidden"))
            ElementToShow.classList.add("hidden");
    }
}




//#endregion


//#region PreQuestionnaire

//-------------------------------------------------------------------------
//-----------------        P R E      Q U E S T I O N N A I R E
//-------------------------------------------------------------------------




function checkIfAllAnswersAreCompletedPre() {
    allCompleted = true;
    for (var i = 0; i < preQuestionnaireQuestions.length; i++) {
        var questionsAnswers = document.getElementsByName("prequestion_" + i);

        if (!questionsAnswers[0].checked && !questionsAnswers[1].checked && !questionsAnswers[2].checked) {
            //TODO show which answers haven't been answered
            console.warn("question " + i + " hasn't been responded");
            allCompleted = false;
        }

    }

    if (allCompleted) {
        var answers = GetQuestionnaireAnswers("prequestion_");
        AddPreQuestionnaireToData(answers);
        document.getElementById("PreQuestionnaire").classList.add("hidden");
        document.getElementById("Videos").classList.remove("hidden");
    }


    return allCompleted;
}



function GenerateQuestionnaireQuestions(containerName, prefix) {

    var QuestionsElement = document.getElementById(containerName);

    var divForm = document.createElement("div");    //big container of all questions

    for (var i = 0; i < preQuestionnaireQuestions.length; i++) {


        var parentQuestion = document.createElement("div");  //container for each question
        parentQuestion.classList.add("question");
        parentQuestion.id = "quesition_container_" + i;

        var QuestionTitle = document.createElement("h3");
        QuestionTitle.innerText = preQuestionnaireQuestions[i];
        QuestionTitle.classList.add("question_text");
        parentQuestion.append(QuestionTitle);


        // false button
        var buttonFalse = document.createElement("input");
        buttonFalse.type = "radio";
        buttonFalse.value = "false";
        buttonFalse.id = "choice-false" + i;
        buttonFalse.name = prefix + i;

        var label_false = document.createElement("label");
        label_false.for = "choice-false" + i;
        label_false.innerText = "false";

        // I Dont Know button
        var buttonIDontKnow = document.createElement("input");
        buttonIDontKnow.type = "radio";
        buttonIDontKnow.value = "IDontKnow";
        buttonIDontKnow.id = "choice-IDontKnow" + i;
        buttonIDontKnow.name = prefix + i;


        var label_IDontKnow = document.createElement("label");
        label_IDontKnow.for = "choice-IDontKnow" + i;
        label_IDontKnow.innerText = "I Dont Know";


        // True
        var buttonTrue = document.createElement("input");
        buttonTrue.type = "radio";
        buttonTrue.value = "true";
        buttonTrue.id = "choice-true" + i;
        buttonTrue.name = prefix + i;

        var label_true = document.createElement("label");
        label_true.for = "choice-true" + i;
        label_true.innerText = "true";


        parentQuestion.append(buttonFalse);
        parentQuestion.append(label_false);


        parentQuestion.append(buttonIDontKnow);
        parentQuestion.append(label_IDontKnow);

        parentQuestion.append(buttonTrue);
        parentQuestion.append(label_true);


        divForm.append(parentQuestion);

    }

    QuestionsElement.append(divForm);

}

function AddPreQuestionnaireToData(answers) {
    Data.PreQuestionnaire = answers
}



function sendAllPreAnswers() {
    var answersQuestionnaire = GetQuestionnaireAnswers();
    firebase.database().ref('Questionnaires/').push().set({
        name: "testavid",
        answers: answersQuestionnaire
    })
}


//#endregion


//#region Video
//-------------------------------------------------------------------------
//-----------------        V I D E O S
//-------------------------------------------------------------------------

function FinishVideo() {
    document.getElementById("PostQuestionnaire").classList.remove("hidden");
    document.getElementById("Videos").classList.add("hidden");
}

//#endregion


//#region Post Questionnaire

//-------------------------------------------------------------------------
//-----------------        P O S T      Q U E S T I O N N A I R E
//-------------------------------------------------------------------------

function CheckAnswersPost() {
    allCompleted = true;
    for (var i = 0; i < preQuestionnaireQuestions.length; i++) {
        var questionsAnswers = document.getElementsByName("postquestion_" + i);

        if (!questionsAnswers[0].checked && !questionsAnswers[1].checked && !questionsAnswers[2].checked) {
            //TODO show which answers haven't been answered
            console.warn("question " + i + " hasn't been responded");
            allCompleted = false;
        }
    }

    if (allCompleted) {

        var PostQuestionnaireAnswers = GetQuestionnaireAnswers("postquestion_");
        AddPostQuestionnaireToData(PostQuestionnaireAnswers);

        var EngagementQuetionAnswers = GetEngagementAnswers();
        AddEngagementAnswersToData(EngagementQuetionAnswers);

        document.getElementById("PostQuestionnaire").classList.add("hidden");
        document.getElementById("Thanks").classList.remove("hidden");


        SendDataToDataBase(Data)


        return allCompleted;
    }
}




function GetEngagementAnswers() {
    arrayAnswers = [];
    for (var i = 0; i < EngagementQuestions.length; i++) {
        var questionsAnswers = document.getElementById("engagementQuestion_" + i);
        arrayAnswers.push(questionsAnswers.value)
    }
    return arrayAnswers;
}


function AddPostQuestionnaireToData(answers) {
    Data.PostQuestionnaire = answers
}


function AddEngagementAnswersToData(answers) {
    Data.Engagement = answers
}



function GenerateEngagementQuestions(containerName) {

    var QuestionsElement = document.getElementById(containerName);

    var divForm = document.createElement("div");    //big container of all questions

    for (var i = 0; i < EngagementQuestions.length; i++) {


        var parentQuestion = document.createElement("div");  //container for each question
        parentQuestion.classList.add("question");
        parentQuestion.id = "engagement_quesition_container_" + i;

        var QuestionTitle = document.createElement("h3");
        QuestionTitle.innerText = EngagementQuestions[i];
        QuestionTitle.classList.add("question_text");
        parentQuestion.append(QuestionTitle);

        // Slider
        var sliderContainer = document.createElement("div");
        sliderContainer.classList.add("SliderContainer");

        var span1 = document.createElement("span");
        span1.classList.add("SliderLabel")
        span1.innerText="disagree"

        var span2 = document.createElement("span");
        span2.innerText="agree"
        span2.classList.add("SliderLabel")

        var sliderQuestion = document.createElement("input");
        sliderQuestion.id = "engagementQuestion_" + i;
        sliderQuestion.type="range";
        sliderQuestion.min="0";
        sliderQuestion.max = "6";
        sliderQuestion.value = "3";

        sliderContainer.append(span1);
        sliderContainer.append(sliderQuestion);
        sliderContainer.append(span2);

        parentQuestion.append(sliderContainer);

        divForm.append(parentQuestion);

    }

    QuestionsElement.append(divForm);

}




//#endregion


//#region Firebase

//-------------------------------------------------------------------------
//-----------------        F I R E B A S E
//-------------------------------------------------------------------------

var firebaseConfig = {

    apiKey: "AIzaSyC_JPOdYKs-kiXk37kWhQ3Cx6Kdj8zOwn4",

    authDomain: "masterthesisdata-a48f1.firebaseapp.com",

    databaseURL: "https://masterthesisdata-a48f1-default-rtdb.europe-west1.firebasedatabase.app",

    projectId: "masterthesisdata-a48f1",

    storageBucket: "masterthesisdata-a48f1.appspot.com",

    messagingSenderId: "862167425927",

    appId: "1:862167425927:web:39edb22c32fb11b7866922"

};

//#endregion


//#region Other
function GetTypeOfPresentation() {
    var number_AR
    var number_PPT
    firebase.database().ref('VideosWatched').get().then(function (snapshot) {
        number_AR = snapshot.val().AR;
        number_PPT = snapshot.val().PPT;

        if (number_AR == number_PPT) {
            var randomValue = Math.random();
            if (randomValue > 0.5) typeOfPresentation = AR;
            else typeOfPresentation = PPT
        }

        else {
            if (number_AR > number_PPT) typeOfPresentation = AR;
            else typeOfPresentation = PPT;

        }

        if (typeOfPresentation == AR) {
            document.getElementById("Video_AR").classList.remove("hidden");
        }
        else if (typeOfPresentation == PPT) {
            document.getElementById("Video_PPT").classList.remove("hidden");
        }

        console.log("type of Presentation: " + typeOfPresentation);
    })
}


function GetQuestionnaireAnswers(prefix) {
    arrayAnswers = [];
    for (var i = 0; i < preQuestionnaireQuestions.length; i++) {
        var questionsAnswers = document.getElementsByName(prefix + i);

        for (var j = 0; j < questionsAnswers.length; j++) {
            if (questionsAnswers[j].checked) {
                console.log()
                arrayAnswers.push(questionsAnswers[j].value)
            }

        }

    }
    return arrayAnswers;
}


function SendDataToDataBase(data){
    console.log(data);
    firebase.database().ref('Questionnaires/').push().set({
        Data: data
    })
}


//#endregion

firebase.initializeApp(firebaseConfig);
GetTypeOfPresentation();
GenerateQuestionnaireQuestions("PreQuestions", "prequestion_");
GenerateQuestionnaireQuestions("PostQuestions", "postquestion_");
GenerateEngagementQuestions("EngagementQuestions");
