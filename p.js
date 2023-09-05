// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

const { useEffect } = require("react")

// const data = {
//     name: "mathura",
//     age: 28,
//     address: { address1: "hyderabad"}
// }

// const data1 = data

// const data2 = Object.assign(data)

// data.address.address1 = "bengalore";

// console.log(data1)
// console.log(data2)


console.log(undefined ?? "name") 
console.log(undefined || "name") 
console.log(undefined && "name") 
console.log(null ?? "name") 
console.log(null || "name")
console.log(null && "name")
console.log(false ?? "name")
console.log(false ||  "name")
console.log(false &&  "name")
console.log({} ?? "name")
console.log({} || "name")
console.log({} && "name")
console.log(0 ?? "name")
console.log(0 || "name")
console.log(0 && "name")
console.log("" ??"name")
console.log("" ||"name")
console.log("" &&"name")
// Interview Invite || CAW Studios || Second Technical Round || Full Stack Developer || Prashant Raj ! 



const useCheckOnline = () => {
    const [isOnline, setIsOnline] = useState();

    useEffect(()=> {
        setIsOnline(window.navigator.onLine)
    },[])

    return isOnline;

}
