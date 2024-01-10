let regForm = document.querySelector('.register-form');
let allInput=regForm.querySelectorAll('INPUT');
let allBtn = regForm.querySelectorAll('BUTTON');
let closeBtn = document.querySelector('.btn-close');
let regList = document.querySelector(".reg-list");
let addBtn = document.querySelector(".add-btn");
let searchEl = document.querySelector(".search");
let delAllBtn = document.querySelector(".delete-all-btn");
let allRegData=[];
let url="";

if(localStorage.getItem("allRegData") != null){

    allRegData = JSON.parse(localStorage.getItem('allRegData'))

}

// data adding to the localStorage code

regForm.onsubmit =(e)=>{
        e.preventDefault();
        let checkEmail = allRegData.find((data)=>data.email == allInput[2].value);
    if(checkEmail == undefined)
    {
      allRegData.push({
       name:allInput[0].value,
       admin:allInput[1].value,
      email:allInput[2].value,
      degree:allInput[3].value,
        mobile:allInput[4].value,
        profile: url ==""  ? "img.png" : url

    });
             
    localStorage.setItem('allRegData',JSON.stringify(allRegData));
    swal('data inserted','successfully!','sucess');
    closeBtn.click();
    regForm.reset('');
    getRegData();

    }
    else{
        swal('email already exists', 'failed','warning');
    }
       
}

const getRegData =()=>{
    regList.innerHTML =""
    allRegData.forEach((data,index)=>{
        let datastr = JSON.stringify(data);
        let finalData = datastr.replace(/"/g,"'") ;       
        regList.innerHTML +=`
        <tr>
        <td>${index+1}</td>
        <td><img src="${data.profile}" width="30"></td>
        <td>${data.name}</td>
        <td>${data.admin}</td>
        <td>${data.email}</td>
        <td>${data.degree}</td>
        <td>${data.mobile}</td>


        <td> <button data="${finalData}" index="${index}" class=" edit-btn btn p-1 px-2 btn-primary"><i class="fa fa-edit"></i></button>
            <button  index="${index}" class=" del-btn btn p-1 px-2  btn-danger "><i class="fa fa-trash"></i></button>


        </td>
    </tr>
`
    });
    action();
}

// Both updation and deleting the data from localstorage code

    const action =()=>{

        let allDelBtn = regList.querySelectorAll('.del-btn');
        for(let btn of allDelBtn)
        {
            btn.onclick= async ()=>{
               
            
                let isconfirm=await confirm();
                if(isconfirm){
                    let index= btn.getAttribute('index');
                    allRegData.splice(index,1);
                     localStorage.setItem('allRegData',JSON.stringify(allRegData));
                    getRegData();
                }
                // alert(isconfirm);

            
           
        }
        }



        // Editing or update the data
        let allEditBtn = regList.querySelectorAll('.edit-btn');
        for(let btn of allEditBtn)
        {
            btn.onclick=()=>{

                let index = btn.getAttribute('index');
                let datastr = btn.getAttribute('data');
                let finalData = datastr.replace(/'/g,'"');
                let data = JSON.parse(finalData);
                addBtn.click();
                allInput[0].value = data.name;
                allInput[1].value = data.admin;
                allInput[2].value = data.email;
                allInput[3].value = data.degree;
                allInput[4].value = data.mobile;
                url = data.profile;
                allBtn[0].disabled = false;
                allBtn[1].disabled = true;


                allBtn[0].onclick = ()=>{
                    allRegData[index] ={
                        name:allInput[0].value,
                          admin:allInput[1].value,
                          email:allInput[2].value,
                           degree:allInput[3].value,
                            mobile:allInput[4].value,
                            profile: url ==""  ? "img.png" : url
               
                   }
                   localStorage.setItem('allRegData',JSON.stringify(allRegData));
                   swal('data updated','successfully!','sucess');
                   closeBtn.click();
                   regForm.reset('');
                   getRegData();
                   allBtn[1].disabled = false;
                   allBtn[0].disabled = true;
                }

            }
        }
    }

getRegData();



// reading profile 

allInput[5].onchange = ()=>{

    let fReader = new FileReader();
    fReader.readAsDataURL(allInput[5].files[0]);
    fReader.onload=(e)=>{
        url = e.target.result;
        console.log(url);
    }
}

// delete all-data 

delAllBtn.onclick = async ()=>{
   let isConfirm = await confirm();
   if(isConfirm)
   {
    allRegData = [];
    localStorage.removeItem('allRegData');
    getRegData();
   }
}


//  swal message for confirmation

 const confirm =()=>{
    return new Promise((resolve,reject)=>{                          // recevie and reject (parameters)
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                resolve(true);
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
                reject(false);
              swal("Your imaginary file is safe!");
            }
          });

    }); 
 }

// searching data

 searchEl.oninput = ()=>{
    search();
 }
 const search=()=>{
  let value = searchEl.value.toLowerCase();
  let tr = regList.querySelectorAll('TR');
  let i;
  for(i=0; i<tr.length; i++){
    let allTd = tr[i].querySelectorAll('TD');
    let name = allTd[2].innerHTML;
    let email = allTd[4].innerHTML;
    let mobile = allTd[6].innerHTML;
    
     if(name.toLowerCase().indexOf(value) != -1)
     {
        tr[i].style.display = "";
     }
     else if(email.toLowerCase().indexOf(value) != -1)
     {
        tr[i].style.display = "";
     }
     else if(mobile.toLowerCase().indexOf(value) != -1)
     {
        tr[i].style.display = "";
     }
     else{
        tr[i].style.display = "none";
     }
}
}
