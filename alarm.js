
function countDown(){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            let javaObj = JSON.parse(request.response);
            let allkeys = Object.keys(javaObj);
            let alldate = []
            allkeys.forEach(function(item){
                alldate.push(javaObj[item]);
            });
            let now = new Date();
            let currentTime = now.getTime();
            let distanceTime = [];
            alldate.forEach((item)=>{
                let eventDate = new Date(now.getFullYear(), item.split(" ")[0], item.split(" ")[1]);
                let eventTime = eventDate.getTime();
                let restTime = eventTime - currentTime;
                distanceTime.push(restTime);
            });
            let positive = distanceTime.filter((item)=>{return (item>=0);})
            let minimumTime = Math.min(...positive);
          
            let s = Math.floor(minimumTime/1000);
            let m = Math.floor(s/60);
            let h = Math.floor(m/60);
            let d = Math.floor(h/24);

            h %= 24;
            m %= 60;
            s %= 60;

            h = (h<10) ? "0"+h : h;
            m = (m<10) ? "0"+m : m;
            s = (s<10) ? "0"+s : s;

            document.getElementById("days").innerText = d;
            document.getElementById("hours").innerText = h;
            document.getElementById("minutes").innerText = m;
            document.getElementById("seconds").innerText = s;
            setTimeout(countDown, 1000);

            // if (d!=0){
            //     document.getElementById("birthdayName").innerHTML = "Still have "+d+"days before "+javaObj.name + " birthday."
            // }else{
            //     document.getElementById("birthdayName").innerHTML = "Today is "+javaObj.name+" birthday."
            // }

        }
    }
    request.open('GET','data.json',true);
    request.send();

    // let now = new Date();
    // let eventDate = new Date(now.getFullYear(), 10, 9);

    // let currentTime = now.getTime();
    // let eventTime = eventDate.getTime();

    // let restTime = eventDate - currentTime;

    // let s = Math.floor(restTime/1000);
    // let m = Math.floor(s/60);
    // let h = Math.floor(m/60);
    // let d = Math.floor(h/24);

    // h %= 24;
    // m %= 60;
    // s %= 60;

    // h = (h<10) ? "0"+h : h;
    // m = (m<10) ? "0"+m : m;
    // s = (s<10) ? "0"+s : s;

    // document.getElementById("days").innerText = d;
    // document.getElementById("hours").innerText = h;
    // document.getElementById("minutes").innerText = m;
    // document.getElementById("seconds").innerText = s;
    // setTimeout(countDown, 1000);
}
countDown();