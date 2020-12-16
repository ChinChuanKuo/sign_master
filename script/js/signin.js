let items = {};

function solution_data() {
    let url = window.location.href;
    switch (url.indexOf("?")) {
        case -1:
            $("body").append(error_string("undefined this database"));
            break;
        default:
            let hash = url.slice(url.indexOf('?') + 1).split('&');
            for (let i = 0; i < hash.length; i++) {
                if (hash[i].indexOf("=") != -1) {
                    items[hash[i].split('=')[0]] = decodeURI(hash[i].split('=')[1]);
                }
            }
            signAJax(items, "http://221.222.222.181:6450/Signin/post");
            break;
    }
}

function error_string(value) {
    return `<div style='position:absolute;top:50%;right:50%;transform:translate(50%,-50%);'><h2 style='color:rgba(255,0,0,0.8);font-size:x-large;line-height:1.16667em;letter-spacing:0em;font-weight:500;text-transform:uppercase;'>${value}</h2></div>`;
}

function general_string(items) {
    let subject = general_typography(items.subject), name = general_typography(items.name), note = `<div>${general_typography(items.note)}</div>`;
    return `<main style='position:absolute;flex-grow:1;top:60px;right:32px;left:32px;height:auto;'><div style='margin:0 auto;width:95%;max-width:95%;flex-basis:95%;'><div style='margin:0 auto;padding:0px 32px;max-width:770px;flex-basis:100%;'>${container_row(auto_item(subject) + no_item(name))}${note}</div></div></main>`;
}

function general_typography(value) {
    return `<h2 style='color:rgba(0,0,0,0.8);font-size:1.3125em;line-height:1.5em;letter-spacing:0em;font-weight:500;'>${value}</h2>`;
}

function container_row(data) {
    return `<div style='flex-direction:row;justify-content:space-around;align-items:center;width:100%;display:flex;'>${data}</div>`;
}

function auto_item(value) {
    return `<div style='flex-grow:1;width:auto;max-width:100%;flex-basis:0;'>${value}</div>`;
}

function no_item(value) {
    return `<div style='width:auto;'>${value}</div>`;
}

function general_button(id, value) {
    return `<button id=${id} class='btn btn-danger'>${value}</button>`;
}

function general_textarea(id, label) {
    return `<div class='form-group'><label for=${id}>${label}</label><textarea id=${id} class='form-control' row='3'></textarea></div>`
}

function searchAJax() {
    const sItemData = {};
    sItemData.items = items;
    $.ajax({
        url: "http://221.222.222.181:6450/Sign/get",
        method: "POST",
        data: JSON.stringify(sItemData),
        dataType: "JSON",
        contentType: "application/json; charset=utf-8",
        processData: false,
        success: function (data) {
            console.log(data);
            switch (data.status) {
                case "istrue":
                    $("body").html("this form sign successfully");
                    $("body").append(general_string(data.items));
                    break;
                default:
                    $("body").html(error_string("undefined this database"));
                    break;
            }
        },
        error: function (xhr, status, error) {
            $("body").html(error_string("this database has problem"));
            console.error(xhr.responseText);
        }
    });
}

function signAJax(items, url) {
    const sItemData = {};
    sItemData.items = items;
    $.ajax({
        url: url,
        method: "POST",
        data: JSON.stringify(sItemData),
        dataType: "JSON",
        contentType: "application/json; charset=utf-8",
        processData: false,
        success: function (data) {
            console.log(data);
            switch (data.status) {
                case "istrue":
                    searchAJax();
                    break;
                default:
                    $("body").html(error_string("undefined this database"));
                    break;
            }
        },
        error: function (xhr, status, error) {
            $("body").html(error_string("this database has problem"));
            console.error(xhr.responseText);
        }
    });
}

/*function sign_action() {
    $("#surebutn").unbind("click").bind("click", function () {
        $(".btn.btn-danger").attr("disabled", true);
        items["note"] = $("#textarea").val();
        signAJax(items, "http://221.222.222.181:6450/Signin/post");
    });
    $("#backbutn").unbind("click").bind("click", function () {
        $(".btn.btn-danger").attr("disabled", true);
        items["note"] = $("#textarea").val();
        signAJax(items, "http://221.222.222.181:6450/Signout/post");
    });
}*/

$(document).ready(function () {
    solution_data();
})