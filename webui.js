var twist;
var cmdvel;
var publishImmediately = true;
var robot_IP;
var manager;
var manager1;
var manager2;
var teleop;
var ros;

/**
 * Sends ROS messages with velocity for the robot.
 * @param {*} linear 
 * @param {*} angular 
 */
function moveAction(linear, angular) {
    if (linear !== undefined && angular !== undefined) {
        twist.linear.x = linear;
        twist.angular.z = angular;
    } else {
        twist.linear.x = 0;
        twist.angular.z = 0;
    }

    cmdVel.publish(twist);
}

/**
 * Creates velocity message publisher.
 */
function initVelocityPublisher() {
    //Initilize message with zero values.
    twist = new ROSLIB.Message({
        linear: {
            x: 0,
            y: 0,
            z: 0
        },
        angular: {
            x: 0,
            y: 0,
            z: 0
        }
    });

    // Initialize topic object.
    cmdVel = new ROSLIB.Topic({
        ros: ros,
        name: '/cmd_vel',
        messageType: 'geometry_msgs/Twist'
    })

    // Register publisher within ROS system
    cmdVel.advertise();
}

/**
 * Creates keyboard controller object.
 */
function initTeleopKeyboard() {
    // Use WASD to drive the robot.

    // Check if the controller was already created
    if(teleop == null) {
        //Initialize the teleop.
        teleop = new KEYBOARDTELEOP.Teleop({
            ros: ros,
            topic: '/cmd_vel'
        });
    }

    // Add event listener for the slider movement.
    robotSpeedRange = document.getElementById("robot-speed");
    robotSpeedRange.oninput = function () {
        teleop.scale = robotSpeedRange.value / 100;
    }
}

/**
 * Creates the joystick object.
 */
function createJoystick() {
    // Check if the joystick was already created.
    if (manager == null) {
        joystickContainer = document.getElementById('joystick');
        // Configuring joystick.
        // Refer to https://yoannmoinet.github.io/nipplejs/ to adjust.
        var options = {
            zone: joystickContainer,
            position: {left: 50 + '%', top: 105 + 'px'},
            mode: 'static',
            size: 200,
            color: '#0066ff',
            restJoystick: true
        };
        manager = nipplejs.create(options);
        // Add event listener for the joystick movement.
        manager.on('move', function(evt, nipple) {
            // nipplejs returns direction in screen coordinates
            // Rotate to correct i.e. dragging towards screen will move bot forward.
            var direction = nipple.angle.degree - 90;
            if(direction > 180) {
                direction = -(450 - nipple.angle.degree);
            }
            // Convert angles to radians and scale the speeds.
            // Adjust to make the bot faster/slower.
            var lin = Math.cos(direction / 57.29) * nipple.distance * 0.005;
            var ang = Math.sin(direction / 57.29) * nipple.distance * 0.05;

            // nipplejs triggers events when the joystick moves at each pixel.
            // Therefore this must be delayed lest too many consecutive message
            // publications will occur. Events triggered <50ms after last publication will be dropped.
            if(publishImmediately) {
                publishImmediately = false;
                moveAction(lin, ang);
                setTimeout(function () {
                    publishImmediately = true;
                }, 50);
            } 
        });

        // Create event listener for joystick release - send stop message.
        manager.on('end', function() {
            moveAction(0,0);
        });
    }
}

function createJoystick1() {
    // Check if the joystick was already created.
    if (manager1 == null) {
        joystickContainer = document.getElementById('joystick1');
        // Configuring joystick.
        // Refer to https://yoannmoinet.github.io/nipplejs/ to adjust.
        var options = {
            zone: joystickContainer,
            position: {left: 50 + '%', top: 105 + 'px'},
            mode: 'static',
            size: 200,
            color: '#006921',
            restJoystick: true
        };
        manager1 = nipplejs.create(options);
        // Add event listener for the joystick movement.
        manager1.on('move', function(evt, nipple) {
            // nipplejs returns direction in screen coordinates
            // Rotate to correct i.e. dragging towards screen will move bot forward.
            var direction = nipple.angle.degree - 90;
            if(direction > 180) {
                direction = -(450 - nipple.angle.degree);
            }
            // Convert angles to radians and scale the speeds.
            // Adjust to make the bot faster/slower.
            var lin = Math.cos(direction / 57.29) * nipple.distance * 0.005;
            var ang = Math.sin(direction / 57.29) * nipple.distance * 0.05;

            // nipplejs triggers events when the joystick moves at each pixel.
            // Therefore this must be delayed lest too many consecutive message
            // publications will occur. Events triggered <50ms after last publication will be dropped.
            if(publishImmediately) {
                publishImmediately = false;
                moveAction(lin, ang);
                setTimeout(function () {
                    publishImmediately = true;
                }, 50);
            } 
        });

        // Create event listener for joystick release - send stop message.
        manager1.on('end', function() {
            moveAction(0,0);
        });
    }
}

function createJoystick2() {
    // Check if the joystick was already created.
    if (manager2 == null) {
        joystickContainer = document.getElementById('joystick2');
        // Configuring joystick.
        // Refer to https://yoannmoinet.github.io/nipplejs/ to adjust.
        var options = {
            zone: joystickContainer,
            position: {left: 50 + '%', top: 105 + 'px'},
            mode: 'static',
            size: 200,
            color: '#002169',
            restJoystick: true
        };
        manager2 = nipplejs.create(options);
        // Add event listener for the joystick movement.
        manager2.on('move', function(evt, nipple) {
            // nipplejs returns direction in screen coordinates
            // Rotate to correct i.e. dragging towards screen will move bot forward.
            var direction = nipple.angle.degree - 90;
            if(direction > 180) {
                direction = -(450 - nipple.angle.degree);
            }
            // Convert angles to radians and scale the speeds.
            // Adjust to make the bot faster/slower.
            var lin = Math.cos(direction / 57.29) * nipple.distance * 0.005;
            var ang = Math.sin(direction / 57.29) * nipple.distance * 0.05;

            // nipplejs triggers events when the joystick moves at each pixel.
            // Therefore this must be delayed lest too many consecutive message
            // publications will occur. Events triggered <50ms after last publication will be dropped.
            if(publishImmediately) {
                publishImmediately = false;
                moveAction(lin, ang);
                setTimeout(function () {
                    publishImmediately = true;
                }, 50);
            } 
        });

        // Create event listener for joystick release - send stop message.
        manager2.on('end', function() {
            moveAction(0,0);
        });
    }
}

window.onload = function () {
    // Determine robot address automatically then:
    // robot_IP = location.hostname;
    // Else set robot address statically:
    robot_IP = "10.5.10.117";

    // Initialize handle for rosbridge_websocket
    ros = new ROSLIB.Ros({
        url: "ws://" + robot_IP + ":9090"
    });

    initVelocityPublisher();

    // Get handle for video placeholder.
    video = document.getElementById('video');
    // Populate video source
    video.src = "http://" + robot_IP + ":8080/stream?topic=/camera/rgb/image_raw&type=mjpeg&quality=80";
    

    // Commented out video.onload since inital testing will be done without camera.

    //video.onload = function () {
        // Joystick and keyboard controls will be available ONLY WHEN VIDEO IS loaded.
        createJoystick();
        createJoystick1();
        createJoystick2();
        initTeleopKeyboard();
    //};
}
