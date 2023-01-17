$(document).ready(function () {
    btnSubmit.addEventListener('click', () => {
        let error=0;
        const title = document.querySelector('.title')
        const description = document.querySelector('.description')
        const cards = document.querySelectorAll('.cardquestion')
        const finalQuestions = [];
        cards.forEach((card) => {
            const question = card.querySelector('.question').value
            if(question.trim()===""){
                alert('The question title is empty')
                error=1;
                return;
            }
            const typeOfQuestion = card.querySelector('.right .btn-group .item');
            let textOfQuestion;
            if (typeOfQuestion) {
                textOfQuestion = typeOfQuestion.lastElementChild.textContent.toString().trim();
                let questionElement = null;
                if (textOfQuestion === "Dropdown" || textOfQuestion === "Checkboxs" || textOfQuestion === "Multiple Choice") {
                    let options = card.querySelector('.left').querySelectorAll('.form-check-label .border-0');
                    let optionValues = [];
                    console.log(options)
                    optionValues = [...options].map((p) => {
                        const value = p.value
                        if(value.trim()===""){
                            alert('The option value is empty')
                            error=1;
                            return;
                        }
                        return value
                    })
                    questionElement = {
                        textOfQuestion,
                        question,
                        optionValues
                    }
                }
                else {
                    questionElement = {
                        textOfQuestion,
                        question,
                    }
                }
                finalQuestions.push(questionElement)

            }
        })
        if(title.value.trim()===""){
            alert('the title is empty!!')
            return
        }
        if(error==1){
            return;
        }
        $.ajax({
            data: JSON.stringify({
                questionTitle: title.value,
                questionDescription: description.value,
                questions: finalQuestions
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: 'POST',
            url: '/process'
        })
            .done(function (data) {
                // toastr.success(data.result)
                alert('Successfully submited')
                location.reload()
                //  $('#output').text(data.output).show();
            });
    });
})