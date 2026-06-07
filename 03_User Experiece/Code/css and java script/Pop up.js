document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        // Create popup container
        var popup = document.createElement('div');
        popup.id = 'donate-popup';
        popup.className = 'donate-popup';
        popup.style.display = 'flex';

        // Create link
        var link = document.createElement('a');
        link.href = 'https://www.wfp.org/support-us/stories/donate?utm_source=bing&utm_medium=cpc&utm_campaign=367841351&utm_content=1279831902577154&gclid=499fe68709ef1605cb108e125adae0f1&gclsrc=3p.ds&msclkid=499fe68709ef1605cb108e125adae0f1';
        link.target = '_blank';
        link.className = 'donate-popup-link';

        // Create span inside link
        var span = document.createElement('span');
        span.textContent = '🌍 Help End Hunger!';
        link.appendChild(span);

        // Create close button
        var closeBtn = document.createElement('button');
        closeBtn.className = 'donate-popup-close';
        closeBtn.setAttribute('aria-label', 'Close');
        closeBtn.innerHTML = '&times;';

        // Close functionality
        closeBtn.onclick = function() {
            popup.style.display = 'none';
        };

        // Assemble popup
        popup.appendChild(link);
        popup.appendChild(closeBtn);

        // Add popup to body
        document.body.appendChild(popup);
    }, 5000);
});