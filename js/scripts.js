let min = 0;
var max = {};
var warn = {};
let countView = document.querySelector('#countView');
var count = {};
var darkCookie = {};
var bgCookie = {};


window.onload = function () {
    count.a = getCookie("count");
    max = getCookie('max');
    warn = getCookie('warn');



    if (count.a == null) {
        count.a = 0;
    }
    if (max == null) {
        max = 40;
    }
    if (warn == null) {
        warn = 25;
    }

    //Place values in html
    $('.progress-bar').attr('aria-valuemax', max);
    $('#warnVal').val(warn);
    $('#maxVal').val(max);

    //Align Modal well
    $('.modal-dialog').css("margin-top", Math.max(0, ($(window).height() - 380) / 2));

    count.a = parseInt(count.a);

    darkCookie = getCookie('dark');
    bgCookie = this.getCookie('bg');

    if (darkCookie == null) {
        document.cookie = "dark:on;";
    } else if (darkCookie == 'off') {
        $('.masthead').toggleClass('darker');
        $('nav').toggleClass('bg-dark');
        $('nav').toggleClass('bg-light');
        $('nav').toggleClass('navbar-dark');
        $('nav').toggleClass('navbar-light');
    }

    if (bgCookie == null) {
        document.cookie = "bg=on";
        $('.masthead').removeClass('bg');
    } else if (bgCookie == 'off') {
        $('.masthead').removeClass('bg');
    }
}

//Change Variables
function setValues() {
    warnVal = parseInt($('#warnVal').val());
    maxVal = parseInt($('#maxVal').val());

    if (warnVal >= maxVal) {

        myalert("danger", `Your chosen warn value is too high`);
    } else {
        $('#formModal').modal('hide');

        count.a = 0;
        warn = parseInt(warnVal);
        max = parseInt(maxVal);


        document.cookie = `max=${max};`;
        document.cookie = `warn=${warn};`;

        $('.progress-bar').attr('aria-valuemax', max);

        $('.progress-bar').removeClass('bg-warning bg-danger');

        myalert("success", `Max set to ${max} and warning set to ${warn}`);
    }


}

// Maths Functions
{
    function add() {
        count.a = count.a + 1;
    }

    function subtract() {
        count.a = count.a - 1;
    }

    function reseta() {
        if (confirm("Are you sure you'd like to reset the counter? This cannot be undone.")) {
            count.a = 0;
            myalert('success', 'counter reset');
            $('.progress-bar').removeClass('bg-danger');
        }
    }
}

//Declare count
count = {
    aInternal: 10,
    aListener: function (val) {},
    set a(val) {
        this.aInternal = val;
        this.aListener(val);
    },
    get a() {
        return this.aInternal;
    },
    registerListener: function (listener) {
        this.aListener = listener;
    }
}


// Listener Function 
count.registerListener(function (val) {
    // console.log("Someone changed the value of count to " + val);

    if (count.a < min) {
        count.a = parseInt(getCookie("count"));
        myalert("warning", "sorry, the number of people can't go below " + min);
    } else if (count.a > max) {
        count.a = getCookie("count");
        myalert("danger", "sorry, the number of people can't exceed " + max);
        return;
    } else {
        var d = new Date();
        d.setTime(d.getTime() + (10 * 24 * 60 * 60 * 1000));

        document.cookie = `count=${count.a};expires:${d}`;
        countView.innerText = count.a;
        $('.progress-bar').attr('aria-valuenow', count.a);

        width = (count.a / max) * 100;
        $(".progress-bar").css("width", width + "%");

        if (count.a > warn && count.a < max) {
            $('.progress-bar').removeClass('bg-success bg-danger');
            $('.progress-bar').addClass('bg-warning');

            if (warned != true) {
                myalert('warning', "We're getting close to maximum occupancy.");
                warned = true;
            }
        } else if (count.a <= warn) {
            $('.progress-bar').removeClass('bg-warning');
            $('.progress-bar').addClass('bg-success');
            warned = false;
        } else if (count.a == max) {
            $('.progress-bar').removeClass('bg-warning');
            $('.progress-bar').addClass('bg-danger');
            myalert('danger', "We've reached maximum occupancy.");

        }

    }
});

function myalert(type, message) {
    document.getElementById('alertbox').innerHTML = `<div class='alert alert-${type} alert-dismissible slideup show ml-auto mr-auto' role='alert'><strong>${type}:</strong> ${message}.<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>`;
    setTimeout(() => {
        $('.alert').alert("close");
    }, 2000);
}

function togglebg() {
    if (bgCookie == 'on') {
        $('.masthead').toggleClass('bg');
        document.cookie = "bg=off";
    } else if (bgCookie == 'off') {
        $('.masthead').toggleClass('bg');
        document.cookie = "bg=on";
    }
}

function togglecolor() {
    $('.masthead').toggleClass('darker');
    $('nav').toggleClass('bg-dark');
    $('nav').toggleClass('bg-light');
    $('nav').toggleClass('navbar-dark');
    $('nav').toggleClass('navbar-light');

    if (darkCookie == "on") {
        darkCookie = 'off';
        document.cookie = "dark=off;";
    } else if (darkCookie == "off") {
        darkCookie = "on";
        document.cookie = "dark=on;";
    }
}

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    let begin = dc.indexOf(prefix);
    if (begin == -1) {
        return null;
    } else {
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
}

function hideMenu() {
    $('.navbar-collapse').removeClass('show');
}