/**
 * Created by DennisMarchuk on 9/8/2017.
 */
var coordSystem=function(b){var g=b.normalize();b=0==Math.abs(b.x)&&0==Math.abs(b.y)?(new BABYLON.Vector3(b.z,0,0)).normalize():(new BABYLON.Vector3(b.y,-b.x,0)).normalize();var r=BABYLON.Vector3.Cross(b,g);return{x:b,y:g,z:r}},randPct=function(b,g){return 0==g?b:(1+(1-2*Math.random())*g)*b},createBranch=function(b,g,r,w,h,l,v,n,x){for(var t=[],d,c=[],f,q=[],a=0;12>a;a++)t[a]=[];for(var m=0;m<h;m++)for(a=m/h,d=g.y.scale(a*r),d.addInPlace(g.x.scale(v*Math.exp(-a)*Math.sin(l*a*Math.PI))),d.addInPlace(b),c[m]=d,d=n*(1+(.4*Math.random()-.2))*(1-(1-w)*a),q.push(d),a=0;12>a;a++)f=a*Math.PI/6,f=g.x.scale(d*Math.cos(f)).add(g.z.scale(d*Math.sin(f))),f.addInPlace(c[m]),t[a].push(f);for(a=0;12>a;a++)t[a].push(c[c.length-1]);return{branch:BABYLON.MeshBuilder.CreateRibbon("branch",{pathArray:t,closeArray:!0},x),core:c,_radii:q}},createTreeBase=function(b,g,r,w,h,l,v,n,x,t){var d=2/(1+Math.sqrt(5)),c=new BABYLON.Vector3(0,1,0),f,c=coordSystem(c),q=new BABYLON.Vector3(0,0,0),a=[],m=[],e=[],A=[],q=createBranch(q,c,b,g,r,1,x,1,t);a.push(q.branch);var y=q.core;m.push(y);e.push(q._radii);A.push(c);for(var q=y[y.length-1],y=2*Math.PI/h,z,u,p,C,B=0;B<h;B++)if(f=randPct(B*y,.25),f=c.y.scale(Math.cos(randPct(l,.15))).add(c.x.scale(Math.sin(randPct(l,.15))*Math.sin(f))).add(c.z.scale(Math.sin(randPct(l,.15))*Math.cos(f))),z=coordSystem(f),f=createBranch(q,z,b*v,g,r,n,x*d,g,t),p=f.core,p=p[p.length-1],a.push(f.branch),m.push(f.core),e.push(f._radii),A.push(z),1<w)for(var D=0;D<h;D++)u=randPct(D*y,.25),u=z.y.scale(Math.cos(randPct(l,.15))).add(z.x.scale(Math.sin(randPct(l,.15))*Math.sin(u))).add(z.z.scale(Math.sin(randPct(l,.15))*Math.cos(u))),u=coordSystem(u),C=createBranch(p,u,b*v*v,g,r,n,x*d*d,g*g,t),a.push(C.branch),m.push(C.core),e.push(f._radii),A.push(u);return{tree:BABYLON.Mesh.MergeMeshes(a),paths:m,radii:e,directions:A}},createTree=function(b,g,r,w,h,l,v,n,x,t,d,c,f,q,a,m){1!=h&&2!=h&&(h=1);var e=createTreeBase(b,g,r,h,l,v,n,d,c,m);e.tree.material=w;var A=b*Math.pow(n,h),y=A/(2*f),z=1.5*Math.pow(g,h-1);n=BABYLON.MeshBuilder.CreateDisc("leaf",{radius:z/2,tessellation:12,sideOrientation:BABYLON.Mesh.DOUBLESIDE},m);b=new BABYLON.SolidParticleSystem("leaveSPS",m,{updatable:!1});b.addShape(n,2*f*Math.pow(l,h),{positionFunction:function(b,a,g){a=Math.floor(g/(2*f));1==h?a++:a=2+a%l+Math.floor(a/l)*(l+1);var E=(g%(2*f)*y+3*y/2)/A,d=Math.ceil(r*E);d>e.paths[a].length-1&&(d=e.paths[a].length-1);var k=d-1,c=k/(r-1),m=d/(r-1);b.position=new BABYLON.Vector3(e.paths[a][k].x+(e.paths[a][d].x-e.paths[a][k].x)*(E-c)/(m-c),e.paths[a][k].y+(e.paths[a][d].y-e.paths[a][k].y)*(E-c)/(m-c)+(.6*z/q+e.radii[a][d])*(g%2*2-1),e.paths[a][k].z+(e.paths[a][d].z-e.paths[a][k].z)*(E-c)/(m-c));b.rotation.z=Math.random()*Math.PI/4;b.rotation.y=Math.random()*Math.PI/2;b.rotation.z=Math.random()*Math.PI/4;b.scale.y=1/q}});b=b.buildMesh();b.billboard=!0;n.dispose();d=new BABYLON.SolidParticleSystem("miniSPS",m,{updatable:!1});n=new BABYLON.SolidParticleSystem("minileavesSPS",m,{updatable:!1});var u=[];c=2*Math.PI/l;for(var p=0;p<Math.pow(l,h+1);p++)u.push(randPct(Math.floor(p/Math.pow(l,h))*c,.2));c=function(a,b,d){var c=d%Math.pow(l,h);1==h?c++:c=2+c%l+Math.floor(c/l)*(l+1);var f=e.directions[c],c=new BABYLON.Vector3(e.paths[c][e.paths[c].length-1].x,e.paths[c][e.paths[c].length-1].y,e.paths[c][e.paths[c].length-1].z),k=u[d],k=f.y.scale(Math.cos(randPct(v,0))).add(f.x.scale(Math.sin(randPct(v,0))*Math.sin(k))).add(f.z.scale(Math.sin(randPct(v,0))*Math.cos(k))),f=BABYLON.Vector3.Cross(BABYLON.Axis.Y,k),k=Math.acos(BABYLON.Vector3.Dot(k,BABYLON.Axis.Y)/k.length());a.scale=new BABYLON.Vector3(Math.pow(g,h+1),Math.pow(g,h+1),Math.pow(g,h+1));a.quaternion=BABYLON.Quaternion.RotationAxis(f,k);a.position=c;};for(var C=[],B=[],p=e.paths.length,D=e.paths[0].length,F=0;F<x;F++)C.push(2*Math.PI*Math.random()-Math.PI),B.push([Math.floor(Math.random()*p),Math.floor(Math.random()*(D-1)+1)]);p=function(a,c,b){var d=B[b][0],f=B[b][1],k=e.directions[d];c=new BABYLON.Vector3(e.paths[d][f].x,e.paths[d][f].y,e.paths[d][f].z);c.addInPlace(k.z.scale(e.radii[d][f]/2));b=C[b];k=k.y.scale(Math.cos(randPct(t,0))).add(k.x.scale(Math.sin(randPct(t,0))*Math.sin(b))).add(k.z.scale(Math.sin(randPct(t,0))*Math.cos(b)));b=BABYLON.Vector3.Cross(BABYLON.Axis.Y,k);k=Math.acos(BABYLON.Vector3.Dot(k,BABYLON.Axis.Y)/k.length());a.scale=new BABYLON.Vector3(Math.pow(g,h+1),Math.pow(g,h+1),Math.pow(g,h+1));a.quaternion=BABYLON.Quaternion.RotationAxis(b,k);a.position=c};d.addShape(e.tree,Math.pow(l,h+1),{positionFunction:c});d.addShape(e.tree,x,{positionFunction:p});d=d.buildMesh();d.material=w;n.addShape(b,Math.pow(l,h+1),{positionFunction:c});n.addShape(b,x,{positionFunction:p});w=n.buildMesh();b.dispose();w.material=a;a=BABYLON.MeshBuilder.CreateBox("",{},m);a.isVisible=!1;e.tree.parent=a;d.parent=a;return w.parent=a};

    // Get the canvas element from our html above
