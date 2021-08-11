function validateAnswers() {

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


    if (!allQuestionAnswered) {
        var pleaseAnswerAll = document.getElementById("Demographics_AnswerAllQuestions");   //questions without answers
        if (pleaseAnswerAll.classList.contains("hidden"))
            pleaseAnswerAll.classList.remove("hidden");

        else{
            if (!pleaseAnswerAll.classList.contains("hidden"))       // Answered everything
            pleaseAnswerAll.classList.add("hidden");

            
        }

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