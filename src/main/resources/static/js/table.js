const table = document.querySelector('#listTable');
const tbody = document.querySelector('#tbody');

const workno = document.querySelector('#workno')
const workname = document.querySelector('#workname')
const worktype = document.querySelector('#worktype')
const regdate = document.querySelector('#regdate')
const enddate = document.querySelector('#enddate')
const priority = document.querySelector('#priority')
const finished = document.querySelector('#finished')
const username = document.querySelector('input[name="username"]').value;

console.log(username);

loadTable();


function modifyList() {
    const modcols = document.querySelectorAll('[name="modcol"]');
    modcols.forEach((modcol) => {
        if (modcol.style.visibility === 'hidden' || modcol.style.visibility === '') {
            modcol.style.visibility = 'visible';
        } else {
            modcol.style.visibility = 'hidden';
        }
    });
}

function modifying(){
    const changeableCells = document.querySelectorAll('td[name="changeable"]');

    changeableCells.forEach(cell => {
        // 해당 셀의 입력 필드 선택
        const inputField = cell.querySelector('input[type="text"]');

        // 셀 내용 토글
        if (cell.childNodes[0].style.display !== 'none') {
            // 보이는 내용을 숨기고 입력 필드를 보이도록 설정
            cell.childNodes[0].style.display = 'none';  // 보이는 텍스트 숨김
            inputField.style.display = 'table-cell';    // 입력 필드 보임
            inputField.removeAttribute('readonly');      // 수정 가능하게 설정
        } else {
            // 반대의 경우
            cell.childNodes[0].style.display = 'table-cell'; // 텍스트 다시 보임
            inputField.style.display = 'none';               // 입력 필드 숨김
            inputField.setAttribute('readonly', true);       // 수정 불가능하게 설정
        }
    });
}

function removeList() {
    const rmvcols = document.querySelectorAll('[name="rmvcol"]');
    rmvcols.forEach((rmvcol) => {
        if (rmvcol.style.visibility === 'hidden' || rmvcol.style.visibility === '') {
            rmvcol.style.visibility = 'visible';
        } else {
            rmvcol.style.visibility = 'hidden';
        }
    });
}

function loadTable(){
    const options = {
        method : 'GET'
    }
    fetch(`/api/list`, options)
        .then((response)=>{
            if(!response.ok){
                throw new Error('리스트 조회 실패 : ' + response.status);
            }
            return response.json();
        })
        .then((obj) => {
            getTable(obj);
        })
        .catch((error) => {
            console.error('error', error);
        })
}

function getTable(obj){
    let str = '';
    if(obj && obj.length > 0){
        obj.forEach((dto) => {
            str += `
            <tr name="data">
                <td class="text-center">${dto.workno}</td>
                <td class="text-center">${dto.workname}</td>
                <td class="text-center">${dto.worktype}</td>
                <td class="text-center">${dto.regdate}</td>
                <td class="text-center">${dto.enddate}</td>
                <td class="text-center">${dto.priority}</td>
                <td class="text-center">${dto.finished}</td>
                <td class="text-center" style="visibility:hidden" name="modcol">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
                </td>
                <td class="text-center" style="visibility:hidden" name="rmvcol">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
                </td>
            </tr>
            `
        })
        tbody.innerHTML = str;
    }
}

function mouseHoverRow(){
    console.log("마우스 오버")
    const rows = table.querySelectorAll('tr');
    rows.forEach((row) => {
        row.addEventListener('mouseover', (e) => {
            console.log("작동")
            row.classList.add('bg-secondary-subtle');
        })
        row.addEventListener('mouseout', (e) => {
            console.log("해제")
            row.classList.remove('bg-secondary-subtle');
        })
    })
}

function insert()
{
    let tempStr = '';
    const vworkno = workno.value;
    const vworkname = workname.value;
    const vworktype = worktype.value;
    const vregdate = regdate.value;
    const venddate = enddate.value;
    const vpriority = priority.value;
    const vfinished = finished.value;


    const jsObj = {
        workname: vworkname,
        worktype: vworktype,
        priority: vpriority
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(jsObj)

    }

    fetch('/api/list', options)
        .then(response => {
            if (!response.ok) {
                throw new Error('요청 잘못됨');
            }
            return response.text();
        })
        .then(text => {
            let dto
            try{
                dto = JSON.parse(text);
            } catch(error){
                throw new Error('JSON 파싱 실패' + error.message);
            }
            tempStr = `
            <tr>
                <td class="text-center" name="unchangeable" style="display:table-cell">${dto.workno}</td>
                <td class="text-center" name="changeable" style="display:table-cell">${dto.workname}<input style="display:none" type="text" name="workno" th:value="${dto.workno}" readonly></td>
                <td class="text-center" name="changeable" style="display:table-cell">${dto.worktype}<input style="display:none" type="text" name="workno" th:value="${dto.worktype}" readonly></td>
                <td class="text-center" name="unchangeable" style="display:table-cell">${dto.regdate}</td>
                <td class="text-center" name="unchangeable" style="display:table-cell">${dto.enddate}</td>
                <td class="text-center" name="changeable" style="display:table-cell">${dto.priority}<input style="display:none" type="text" name="workno" th:value="${dto.priority}" readonly></td>
                <td class="text-center" name="changeable" style="display:table-cell">${dto.finished}<input style="display:none" type="text" name="workno" th:value="${dto.finished}" readonly></td>
                <td class="text-center" style="visibility:hidden" name="modcol">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                    </button>
                </td>
                <td class="text-center" style="visibility:hidden" name="rmvcol"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></td>
            </tr>
            `;
            tbody.innerHTML += tempStr;
        })
        .catch(error => {
            console.error('error : ', error);
    });
}
document.querySelector('#insert').addEventListener('click', () => {
    loadTable();
    insert();
    workname.value = '';
    worktype.value = '';
    priority.value = '';

})

document.querySelector('#modifyBtn').addEventListener('click', () =>{
    modifyList();
})

document.querySelector('#removeBtn').addEventListener('click', ()=>{
    removeList();
})