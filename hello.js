 
// console.log(document.body.getElementsByTagName("p")[0].hidden = false);
// document.getElementsByTagName("p")[0].removeAttribute("style")

// console.log(document.getElementsByTagName("p")[0].setAttribute(`id`,  "newId"))
// console.log(document.getElementsByTagName("p")[0].setAttribute("class", "para para2"))
// console.log( document.getElementsByTagName("p")[0].dataset)

// const ele = document.createElement("span");
// ele.innerHTML = "<i> This is span tag </i>";
// const ele2 = document.createElement("p");
// ele2.innerHTML = "<b> new Paragraph </b>"


// document.getElementsByTagName("ul")[0].before(ele)
// const target = document.getElementsByTagName("ul")[0].lastElementChild

// target.after(ele);
// console.log(document.getElementsByTagName("ul")[0]) 

// console.log(document.body.getElementsByTagName("div")[0].insertAdjacentHTML('afterbegin', "<i> This is span tag </i>    "))  
// document.body.getElementsByTagName("div")[0].append(ele)

// function fun(a){
//     console.log("in fun ", a); 
// }

// console.log(document.getElementById("myDiv").className = "nayaClass") 
// fun();
// fun();
// fun();

//     console.log(document.getElementById("myDiv").classList.contains("name1"));
// console.log(document.getElementById("myDiv").innerHTML += `assd${}`)  
// console.log("before");

// let id  = setTimeout(()=>{alert("hey")}, 1000)
// for(let i=0; i<2; i++){
//     setInterval(fun, 1500, i);
//     console.log("i = ", i)
// }

// setTimeout(()=>{console.log("hey");}, 1000)
// let i=0;
// i++;
// console.log("after");


// function fun(){
//     console.log("dragging..");

// }
// function fun2(){
//     console.log("dragged end");
// }

// let ele = document.getElementById("myDivId");

// let listen1 = ele.addEventListener('click', fun)  

// let listen2 = ele.addEventListener('click' , fun2)
// let input = prompt("enter 1 or 2");

// if(input == '1'){
//     console.log(ele.removeEventListener('click', fun2))
// }

// ele.onanimationstart()

// console.log(listen1, listen2);

// ele.addEventListener('dblclick' , ()=>{  
//     console.log("doubled clicked ");
// })

// ele.addEventListener('select' , ()=>{
//     console.log("selected ");
// })

// let parent = document.getElementsByClassName("box")[0].children;


// Array.from(parent).forEach(element => {
//     element.addEventListener('dragstart', (event)=>{
//         // console.log("started");
//         event.dataTransfer.setData('Text', element.id);
//         element
//     });



// });

// let ele = document.getElementById("box1");
// ele.addEventListener('dragstart', (event)=>{
//     // console.log("started");  
//     event.dataTransfer.setData('Text', ele.id);
// });

// ele.addEventListener('drag', ()=>{
//     // console.log("started");
//     ele.parentElement.style.opacity = "0.6"
// });

// ele.addEventListener('dragend', ()=>{
//     // console.log("started");
//     ele.style.removeProperty("opacity")
// });

// let ele2 = document.getElementById("box2");

// ele2.addEventListener('dragenter', (event)=>{
//     let t = event.dataTransfer.getData('Text');
//     console.log(t);
//     t.parentElement.style.removeProperty("opacity")
// })

// ele2.addEventListener('dragover', (event)=>{
//     event.preventDefault();
//     let t = event.dataTransfer.getData('Text');
//     console.log(t);
//     // t.parentElement.style.removeProperty("opacity")
// })

// ele2.addEventListener('drop', (event)=>{
//     let t = event.dataTransfer.getData('Text');
//     console.log(t);
//     ele2.appendChild(document.getElementById(t).firstElementChild);
//     // t.parentElement.style.removeProperty("opacity")
// })

// function numToDay(n){
//     switch(n){
//         case 1: return "Monday"; break;
//         case 2: return "Tuesday"; break;
//         case 3: return "Wednesday"; break;
//         case 4: return "Thursday"; break;
//         case 5: return "Friday"; break;
//         case 6: return "Saturday"; break;
//         case 7: return "Sunday"; break;
//     }
// }

