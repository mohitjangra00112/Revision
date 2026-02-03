
// Js oops Basics --> Class , constructor , inheritance , static variables , super keyword , create object 

class Animal{
         category = "Mammal";
  static name= "dog";

    eat(){
        console.log("dog eats");
    }

    constructor(lifespan , speed){
           this.lifespan = lifespan;
           this.speed = speed ; 
    }

}

class Dog extends Animal {

    constructor (lifespan , speed , tail){
              super(lifespan , speed);
              this.tail= tail;
    }

}


//// Parent Class

let a1 = new Animal("20 years" , 40);

a1.eat();
console.log(Animal.name);
console.log(Animal.lifespan);
console.log(a1.lifespan);


//// Child class


let d1 = new Dog("15 years" , 30 , " curved tail");

console.log( "" , d1.lifespan , d1.speed, d1.tail );
d1.eat();
console.log(" Parent class normal variable  " , d1.category);
console.log( "Parent class static variable " , Dog.name);