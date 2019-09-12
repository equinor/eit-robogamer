import numpy as np
import cv2
import glob
import sys

criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 0.001)

objp_arc = np.array([
    (0.0, 0.0, 0.0),
    (0.0, 9.0, 0.0),
    (16.0, 0.0, 0.0),    
    (16.0, 9.0, 0.0)
])
objp = []

img = cv2.imread('../test_img/test_real.jpg')

height, width = img.shape[:2]
perstep = 16/width
for i in np.arange(0.0, 16.001, perstep):
    for j in np.arange(0.0, 9.001, perstep):
        objp.append([i, j, 0.0])
objp = np.array(objp)

mtx = np.load("calib_mtx.npy")
dist = np.load("calib_dist.npy")

gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
corners = np.float32([
    (472, 269),
    (512, 910), 
    (1598,  131), 
    (1706, 791)
    ])

corners2 = cv2.cornerSubPix(gray,corners,(11,11),(-1,-1),criteria)

ret, rvecs, tvecs = cv2.solvePnP(objp_arc, corners2, mtx, dist)

# project 3D points to image plane
imgpts, jac = cv2.projectPoints(objp, rvecs, tvecs, mtx, dist)
imgpts = np.around(imgpts)
imgpts = imgpts.tolist()
#print(imgpts)
idx = imgpts.index([[533.0, 594.0]])
print(idx)
print(objp[idx])

