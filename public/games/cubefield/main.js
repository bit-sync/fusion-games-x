var camera, scene, renderer, spotlight, triangle, triEdges, plane, xSpeed, zSpeed, zOffset, camOffset, stars, starSpeed, leftArrow, rightArrow, upArrow, timeElapse, cubeAdd, score, phase, composer, level, levelBreak, width, height, mCubes, numCubes = 120,
    rotStart = 0,
    stnDiff = 0,
    stnBounce = 0,
    stnCam = 0,
    stnBlock = 0,
    uiNewGame = document.getElementById("newGame"),
    uiScore = document.getElementById("score"),
    uiHScore = document.getElementById("highScore"),
    uiInfo = document.getElementById("info"),
    uiSettings = document.getElementById("settings"),
    uiPause = document.getElementById("pause");

function init() {
    width = window.innerWidth, height = window.innerHeight, levelBreak = 0, level = 0, phase = -1, score = 0, camOffset = 0, timeElapse = (new Date).getTime(), totalElapse = 0, zOffset = 0, xSpeed = 0, zSpeed = 0, leftArrow = rightArrow = upArrow = !1, mCubes = [], starSpeed = [], stars = [], (scene = new THREE.Scene).fog = new THREE.Fog(10724259, 5, 25), (renderer = new THREE.WebGLRenderer({
        antialias: !0,
        alpha: !0
    })).setClearColor(16777215, 0), renderer.setSize(width, height), renderer.shadowMap.enabled = !0, renderer.shadowMap.type = THREE.PCFSoftShadowMap, document.body.appendChild(renderer.domElement);
    var ambient = new THREE.AmbientLight(16777215);
    scene.add(ambient), (camera = new THREE.PerspectiveCamera(15, width / height, .1, 1e3)).position.set(0, .25, 2);
    var planeGeo = new THREE.PlaneBufferGeometry(300, 75, 20);
    (plane = new THREE.Mesh(planeGeo, new THREE.MeshStandardMaterial({
        color: 16777215
    }))).receiveShadow = !0, plane.rotation.x += -.5 * Math.PI, plane.position.y = -.001, scene.add(plane);
    for (var c = 0; c < numCubes; c++) mCubes[c] = new Cube(scene);
    var triGeo = new THREE.Geometry;
    triGeo.vertices.push(new THREE.Vector3(0, 0, -.15), new THREE.Vector3(-.017, 0, .04), new THREE.Vector3(.017, 0, .04), new THREE.Vector3(0, .013, .02)), triGeo.faces.push(new THREE.Face3(3, 0, 1)), triGeo.faces.push(new THREE.Face3(1, 2, 3)), triGeo.faces.push(new THREE.Face3(2, 0, 3)), (triangle = new THREE.Mesh(triGeo, new THREE.MeshBasicMaterial({
        color: 6579300
    }))).castShadow = !0, triangle.position.y = -2, scene.add(triangle);
    var edgeGeo = new THREE.EdgesGeometry(triGeo);
    triEdges = new THREE.LineSegments(edgeGeo, new THREE.MeshBasicMaterial({
        color: 0
    })), scene.add(triEdges), (spotlight = new THREE.SpotLight(16777215)).position.set(0, 100, 0), spotlight.target = triangle, spotlight.castShadow = !0, spotlight.shadow.camera.near = .1, spotlight.shadow.camera.far = 20, spotlight.shadow.mapSize.width = window.innerWidth, spotlight.shadow.mapSize.height = window.innerHeight, scene.add(spotlight), initStars(), uiScore.style.visibility = "hidden", document.getElementById("highScore").innerHTML = (Math.floor(getCookie() / 100) / 10).toString(), setPreGame()
}

function initStars() {
    stars = [];
    for (var texture = (new THREE.TextureLoader).load("assets/images/star.png"), material = new THREE.MeshBasicMaterial({
            map: texture
        }), geo = new THREE.BoxBufferGeometry(.5, .5, .1), i = 0; i < 10; i++) starSpeed[i] = [], stars[i] = new THREE.Mesh(geo, material), stars[i].position.z = 5, stars[i].position.x = 20 * Math.random() - 10, stars[i].position.y = 10 * Math.random(), stars[i].rotation.z = 2 * Math.random() * Math.PI, starSpeed[i][0] = .003 * Math.random() - .0015, starSpeed[i][1] = .003 * Math.random() - .0015, scene.add(stars[i])
}