// function update(){
//     let obj = new Date();

//     let day = document.getElementById("s1");
//     let date = document.getElementById("s2");
//     let year = document.getElementById("s3");

//     day.innerText = numToDay(obj.getDay());
//     date.innerText = obj.getDate();
//     year.innerText = obj.getFullYear();

//     let clock = document.getElementsByClassName("clock")[0];

//     document.getElementById("hour").style.rotate =  ((obj.getHours())*15) +"deg";
//     document.getElementById("min").style.rotate =  ((obj.getMinutes())*4) +"deg";
//     document.getElementById("sec").style.rotate =  ((obj.getSeconds())*6) +"deg";

// }   

// let id1 = setInterval(update, 1000)


// let p = new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//         console.log("hello");
//         reject()
//     }, 2000)
// });

// p.then(()=>{
//     console.log("hogaya..");
//     return new Promise((resolve, reject)=>{
//         reject();
//     })
// },
// ()=>{
//     console.log("first promise nahi hua")
// })
// .then(()=>{
//     console.log("dusra promise bhi hogaya.")
// },
// ()=>{
//     console.log("Dusra promise nahi huaa..")
// })

// console.log("At the End")


// let loadScript = function(src){
//     let p = new Promise((resolve, reject)=>{
//         let script = document.createElement("script");
//         script.src = src;
//         document.firstElementChild.append(script);
//         script.onload = ()=>{
//             resolve("script has been loaded");
//         }
//         script.onerror = ()=>{
//             reject("some error occur on script loading");
//         }
//     })
//     return p;
// }

// let result1 = loadScript("../MiniProject/hello.js");

// result1.then((val)=>{
//     console.log(val);
//     return loadScript("https://code.jquery.om/jquery-3.3.1.slim.min.js");
//     // return new Error('error');
// })
// .then((val2)=>{
//     console.log(val2)
// })
// .catch((val)=>{
//     console.log(val);
// })


// console.time("l1");
// // console.time("l2");
// let p1 = new Promise((resolve, reject)=>{
//     setTimeout(()=>{resolve(1)}, 4000);
// })

// let p2 = new Promise((resolve, reject)=>{
//     setTimeout(()=>{resolve(2)}, 3000);
// })

// let p3 = new Promise((resolve, reject)=>{
//     setTimeout(()=>{resolve(3)}, 4000);
// })


// Promise.all([p1, p2, p3])
// .then((arrOfProm)=>{
//     console.timeEnd("l2");

//     arrOfProm.forEach((prom)=>{
//         console.log(prom);
//     });

//     console.log (typeof arrOfProm)
//     console.log("All promise has Resolved")
//     console.timeEnd("l1")
// })
// .catch((arrOfProm)=>{
//     console.timeEnd("l2");

//     console.log((arrOfProm))
//     console.log("All promise Not Resolved");
// })


// Promise.allSettled([p1, p2, p3])
// .then((arrOfProm)=>{
//     console.log("all settled",arrOfProm);
// })
// .catch((arrOfProm)=>{
//     console.log(arrOfProm);
// })

// Promise.race([p1, p2, p3])
// .then((arrOfProm)=>{
//     console.log(arrOfProm);
// })
// .catch((arrOfProm)=>{
//     console.log(arrOfProm);
// })

// Promise.any([p1, p2, p3]).then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// });


// Promise.resolve(p1)
// .then((val)=>{
//     console.log("promise has resolved with value ", val);
// })
// .catch((res)=>{
//     console.log("error has occured with reason ", res);
// })



