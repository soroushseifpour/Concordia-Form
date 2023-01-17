let checkboxs = document.querySelectorAll('#listgroup input');
const ul = document.getElementById('listgroup')
function checkHandler(e) {
        checkboxs.forEach((item) => item.checked = false);
        e.currentTarget.checked = true;
}
const btn = document.querySelector('.send');
btn.addEventListener('click', () => {
        // console.log(checked)
        if (document.querySelector('#listgroup input:checked') === null)
                alert('please select one of the below forms')
        else {
                const id = document.querySelector('#listgroup input:checked').value
                location.pathname = "/question/" + id;
        }
})