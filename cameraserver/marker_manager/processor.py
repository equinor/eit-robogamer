import numpy as np
import cv2, PIL
from cv2 import aruco
import matplotlib.pyplot as plt
import matplotlib as mpl
import pandas as pd
import math

frame = cv2.imread("../marker_images/hamming180.jpg")
plt.figure()
plt.imshow(frame)

gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
aruco_dict = aruco.Dictionary_get(aruco.DICT_6X6_250)
parameters =  aruco.DetectorParameters_create()
corners, ids, rejectedImgPoints = aruco.detectMarkers(gray, aruco_dict, parameters=parameters)
frame_markers = aruco.drawDetectedMarkers(frame.copy(), corners, ids)
df = pd.DataFrame()
for i in range(len(ids)-1, -1, -1):
    c = corners[i][0]
    px, py = c[:, 0].mean(), c[:, 1].mean()
    delta_y = c[1, 1] - c[0, 1]
    delta_x = c[1, 0] - c[0, 0]
    angleInRadian = math.atan2(delta_y, delta_x)
    print(angleInRadian)
    plt.plot([c[:, 0].mean()], [c[:, 1].mean()], "o", label = "id={0}".format(ids[i]))
plt.legend()
plt.show()