// let p = new Promise(
//     function createOrderSummary(resolve, reject){
//         // creating order summary ..
//         setTimeout(()=>{
//             console.log("order summary has created");
//             resolve();  
//         }, 1000)
//     }
// )
// p.then(()=>{
//         return new Promise(
//         function proceedToPayment(resolve, reject){
//             // payment page loading..
//             setTimeout(()=>{
//                 console.log("you can pay now");
//                 reject("Error occur in Payemnt gateway");    
//             }, 2000);
//         })
// })
// .then(()=>{
//     return new Promise(
//     function showOrderSummary(resolve, reject){
//         // payment page loading..
//         setTimeout(()=>{
//             console.log("you have ordered this Item");
//             resolve();    
//         }, 3000);
//     })
// })
// .then(()=>{
//     return new Promise(
//     function updateBalance(resolve, reject){
//         console.log("500 rupees left");
//         resolve();
//     });
// })
// .catch((err)=>{
//     console.log(err)
// })



// let p = new Promise((res, rej)=>{
//     setTimeout(()=>{
//         // console.log("Processing..");
//         res(1);
//         console.log("process 1 has been completed");
//         }, 6003);
//     })


// let p2 = new Promise((res, rej)=>{
//     setTimeout(()=>{
//         // console.log("Processing..");
//         res(1);
//         console.log("process 2 has been completed");
//         }, 3000);
//     })
    
// async function fun(){
//     console.log('calling promise');
//     const val = await p;
//     console.log('value of promise 1 is ', val)

//     const val2= await p2;
//     console.log('value of promise 2 is ', val2);
// }
// fun();




// try{
//     // setTimeout(()=>{
//         try{
//             throw new ReferenceError("I am Error")          
//         }                                                   
//         catch(e){
//             console.log(e.message);
//             throw new SyntaxError("I am Syntax Error"); 
//         }
//         finally{
//             console.log("I am inner finally");
//             return;
//         }                                                  
//         // console.log("No error genrated ")                                                                                                                                            
//     // }, 1000);                                                                                                                                                               
// }
// catch(err){
//     console.log( err.message);
//     // console.log(err.name);
//     // console.log( err.stack);
// }
// finally{
//     console.log('In finally block');
// }

// console.log("Javascript will not stop, Outside code is Execting..");




// 1 question 

// const promise = new Promise((resolve, reject)=>{
//     const ele = document.createElement("script");
//     ele.src = "https://code.jquery.com/jquery-3.3.1.slim.min.js";
//     document.firstElementChild.appendChild(ele)

//     ele.onload =    ()=>{
//         resolve();
//     }
// })
// .then(()=>{
//     console.log("Script has loaded");
// })
// console.log("At End");

// 2 question
// const promise = new Promise((resolve, reject)=>{
    
//     const ele = document.createElement("script");
//     ele.src = "https://code.jquery.com/jquery-3.3.1.slim.min.js";
//     document.firstElementChild.appendChild(ele)
//     ele.onload = ()=>{
//        resolve();
//     }
// })

// async function loatScript(){
//     ele = await promise;
//     console.log("Script has loaded");
// }
// loatScript();
// console.log("At End");

// 3 quesion
// const promise = new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//         reject("Rejected");
//     }, 30)
// })
// async function fun(){
//     try{
//         const p = await promise;
//     }
//     catch(err){
//         console.log("promise Settled", err);
//     }
// }

// fun()
// // .then((val)=>{
// //   console.log(val);  
// // }, (err)=>{
// //     console.log(err);
// // });
// console.log("At End");

// 4 question
// function fun1(){
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             resolve("resolve 1");
//         }, 1000)
//     })
// }

// function fun2(){
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             resolve("resolve 2");
//         }, 3000)
//     })
// }

// function fun3(){
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             resolve("resolve 3");
//         }, 2000)
//     })
// }
// async function fun(){
//     console.log("waiting for all promise to fullfill");
//     try{
//         console.time("1")
//     // we are waiting for each promise to settled thus take more time 
//         // let p1 = await fun1();
//         // let p2 = await fun2();
//         // let p3 = await fun3();

//     // we schedule all of promise together take less time 
//         let p1 = fun1();
//         let p2 = fun2();
//         let p3 = fun3();

//     // if all promise resolve then no error generated 
//         const all = await Promise.all([p1, p2 , p3]);
//         console.timeEnd("1")
//         console.log(all);
//     }
//     catch(err){
//         console.log(err);
//     }
// }
// fun()
// console.log("At End");



