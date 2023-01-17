const makingSelectOption=async ()=>{
    const response= await fetch('https://restcountries.com/v2/all');
    const data= await response.json()
    const options=data.map(d=>d.name)
    const optionsELement = options.map((item, index) => {
        return `
                <option value="${item}">${item}</option>
        `
    });
    const gender=document.querySelector('.gender')

    const finalCard = `
    <div class="form-group">
              <label for="country">Country</label>
              <select class="form-control form-control-sm" name="country">
                <option selected disabled value="">Choose...</option>
                ${optionsELement.map((item) => item).join('')}
              </select>
    </div>`;
    gender.insertAdjacentHTML("afterend",finalCard)
}
makingSelectOption()