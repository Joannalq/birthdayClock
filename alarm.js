
function countDown(){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            let javaObj = JSON.parse(request.response);
            let allkeys = Object.keys(javaObj);
            let now = new Date();
            let currentTime = now.getTime();
            let distanceTime = [];
            let allValues = Object.values(javaObj);
            allValues.forEach((item)=>{
                let month = item.split(' ')[0]-1;
                let day = item.split(" ")[1];
                let eventDate = new Date(now.getFullYear(), month, day, 23, 59, 59);
                let eventTime = eventDate.getTime();
                let restTime = eventTime - currentTime;
                distanceTime.push(restTime);
            });
            let positive = distanceTime.filter((item)=>{return (item>=0);})
            let minimumTime = Math.min(...positive);
            let timeToDate = new Date(minimumTime+currentTime).toLocaleString();
            let dateToString = timeToDate.toString();
            let targetValue = dateToString.split("/")[0].concat(" ").concat(dateToString.split("/")[1]);
            let names = allkeys.filter((singleKey) => {
                return (javaObj[singleKey]==targetValue);})
            // console.log(names)
          
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

            if (d==0){
                document.getElementById('congraduation').innerHTML = `Today is ${names}'s birthday`;
            }else{
                document.getElementById('congraduation').innerHTML = `${names}'s birthday is coming soon`;
            }

        }
    }
    request.open('GET','data.json',true);
    request.send();
}
countDown();