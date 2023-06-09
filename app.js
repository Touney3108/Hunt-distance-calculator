const distanceField = document.getElementById("distance");
const bulletSpeedField = document.getElementById("bulletSpeed");
const outputSprintField = document.getElementById("outputSprint");
const outputRunField = document.getElementById("outputRun");
const outputStrafeField = document.getElementById("outputStrafe");
let distance = 0;
let bulletSpeed = 0;
const hunterSprintSpeed = 4.7;
const hunterRunSpeed = 3;
const hunterStrafeSpeed = 2;
const characterWidth = .35;

distanceField.addEventListener("change", e => {
    distance = e.target.value;
    triggerCalc();
});
bulletSpeedField.addEventListener("change", e => {
    bulletSpeed = e.target.value;
    triggerCalc();
});
distanceField.addEventListener("input", e => {
    distance = e.target.value;
    triggerCalc();
});
bulletSpeedField.addEventListener("input", e => {
    bulletSpeed = e.target.value;
    triggerCalc();
});

const calculate = (bulletDistance,hunterSpeed,prevHunterTravel) => {
    const time = bulletDistance / bulletSpeed;
    const hunterTravel = hunterSpeed * time;
    const bulletTravel = Math.sqrt(hunterTravel ** 2 + distance ** 2)
    console.log(hunterTravel);
    console.log(prevHunterTravel);
    if (hunterTravel - prevHunterTravel > .01) {
        console.log("c")
        return calculate(bulletTravel,hunterSpeed,hunterTravel)
    } else {
        return {hunterTravel,time};
    }
}
const triggerCalc = () => {
    
    if (distance > 0 && bulletSpeed > 0) {
        const sprint = calculate(distance, hunterSprintSpeed, bulletSpeed);
        outputSprintField.innerHTML = "Sprint:" + sprint.hunterTravel.toFixed(2) + "m Character widths:" + (sprint.hunterTravel / characterWidth).toFixed(2) + " Bullet travel:"+sprint.time.toFixed(2)+"s";
        
        const run = calculate(distance, hunterRunSpeed, bulletSpeed);
        outputRunField.innerHTML = "Run:" + run.hunterTravel.toFixed(2) + "m Character widths:" + (run.hunterTravel / characterWidth).toFixed(2) + " Bullet travel:"+run.time.toFixed(2)+"s";
        const strafe = calculate(distance, hunterStrafeSpeed, bulletSpeed);
        outputStrafeField.innerHTML = "Strafe:" + strafe.hunterTravel.toFixed(2) + "m Character widths:" + (strafe.hunterTravel / characterWidth).toFixed(2) + " Bullet travel:"+strafe.time.toFixed(2)+"s";

    }
}