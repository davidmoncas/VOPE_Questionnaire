preQuestionnaireQuestions = [
    "Buildings vibrate and move with earthquakes.",
    
    "Tall buildings generally have longer and wider periods than shorter buildings.",

    //"Richter magnitude is the most important factor when evaluating a seismic event",

    "Richter scale is linear, A 8-points earthquake in the Richter scale is almost twice as powerful as a 4-points earthquake.",


    // "Earthquakes often produce cracks on the ground that are very dangerous to the structures.",

    "Only small buildings suffer from resonance",

    "Seismic events can happen at any point of the planet with the same probability",

    // "people, furniture and non structural elements only contribute with the weight and don’t change the structural behaviour of a building.",

    "The stiffness of a building depends solely on its mass",

    "Buildings should be flexible enough to allow people to evacuate the building before collapsing.",

    "Making buildings as stiff as possible should always be the goal.",


    // "Making buildings stiffer is usually more expensive and requires more material.",

    // "all buildings have a natural frequency",

    // "the natural frequency of a building only depends on its height",

    "The magnitude of an earthquake is the only important factor to consider for designing a seismic resistant building.",


    "Short buildings always have less risk of collapsing than tall buildings.",

    "Different wavelengths of a seism can affect different buildings in different ways.",

    // "from a anti seismic point of view It’s better to have tall buildings",

    // "In general, short buildings are less flexible than tall ones.",

    "Buildings suffer the strongest shear forces at the top"

];

