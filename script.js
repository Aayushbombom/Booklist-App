var addbtn,nameinp,authinp,isbninp;

function mischief(){
 addbtn = document.querySelector('.btn-block');
 nameinp = document.querySelector('#BookName');
 authinp = document.querySelector('#Author');
 isbninp = document.querySelector('#IsbnNo')
  addbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    if(Validator.blank() && Validator.ISBNcheck() && Validator.isbnPresent()){
    var abook = new Book(nameinp.value,authinp.value,isbninp.value);
    storage.store(abook);
    Validator.alert('success','Book Added Successfully');
  }
  else if(Validator.ISBNcheck()==false)
    Validator.alert('danger','Please Enter Valid ISBN');
  });
}

class Book{
  constructor(nm,auth,isb){
    this.name = nm;
    this.author = auth;
    this.ISBN = isb;
  }
}
class storage{
  static getBooks(){
    let books = [];
    if(localStorage.getItem('books')!=null)
      books = JSON.parse(localStorage.getItem('books'));
      return books;
  }
  static store(bk){
    let books = storage.getBooks();
         books.push(bk);
         localStorage.setItem('books',JSON.stringify(books));
  }
  static delete(i){
      let mybooks = storage.getBooks();
      if(mybooks.length==1){
        localStorage.removeItem('books');
        console.log("hello");
      }else{
      mybooks.forEach((book,index)=>{
        console.log(book.ISBN === i);
        if(book.ISBN === i){
           mybooks.splice(index,1);
         }
      });
      localStorage.setItem('books',JSON.stringify(mybooks));
  }
}
}
class Validator{
    static alert(type,msg){
    let alertbox = document.querySelector('#alerted');
    alertbox.className = `alert alert-${type}`;
    alertbox.innerText = msg;
    window.setTimeout(()=>{
      alertbox.className = ``;
      alertbox.innerText = '';
    },2000);
    }
    static blank(){
       if(nameinp.value==''||authinp.value==''||isbninp.value==''){
           Validator.alert("danger","Please Enter all values");
           return false;
       }else{
         return true;
       }
    }
    static isValidISBN(isbn){
    let sum = 0;
    let arr = isbn.split("");
    //console.log(parseInt(arr[0]));
    for(let i=0;i<10;i++){
        sum+= parseInt(arr[i])*(10-i);
    }

    if(sum%11==0){
        return true;
    }else{
        return false;
    }
}
   static isValidISBN13(isbn){
   let sum = 0;
   let arr = isbn.split("");
//console.log(parseInt(arr[0]));
   for(let i=0;i<10;i++){
    sum+= parseInt(arr[i])*((i+1)%2==0?3:1);
   }

   console.log(sum%10);
    if(sum%10==0){
      return true;
   }else{
      return false;
    }
}
      static ISBNcheck(){
        let isbn = isbninp.value;
        if(isbn.length==10){
          return Validator.isValidISBN(isbn);
        }
        else if (isbn.length==13) {
          return Validator.isValidISBN13(isbn);
        }
        else{
           return false;
        }

      }
      static isbnPresent(){
         let res = true;
          let isbn = isbninp.value;
          var books = storage.getBooks();
          books.forEach((book)=>{
            if(book.ISBN==isbn){
              res=false;
              Validator.alert('info','Book Already Added');
            }
          });
          return res;
      }
}


//events
mischief();
var  bbtn = document.querySelector('#adder');
bbtn.addEventListener("click",()=>{
     mischief();
  });

var tabShower = document.querySelector('#tabBtn');
tabShower.addEventListener('click',()=>{
  var remove = document.querySelectorAll('.btn-danger');
  remove.forEach((rem)=>{
    rem.addEventListener('click',()=>{
      var id = rem.parentElement.previousElementSibling.textContent;
      storage.delete(id);
    })
  })
})