function gameReset() {
    for (var c of (uiNewGame.style.visibility = "hidden", uiInfo.style.visibility = "hidden", uiScore.style.color = "#808080", uiScore.style.visibility = "visible", document.body.style.backgroundColor = "#A3A3A3", uiSettings.classList.remove("settingsVis"), document.querySelector("canvas").style.filter = "blur(0px)", document.querySelector("canvas").style.cursor = "none", score = 0, timeElapse = (new Date).getTime(), zOffset = 0, xSpeed = 0, zSpeed = 0, camera.position.z = 0, mCubes)) c.reset(stnBlock, !0, stnDiff);
    for (var s of stars) s.position.z = 5;
    var k = Math.PI - this.camera.rotation.z % (2 * Math.PI);
    rotStart = (Math.PI - Math.abs(k)) * Math.sign(k), totalElapse = 0, phase = 1
}

function setPreGame() {
    for (var c of (uiScore.style.color = "black", document.body.style.backgroundColor = "#A3A3A3", uiNewGame.style.visibility = "visible", uiInfo.style.visibility = "visible", uiSettings.classList.add("settingsVis"), document.querySelector("canvas").style.filter = "blur(5px)", document.querySelector("canvas").style.cursor = "pointer", triangle.material.color.setHex(6579300), triEdges.material.color.setHex(0), mCubes)) c.updateDesign(0);
    for (var s of (level = 0, plane.material.color.setHex(13158600), scene.fog.color.setHex(10724259), stars)) s.position.z = 5
}

function newLevel() {
    for (var c of (levelBreak = (new Date).getTime(), level++, mCubes)) c.updateDesign(level % 5);
    switch (level % 5) {
        case 0:
            plane.material.color.setHex(13158600), scene.fog.color.setHex(10724259), triangle.material.color.setHex(6579300), triEdges.material.color.setHex(0), document.body.style.backgroundColor = "#A3A3A3";
            break;
        case 1:
            for (var s of (plane.material.color.setHex(0), scene.fog.color.setHex(0), triangle.material.color.setHex(0), triEdges.material.color.setHex(16777215), document.body.style.backgroundColor = "#000000", stars)) s.position.z = -50;
            break;
        case 2:
            for (var s of (plane.material.color.setHex(16777215), scene.fog.color.setHex(16777215), triangle.material.color.setHex(6579300), triEdges.material.color.setHex(0), document.body.style.backgroundColor = "#FFFFFF", stars)) s.position.z = 5;
            break;
        case 3:
            plane.material.color.setHex(0), scene.fog.color.setHex(0), triangle.material.color.setHex(16777215), triEdges.material.color.setHex(16777215), document.body.style.backgroundColor = "#000000";
            break;
        case 4:
            plane.material.color.setHex(16777215), scene.fog.color.setHex(16777215), triangle.material.color.setHex(0), triEdges.material.color.setHex(16777215), document.body.style.backgroundColor = "#ffffff"
    }
}