EngagementQuestions = [

    "The presentation was interesting",
    "I stopped paying attention to the presentation at some points",
    "I felt distracted by the visual element of the presentation",

    "The presentation was fun to watch",
    "I liked the visual elements of the presentation",
    "The presentation was boring",



    "I understood most of the topics presented",
    "I felt the presenter was competent",
    "The topics were difficult to understand"

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

        window.scroll({
            top: 100,
            behavior: 'smooth'
        });

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
    var Country = document.getElementById("Country");
    var Education = document.getElementById("Education");
    var Language = document.getElementById("Language");
    var Device = document.getElementById("Device");

    var Answers = [Gender, Age,  Country, Education, Language, Device];

    var allQuestionAnswered = true;
    Answers.forEach(element => {
        if (element.value === "") {
            element.classList.add("RedBorder");
            allQuestionAnswered = false;
        }
        else {
            if (element.classList.contains("RedBorder"))
                element.classList.remove("RedBorder");
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

        window.scroll({
            top: 100,
            behavior: 'smooth'
        });
    }

}

function AddDemographicsToData(answersData) {

    Data.Demographics = {
        Gender: answersData[0].value,
        Age: answersData[1].value,
        Country: answersData[2].value,
        Education: answersData[3].value,
        Language: answersData[4].value,
        Device: answersData[5].value
    }
}



function CheckIfItsOther(question) {
    if (question.value == "Other") {
        var ElementToShow = document.getElementById(question.id + "_other")
        ElementToShow.classList.remove("hidden");
    }
    else {
        var ElementToShow = document.getElementById(question.id + "_other");
        if (ElementToShow != null) {
            if (!ElementToShow.classList.contains("hidden"))
                ElementToShow.classList.add("hidden");

        }
    }
    if (question.classList.contains("RedBorder")) question.classList.remove("RedBorder");
}




//#endregion


//#region PreQuestionnaire

//-------------------------------------------------------------------------
//-----------------        P R E      Q U E S T I O N N A I R E
//-------------------------------------------------------------------------




function checkIfAllAnswersAreCompletedPre() {
    allCompleted = true;
    var elementNotAnswered;
    for (var i = 0; i < preQuestionnaireQuestions.length; i++) {
        var questionsAnswers = document.getElementsByName("prequestion_" + i);

        if (!questionsAnswers[0].checked && !questionsAnswers[1].checked && !questionsAnswers[2].checked) {
            var questionContainer = document.getElementById("prequestion_quesition_container_" + i);
            questionContainer.classList.add("notAnswered");

            allCompleted = false;
            elementNotAnswered = questionContainer;
        }
        else {
            var questionContainer = document.getElementById("prequestion_quesition_container_" + i);
            if (questionContainer.classList.contains("notAnswered")) {

                questionContainer.classList.remove("notAnswered");
            }
        }

    }

    if (allCompleted) {
        var answers = GetQuestionnaireAnswers("prequestion_");
        AddPreQuestionnaireToData(answers);
        document.getElementById("PreQuestionnaire").classList.add("hidden");
        document.getElementById("Videos").classList.remove("hidden");

        window.scroll({
            top: 100,
            behavior: 'smooth'
        });
    }
    else {
        elementNotAnswered.scrollIntoView();
    }

    return allCompleted;
}



function GenerateQuestionnaireQuestions(containerName, prefix) {

    var QuestionsElement = document.getElementById(containerName);

    var divForm = document.createElement("div");    //big container of all questions

    for (var i = 0; i < preQuestionnaireQuestions.length; i++) {


        var parentQuestion = document.createElement("div");  //container for each question
        parentQuestion.classList.add("question");
        parentQuestion.id = prefix + "quesition_container_" + i;

        var QuestionTitle = document.createElement("h3");
        QuestionTitle.innerText =(i+1) + ") " + preQuestionnaireQuestions[i];
        QuestionTitle.classList.add("question_text");
        parentQuestion.append(QuestionTitle);

        var answersContainer = document.createElement("div");
        answersContainer.classList.add("questionnaireAnswersContainer");

        // false button
        var optionContainerFalse = document.createElement("div")
        optionContainerFalse.classList.add("optionContainer");

        var buttonFalse = document.createElement("input");
        buttonFalse.type = "radio";
        buttonFalse.classList.add("radioButtonChoice");
        buttonFalse.value = "false";
        buttonFalse.id = prefix + "choice-false" + i;
        buttonFalse.name = prefix + i;

        var label_false = document.createElement("label");
        label_false.setAttribute("for", prefix + "choice-false" + i);
        label_false.innerText = "false";

        optionContainerFalse.append(buttonFalse);
        optionContainerFalse.append(label_false);

        // I Dont Know button
        var optionContainerIDK = document.createElement("div")
        optionContainerIDK.classList.add("optionContainer");

        var buttonIDontKnow = document.createElement("input");
        buttonIDontKnow.type = "radio";
        buttonIDontKnow.classList.add("radioButtonChoice");
        buttonIDontKnow.value = "IDontKnow";
        buttonIDontKnow.id = prefix + "choice-IDontKnow" + i;
        buttonIDontKnow.name = prefix + i;


        var label_IDontKnow = document.createElement("label");
        label_IDontKnow.setAttribute("for", prefix + "choice-IDontKnow" + i);
        label_IDontKnow.innerText = "I Dont Know";

        optionContainerIDK.append(buttonIDontKnow);
        optionContainerIDK.append(label_IDontKnow);

        // True
        var optionContainerTrue = document.createElement("div")
        optionContainerTrue.classList.add("optionContainer");

        var buttonTrue = document.createElement("input");
        buttonTrue.type = "radio";
        buttonTrue.value = "true";
        buttonTrue.classList.add("radioButtonChoice");
        buttonTrue.id = prefix + "choice-true" + i;
        buttonTrue.name = prefix + i;

        var label_true = document.createElement("label");
        label_true.setAttribute("for", prefix + "choice-true" + i);
        label_true.innerText = "true";

        optionContainerTrue.append(buttonTrue);
        optionContainerTrue.append(label_true);

        //adding up the elements


        answersContainer.append(optionContainerFalse);
        answersContainer.append(optionContainerIDK);
        answersContainer.append(optionContainerTrue);


        parentQuestion.append(answersContainer);

        var separator = document.createElement("hr");
        separator.classList.add("separatorQuestionnaire");

        parentQuestion.append(separator);

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

    if(typeOfPresentation == AR) stopVideo("Video_AR");
    else stopVideo("Video_PPT");
    
    window.scroll({
        top: 100,
        behavior: 'smooth'
    });

}


var stopVideo = function ( videoType ) {
        
    var iframe = document.getElementById(videoType).childNodes[1]
    if ( iframe !== null ) {
        var iframeSrc = iframe.src;
        iframe.src = iframeSrc;
    }
};



//#endregion


//#region Post Questionnaire

//-------------------------------------------------------------------------
//-----------------        P O S T      Q U E S T I O N N A I R E
//-------------------------------------------------------------------------

function CheckAnswersPost() {
    allCompleted = true;
    var scrollCoord;
    for (var i = 0; i < preQuestionnaireQuestions.length; i++) {
        var questionsAnswers = document.getElementsByName("postquestion_" + i);

        if (!questionsAnswers[0].checked && !questionsAnswers[1].checked && !questionsAnswers[2].checked) {

            var questionContainer = document.getElementById("postquestion_quesition_container_" + i);
            console.log(questionContainer);
            questionContainer.classList.add("notAnswered");

            console.warn("question " + i + " hasn't been responded");
            allCompleted = false;
            scrollCoord = questionContainer;


        }
        else {
            var questionContainer = document.getElementById("postquestion_quesition_container_" + i);
            if (questionContainer.classList.contains("notAnswered")) {
                questionContainer.classList.remove("notAnswered");

            }
        }


    }

    if (allCompleted) {

        var PostQuestionnaireAnswers = GetQuestionnaireAnswers("postquestion_");
        AddPostQuestionnaireToData(PostQuestionnaireAnswers);

        var EngagementQuetionAnswers = GetEngagementAnswers();
        AddEngagementAnswersToData(EngagementQuetionAnswers);

        Data.openQuestion1 = document.getElementById("openQuestion1").value;
        Data.openQuestion2 = document.getElementById("openQuestion2").value;

        document.getElementById("PostQuestionnaire").classList.add("hidden");
        document.getElementById("Thanks").classList.remove("hidden");


        SendDataToDataBase(Data)



        return allCompleted;


    }
    else {
        scrollCoord.scrollIntoView();
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

    var postQuestionnaireText = document.createElement("h3");
    postQuestionnaireText.innerHTML = "In the next questions, move the slider to the right or left based on how much you agree/disagree with the given statement"
    postQuestionnaireText.classList.add("postQuestText");

    divForm.append(postQuestionnaireText);



    for (var i = 0; i < EngagementQuestions.length; i++) {


        var parentQuestion = document.createElement("div");  //container for each question
        parentQuestion.classList.add("question");
        parentQuestion.id = "engagement_quesition_container_" + i;

        var QuestionTitle = document.createElement("h3");
        QuestionTitle.innerText =(i+1) + ") "+ EngagementQuestions[i];
        QuestionTitle.classList.add("question_text");
        parentQuestion.append(QuestionTitle);

        // Slider
        var sliderContainer = document.createElement("div");
        sliderContainer.classList.add("SliderContainer");

        // labels
        var labelsContainer = document.createElement("div");
        labelsContainer.classList.add("EngagementLabelsContainer");


        var span1 = document.createElement("span");
        span1.classList.add("SliderLabel")
        span1.classList.add("floatLeft")
        span1.innerText = "disagree"

        var span2 = document.createElement("span");
        span2.classList.add("SliderLabel")
        span2.classList.add("floatRight")
        span2.innerText = "agree"

        var sliderQuestion = document.createElement("input");
        sliderQuestion.id = "engagementQuestion_" + i;
        sliderQuestion.type = "range";
        sliderQuestion.min = "0";
        sliderQuestion.max = "6";
        sliderQuestion.value = "3";

        labelsContainer.append(span1);
        labelsContainer.append(span2);

        sliderQuestion.classList.add("sliderQuestion");

        sliderContainer.append(sliderQuestion);
        sliderContainer.append(labelsContainer);

        parentQuestion.append(sliderContainer);

        var separator = document.createElement("hr");
        separator.classList.add("separatorQuestionnaire");

        parentQuestion.append(separator);



        divForm.append(parentQuestion);

    }

    var textBeforeQuestion1 = document.createElement("h3");
    textBeforeQuestion1.classList.add("question_text");
    textBeforeQuestion1.innerHTML="(Optional) do you like or dislike this system? why?"

    var openQuestion1 = document.createElement("textarea");
    openQuestion1.classList.add("openQuestion");
    openQuestion1.id = "openQuestion1";
    openQuestion1.rows = "4";
    openQuestion1.cols = "50";

    var textBeforeQuestion2 = document.createElement("h3");
    textBeforeQuestion2.classList.add("question_text");
    textBeforeQuestion2.innerHTML="(Optional) please write down your feedback for this study."

    var openQuestion2 = document.createElement("textarea");
    openQuestion2.classList.add("openQuestion");
    openQuestion2.id = "openQuestion2";
    openQuestion2.rows = "4";
    openQuestion2.cols = "50";

    var separator = document.createElement("hr");
    separator.classList.add("separatorQuestionnaire");



    QuestionsElement.append(divForm);
    QuestionsElement.append(textBeforeQuestion1);
    QuestionsElement.append(openQuestion1);
    QuestionsElement.append(separator);
    QuestionsElement.append(textBeforeQuestion2);
    QuestionsElement.append(openQuestion2);
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
            if (number_AR < number_PPT) typeOfPresentation = AR;
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


function SendDataToDataBase(data) {
    console.log(data);
    AddSurvey();
    firebase.database().ref('Questionnaires/').push().set({
        Data: data
    })
}

function AddSurvey() {

    var presentationName;
    if (typeOfPresentation == AR) presentationName = "AR";
    else presentationName = "PPT";

    firebase.database().ref('VideosWatched/' + presentationName).once('value', function (snapshot) {
        val = snapshot.val();
        val ++;
        firebase.database().ref('VideosWatched/' + presentationName).set(val)
    })


}

//#endregion

firebase.initializeApp(firebaseConfig);
GetTypeOfPresentation();
GenerateQuestionnaireQuestions("PreQuestions", "prequestion_");
GenerateQuestionnaireQuestions("PostQuestions", "postquestion_");
GenerateEngagementQuestions("EngagementQuestions");
