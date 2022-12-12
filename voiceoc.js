const riskAlgo =(inputApi)=>{
    const {age=null, dependents=null,house=null, income=null, marital_status=null, risk_questions=null, vehical=null} = inputApi || {};
    const {ownership_status= null } =house || {};
    const {year=null} = vehical || {};
      
    let autoval = homeval =0; let disabilityval ; let lifeval ;
    
    let auto = (val,operation) => autoval = operation === "add"?  autoval +=val:  autoval -=val;
    let disability = (val,operation) =>{
        if(disabilityval !=='ineligible')
         disabilityval = operation === "add"?  disabilityval +=val:  disabilityval -=val
        };
    let home = (val,operation) => homeval = operation === "add"?  homeval +=val:  homeval -=val;
    let life = (val,operation) =>{ 
        if(lifeval !=='ineligible')    
         lifeval = operation === "add"?  lifeval +=val:  lifeval -=val;
    }
   
    if(income === null ||0 && vehical === null||0 && house=== null||0 ){
        return {
            "auto":"ineligible",
            "disability" : "ineligible",
            "home":"ineligible",
            "life":"ineligible"
        }
    }

     if(income === 0 )
      disabilityval = 'ineligible';
   
     if(age>60)
       disabilityval = lifeval = 'ineligible';
    
     if( age<30 ){
        auto(2,"sub");
        disability(2,"sub");
        home(2,"sub");
        life(2,"sub")
    } 

     if((age<=40 && age>=30)  || income>2000000){
        auto(1,"sub");
        disability(1,"sub");
        home(1,"sub");
        life(1,"sub");    
    }

    if(ownership_status === 'mortgaged'){
        disability(1,"add");
        home(1,"add");
    }

    if(!dependents){
        disability(1,"add");
        life(1,"add");   
    }

    if(marital_status === 'married'){
        life(1,"add"); 
        disability(1,"sub");
    }

    if((2022 -year)<=5 )
    auto(1,"add");

   autoval = assignstatus(autoval);
   disabilityval = assignstatus(disabilityval);
   homeval = assignstatus(homeval);
   lifeval = assignstatus(lifeval);

    return {
        "auto":autoval,
        "disability" : disabilityval,
        "home":homeval,
        "life":lifeval
    }    
}

function assignstatus(val){

    if(val !== 'ineligible'){
        if(val<=0)
        val = 'economic';
        else if(val>=3)
        val = "responsible"
        else
        val = "regular"
    }
    return val;
}

//NOTE test cases---------------------------------------------------
let inputApi_doc = {
    "age":35,
    "dependents": 2,
    "house":{"ownership_status":"owned"},
    "income":0,
    "marital_status": "married",
    "risk_questions": [0,1,0],
    "vehical":{"year":2018}
}

let inputApi_1 = {
    "age":35,
    "dependents": 2,
    "marital_status": "married",
    "risk_questions": [0,1,0],
}

let inputApi_2 = {
    "age":63,
    "dependents": 2,
    "house":{"ownership_status":"owned"},
    "income":0,
    "marital_status": "married",
    "risk_questions": [0,1,0],
    "vehical":{"year":2018}
}

let inputApi_3 = {
    "age":3,
    "dependents": 2,
    "house":{"ownership_status":"owned"},
    "income":10,
    "marital_status": "married",
    "risk_questions": [0,1,0],
    "vehical":{"year":2018}
}

// NOTE : inputApi1 means checked on risk statement 1 etc
console.log(riskAlgo(inputApi_doc));// the output to the give Example in docis wrong , this risk algo is getting correct output
console.log(riskAlgo(inputApi_1));
console.log(riskAlgo(inputApi_2));
console.log(riskAlgo(inputApi_3));