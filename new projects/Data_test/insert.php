<?php
INSERT INTO cars (brand, model, fuel, driventrain, kwhp, torque, topspeed, acceleration) 
        VALUES ('$brand', '$model', '$fuel', '$driventrain', '$kwhp', '$torque', '$topspeed', '$acceleration')
 
The insert action comes from the rest:
 
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
    
    exit();
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}


// Close the connection
$conn->close();
?>