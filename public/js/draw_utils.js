//Mostly form move mirror experiment
const red = '#D31517';
const green = '#2ADCB6';
const orange = '#E9572A';
const blue = '#0044FF';
const yellow = '#FFE249';
const black = 'rgb(0,0,0)';
const white = 'rgb(255, 255, 255)';

function drawKeypoints(keypoints, minConfidence, ctx) {
    var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    for (var i = 0; i < keypoints.length; i++) {
        var keypoint = keypoints[i];

        if (keypoint.score < minConfidence) {
            continue;
        }

        // console.log(scale)
        var _keypoint$position = keypoint.position,
            y = _keypoint$position.y,
            x = _keypoint$position.x;


        if (keypoint.type == "leftEye" || keypoint.type == "rightEye") {
            ctx.lineWidth = 1;
            ctx.strokeStyle = blue;
            ctx.fillStyle = white;
            ctx.beginPath();
            var radius = 8;
            ctx.arc(x * scale, y * scale, radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = blue;
            ctx.beginPath();
            radius = 3;
            ctx.arc(x * scale, y * scale, radius, 0, 2 * Math.PI);
            ctx.fill();
        } else if (keypoint.type == "leftEar" || keypoint.type == "rightEar") {
            ctx.beginPath();
            ctx.fillStyle = blue;
            var radiusX = 3;
            var radiusY = 6;
            ctx.ellipse(x * scale, y * scale, radiusX, radiusY, 0, 0, 2 * Math.PI);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.fillStyle = blue;
            var _radius = 3;
            ctx.arc(x * scale, y * scale, _radius, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}
function toTuple(_ref) {
    var y = _ref.y,
        x = _ref.x;

    return [y, x];
}
function drawSegment(_ref2, _ref3, color, scale, ctx) {
    var _ref5 = _slicedToArray(_ref2, 2),
        ay = _ref5[0],
        ax = _ref5[1];

    var _ref4 = _slicedToArray(_ref3, 2),
        by = _ref4[0],
        bx = _ref4[1];

    ctx.beginPath();
    ctx.moveTo(ax * scale, ay * scale);
    ctx.lineTo(bx * scale, by * scale);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
}

/**
 * Draws a pose skeleton by looking up all adjacent keypoints/joints
 */
function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
    const adjacentKeyPoints = posenet.getAdjacentKeyPoints(keypoints, minConfidence);
  
    ctx.lineWidth = 5;
    ctx.lineCap = "round";

    adjacentKeyPoints.forEach((keypoints) => {
      drawSegment(toTuple(keypoints[0].position),toTuple(keypoints[1].position), 'red', scale, ctx);
    });

  }

// to do: reduce/simplify code once add types to adjacentKeyPoints

function drawSkeletonOri(keypoints, minConfidence, ctx) {
    var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    ctx.lineWidth = 10;
    ctx.lineCap = "round";

    var left_shoulder = toTuple(keypoints[6].position);
    var left_elbow = toTuple(keypoints[2].position);
    var left_wrist = toTuple(keypoints[7].position);
    var ls = keypoints[6].score;
    var le = keypoints[2].score;
    var lw = keypoints[7].score;

    var left_ankle = toTuple(keypoints[0].position);
    var left_knee = toTuple(keypoints[5].position);
    var left_hip = toTuple(keypoints[4].position);
    var la = keypoints[0].score;
    var lk = keypoints[5].score;
    var lh = keypoints[4].score;

    var right_shoulder = toTuple(keypoints[15].position);
    var right_elbow = toTuple(keypoints[11].position);
    var right_wrist = toTuple(keypoints[16].position);
    var rs = keypoints[15].score;
    var re = keypoints[11].score;
    var rw = keypoints[16].score;

    var right_ankle = toTuple(keypoints[9].position);
    var right_knee = toTuple(keypoints[14].position);
    var right_hip = toTuple(keypoints[13].position);
    var ra = keypoints[9].score;
    var rk = keypoints[14].score;
    var rh = keypoints[13].score;

    // upper body
    if (ls > minConfidence && rs > minConfidence) {
        drawSegment(left_shoulder, right_shoulder, blue, scale, ctx);
    }

    if (ls > minConfidence && le > minConfidence) {
        drawSegment(left_shoulder, left_elbow, yellow, scale, ctx);
    }
    if (le > minConfidence && lw > minConfidence) {
        //drawSegment(left_elbow, left_wrist, red, scale, ctx);
    }

    if (rs > minConfidence && re > minConfidence) {
        drawSegment(right_shoulder, right_elbow, orange, scale, ctx);
    }
    if (re > minConfidence && rw > minConfidence) {
        //drawSegment(right_elbow, right_wrist, yellow, scale, ctx);
    }

    // uppper to lower
    if (ls > minConfidence && lh > minConfidence) {
        //drawSegment(left_shoulder, left_hip, orange, scale, ctx);
    }
    if (rs > minConfidence && rh > minConfidence) {
        //drawSegment(right_shoulder, right_hip, green, scale, ctx);
    }

    // lower body
    if (lh > minConfidence && rh > minConfidence) {
        //drawSegment(left_hip, right_hip, red, scale, ctx);
    }

    if (lh > minConfidence && lk > minConfidence) {
        //drawSegment(left_hip, left_knee, green, scale, ctx);
    }
    if (lk > minConfidence && la > minConfidence) {
        //drawSegment(left_knee, left_ankle, blue, scale, ctx);
    }

    if (rh > minConfidence && rk > minConfidence) {
        //drawSegment(right_hip, right_knee, blue, scale, ctx);
    }
    if (rk > minConfidence && ra > minConfidence) {
        //drawSegment(right_knee, right_ankle, orange, scale, ctx);
    }
}



/**
 * Draw the bounding box of a pose. For example, for a whole person standing
 * in an image, the bounding box will begin at the nose and extend to one of
 * ankles
 */
function drawBoundingBox(keypoints, ctx) {
    const boundingBox = posenet.getBoundingBox(keypoints);
    ctx.lineWidth = 1;
    ctx.rect(boundingBox.minX, boundingBox.minY,
      boundingBox.maxX - boundingBox.minX, boundingBox.maxY - boundingBox.minY);
  
    ctx.strokeStyle = 'red';
    ctx.stroke();
  }

var _slicedToArray = function() {
    function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;
        try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i["return"]) _i["return"]();
            } finally {
                if (_d) throw _e;
            }
        }
        return _arr;
    }
    return function(arr, i) {
        if (Array.isArray(arr)) {
            return arr;
        } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
        } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
    };
}();
