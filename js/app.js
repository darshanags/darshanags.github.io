const url = "https://api.warframestat.us/pc/"

fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let alerts = data.alerts;
        let container = document.getElementById("content")
        let missionsHTML = ``

        alerts.forEach(alert => {
            if (alert.tag == undefined || alert.tag != "JadeShadows") {
                return
            }

            let mission = {
                start: alert.activation,
                end: alert.expiry,
                enemy: alert.mission.faction,
                type: alert.mission.type,
                location: alert.mission.node,
                reward: alert.mission.reward.asString
            }

            let missionBox = `
             <div class="mission" data-start="${mission.start}" data-end="${mission.end}">
                <div class="container">
                    <h4>${mission.enemy} - ${mission.type}</h4>
                    <p>${mission.location}</p>
                    <p>${mission.reward}</p>
                    <p>Time left: <span class="countdown"></span></p>
                </div>
            </div> 
            `
            missionsHTML += missionBox

        });

        container.innerHTML = missionsHTML

        document.querySelectorAll(".mission").forEach(mission => {
            let start = mission.dataset.start
            let end = mission.dataset.end

            countdown(
                new Date(end),
                function(ts) {
                    mission.querySelector(".countdown").innerHTML = ts.toHTML();
                },
                countdown.HOURS|countdown.MINUTES|countdown.SECONDS);

          

        })
    })
    .catch(function (error) {
        console.log(error);
    });