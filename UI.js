var box = document.querySelector(".content");
console.log(box)
  function showform(){
      box.innerHTML = `<form action="#">
                        <div id="alerted"></div>
                        <div class="form-group">
                        <label for="BookName">Enter Book Name</label>
                        <input type="text" class="form-control" id="BookName" aria-describedby="emailHelp" placeholder="Name">
                        </div>
                        <div class="form-group">
                        <label for="Author">Enter Author</label>
                        <input type="text" class="form-control" id="Author" placeholder="Author">
                        </div>
                        <div class="form-group">
                        <label for="IsbnNo">Enter ISBN</label>
                        <input type="text" class="form-control" id="IsbnNo" placeholder="ISBN">
                        </div>
                        <button class="btn btn-primary btn-block">ADD</button>
                      </form>`
}
function showtable(){
  var output ='';
  if(window.localStorage.getItem('books')!=null){
       let mybooks = [];
       mybooks = JSON.parse(window.localStorage.getItem('books'));
       mybooks.forEach((book)=>{
       output+= ` <tr>
                  <td scope="col">${book.name}</td>
                  <td scope="col">${book.author}</td>
                  <td scope="col">${book.ISBN}</td>
                  <td scope="col"><button class="btn btn-danger">X</button></td>
                  </tr>`
                   })
                 }
      else{
        output = ' ';
      }
  box.innerHTML = `<table class="table">
                  <thead>
                  <tr>
                 <th scope="col">BookName</th>
                 <th scope="col">Author</th>
                 <th scope="col">ISBN</th>
                 <th scope="col"></th>
                 </tr>
                 </thead>
                 ${output}
                 </table>`

}
function removeElem(){
      var remove = document.querySelectorAll('.btn-danger');
      remove.forEach((rem)=>{
        rem.addEventListener('click',()=>{
          var removable = rem.parentElement.parentElement;
          removable.parentNode.removeChild(removable);
        })
      })
}

let btn = document.querySelectorAll('button');

btn[0].addEventListener("click",showform);
btn[1].addEventListener("click",()=>{
    showtable();
    removeElem();
});
