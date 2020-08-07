
function countDown(){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            var javaObj = JSON.parse(request.response);
            var month = javaObj.month;
            var day = javaObj.day;
            let now = new Date();
            let eventDate = new Date(now.getFullYear(), month, day);

            let currentTime = now.getTime();
            let eventTime = eventDate.getTime();

            let restTime = eventDate - currentTime;

            let s = Math.floor(restTime/1000);
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

            if (d!=0){
                document.getElementById("birthdayName").innerHTML = "Still have "+d+"days before "+javaObj.name + " birthday."
            }else{
                document.getElementById("birthdayName").innerHTML = "Today is "+javaObj.name+" birthday."
            }

        }
    }
    request.open('GET','data.json',true);
    request.send();
}
countDown();