function animate() {
    requestAnimationFrame(animate);
    var now = (new Date).getTime(),
        elapse = now - timeElapse;
    timeElapse = now;
    var rate = elapse / 100;
    var ceilingFan = 0.025;
    var ceilingPot = -0.025;
    switch (phase) {
        case -1:
            xSpeed *= .95, camOffset *= .95;
            var levelSpeed = (level + 1) * rate * .5 + (zSpeed *= .95);
            camera.rotation.z = .7 * (camera.rotation.z + 1.5 * xSpeed), camera.rotation.z = Math.min(.1, Math.max(-.1, camera.rotation.z)), camera.position.x += xSpeed * rate * -10, camera.position.z -= levelSpeed, triangle.position.z = triEdges.position.z = plane.position.z = camera.position.z - 2.2, triangle.position.x = triEdges.position.x = plane.position.x = camera.position.x, triangle.rotation.y = camera.rotation.z, triEdges.rotation.y = camera.rotation.z, spotlight.position.set(triangle.position.x, triangle.position.y + 10, triangle.position.z), updateCubes(.2 * rate, levelSpeed);
            break;
        case 0:
            break;
        case 1:
            rightArrow || leftArrow ? (leftArrow && (xSpeed += 0.002), rightArrow && (xSpeed -= 0.002)) : xSpeed *= .8, xSpeed = Math.max(-.5, Math.min(.5, xSpeed)), zSpeed = upArrow ? zSpeed + .025 * rate : .95 * zSpeed, zSpeed = Math.min(.4, zSpeed);
            if (xSpeed > ceilingFan) {
                xSpeed = ceilingFan
            };
            if (xSpeed < ceilingPot) {
                xSpeed = ceilingPot
            };
            levelSpeed = (1 + .5 * level) * rate * .5 * (1 + 1.5 * stnDiff) + zSpeed + .05;
            camera.rotation.z = .7 * (camera.rotation.z + 1.5 * xSpeed), camera.rotation.z = Math.min(.1, Math.max(-.1, camera.rotation.z)), camera.position.x += xSpeed * rate * -10, camera.position.z -= levelSpeed, triangle.position.z = triEdges.position.z = plane.position.z = camera.position.z + (0 == stnCam ? -2.2 : 1 == stnCam ? -1.2 : .2), triangle.position.x = triEdges.position.x = plane.position.x = camera.position.x, triangle.rotation.y = camera.rotation.z, triEdges.rotation.y = camera.rotation.z, triangle.rotation.z = 2 * camera.rotation.z, triEdges.rotation.z = 2 * camera.rotation.z, triangle.position.y = .01 - Math.abs(.05 * camera.rotation.z), triEdges.position.y = .01 - Math.abs(.05 * camera.rotation.z), spotlight.position.set(triangle.position.x, triangle.position.y + 10, triangle.position.z), totalElapse += elapse, uiScore.innerHTML = (Math.round(totalElapse / 100) / 10).toString(), 3e4 * (level + 1) < totalElapse && newLevel(), -1 != levelBreak && now - levelBreak > 5e3 && (levelBreak = -1), updateCubes(rate, levelSpeed)
    }
    level % 5 == 1 && updateStars(), 1 == phase ? renderer.setClearColor(16777215, 0) : renderer.setClearColor(10724259, 1), renderer.render(scene, camera)
}

function updateStars() {
    for (var s = 0; s < stars.length; s++)(stars[s].position.x < -10 || stars[s].position.x > 10 || stars[s].position.y < 0 || stars[s].position.y > 10) && (stars[s].position.x = 20 * Math.random() - 10, stars[s].position.y = 10 * Math.random()), stars[s].position.x += starSpeed[s][0], stars[s].position.y += starSpeed[s][1], stars[s].rotation.z += .003
}

function updateCubes(rate, levelSpeed) {
    for (var c of mCubes) {
        var collision = c.update(rate, levelSpeed, triangle, levelBreak, level, stnBounce, stnBlock, stnDiff);
        if (1 == phase && collision) return logHighscore(), phase = -1, void setPreGame()
    }
}

function setCam() {
    switch (stnCam) {
        case 0:
            camera.position.x = 0, camera.position.y = .25, camera.position.z = 2;
            break;
        case 1:
            camera.position.x = 0, camera.position.y = .05, camera.position.z = .4;
            break;
        case 2:
            camera.position.x = 0, camera.position.y = .025, camera.position.z = 0
    }
}

function pauseGameScreen() {
    0 == phase ? (phase = 1, uiPause.style.visibility = "hidden", uiPause.style.opacity = 0) : 1 == phase && (phase = 0, uiPause.style.visibility = "visible", uiPause.style.opacity = 1)
}

function pauseImage(number) {
	if (number == 0) {
		document.getElementById("pause").style.backgroundImage = "url('fakeClassroom.png')";
	} else if (number == 1) {
		document.getElementById("pause").style.backgroundImage = "url('fakeSIS.png')";
	} else if (number == 2) {
		document.getElementById("pause").style.backgroundImage = "url('fakeSpanish.png')";
	}
	
	for (var opt = document.getElementById("pauseImage").getElementsByClassName("select"), k = 0; k < 3; k++) opt[k].classList.remove("focus");
    opt[number].classList.add("focus")
}
	
