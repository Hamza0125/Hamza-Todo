const addNewTODO=document.querySelector('#newTODO');
const searchTODO=document.querySelector('.search')
const inp=document.querySelector('#newADD');
const searchText=document.querySelector('#searchText');
const list=document.querySelector('#TodoList');
const list2=document.querySelector('#sameSearch');

let entry=[];

let id=0;

function updateList()
{
    let Todo = localStorage.getItem("Todo")
    list.innerHTML = ''
    if(Todo)
    {
        Todo = JSON.parse(Todo)
        Todo.map((T) => {
            let {val,ID} = T
            list.innerHTML +=
        `
        <li
					class="
						list-group-item
						d-flex
						justify-content-between
						align-items-center
					"
				>
					<span>${val}</span>
					<i class="far fa-trash-alt delete" onclick="onDelete(${ID})" ></i>
		</li>
      `;
            
        })
    }
    
}


function onDelete(ID){
    // console.log('On Delete');
    ID=parseInt(ID);
    let element = localStorage.getItem("Todo")
    if(element)
    {
        element = JSON.parse(element)
        element = element.filter(mark =>mark.ID !== ID);
        // console.log(element);
        let b = JSON.stringify(element)
        localStorage.setItem('Todo',b)
        updateList()
    }
}

addNewTODO.addEventListener('submit',function(e){
    
    e.preventDefault()
    entry={
        val: inp.value,
        ID: id+=1
    };
    
    if(!localStorage.getItem('Todo')){
        let Todo=[entry];
        T=JSON.stringify(Todo)
        localStorage.setItem('Todo',T);
        
    }
    else{
        let t=localStorage.getItem('Todo');
        console.log(t);
        B=JSON.parse(t)
        B.push(entry)
        T=JSON.stringify(B)
        localStorage.setItem('Todo',T)
        // updateList(entry);
    }
    updateList(entry);
    this.reset();
    
})

function listSearch(text){
    
    let element=localStorage.getItem('Todo');
    console.log('==>',element);
    element=JSON.parse(element);
    for (ele of element){
        // console.log(ele.val);
        if(text === ele.val){
            console.log('Here',ele.val);
            list2.innerHTML=`
            <li
                        class="
                            list-group-item
                            d-flex
                            justify-content-between
                            align-items-center
                        "
                    >
                        <span>${ele.val}</span>
                        <i class="far fa-trash-alt delete" onclick="onDelete(${ele.ID})" ></i>
            </li>
          `;

        }
        else if(text===''){
            list2.innerHTML='';
        }
    }
    this.reset;
}

searchTODO.addEventListener('submit',function(e){
    e.preventDefault();
    variable=searchText.value;
    listSearch(variable);
})