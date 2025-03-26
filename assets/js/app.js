var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'), 
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning') 

let timeRunning = 3000 
let timeAutoNext = 7000

nextBtn.onclick = function(){
    showSlider('next')
}

prevBtn.onclick = function(){
    showSlider('prev')
}

let runTimeOut 

let runNextAuto = setTimeout(() => {
    nextBtn.click()
}, timeAutoNext)


function resetTimeAnimation() {
    runningTime.style.animation = 'none'
    runningTime.offsetHeight /* trigger reflow */
    runningTime.style.animation = null 
    runningTime.style.animation = 'runningTime 7s linear 1 forwards'
}
    

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('header');
    const navLinks = document.querySelectorAll('.navmenu a');
    console.log(window.scrollY);
    // If the horizontal scroll position is greater than 0
    if (window.scrollY > 50) {
        // Change text color to black
        navLinks.forEach(link => {
            link.style.color = 'black';
            navbar.style.backgroundColor = '#e43c5c';
        });
    } else {
        // Change text color back to white when scrolled to top
        navLinks.forEach(link => {
            link.style.color = '#ffffff';
            navbar.style.backgroundColor = 'transparent';   
        });
    }
});


$(".home").offsetHeight("click", function(e) {
    e.preventDefault();
    $(".scroll-smooth").click();
});

function showSlider(type) {

    let sliderItemsDom = list.querySelectorAll('.carousel .list .item')
    if(type === 'next'){
        list.appendChild(sliderItemsDom[0])
        carousel.classList.add('next')
    } else{
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1])
        carousel.classList.add('prev')
    }

    clearTimeout(runTimeOut)

    runTimeOut = setTimeout( () => {
        carousel.classList.remove('next')
        carousel.classList.remove('prev')
    }, timeRunning)


    clearTimeout(runNextAuto)
    runNextAuto = setTimeout(() => {
        nextBtn.click()
    }, timeAutoNext)

    resetTimeAnimation() // Reset the running time animation
}

// Initialize EmailJS
emailjs.init('your_user_id');  // Replace with your User ID from EmailJS dashboard

$(document).ready(function () {

    

    setTimeout(() => {
        document.getElementById("loading").style.display = "none"; // Hide loading
        document.getElementById("content").style.display = "block"; // Show content
    }, 3000); // 3 seconds delay

    
    $('#contactForm').submit(function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get the form data
        var name = $('#name').val();
        var email = $('#email').val();
        var subject = $('#subject').val();
        var message = $('#message').val();

        // Send the email using EmailJS
        emailjs.send('your_service_id', 'your_template_id', {
            name: name,
            email: email,
            subject: subject,
            message: message
        }).then(function (response) {
            alert('Your message has been sent successfully!');
            $('#contactForm')[0].reset(); // Reset the form after successful submission
        }, function (error) {
            alert('Failed to send your message. Please try again.');
        });
    });
});


// Start the initial animation 
resetTimeAnimation()