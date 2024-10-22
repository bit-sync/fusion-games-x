var cubeColors = [1739633, 6608720, 738136],
	multiColor = [14614528, 16753920, 16774400, 3338320, 1977825, 13127900],
    meshMaterials = [
        [new THREE.MeshBasicMaterial({
            color: cubeColors[0]
        }), new THREE.MeshBasicMaterial({
            color: cubeColors[1]
        }), new THREE.MeshBasicMaterial({
            color: cubeColors[2]
        })],
        [new THREE.MeshBasicMaterial({
            color: 0
        })],
        [new THREE.MeshBasicMaterial({
            color: 0
        })],
        [new THREE.MeshBasicMaterial({
            color: 16777215
        })],
        [new THREE.MeshBasicMaterial({
            color: multiColor[0]
        }), new THREE.MeshBasicMaterial({
            color: multiColor[1]
        }), new THREE.MeshBasicMaterial({
            color: multiColor[2]
        }), new THREE.MeshBasicMaterial({
            color: multiColor[3]
        }), new THREE.MeshBasicMaterial({
            color: multiColor[4]
        }), new THREE.MeshBasicMaterial({
            color: multiColor[5]
        })],
    ],
    edgeMaterials = [new THREE.MeshBasicMaterial({
        color: 0
    }), new THREE.MeshBasicMaterial({
        color: 0
    }), new THREE.MeshBasicMaterial({
        color: 0
    }), new THREE.MeshBasicMaterial({
        color: 16777215
    }), new THREE.MeshBasicMaterial({
        color: 16777215
    })],
    cubeGeo = new THREE.BoxBufferGeometry(.1, .12, .05);
class Cube {
    constructor(scene) {
        var material = meshMaterials[0][Math.floor(3 * Math.random())];
        this.mesh = new THREE.Mesh(cubeGeo, material), this.mesh.castShadow = !0, this.mesh.position.x = 12 * Math.random() - 6, this.mesh.position.y = .06, this.mesh.position.z = -30 * Math.random();
        var edgeGeo = new THREE.EdgesGeometry(cubeGeo);
        this.edges = new THREE.LineSegments(edgeGeo, edgeMaterials[0]), this.edges.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z), scene.add(this.mesh), scene.add(this.edges), this.fromBelow = !1, this.ySpeed = 0, this.opacity = 0
    }
    update(rate, levelSpeed, triangle, levelBreak, level, bounce, block, diff) {
        if (this.mesh.position.z > triangle.position.z - 150 * Math.pow(levelSpeed, 1.2) && (this.ySpeed += .005 * rate * (-1 == phase ? 3 : 1), this.mesh.position.y -= this.ySpeed), this.mesh.position.y < .06 && !this.fromBelow ? (this.ySpeed *= -.4 * bounce, this.mesh.position.y = -1 * (this.mesh.position.y - .06) + .06) : this.fromBelow && this.mesh.position.y > .06 && (this.fromBelow = !1), this.edges.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z), Math.abs(this.mesh.position.z - triangle.position.z - .4) < .5 && Math.abs(this.mesh.position.x - triangle.position.x) < .055 && Math.abs(this.mesh.position.y - triangle.position.y - .06) < .03) return !0;
        if (this.mesh.position.z > triangle.position.z + 3) {
            const threshold = triangle.position.z - 20 - 5 * level * diff - (this.mesh.position.z - triangle.position.z);
            this.resetPos(triangle, threshold, levelBreak, block)
        }
        return !1
    }
    resetPos(triangle, threshold, levelBreak, block) {
        this.fromBelow = 2 == block, this.ySpeed = 2 == block ? -.045 : 0, this.mesh.position.z = threshold - (levelBreak > 0 ? 40 + 60 * Math.random() : 0), this.mesh.position.x = triangle.position.x + 12 * Math.random() - 6, this.mesh.position.y = 0 == block ? .06 : 1 == block ? 4 * Math.random() + .5 : -1, this.edges.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z)
    }
    reset(block, buffer, diff) {
        var threshold = -20 * (1 + .5 * diff);
        this.fromBelow = 2 == block, this.ySpeed = 2 == block ? -.045 : 0, this.mesh.position.x = 64 * Math.random() - 32, this.mesh.position.y = 0 == block ? .06 : 1 == block ? 4 * Math.random() + .5 : -1, this.mesh.position.z = Math.random() * threshold + (buffer ? 2 * threshold : 0), this.edges.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z)
    }
    updateDesign(level) {
        switch (level % 5) {
            case 0:
                this.mesh.material = meshMaterials[0][Math.floor(3 * Math.random())], this.edges.material = edgeMaterials[0];
                break;
            case 1:
                this.mesh.material = meshMaterials[0][Math.floor(3 * Math.random())], this.edges.material = edgeMaterials[1];
                break;
            case 2:
                this.mesh.material = meshMaterials[2][0], this.edges.material = edgeMaterials[2];
                break;
            case 3:
                this.mesh.material = meshMaterials[3][0], this.edges.material = edgeMaterials[3];
                break;
            case 4:
                this.mesh.material = meshMaterials[4][Math.floor(6 * Math.random())], this.edges.material = edgeMaterials[4]
        }
    }
}
