
let min=0;
let max = 40;
let warn = 25;
let enter = document.getElementById('enter');
let leave = document.getElementById('leave');
let countView = document.getElementById('countView');
let countBar = document.getElementById('countBar');
var count ={};
var warned ={};



window.onload = function(){
    count.a = getCookie("count");


    if (count.a == null) {
        count.a = 0;
    }
    count.a = parseInt(count.a);
}

// Maths Functions
{
    function add() {
        count.a= count.a + 1;
    }

    function subtract() {
        count.a= count.a - 1;
    }

    function reseta() {
        if(confirm("Are you sure you'd like to reset the counter? This cannot be undone.")){
            count.a=0;
            myalert('success','counter reset');
        }
    }
}

//Declare count
count = {
        aInternal: 10,
        aListener: function(val) {},
        set a(val) {
            this.aInternal = val;
            this.aListener(val);
        },
        get a() {
            return this.aInternal;
        },
        registerListener: function(listener) {
            this.aListener = listener;
        }
    }


// Listener Function 
count.registerListener(function(val) {
    // console.log("Someone changed the value of count to " + val);

    if(count.a<min){
        count.a = parseInt(getCookie("count"));
        myalert("warning","sorry, The Number of people can't go below "+min);
    }else if(count.a>max){
        count.a = getCookie("count");
        myalert("danger","sorry, The Number of people can't exceed "+max);
        return;
    }else{
        document.cookie = "count="+count.a;
        countView.innerText = count.a;
        countBar.setAttribute('aria-valuenow',count.a);
        width= (count.a/max)*100;
        $(".progress-bar").css("width", width+"%");

        if(count.a>warn && count.a<max){
            $('.progress-bar').removeClass('bg-success bg-danger');
            $('.progress-bar').addClass('bg-warning');
            
            if(warned!=true){
                myalert('warning',"We're getting close to maximum occupancy.");
                warned = true;
            }
        }else if(count.a<=warn){
            $('.progress-bar').removeClass('bg-warning');
            $('.progress-bar').addClass('bg-success');
            warned = false;
        }else if(count.a == max){
            $('.progress-bar').removeClass('bg-warning');
            $('.progress-bar').addClass('bg-danger');
            myalert('danger',"We've reached maximum occupancy.");
            
        }

    }
});

function myalert(type,message){
    document.getElementById('alertbox').innerHTML = `<div class='alert alert-${type} alert-dismissible slideup show ml-auto mr-auto' role='alert'><strong>${type}:</strong> ${message}.<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>`;
    setTimeout(() => {   $('.alert').alert("close"); }, 1500);
}

function togglebg(){
    $('.masthead').toggleClass('bg');
}
function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
} 