var canvas = document.getElementById("renderCanvas");

// Load the BABYLON 3D engine
var engine = new BABYLON.Engine(canvas, true);
// This begins the creation of a function that we will 'call' just after it's built
var createScene = function () {

    // Now create a basic Babylon Scene object
    var scene = new BABYLON.Scene(engine);

    // Change the scene background color to green.
    scene.clearColor = new BABYLON.Color3(1, 1, 1);

    // This creates and positions a free camera
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, false);

    // This creates a light, aiming 0,1,0 - to the sky.
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Dim the light a small amount
    light.intensity = .5;

    // // Skybox
    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../textures/TropicalSunnyDay", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

    //Skybox
    // Automatic creation
    // var envTexture = new BABYLON.CubeTexture("../textures/sky2/skybox", scene);
    // scene.createDefaultSkybox(envTexture);

    // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    // Let's try our built-in 'ground' shape.  Params: name, width, depth, subdivisions, scene
    var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

//leaf material
    var green = new BABYLON.StandardMaterial("green", scene);
    green.diffuseColor = new BABYLON.Color3(0,1,0);

//     //trunk and branch material
    var bark = new BABYLON.StandardMaterial("bark", scene);
    bark.emissiveTexture = new BABYLON.Texture("https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Bark_texture_wood.jpg/800px-Bark_texture_wood.jpg", scene);
    bark.diffuseTexture = new BABYLON.Texture("https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Bark_texture_wood.jpg/800px-Bark_texture_wood.jpg", scene);
    bark.diffuseTexture.uScale = 2.0;//Repeat 5 times on the Vertical Axes
    bark.diffuseTexture.vScale = 2.0;//Repeat 5 times on the Horizontal Axes

    //Tree parameters
    var trunk_height = 20;
    var trunk_taper = 0.6;
    var trunk_slices = 5;
    var boughs = 2; // 1 or 2
    var forks = 4;
    var fork_angle = Math.PI/4;
    var fork_ratio = 2/(1+Math.sqrt(5)); //PHI the golden ratio
    var branch_angle = Math.PI/3;
    var bow_freq = 2;
    var bow_height = 3.5;
    var branches = 10;
    var leaves_on_branch = 5;
    var leaf_wh_ratio = 0.5;

    //var tree = createTree(trunk_height, trunk_taper, trunk_slices, bark, boughs, forks, fork_angle, fork_ratio, branches, branch_angle, bow_freq, bow_height, leaves_on_branch, leaf_wh_ratio, green, scene);
    //tree.position.y = 1;

    // Sphere
    var shape = BABYLON.MeshBuilder.CreateGround("shape", {width:4, height:4}, scene);
    var shapeMaterial = new BABYLON.StandardMaterial("mat", scene);
    shapeMaterial.backFaceCulling = true;
    shapeMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
    shapeMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.PLANAR_MODE;
    shapeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    shapeMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    shape.material = shapeMaterial;

    shape.rotation.y = Math.PI/8;
    shape.rotation.x = -Math.PI/8;

    var tree1 = QuickTreeGenerator(15, 10, 5, woodMaterial, leafMaterial, scene);
    tree1.position.x = 20;
    tree1.position.y = 2;


    // Leave this function
    return scene;

};  // End of createScene function

// Now, call the createScene function that you just finished creating
var scene = createScene();

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});

