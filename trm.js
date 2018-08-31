/**
 * Iteratively generate terrain from numeric inputs
 * @param {number} n
 * @param {number} minX Minimum X value
 * @param {number} maxX Maximum X value
 * @param {number} minY Minimum Y value
 * @param {number} maxY Maximum Y value
 * @param {Array} vertexArray Array that will contain vertices generated
 * @param {Array} faceArray Array that will contain faces generated
 * @param {Array} normalArray Array that will contain normals generated
 * @return {number}
 */
function terrainFromIteration(n, minX,maxX,minY,maxY, vertexArray, faceArray,normalArray)
{
    //vertexArray
    var deltaX=(maxX-minX)/n;
    var deltaY=(maxY-minY)/n;
    for(var i=0;i<=n;i++)
       for(var j=0;j<=n;j++)
       {
           vertexArray.push(minX+deltaX*j);
           vertexArray.push(minY+deltaY*i);
           if ((i==0 && j==0)||(i==n && j ==n)||(i==0 && j==n)||(i==n && j==0)){
           vertexArray.push(0.02+0.04*Math.random());
           }
           else
            {vertexArray.push(0);}
           
           normalArray.push(0);
           normalArray.push(0);
           normalArray.push(1);
       }
    //----index of four corners 
    var bl=3*1-1;
    var br=3*21-1;
    var tl=3*(20*21+1)-1;
    var tr=3*21*21-1;
    //index of middle
    var m=3*221-1;
    vertexArray[m]=0.1+0.1*Math.random();
    //b,t,l,r. index of 4 middle edge points
    var b=3*11-1;
    var t=3*(20*21+11)-1;
    var l=3*(10*21+1)-1;
    var r=3*11*21-1;
    vertexArray[3*11-1]=0.1+0.1*Math.random();
    vertexArray[3*(20*21+11)-1]=0.1+0.1*Math.random();
    vertexArray[3*(10*21+1)-1]=0.1+0.1*Math.random();
    vertexArray[3*11*21-1]=0.1+0.1*Math.random();
    //square---------------------------------------------
    function sq(bl,br,tl,tr,va)
    {
        var w = br-bl;
        var l = tl-bl;
        if (w<2) {return ;}
        //var nv = (w/2+l/2)+bl;
        var nv=(tr-bl)/2+bl;
        if (nv%3==0) {nv--;}
        //console.log("nv",nv,"w",w,"l",l);
        va[nv]=(va[bl]+va[br]+va[tl]+va[tr])/4+0.05*Math.random();
        return nv;
          
    }
    // diamond------------------------------------
    function dm(bl,br,tl,tr,va)
    {
        //top

        var tlen=(tr-tl)/2;
        if (tlen<=1) {return ;}
        var newt=Math.floor(tl+tlen);
        if (newt%3==0) {newt--;}
        va[newt]=(va[tr]+va[tl])/2+0.02*Math.random();
        //bot
        var blen=(br-bl)/2;
        var newb=Math.floor(bl+blen);
        if (newb%3==0) {newb--;}
        va[newb]=(va[bl]+va[br])/2+0.03*Math.random();
        //left
        var llen=(tl-bl)/2;
        var newl=Math.floor(bl+llen);
        if (newl%3==0) {newl--;}
        va[newl]=(va[bl]+va[tl])/2+0.02*Math.random();
        //right
        var rlen=(tr-br)/2;
        var newr=Math.floor(br+rlen);
        if (newr%3==0) {newr--;}
        va[newr]=(va[br]+va[tr])/2+0.03*Math.random();
        //console.log("sx",newt,tr,tl);
        return [newb,newt,newl,newr];
    }
    //console.log(vertexArray)
    //----generation of terrain
    var sbl=bl;
    var sb=b;
    var sl=l;
    var sm=m;
    var m1=sq(sbl,sb,sl,sm,vertexArray);
    //b,t,l,r
    var b1=dm(sbl,sb,sl,sm,vertexArray);
    var m2=sq(b,br,m,r,vertexArray);
    var b2=dm(b,br,m,r,vertexArray);    
    var m3=sq(l,m,tl,t,vertexArray);
    var b3=dm(l,m,tl,t,vertexArray);
    var m4=sq(m,r,t,tr,vertexArray);
    var b4=dm(m,r,t,tr,vertexArray);
    //1
    var m11=sq(bl,b1[0],b1[2],m1,vertexArray);
    var b11=dm(bl,b1[0],b1[2],m1,vertexArray);
    var m12=sq(b1[0],b,m1,b1[3],vertexArray);
    var b12=dm(b1[0],b,m1,b1[3],vertexArray);
    var m13=sq(b1[2],m1,l,b1[1],vertexArray);
    var b13=dm(b1[2],m1,l,b1[1],vertexArray);
    var m14=sq(m1,b1[3],b1[1],m,vertexArray);
    var b14=dm(m1,b1[3],b1[1],m,vertexArray);
    //2
    var m21=sq(b,b2[0],b2[2],m2,vertexArray);
    var b21=dm(b,b2[0],b2[2],m2,vertexArray);
    var m22=sq(b2[0],br,m2,b2[3],vertexArray);
    var b22=dm(b2[0],br,m2,b2[3],vertexArray);
    var m23=sq(b2[2],m2,m,b2[1],vertexArray);
    var b23=dm(b2[2],m2,m,b2[1],vertexArray);
    var m24=sq(m2,b2[3],b2[1],r,vertexArray);
    var b24=dm(m2,b2[3],b2[1],r,vertexArray);
    //3
    var m31=sq(l,b3[0],b3[2],m3,vertexArray);
    var b31=dm(l,b3[0],b3[2],m3,vertexArray);
    var m32=sq(b3[0],m,m3,b3[3],vertexArray);
    var b32=dm(b3[0],m,m3,b3[3],vertexArray);
    var m33=sq(b3[2],m3,tl,b3[1],vertexArray);
    var b33=dm(b3[2],m3,tl,b3[1],vertexArray);
    var m34=sq(m3,b3[3],b3[1],t,vertexArray);
    var b34=dm(m3,b3[3],b3[1],t,vertexArray);
    //4
    var m41=sq(m,b4[0],b4[2],m4,vertexArray);
    var b41=dm(m,b4[0],b4[2],m4,vertexArray);
    var m42=sq(b4[0],r,m4,b4[3],vertexArray);
    var b42=dm(b4[0],r,m4,b4[3],vertexArray);
    var m43=sq(b4[2],m4,t,b4[1],vertexArray);
    var b43=dm(b4[2],m4,t,b4[1],vertexArray);
    var m44=sq(m4,b4[3],b4[1],tr,vertexArray);
    var b44=dm(m4,b4[3],b4[1],tr,vertexArray);
    //

    var m52=sq(b11[0],b1[0],m11,b11[3],vertexArray);
    var b52=dm(b11[0],b1[0],m11,b11[3],vertexArray);
    var m53=sq(b11[2],m11,b1[2],b11[1],vertexArray);
    var b53=dm(b11[2],m11,b1[2],b11[1],vertexArray);
    var m54=sq(m11,b11[3],b11[1],m,vertexArray);
    var b54=dm(m11,b11[3],b11[1],m,vertexArray);
    //
    var m51=sq(b11[0],b1[0],m11,b11[3],vertexArray);
    var b51=dm(b11[0],b1[0],m11,b11[3],vertexArray);
    //vertexArray[3*43-1]=0.2*Math.random();
    //vertexArray[3*44-1]=0.14*Math.random();
    var j=21*20;
    for (var i=42;i<j;i++)
    {
        vertexArray[3*i-1]=0.17*Math.random();
    }
    //vertex normal**************************************
    /*
    *below are codes computing normal
    *
    */
    function crossProduct(v1, v2) {
        return [  ( (v1[1] * v2[2]) - (v1[2] * v2[1]) ),
        - ( (v1[0] * v2[2]) - (v1[2] * v2[0]) ),
     ( (v1[0] * v2[1]) - (v1[1] * v2[0]) )];
    }
    var maxi=n*(n-1)-1
    for(var i=0;i<=maxi;i++)
    {
        var v1 = [vertexArray[3*i],vertexArray[3*i+1],vertexArray[3*i+2]];
        var v2 = [vertexArray[3*i+3], vertexArray[3*i+4],vertexArray[3*i+5]];
        var v3 =[vertexArray[3*i+3*21],vertexArray[3*i+3*21+1],vertexArray[3*i+3*21+2]];
        var l1=[v2[0]-v1[0],v2[1]-v1[1],v2[2]-v1[2]];
        var l2=[v3[0]-v2[0],v3[1]-v2[1],v3[2]-v2[2]];
        var no=crossProduct(l1,l2);
        var azhi=no[0]^2+no[1]^2+no[2]^2;
        //v1
        normalArray[3*i]=no[0]/azhi;
        normalArray[3*i+1]=no[1]/azhi;
        normalArray[3*i+2]=no[2]/azhi;
        
        //v2
        normalArray[3*i+3]=no[0]/azhi;
        normalArray[3*i+4]=no[1]/azhi;
        normalArray[3*i+5]=no[2]/azhi;
        //v3
        normalArray[3*i+3*21]=no[0]/azhi;
        normalArray[3*i+3*21+1]=no[1]/azhi;
        normalArray[3*i+3*21+2]=no[2]/azhi; 
        //console.log(no);
    }
    console.log(vertexArray);
    var maxj=n*(n-1);
    for(var j=1;j<=maxj;j++)
    {
        var v1 = [vertexArray[3*j],vertexArray[3*j+1],vertexArray[3*j+2]];
        var v2 = [vertexArray[3*j+3*21], vertexArray[3*j+3*21+1],vertexArray[3*j+3*21+2]];
        var v3 =[vertexArray[3*j+3*20], vertexArray[3*j+3*20+1],vertexArray[3*j+3*20+2]];
        var l1=[v2[0]-v1[0],v2[1]-v1[1],v2[2]-v1[2]];
        var l2=[v3[0]-v2[0],v3[1]-v2[1],v3[2]-v2[2]];
        var no=crossProduct(l1,l2);
        var azhi=no[0]^2+no[1]^2+no[2]^2;
        //v1
        normalArray[3*j]=no[0]/azhi;
        normalArray[3*j+1]=no[1]/azhi;
        normalArray[3*j+2]=no[2]/azhi;
        //v2
        normalArray[3*j+3*21]=no[0]/azhi;
        normalArray[3*j+3*21+1]=no[1]/azhi;
        normalArray[3*j+3*21+2]=no[2]/azhi;
        //v3
        normalArray[3*j+3*21]=no[0]/azhi;
        normalArray[3*j+3*21+1]=no[1]/azhi;
        normalArray[3*j+3*21+2]=no[2]/azhi; 
        //console.log(normalArray[3*j+3*21]^2+
        //normalArray[3*j+3*21+1]^2+
        //normalArray[3*j+3*21+2]^2);
    }
    //**********************************************
    var numT=0;
    for(var i=0;i<n;i++)
       for(var j=0;j<n;j++)
       {
           var vid = i*(n+1) + j;
           faceArray.push(vid);
           faceArray.push(vid+1);
           faceArray.push(vid+n+1);
           
           faceArray.push(vid+1);
           faceArray.push(vid+1+n+1);
           faceArray.push(vid+n+1);
           numT+=2;
       }
    return numT;
}
/**
 * Generates line values from faces in faceArray
 * @param {Array} faceArray array of faces for triangles
 * @param {Array} lineArray array of normals for triangles, storage location after generation
 */
function generateLinesFromIndexedTriangles(faceArray,lineArray)
{
    numTris=faceArray.length/3;
    for(var f=0;f<numTris;f++)
    {
        var fid=f*3;
        lineArray.push(faceArray[fid]);
        lineArray.push(faceArray[fid+1]);
        
        lineArray.push(faceArray[fid+1]);
        lineArray.push(faceArray[fid+2]);
        
        lineArray.push(faceArray[fid+2]);
        lineArray.push(faceArray[fid]);
        
    }
}

