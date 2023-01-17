const dropdowning = document.querySelector('#dropdowning')
const dropdownItem = document.querySelectorAll('.dropdown-item')
const btnSubmit = document.querySelector('.submit')
const addingBtn = (element) => {
  const input = `
  <div class="form-group form-check d-flex  align-items-center">
    <input type="checkbox" class="mr-2" id="exampleCheck1" />
    <label class="form-check-label" for="exampleCheck1">
      <input
        placeholder="Write your Option"
        class="border-0"
        style="outline: none"
      />
    </label>
    <i class="fa-solid fa-trash"></i>
  </div>
  `;

  const left = element.parentElement.parentElement.parentElement.parentElement.querySelector('.left')
  element.insertAdjacentHTML('beforebegin', input)
  left.querySelectorAll('.fa-trash').forEach((item) => item.addEventListener('click', (e) => {
    // console.log(item.parentElement)
    item.parentElement.remove()
  }))
}
// btnDropDownName.parentElement
const dropdownHandler = (item) => {
  const clone = item.cloneNode(true)
  const btnDropdown = item.parentElement.parentElement.parentElement.querySelector('.btn-dropdown')
  const btnGroup = btnDropdown.parentElement
  // console.log(item.parentElement.parentElement.parentElement.querySelector('.btn-dropdown'))
  const replacing = btnGroup.querySelector('.item')
  replacing.remove()
  btnDropdown.insertAdjacentElement('afterbegin', clone)
}
const addingCheckBoxOptions = (item) => {
  // left.removeChild(left.firstChild.nextSibling)
  const left = item.parentElement.parentElement.parentElement.parentElement.querySelector('.left')
  const formGroup = left.querySelectorAll('.form-group')
  const btn = left.querySelector('.btn-adding')

  if (formGroup) {
    formGroup.forEach(fg => fg.remove())
  }
  if (btn) {
    btn.remove()
  }
  const input = `
    <div class="form-group form-check d-flex  align-items-center">
      <input type="checkbox" class="mr-2" id="exampleCheck1" />
      <label class="form-check-label" for="exampleCheck1">
        <input
          placeholder="Write your Option"
          class="border-0"
          style="outline: none"
        />
      </label>
      <i class="fa-solid fa-trash"></i>
    </div>
    `;

  const elemet = `
    <div class="form-group form-check d-flex ">
      <input type="checkbox" class="mr-2" id="exampleCheck1" />
      <label class="form-check-label" for="exampleCheck1">
        <input
          placeholder="Write your Option"
          class="border-0"
          style="outline: none"
        />
      </label>
    </div>
    <button class="btn btn-adding btn-outline-primary m-2">Add another option</button>
    `;
  left.insertAdjacentHTML("beforeend", elemet);
  const addAnotherOptionBtn = left.querySelector('.btn-adding');
  addAnotherOptionBtn.addEventListener('click', (e) => {
    e.currentTarget.insertAdjacentHTML('beforebegin', input)
    left.querySelectorAll('.fa-trash').forEach((item) => item.addEventListener('click', (e) => {
      console.log(e.currentTarget)
      // e.currentTarget.parentElement.remove()
    }))
  })
}
const addingmultiplechoice = (item) => {

  const left = item.parentElement.parentElement.parentElement.parentElement.querySelector('.left')
  const formGroup = left.querySelectorAll('.form-group')
  const btn = left.querySelector('.btn-adding')

  if (formGroup) {
    formGroup.forEach(fg => fg.remove())
  }
  if (btn) {
    btn.remove()
  }
  const input = `
    <div class="form-group form-check d-flex  align-items-center">
      <input type="radio" class="mr-2" id="exampleCheck1" />
      <label class="form-check-label" for="exampleCheck1">
        <input
          placeholder="Write your Option"
          class="border-0"
          style="outline: none"
        />
      </label>
      <i class="fa-solid fa-trash"></i>
    </div>
    `;

  const elemet = `
    <div class="form-group form-check d-flex ">
      <input type="radio" class="mr-2" id="exampleCheck1" />
      <label class="form-check-label" for="exampleCheck1">
        <input
          placeholder="Write your Option"
          class="border-0"
          style="outline: none"
        />
      </label>
    </div>
    <button class="btn btn-adding btn-outline-primary m-2">Add another option</button>
    `;
  left.insertAdjacentHTML("beforeend", elemet);
  const addAnotherOptionBtn = left.querySelector('.btn-adding');
  addAnotherOptionBtn.addEventListener('click', (e) => {
    e.currentTarget.insertAdjacentHTML('beforebegin', input)
    left.querySelectorAll('.fa-trash').forEach((item) => item.addEventListener('click', (e) => {
      e.currentTarget.parentElement.remove()
    }))
  })
}
let index = 1;
const addingDropdowing = (item) => {

  const left = item.parentElement.parentElement.parentElement.parentElement.querySelector('.left')
  const formGroup = left.querySelectorAll('.form-group')
  const btn = left.querySelector('.btn-adding')

  if (formGroup) {
    formGroup.forEach(fg => fg.remove())
  }
  if (btn) {
    btn.remove()
  }
  const input = (p) => {
    return (`
    <div class="form-group form-check d-flex  align-items-center">
    <label class="form-check-label" for="exampleCheck1">
    ${p}.
      <input type="text" 
      class="mr-2 border-0 "
      style="outline: none"  id="exampleCheck1" placeholder="option" />
     
      <i class="fa-solid fa-trash"></i>
    </div>
    
  </label>
    `)
  };

  const elemet = `
    <div class="form-group form-check d-flex ">
    <label class="form-check-label" for="exampleCheck1">
    ${index}.
    <input type="text" 
    class="mr-2 border-0 "
    style="outline: none" id="exampleCheck1" placeholder="option" />
    
    </div>
    
  </label>
    <button class="btn btn-adding btn-outline-primary m-2">Add another option</button>
    `;
  left.insertAdjacentHTML("beforeend", elemet);
  const addAnotherOptionBtn = left.querySelector('.btn-adding');
  addAnotherOptionBtn.addEventListener('click', (e) => {
    index++;
    e.currentTarget.insertAdjacentHTML('beforebegin', input(index))
    left.querySelectorAll('.fa-trash').forEach((item) => item.addEventListener('click', (e) => {
      e.currentTarget.parentElement.remove()
    }))

  })
}
const addingFileUploader = (item) => {

  const left = item.parentElement.parentElement.parentElement.parentElement.querySelector('.left')
  const formGroup = left.querySelectorAll('.form-group')
  const btn = left.querySelector('.btn-adding')

  if (formGroup) {
    formGroup.forEach(fg => fg.remove())
  }
  if (btn) {
    btn.remove()
  }
  const elemet = `
    <p class='form-group p-2 m-2'>This the file uploading section</p>
  `
  left.insertAdjacentHTML("beforeend", elemet);
}
const addingShortAnswer = (item) => {

  const left = item.parentElement.parentElement.parentElement.parentElement.querySelector('.left')
  const formGroup = left.querySelectorAll('.form-group')
  const btn = left.querySelector('.btn-adding')

  if (formGroup) {
    formGroup.forEach(fg => fg.remove())
  }
  if (btn) {
    btn.remove()
  }
  const elemet = `
    <p class='form-group p-2 m-2'>The user can provide short answer to this question</p>
  `
  left.insertAdjacentHTML("beforeend", elemet);
}
const addingParagraph = (item) => {

  const left = item.parentElement.parentElement.parentElement.parentElement.querySelector('.left')
  const formGroup = left.querySelectorAll('.form-group')
  const btn = left.querySelector('.btn-adding')

  if (formGroup) {
    formGroup.forEach(fg => fg.remove())
  }
  if (btn) {
    btn.remove()
  }
  const elemet = `
    <p class='form-group p-2 m-2'>The user can provide long answer to this question</p>
  `
  left.insertAdjacentHTML("beforeend", elemet);
}
////////////////////////////////////////////////////////////////////////////////////////////
const container = document.querySelector('.container')
const duplicateSection = (item) => {
  const parentCard = item.parentElement.parentElement;
  const cloneNode = parentCard.cloneNode(true)
  container.insertAdjacentElement('beforeend', cloneNode)

}
const addingSection = (item) => {
  const card =
    `
  <div class="card mt-4 d-flex flex-column w-50 cardquestion">
  <div class="d-flex align-items-center" style="width: 100%">
    <div class="left mr-2">
      <div class="">
        <input
          class="p-4 w-100 border-0 h4 question"
          style="outline: none"
          placeholder="Untitle One"
        />
        <div class="form-group form-check d-flex ">
          <input type="checkbox" class="mr-2" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            <input
              placeholder="Write your Option"
              class="border-0"
              style="outline: none"
            />
          </label>
        </div>
        <button class="btn btn-adding btn-outline-primary m-2" onclick="addingBtn(this)">Add another option</button>
      </div>
    </div>
    <div class="right">
      <div class="btn-group d-flex">
        <button
          class="btn-dropdown btn btn-outline-secondary btn-lg dropdown-toggle d-flex align-items-center"
          type="button"
          data-toggle="dropdown"
        >
        <div class="item m-0 p-0 d-flex">
          <i class="fa-solid fa-square-check mr-2"></i>
          <small>Checkboxs</small>
        </div>
        </button>
        <div class="dropdown-menu">
          <div
            class="dropdown-item d-flex justify-content-center align-items-center"
            href="#"
            id="checkbox"
            onclick="addingCheckBoxOptions(this)"
          >
          <div class="item" onclick="dropdownHandler(this)">
            <i class="fa-solid fa-square-check mr-2"></i>
            <small>Checkboxs</small>
          </div>
          </div>
        <div
            class="dropdown-item d-flex justify-content-center align-items-center"
            id="dropdowning"
            onclick="addingDropdowing(this)"
          >
          <div class="item" onclick="dropdownHandler(this)">
            <i class="fa-solid fa-caret-down mr-2"></i>
            <small>Dropdown</small>
          </div>
      </div>
          <div
            class="dropdown-item d-flex justify-content-center align-items-center"
            id="multiplechoice"
            onclick="addingmultiplechoice(this)"
          >
          <div class="item" onclick="dropdownHandler(this)">
            <i class="fa-solid fa-circle-dot mr-2"></i>
            <small>Multiple Choice</small>
          </div>
        </div>
          <div
            class="dropdown-item d-flex justify-content-center align-items-center"
            id="paragraph"
            onclick="addingParagraph(this)"
          >
          <div class="item" onclick="dropdownHandler(this)">

            <i class="fa-solid fa-align-left mr-2"></i>
            <small>Paragraph</small>
          </div>
        </div>
          <div
            class="dropdown-item d-flex justify-content-center align-items-center"
            id="fileuploader"
            onclick="addingFileUploader(this)"
          >
          <div class="item" onclick="dropdownHandler(this)">
            <i class="fa-solid fa-file-arrow-up mr-2"></i>
            <small>File upload</small>
          </div>
        </div>
          <div
            class="dropdown-item d-flex justify-content-center align-items-center"
            id="ShortAnswer"
            onclick="addingShortAnswer(this)"
          >
          <div class="item" onclick="dropdownHandler(this)">
            <i class="fa-regular fa-text mr-2"></i>
            <small>Short answer</small>
          </div>
        </div>
        </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="footer w-100 d-flex flex-row justify-content-end ">
      <div class="p-2 deleting" onclick="deletingSection(this)">
        <i class="fa-solid fa-trash"></i>
      </div>
      <div class="p-2 adding" onclick="addingSection(this)">
        <i class="fa-solid fa-plus"></i>
      </div>
      <div class="p-2 copying" onclick="duplicateSection(this)">
        <i class="fa-solid fa-copy"></i>
      </div>
      <div class="p-2">
        <input type="checkbox" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">
          required*
        </label>
      </div>
    </div>
</div 
  `;
  container.insertAdjacentHTML('beforeend', card)
}
const deletingSection = (item) => {
  console.log(item)
  const parentCard = item.parentElement.parentElement;
  console.log(parentCard)
  parentCard.remove()
}
