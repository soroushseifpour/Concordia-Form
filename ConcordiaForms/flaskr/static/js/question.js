const dataHandle = async () => {
    // const url = "http://www.site.com/234234234"
    const strs = location.pathname.split('/');
    const id = strs.at(-1)
    const data = await fetch(`/getdata/${id}`)
    const response = await data.json();
    const items = JSON.parse(response.response)
    const copy = { ...items }
    makingTemplate(copy)
}
const simpleInput = (question, id) => {
    return `
        <div class="card mt-2 w-100" id='cardSimpleText${id}'>
         <div class="card-header">${question}</div>
            <div class="card-body">
            <div class="form-group">
            <label for="exampleInputEmail1">answer</label>
            <input type="email" class="form-control" />
          </div>
        </div>
      </div>
    `
}
const file = (question, id) => {
    return `
        <div class="card mt-2 w-100" id='cardFile${id}'>
            <div class="card-header">${question}</div>
            <div class="card-body">
            <div class="form-group">
                <label for="exampleInputEmail1">file</label>
                <input type="file" class="form-control" />
            </div>
            </div>
        </div>
    `
}
const textarea = (question, id) => {
    return `
    <div class="card mt-2 w-100" id='cardTextArea${id}'>
        <div class="card-header">${question}</div>
        <div class="card-body">
          <div class="form-group">
            <label for="exampleFormControlTextarea1">answer</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="${question}"
            ></textarea>
          </div>
        </div>
    </div>
    `
}
const checkboxOptions = (question, id, count, options) => {

    const optionsELement = options.map((item, index) => {
        return `
        <div class="form-check">
            <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox${index}"
            value="${item}"
            name="${question}"
            />
            <label class="form-check-label" for="inlineCheckbox${index}">${item}</label>
        </div>
        `
    });
    const finalCard = `
        <div class="card mt-2 w-100" id='cardOptions${id}'>
            <div class="card-header">${question}</div>
            <div class="card-body">
            ${optionsELement.map((item) => item).join('')}
            </div>
        </div>`
    return finalCard;

}
const radioOptins = (question, id, count, options) => {

    const optionsELement = options.map((item, index) => {
        return `
        <div class="form-check">
            <input class="form-check-input" type="radio" name="${question}" id="inlineRadio${id}" value="${item}">
            <label class="form-check-label" for="inlineRadio${id}">${item}</label>
        </div>
        `
    });

    const finalCard = `
        <div class="card mt-2 w-100" id='cardRadioOptions${id}'>
            <div class="card-header">${question}</div>
            <div class="card-body">
            ${optionsELement.map((item) => item).join('')}
            </div>
        </div>`
    return finalCard;

}
const dropDown = (question, id, count, options) => {
    const optionsELement = options.map((item, index) => {
        return `
                <option value="${item}">${item}</option>
        `
    });
    const finalCard = `
        <div class="card mt-2 w-100" id='cardRadioOptions${id}' >
            <div class="card-header">${question}</div>
            <div class="card-body">
            <div class="col-md-3 mb-3">
                <label for="validationDefault${id}" >answer</label>
                <select class="custom-select" id="Dropdown${id}" name="${question}">
                <option selected disabled value="">Choose...</option>
                ${optionsELement.map((item) => item).join('')}
                </select>
            </div>
            </div>
        </div>`
    return finalCard;
}
const makingTemplate=(data)=>{
    const title=data['title']
    const desc=data['description']
    const questions=data['questions']
    const submit=document.querySelector('.submit')
    const surveytitle=document.querySelector('.title')
    surveytitle.value=title;
    console.log(submit)
    questions.forEach((que,index)=>{
        if(que['textOfQuestion']==="Checkboxs"){
            console.log('first')
            const options=que['optionValues']
            const card=checkboxOptions(que['question'],index,index,options)
            submit.insertAdjacentHTML('beforebegin',card)    
        }
        else if(que['textOfQuestion']==="Dropdown"){
            const options=que['optionValues']
            const card=dropDown(que['question'],index,index,options)
            submit.insertAdjacentHTML('beforebegin',card)
        }
        else if(que['textOfQuestion']==="Paragraph"){
            const card=textarea(que['question'],index)
            submit.insertAdjacentHTML('beforebegin',card)
        }
        else if(que['textOfQuestion']==="File upload"){
            const card=file(que['question'],index)
            submit.insertAdjacentHTML('beforebegin',card)
        }
        else if(que['textOfQuestion']==="Short answer"){
            const card=simpleInput(que['question'],index)
            submit.insertAdjacentHTML('beforebegin',card)
        }
        else if(que['textOfQuestion']==="Multiple Choice"){
            const card=radioOptins(que['question'],index,index,que['optionValues'])
            submit.insertAdjacentHTML('beforebegin',card)
        }
    })
}
dataHandle()
// makingTemplate()
// btn.addEventListener('click', sendingData)