function returnToMenu() {
    uiPause.style.opacity = 0, uiPause.style.visibility = "hidden", logHighscore(), rotOffset = (new Date).getTime() % 5e4, phase = -1, setPreGame()
}

function updateDiff(target) {
    stnDiff = target;
    for (var opt = document.getElementById("difficulty").getElementsByClassName("select"), k = 0; k < 3; k++) opt[k].classList.remove("focus");
    opt[target].classList.add("focus")
}

function updateBounce(target) {
    stnBounce = target;
    for (var opt = document.getElementById("bounce").getElementsByClassName("select"), k = 0; k < 3; k++) opt[k].classList.remove("focus");
    opt[target].classList.add("focus")
}

function updateCam(target) {
    stnCam = target;
    for (var opt = document.getElementById("camera").getElementsByClassName("select"), k = 0; k < 3; k++) opt[k].classList.remove("focus");
    opt[target].classList.add("focus"), setCam()
}

function updateBlock(target) {
    stnBlock = target;
    for (var opt = document.getElementById("block").getElementsByClassName("select"), k = 0; k < 3; k++) opt[k].classList.remove("focus");
    for (var c of (opt[target].classList.add("focus"), mCubes)) c.reset(stnBlock, !1, stnDiff);
    document.getElementById("bounce").style.opacity = target > 0 ? "1.0" : "0.0"
}

function logHighscore() {
    totalElapse > parseInt(getCookie()) || "" == getCookie() ? (setCookie(totalElapse), uiHScore.innerHTML = (Math.floor(totalElapse / 100) / 10).toString()) : uiHScore.innerHTML = (Math.floor(getCookie() / 100) / 10).toString()
}

function setCookie(score) {
    document.cookie = "highscore=" + score.toString() + "; "
}

function getCookie() {
    for (var ca = document.cookie.split(";"), i = 0; i < ca.length; i++) {
        for (var c = ca[i];
            " " == c.charAt(0);) c = c.substring(1);
        if (0 == c.indexOf("highscore=")) return c.substring("highscore=".length, c.length)
    }
    return ""
}
init(), animate(), document.addEventListener("resize", e => {
    width = window.innerWidth, height = window.innerHeight, renderer.setSize(width, height), camera = new THREE.PerspectiveCamera(15, width / height, .1, 1e3), setCam()
}), document.addEventListener("keydown", e => {
    if (null == e.keyCode) e.pageX > .5 * width ? rightArrow = !0 : leftArrow = !0;
    else {
        var key = e.keyCode ? e.keyCode : e.which;
        if (37 == key) {
			leftArrow = !0;
		} else if (40 == key) {
			rightArrow = !0;
		} else if (39 == key) {
			rightArrow = !0;
		} else if (65 == key) {
			leftArrow = !0;
		} else if (27 == key) {
			returnToMenu();
		} else if (32 == key) {
			gameReset();
		} else if (68 == key) {
			rightArrow = !0;
		} else if (80 == key) {
			pauseGameScreen();
		} else if (38 == key) {
			upArrow = !0;
		} else if (87 == key) {
			upArrow = !0;
		}
    }
}), document.addEventListener("keyup", e => {
    if (null == e.keyCode) rightArrow = !1, leftArrow = !1, upArrow = !1;
    else {
        var key = e.keyCode ? e.keyCode : e.which;
        var key = e.keyCode ? e.keyCode : e.which;
        if (37 == key) {
			leftArrow = !1;
		} else if (40 == key) {
			rightArrow = !1;
		} else if (39 == key) {
			rightArrow = !1;
		} else if (65 == key) {
			leftArrow = !1;
		} else if (27 == key) {
			returnToMenu();
		} else if (32 == key) {
			gameReset();
		} else if (68 == key) {
			rightArrow = !1;
		} else if (38 == key) {
			upArrow = !1;
		} else if (87 == key) {
			upArrow = !1;
		}
    }
});
