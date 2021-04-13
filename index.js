console.log("index.js");

// var client = mqtt.connect({ host: 'test.mosquitto.org', port: 8081 });
// or
var client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt');

// var client  = mqtt.connect({ host:'mqtt.eclipse.org/mqtt', port: 443})
// or
// var client  = mqtt.connect('wss://mqtt.eclipse.org:443/mqtt')

$("#connectBtn").on('click', function() {
    $("#status").val('Connecting...')
    client.on('connect', function() {
        $("#status").val('Connected!')
        $("#pub-button").on('click', () => {
            if ($("#pub-Pay").val() != '' && $("#pub-Top").val() != '') {
                now = new Date().toLocaleTimeString()
                console.log();
                client.publish($("#pub-Top").val(), $("#pub-Pay").val())
                $("#publish tbody").prepend('<tr><td>' + $("#pub-Top").val() + '</td><td>' + $("#pub-Pay").val() + '</td><td>' + new Date().toDateString() + " " + now.substring(0, now.length - 2) + '</td></tr>');
            }
        })
        $("#sub-button").on('click', function() {
            if ($("#sub-Top").val() != '') {
                client.subscribe($("#sub-Top").val());
                now = new Date().toLocaleTimeString()
                $("#subscribe tbody").prepend('<tr><td>' + $("#sub-Top").val() + '</td><td >' + new Date().toDateString() + " " + now.substring(0, now.length - 2) + '</td></tr>');
            }
        })
    })
    $("#discon").on('click', () => {
        client = ""
        $("#status").val('Disconnected!')

    })

})
pubTopic = $("#pub-Top").val();
message = $("#pub-Pay").val();
now = new Date().toLocaleTimeString();
client.on('message', function(pubTopic, message) {
    $("#incoming tbody").prepend('<tr><td>' + pubTopic + '</td><td>' + message + '</td><td>' + new Date().toDateString() + " " + now.substring(0, now.length - 2) + '</td></tr>');
})


$('#clearIn').on('click', () => {
    $("#incoming tbody").empty()
})
$('#clearPu').on('click', () => {
    $("#publish tbody").empty()
})
$('#clearSu').on('click', () => {
    $("#subscribe tbody").empty()
})

var textWrapper = document.querySelector('.ml6 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
    .add({
        targets: '.ml6 .letter',
        translateY: ["1.1em", 0],
        translateZ: 0,
        duration: 750,
        delay: (el, i) => 50 * i
    }).add({
        targets: '.ml6',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });