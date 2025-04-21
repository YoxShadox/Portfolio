var typed= new Typed(".text",
    {
    strings:["Teacher","UI/UX Designer","Web Devloper"],
    typeSpeed: 80,
    backSpeed: 100,
    backDelay: 800,
    loop: true
});
setTimeout(function() {
        var alert = document.querySelector('.alert, .success');
        if (alert) {
            alert.style.display = 'none';
        }
    }, 5000); // Hide after 5 seconds

