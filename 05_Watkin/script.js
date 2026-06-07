
function addInfoButton() {
            var time = document.getElementById('time').value.trim();
            var date = document.getElementById('date').value.trim();
            var place = document.getElementById('place').value.trim();
            if (time && date && place) {
                // Create a container for the button and info
                var container = document.createElement('div');
                container.style.marginBottom = "16px";

                // Create the toggle button
                var btn = document.createElement('a');
                btn.className = 'toggle-link';
                btn.href = 'javascript:void(0)';
                btn.textContent = `Time: ${time} to 1:00, Date: ${date}, Place: ${place}`;

                // Create the info div
                var info = document.createElement('div');
                info.className = 'info';
                info.innerHTML = `<h2>More Information</h2>
                    <p><strong>Time:</strong> ${time} to 1:00<br>
                    <strong>Date:</strong> ${date}<br>
                    <strong>Place:</strong> ${place}</p>`;

                // Toggle show/hide on click
                btn.onclick = function() {
                    info.classList.toggle('show');
                };

                // Add to container and then to page
                container.appendChild(btn);
                container.appendChild(info);
                document.getElementById('buttonsContainer').appendChild(container);

                // Clear inputs
                document.getElementById('time').value = '';
                document.getElementById('date').value = '';
                document.getElementById('place').value = '';
            } else {
                alert("Please fill in all fields.");
            }
        }